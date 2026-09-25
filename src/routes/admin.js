const fs = require('fs');
const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const contentSchema = require('../contentSchema');
const { seedTheme } = require('../theme');
const {
  requireAdmin,
  flash,
  back,
  verifyCsrf,
  uploadFields,
  registerUpload,
} = require('../security');
const {
  isEmail,
  lines,
  parseModules,
  modulesToText,
  parseMaterials,
  materialsToText,
  safeUrl,
} = require('../helpers');

const router = express.Router();
router.use(requireAdmin);
router.use((req, res, next) => {
  res.locals.layout = 'admin';
  const data = db.get();
  res.locals.badge = {
    enrollments: data.enrollments.filter((e) => e.status === 'pending').length,
    messages: data.messages.filter((m) => !m.read).length,
  };
  next();
});

const str = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const arr = (v) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const now = () => new Date().toISOString();

// Resolve an image field: new upload > typed/pasted URL > cleared.
function imageValue(req, key, current) {
  const file = req.files && req.files[key] && req.files[key][0];
  if (file) return registerUpload(file, req.user.id);
  if (req.body[`${key}__remove`]) return '';
  if (req.body[`${key}__url`] !== undefined) return safeUrl(req.body[`${key}__url`]);
  return current || '';
}

// ---- Dashboard ------------------------------------------------------------
router.get('/', (req, res) => {
  const data = db.get();
  const clients = data.users.filter((u) => u.role === 'client');
  const pending = data.enrollments
    .filter((e) => e.status === 'pending')
    .slice(0, 6)
    .map((e) => ({ ...e, user: data.users.find((u) => u.id === e.userId), course: data.courses.find((c) => c.id === e.courseId) }));
  const revenue = data.enrollments
    .filter((e) => e.status === 'active')
    .reduce((sum, e) => sum + (Number(data.courses.find((c) => c.id === e.courseId)?.price) || 0), 0);
  res.render('admin/dashboard', {
    title: 'Dashboard',
    counts: {
      clients: clients.length,
      active: data.enrollments.filter((e) => e.status === 'active').length,
      pending: data.enrollments.filter((e) => e.status === 'pending').length,
      courses: data.courses.length,
      reports: data.reports.length,
      unread: data.messages.filter((m) => !m.read).length,
      revenue,
    },
    pending,
    recentClients: clients.slice(-5).reverse(),
    messages: data.messages.slice(0, 5),
    usingDefaultAdmin: fs.existsSync(path.join(db.DATA_DIR, 'admin-credentials.txt')),
  });
});

// ---- Site content -----------------------------------------------------------
const contentImageFields = contentSchema.flatMap((g) => g.fields).filter((f) => f.type === 'image').map((f) => ({ name: f.key, maxCount: 1 }));

router.get('/content', (req, res) => {
  res.render('admin/content', { title: 'Site content', schema: contentSchema });
});

router.post('/content', uploadFields(contentImageFields), verifyCsrf, (req, res) => {
  const content = db.get().content;
  for (const group of contentSchema) {
    for (const field of group.fields) {
      if (field.type === 'image') content[field.key] = imageValue(req, field.key, content[field.key]);
      else if (req.body[field.key] !== undefined) content[field.key] = str(req.body[field.key], 20000);
    }
  }
  db.save();
  flash(req, 'success', 'Site content saved. Changes are live.');
  res.redirect('/admin/content');
});

// ---- Repeating lists (stats, method steps, testimonials, FAQs) --------------
const LISTS = {
  stats: { label: 'Highlight numbers', help: 'The numbers shown under the hero on the home page.', fields: [{ key: 'value', label: 'Number' }, { key: 'label', label: 'Label' }] },
  approach: { label: 'Method steps', help: 'The research process steps shown on the home and about pages.', fields: [{ key: 'title', label: 'Step title' }, { key: 'body', label: 'Description', type: 'textarea' }] },
  testimonials: { label: 'Testimonials', help: 'Quotes from learners shown on the home page.', fields: [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'quote', label: 'Quote', type: 'textarea' }] },
  faqs: { label: 'FAQs', help: 'Questions shown on the home and course pages.', fields: [{ key: 'q', label: 'Question' }, { key: 'a', label: 'Answer', type: 'textarea' }] },
};

router.get('/lists', (req, res) => {
  const data = db.get();
  const values = Object.fromEntries(Object.keys(LISTS).map((k) => [k, data[k]]));
  res.render('admin/lists', { title: 'Sections & lists', lists: LISTS, values });
});

