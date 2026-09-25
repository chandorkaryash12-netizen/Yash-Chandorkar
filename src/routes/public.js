const express = require('express');
const db = require('../db');
const { flash, back } = require('../security');
const { isEmail } = require('../helpers');

const router = express.Router();

const publishedCourses = () => db.get().courses.filter((c) => c.published).sort((a, b) => a.order - b.order);
const publishedReports = () =>
  db.get().reports.filter((r) => r.published).sort((a, b) => String(b.date).localeCompare(String(a.date)));

router.get('/', (req, res) => {
  const data = db.get();
  res.render('home', {
    title: null,
    courses: publishedCourses(),
    reports: publishedReports().slice(0, 3),
    stats: data.stats,
    approach: data.approach,
    testimonials: data.testimonials,
    faqs: data.faqs,
  });
});

router.get('/courses', (req, res) => {
  res.render('courses', { title: 'Courses', courses: publishedCourses() });
});

router.get('/courses/:slug', (req, res, next) => {
  const course = db.get().courses.find((c) => c.slug === req.params.slug && (c.published || req.user?.role === 'admin'));
  if (!course) return next();
  const enrollment = req.user
    ? db.get().enrollments.find((e) => e.userId === req.user.id && e.courseId === course.id && e.status !== 'rejected')
    : null;
  res.render('course', { title: course.title, course, enrollment, faqs: db.get().faqs });
});

router.get('/research', (req, res) => {
  const sector = req.query.sector || '';
  const all = publishedReports();
  const sectors = [...new Set(all.map((r) => r.sector).filter(Boolean))];
  const reports = sector ? all.filter((r) => r.sector === sector) : all;
  res.render('research', { title: 'Research', reports, sectors, sector });
});

router.get('/research/:slug', (req, res, next) => {
  const report = db.get().reports.find((r) => r.slug === req.params.slug && (r.published || req.user?.role === 'admin'));
  if (!report) return next();
  const locked = report.access === 'members' && !req.user;
  const more = publishedReports().filter((r) => r.id !== report.id).slice(0, 3);
  res.render('report', { title: report.title, report, locked, more });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', approach: db.get().approach, stats: db.get().stats });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', form: {} });
});

router.post('/contact', (req, res) => {
  const form = {
    name: String(req.body.name || '').trim().slice(0, 120),
    email: String(req.body.email || '').trim().toLowerCase().slice(0, 200),
    phone: String(req.body.phone || '').trim().slice(0, 30),
    subject: String(req.body.subject || '').trim().slice(0, 200),
    message: String(req.body.message || '').trim().slice(0, 5000),
  };
  // Honeypot field — real visitors never see or fill it.
  if (req.body.website) return res.redirect('/contact');
  if (!form.name || !isEmail(form.email) || !form.message) {
    res.locals.flash = [{ type: 'error', text: 'Please enter your name, a valid email and a message.' }];
    return res.status(400).render('contact', { title: 'Contact', form });
  }
  db.get().messages.unshift({ id: db.id(), ...form, read: false, createdAt: new Date().toISOString() });
  db.save();
  flash(req, 'success', 'Thank you — your message has been sent. We will get back to you shortly.');
  res.redirect(back(req, '/contact'));
});

router.get('/disclaimer', (req, res) => {
  res.render('disclaimer', { title: 'Disclaimer' });
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send('User-agent: *\nDisallow: /admin\nDisallow: /dashboard\n');
});

module.exports = router;
