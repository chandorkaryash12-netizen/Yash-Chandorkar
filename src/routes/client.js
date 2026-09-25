const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { requireLogin, flash } = require('../security');

const router = express.Router();
router.use(requireLogin);

router.get('/', (req, res) => {
  const data = db.get();
  const mine = data.enrollments
    .filter((e) => e.userId === req.user.id)
    .map((e) => ({ ...e, course: data.courses.find((c) => c.id === e.courseId) }))
    .filter((e) => e.course);
  const enrolledIds = new Set(mine.filter((e) => e.status !== 'rejected').map((e) => e.courseId));
  const available = data.courses.filter((c) => c.published && !enrolledIds.has(c.id));
  const reports = data.reports
    .filter((r) => r.published)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 4);
  res.render('client/dashboard', { title: 'My dashboard', enrollments: mine, available, reports });
});

router.post('/enroll/:courseId', (req, res) => {
  const data = db.get();
  const course = data.courses.find((c) => c.id === req.params.courseId && c.published);
  if (!course) {
    flash(req, 'error', 'That course is not available.');
    return res.redirect('/courses');
  }
  const existing = data.enrollments.find((e) => e.userId === req.user.id && e.courseId === course.id);
  if (existing && existing.status !== 'rejected') {
    flash(req, 'info', existing.status === 'active' ? 'You are already enrolled in this course.' : 'Your enrolment request is already being processed.');
    return res.redirect('/dashboard');
  }
  const free = !(Number(course.price) > 0);
  if (existing) {
    existing.status = free ? 'active' : 'pending';
    existing.updatedAt = new Date().toISOString();
  } else {
    data.enrollments.unshift({
      id: db.id(),
      userId: req.user.id,
      courseId: course.id,
      status: free ? 'active' : 'pending',
      note: String(req.body.note || '').slice(0, 500),
      createdAt: new Date().toISOString(),
    });
  }
  db.save();
  flash(req, 'success', free ? `You are enrolled in ${course.title}.` : data.settings.paymentInstructions);
  res.redirect('/dashboard');
});

router.get('/courses/:slug', (req, res, next) => {
  const data = db.get();
  const course = data.courses.find((c) => c.slug === req.params.slug);
  if (!course) return next();
  const enrollment = data.enrollments.find((e) => e.userId === req.user.id && e.courseId === course.id);
  const hasAccess = req.user.role === 'admin' || (enrollment && enrollment.status === 'active');
  if (!hasAccess) {
    flash(req, 'info', 'This course unlocks once your enrolment is confirmed.');
    return res.redirect(`/courses/${course.slug}`);
  }
  res.render('client/learn', { title: course.title, course });
});

router.get('/profile', (req, res) => {
  res.render('client/profile', { title: 'My profile' });
});

router.post('/profile', (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 120);
  if (!name) {
    flash(req, 'error', 'Name cannot be empty.');
    return res.redirect('/dashboard/profile');
  }
  req.user.name = name;
  req.user.phone = String(req.body.phone || '').trim().slice(0, 30);
  db.save();
  flash(req, 'success', 'Profile updated.');
  res.redirect('/dashboard/profile');
});

router.post('/password', (req, res) => {
  const { current, password, confirm } = req.body;
  if (!bcrypt.compareSync(String(current || ''), req.user.passwordHash)) {
    flash(req, 'error', 'Current password is incorrect.');
  } else if (String(password || '').length < 8) {
    flash(req, 'error', 'New password must be at least 8 characters.');
  } else if (password !== confirm) {
    flash(req, 'error', 'New passwords do not match.');
  } else {
    req.user.passwordHash = bcrypt.hashSync(password, 10);
    db.save();
    flash(req, 'success', 'Password changed.');
  }
  res.redirect(req.user.role === 'admin' && req.body.from === 'admin' ? '/admin/account' : '/dashboard/profile');
});

module.exports = router;