router.post('/lists/:name', (req, res, next) => {
  const def = LISTS[req.params.name];
  if (!def) return next();
  const columns = def.fields.map((f) => arr(req.body[f.key]));
  const count = Math.max(0, ...columns.map((c) => c.length));
  const items = [];
  for (let i = 0; i < count; i++) {
    const item = {};
    def.fields.forEach((f, j) => (item[f.key] = str(columns[j][i], 2000)));
    if (Object.values(item).some(Boolean)) items.push(item);
  }
  db.get()[req.params.name] = items;
  db.save();
  flash(req, 'success', `${def.label} saved.`);
  res.redirect(`/admin/lists#${req.params.name}`);
});

// ---- Settings (brand, contact, sections) ------------------------------------
router.get('/settings', (req, res) => {
  res.render('admin/settings', { title: 'Settings' });
});

router.post('/settings', uploadFields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), verifyCsrf, (req, res) => {
  const s = db.get().settings;
  const b = req.body;
  s.siteName = str(b.siteName, 80) || 'Vector';
  s.tagline = str(b.tagline, 120);
  s.logo = imageValue(req, 'logo', s.logo) || '/images/vector-emblem.png';
  s.favicon = imageValue(req, 'favicon', s.favicon) || '/images/favicon.png';
  s.contact = {
    email: str(b.contact_email, 200),
    phone: str(b.contact_phone, 40),
    whatsapp: str(b.contact_whatsapp, 40),
    address: str(b.contact_address, 300),
    hours: str(b.contact_hours, 200),
  };
  s.social = {};
  for (const k of ['linkedin', 'instagram', 'youtube', 'twitter', 'telegram']) s.social[k] = safeUrl(b[`social_${k}`]);
  for (const k of Object.keys(s.sections)) s.sections[k] = Boolean(b[`section_${k}`]);
  s.paymentInstructions = str(b.paymentInstructions, 2000);
  s.disclaimer = str(b.disclaimer, 5000);
  s.seoDescription = str(b.seoDescription, 300);
  db.save();
  flash(req, 'success', 'Settings saved.');
  res.redirect('/admin/settings');
});

// ---- Theme ---------------------------------------------------------------------
const FONTS = {
  heading: ['Playfair Display', 'DM Serif Display', 'Libre Baskerville', 'Cormorant Garamond', 'Merriweather', 'Lora', 'Montserrat', 'Poppins', 'Inter'],
  body: ['Inter', 'Source Sans 3', 'Open Sans', 'Lato', 'Roboto', 'Nunito Sans', 'Poppins', 'Work Sans'],
};

router.get('/theme', (req, res) => {
  res.render('admin/theme', { title: 'Theme & format', fonts: FONTS });
});

router.post('/theme', (req, res) => {
  const t = db.get().settings.theme;
  if (req.body.reset) {
    Object.assign(t, seedTheme());
  } else {
    const color = (v, fallback) => (/^#[0-9a-f]{6}$/i.test(v) ? v : fallback);
    t.primary = color(req.body.primary, t.primary);
    t.accent = color(req.body.accent, t.accent);
    t.background = color(req.body.background, t.background);
    t.text = color(req.body.text, t.text);
    if (FONTS.heading.includes(req.body.headingFont)) t.headingFont = req.body.headingFont;
    if (FONTS.body.includes(req.body.bodyFont)) t.bodyFont = req.body.bodyFont;
    const r = Number(req.body.radius);
    if (Number.isFinite(r)) t.radius = Math.min(28, Math.max(0, Math.round(r)));
  }
  db.save();
  flash(req, 'success', req.body.reset ? 'Theme reset to Vector defaults.' : 'Theme saved.');
  res.redirect('/admin/theme');
});

// ---- Courses -----------------------------------------------------------------
router.get('/courses', (req, res) => {
  const data = db.get();
  const courses = [...data.courses]
    .sort((a, b) => a.order - b.order)
    .map((c) => ({
      ...c,
      active: data.enrollments.filter((e) => e.courseId === c.id && e.status === 'active').length,
      pending: data.enrollments.filter((e) => e.courseId === c.id && e.status === 'pending').length,
    }));
  res.render('admin/courses', { title: 'Courses', courses });
});

function courseForm(course) {
  return {
    ...course,
    highlightsText: (course.highlights || []).join('\n'),
    outcomesText: (course.outcomes || []).join('\n'),
    modulesText: modulesToText(course.modules),
    materialsText: materialsToText(course.materials),
  };
}

router.get('/courses/new', (req, res) => {
  res.render('admin/course-form', {
    title: 'New course',
    course: courseForm({ published: false, featured: false, price: 0, modules: [], materials: [] }),
    isNew: true,
  });
});

router.get('/courses/:id', (req, res, next) => {
  const course = db.get().courses.find((c) => c.id === req.params.id);
  if (!course) return next();
  res.render('admin/course-form', { title: `Edit: ${course.title}`, course: courseForm(course), isNew: false });
});

router.post('/courses/:id', uploadFields([{ name: 'image', maxCount: 1 }]), verifyCsrf, (req, res) => {
  const data = db.get();
  const isNew = req.params.id === 'new';
  let course = isNew ? null : data.courses.find((c) => c.id === req.params.id);
  if (!isNew && !course) return res.redirect('/admin/courses');
  const b = req.body;
  const title = str(b.title, 200);
  if (!title) {
    flash(req, 'error', 'Course title is required.');
    return res.redirect(back(req, '/admin/courses'));
  }
  if (isNew) {
    course = { id: db.id(), order: data.courses.length + 1, createdAt: now() };
    data.courses.push(course);
  }
  Object.assign(course, {
    title,
    slug: db.uniqueSlug(data.courses, str(b.slug, 100) || title, course.id),
    subtitle: str(b.subtitle, 300),
    category: str(b.category, 80),
    level: str(b.level, 80),
    price: Math.max(0, Number(b.price) || 0),
    originalPrice: Math.max(0, Number(b.originalPrice) || 0),
    duration: str(b.duration, 120),
    schedule: str(b.schedule, 200),
    format: str(b.format, 120),
    image: imageValue(req, 'image', course.image),
    summary: str(b.summary, 1000),
    description: str(b.description, 20000),
    highlights: lines(b.highlightsText),
    outcomes: lines(b.outcomesText),
    modules: parseModules(b.modulesText),
    materials: parseMaterials(b.materialsText).map((m) => ({ ...m, url: safeUrl(m.url) })),
    published: Boolean(b.published),
    featured: Boolean(b.featured),
    updatedAt: now(),
  });
  db.save();
  flash(req, 'success', `Course "${course.title}" saved.`);
  res.redirect(`/admin/courses/${course.id}`);
});

router.post('/courses/:id/move', (req, res) => {
  const list = db.get().courses.sort((a, b) => a.order - b.order);
  const i = list.findIndex((c) => c.id === req.params.id);
  const j = req.body.dir === 'up' ? i - 1 : i + 1;
  if (i >= 0 && j >= 0 && j < list.length) [list[i], list[j]] = [list[j], list[i]];
  list.forEach((c, k) => (c.order = k + 1));
  db.save();
  res.redirect('/admin/courses');
});

router.post('/courses/:id/delete', (req, res) => {
  const data = db.get();
  data.courses = data.courses.filter((c) => c.id !== req.params.id);
  data.enrollments = data.enrollments.filter((e) => e.courseId !== req.params.id);
  db.save();
  flash(req, 'success', 'Course deleted.');
  res.redirect('/admin/courses');
});

// ---- Research reports --------------------------------------------------------
router.get('/research', (req, res) => {
  const reports = [...db.get().reports].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  res.render('admin/reports', { title: 'Research', reports });
});

router.get('/research/new', (req, res) => {
  res.render('admin/report-form', {
    title: 'New research report',
    report: { published: false, access: 'public', date: now().slice(0, 10) },
    isNew: true,
  });
});

router.get('/research/:id', (req, res, next) => {
  const report = db.get().reports.find((r) => r.id === req.params.id);
  if (!report) return next();
  res.render('admin/report-form', { title: `Edit: ${report.title}`, report, isNew: false });
});

router.post('/research/:id', uploadFields([{ name: 'image', maxCount: 1 }]), verifyCsrf, (req, res) => {
  const data = db.get();
  const isNew = req.params.id === 'new';
  let report = isNew ? null : data.reports.find((r) => r.id === req.params.id);
  if (!isNew && !report) return res.redirect('/admin/research');
  const b = req.body;
  const title = str(b.title, 250);
  if (!title) {
    flash(req, 'error', 'Report title is required.');
    return res.redirect(back(req, '/admin/research'));
  }
  if (isNew) {
    report = { id: db.id(), createdAt: now() };
    data.reports.push(report);
  }
  Object.assign(report, {
    title,
    slug: db.uniqueSlug(data.reports, str(b.slug, 100) || title, report.id),
    sector: str(b.sector, 100),
    company: str(b.company, 200),
    rating: str(b.rating, 60),
    date: /^\d{4}-\d{2}-\d{2}$/.test(b.date) ? b.date : now().slice(0, 10),
    image: imageValue(req, 'image', report.image),
    access: b.access === 'members' ? 'members' : 'public',
    summary: str(b.summary, 1500),
    body: str(b.body, 100000),
    pdfUrl: safeUrl(b.pdfUrl),
    published: Boolean(b.published),
    updatedAt: now(),
  });
  db.save();
  flash(req, 'success', `Report "${report.title}" saved.`);
  res.redirect(`/admin/research/${report.id}`);
});

router.post('/research/:id/delete', (req, res) => {
  const data = db.get();
  data.reports = data.reports.filter((r) => r.id !== req.params.id);
  db.save();
  flash(req, 'success', 'Report deleted.');
  res.redirect('/admin/research');
});

// ---- Media library -----------------------------------------------------------
router.get('/media', (req, res) => {
  res.render('admin/media', { title: 'Media library', media: db.get().media });
});

router.post('/media', uploadFields([{ name: 'files', maxCount: 10 }]), verifyCsrf, (req, res) => {
  const files = (req.files && req.files.files) || [];
  files.forEach((f) => registerUpload(f, req.user.id));
  db.save();
  flash(req, files.length ? 'success' : 'error', files.length ? `${files.length} image(s) uploaded.` : 'Choose at least one image.');
  res.redirect('/admin/media');
});

router.post('/media/:id/delete', (req, res) => {
  const data = db.get();
  const item = data.media.find((m) => m.id === req.params.id);
  if (item) {
    const file = path.join(db.UPLOAD_DIR, path.basename(item.url));
    fs.rm(file, { force: true }, () => {});
    data.media = data.media.filter((m) => m.id !== item.id);
    db.save();
    flash(req, 'success', 'Image deleted. Any page still using it will show no image.');
  }
  res.redirect('/admin/media');
});

// ---- Users ---------------------------------------------------------------------
router.get('/users', (req, res) => {
  const data = db.get();
  const q = str(req.query.q, 100).toLowerCase();
  const role = req.query.role || '';
  const users = data.users
    .filter((u) => (!role || u.role === role) && (!q || u.name.toLowerCase().includes(q) || u.email.includes(q)))
    .map((u) => ({ ...u, courses: data.enrollments.filter((e) => e.userId === u.id && e.status === 'active').length }))
    .reverse();
  res.render('admin/users', { title: 'Users', users, q, role, courses: data.courses });
});

router.post('/users', (req, res) => {
  const data = db.get();
  const email = str(req.body.email, 200).toLowerCase();
  const password = String(req.body.password || '');
  if (!str(req.body.name) || !isEmail(email) || password.length < 8) {
    flash(req, 'error', 'Name, valid email and a password of 8+ characters are required.');
  } else if (data.users.some((u) => u.email === email)) {
    flash(req, 'error', 'A user with that email already exists.');
  } else {
    data.users.push({
      id: db.id(),
      name: str(req.body.name, 120),
      email,
      phone: str(req.body.phone, 30),
      passwordHash: bcrypt.hashSync(password, 10),
      role: req.body.role === 'admin' ? 'admin' : 'client',
      createdAt: now(),
    });
    db.save();
    flash(req, 'success', `User ${email} created.`);
  }
  res.redirect('/admin/users');
});

router.post('/users/:id/role', (req, res) => {
  const data = db.get();
  const user = data.users.find((u) => u.id === req.params.id);
  const role = req.body.role === 'admin' ? 'admin' : 'client';
  if (!user) return res.redirect('/admin/users');
  if (user.id === req.user.id && role !== 'admin') {
    flash(req, 'error', 'You cannot remove your own admin access.');
  } else {
    user.role = role;
    db.save();
    flash(req, 'success', `${user.email} is now ${role === 'admin' ? 'an admin' : 'a client'}.`);
  }
  res.redirect('/admin/users');
});

router.post('/users/:id/password', (req, res) => {
  const user = db.get().users.find((u) => u.id === req.params.id);
  const password = String(req.body.password || '');
  if (user && password.length >= 8) {
    user.passwordHash = bcrypt.hashSync(password, 10);
    db.save();
    flash(req, 'success', `Password reset for ${user.email}.`);
  } else {
    flash(req, 'error', 'Password must be at least 8 characters.');
  }
  res.redirect('/admin/users');
});

router.post('/users/:id/delete', (req, res) => {
  const data = db.get();
  if (req.params.id === req.user.id) {
    flash(req, 'error', 'You cannot delete your own account.');
    return res.redirect('/admin/users');
  }
  data.users = data.users.filter((u) => u.id !== req.params.id);
  data.enrollments = data.enrollments.filter((e) => e.userId !== req.params.id);
  db.save();
  flash(req, 'success', 'User deleted.');
  res.redirect('/admin/users');
});

// ---- Enrolments ------------------------------------------------------------------
router.get('/enrollments', (req, res) => {
  const data = db.get();
  const status = req.query.status || '';
  const enrollments = data.enrollments
    .filter((e) => !status || e.status === status)
    .map((e) => ({ ...e, user: data.users.find((u) => u.id === e.userId), course: data.courses.find((c) => c.id === e.courseId) }))
    .filter((e) => e.user && e.course);
  res.render('admin/enrollments', {
    title: 'Enrolments',
    enrollments,
    status,
    clients: data.users.filter((u) => u.role === 'client'),
    courses: data.courses,
  });
});

router.post('/enrollments', (req, res) => {
  const data = db.get();
  const user = data.users.find((u) => u.id === req.body.userId);
  const course = data.courses.find((c) => c.id === req.body.courseId);
  if (!user || !course) {
    flash(req, 'error', 'Pick a user and a course.');
    return res.redirect('/admin/enrollments');
  }
  const existing = data.enrollments.find((e) => e.userId === user.id && e.courseId === course.id);
  if (existing) Object.assign(existing, { status: 'active', updatedAt: now() });
  else data.enrollments.unshift({ id: db.id(), userId: user.id, courseId: course.id, status: 'active', note: 'Added by admin', createdAt: now() });
  db.save();
  flash(req, 'success', `${user.name} now has access to ${course.title}.`);
  res.redirect(back(req, '/admin/enrollments'));
});

router.post('/enrollments/:id/status', (req, res) => {
  const e = db.get().enrollments.find((x) => x.id === req.params.id);
  const status = ['active', 'pending', 'rejected'].includes(req.body.status) ? req.body.status : null;
  if (e && status) {
    e.status = status;
    e.updatedAt = now();
    db.save();
    flash(req, 'success', `Enrolment marked ${status}.`);
  }
  res.redirect(back(req, '/admin/enrollments'));
});

router.post('/enrollments/:id/delete', (req, res) => {
  const data = db.get();
  data.enrollments = data.enrollments.filter((e) => e.id !== req.params.id);
  db.save();
  flash(req, 'success', 'Enrolment removed.');
  res.redirect(back(req, '/admin/enrollments'));
});

// ---- Messages --------------------------------------------------------------------
router.get('/messages', (req, res) => {
  res.render('admin/messages', { title: 'Messages', messages: db.get().messages });
});

router.post('/messages/:id/read', (req, res) => {
  const m = db.get().messages.find((x) => x.id === req.params.id);
  if (m) {
    m.read = !m.read;
    db.save();
  }
  res.redirect('/admin/messages');
});

router.post('/messages/:id/delete', (req, res) => {
  const data = db.get();
  data.messages = data.messages.filter((m) => m.id !== req.params.id);
  db.save();
  flash(req, 'success', 'Message deleted.');
  res.redirect('/admin/messages');
});

// ---- My account & backup -----------------------------------------------------
router.get('/account', (req, res) => {
  res.render('admin/account', { title: 'My account' });
});

router.post('/account', (req, res) => {
  const data = db.get();
  const email = str(req.body.email, 200).toLowerCase();
  const password = String(req.body.password || '');
  if (!bcrypt.compareSync(String(req.body.current || ''), req.user.passwordHash)) {
    flash(req, 'error', 'Current password is incorrect.');
    return res.redirect('/admin/account');
  }
  if (!isEmail(email) || data.users.some((u) => u.email === email && u.id !== req.user.id)) {
    flash(req, 'error', 'Enter a valid email that is not used by another account.');
    return res.redirect('/admin/account');
  }
  if (password && (password.length < 8 || password !== req.body.confirm)) {
    flash(req, 'error', 'New password must be 8+ characters and match the confirmation.');
    return res.redirect('/admin/account');
  }
  req.user.name = str(req.body.name, 120) || req.user.name;
  req.user.email = email;
  if (password) {
    req.user.passwordHash = bcrypt.hashSync(password, 10);
    fs.rm(path.join(db.DATA_DIR, 'admin-credentials.txt'), { force: true }, () => {});
  }
  db.save();
  flash(req, 'success', 'Account updated.');
  res.redirect('/admin/account');
});

router.get('/backup', (req, res) => {
  const data = JSON.parse(JSON.stringify(db.get()));
  data.users = data.users.map(({ passwordHash, ...u }) => u);
  res.set('Content-Disposition', `attachment; filename="vector-backup-${now().slice(0, 10)}.json"`);
  res.json(data);
});

module.exports = router;
