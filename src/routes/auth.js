const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { flash, loginLimiter, recordFailedLogin, clearFailedLogins } = require('../security');
const { isEmail, randomToken } = require('../helpers');

const router = express.Router();

function startSession(req, user) {
  const returnTo = req.session.returnTo;
  req.session.userId = user.id;
  req.session.csrf = randomToken(16);
  delete req.session.returnTo;
  return returnTo;
}

function safeReturn(url, fallback) {
  return typeof url === 'string' && url.startsWith('/') && !url.startsWith('//') ? url : fallback;
}

function findByEmail(email) {
  return db.get().users.find((u) => u.email === String(email || '').trim().toLowerCase());
}

// ---- Client signup / login -------------------------------------------------
router.get('/signup', (req, res) => {
  if (req.user) return res.redirect(req.user.role === 'admin' ? '/admin' : '/dashboard');
  res.render('auth/signup', { title: 'Create account', form: {} });
});

router.post('/signup', (req, res) => {
  const form = {
    name: String(req.body.name || '').trim().slice(0, 120),
    email: String(req.body.email || '').trim().toLowerCase().slice(0, 200),
    phone: String(req.body.phone || '').trim().slice(0, 30),
  };
  const password = String(req.body.password || '');
  const errors = [];
  if (!form.name) errors.push('Please enter your full name.');
  if (!isEmail(form.email)) errors.push('Please enter a valid email address.');
  if (password.length < 8) errors.push('Password must be at least 8 characters.');
  if (password !== req.body.confirm) errors.push('Passwords do not match.');
  if (!req.body.terms) errors.push('Please accept the terms and disclaimer.');
  if (findByEmail(form.email)) errors.push('An account with this email already exists. Please log in.');

  if (errors.length) {
    res.locals.flash = errors.map((text) => ({ type: 'error', text }));
    return res.status(400).render('auth/signup', { title: 'Create account', form });
  }

  const user = {
    id: db.id(),
    ...form,
    passwordHash: bcrypt.hashSync(password, 10),
    role: 'client',
    createdAt: new Date().toISOString(),
  };
  db.get().users.push(user);
  db.save();
  const returnTo = startSession(req, user);
  flash(req, 'success', `Welcome to Vector, ${user.name.split(' ')[0]}! Your account is ready.`);
  res.redirect(safeReturn(returnTo, '/dashboard'));
});

router.get('/login', (req, res) => {
  if (req.user) return res.redirect(req.user.role === 'admin' ? '/admin' : '/dashboard');
  res.render('auth/login', { title: 'Log in', mode: 'client', email: '' });
});

router.post('/login', loginLimiter, (req, res) => {
  const user = findByEmail(req.body.email);
  if (!user || !bcrypt.compareSync(String(req.body.password || ''), user.passwordHash)) {
    recordFailedLogin(req);
    res.locals.flash = [{ type: 'error', text: 'Incorrect email or password.' }];
    return res.status(401).render('auth/login', { title: 'Log in', mode: 'client', email: req.body.email || '' });
  }
  clearFailedLogins(req);
  const returnTo = startSession(req, user);
  res.redirect(safeReturn(returnTo, user.role === 'admin' ? '/admin' : '/dashboard'));
});

// ---- Admin login -------------------------------------------------------------
router.get('/admin/login', (req, res) => {
  if (req.user?.role === 'admin') return res.redirect('/admin');
  res.render('auth/login', { title: 'Admin login', mode: 'admin', email: '' });
});

router.post('/admin/login', loginLimiter, (req, res) => {
  const user = findByEmail(req.body.email);
  const ok = user && user.role === 'admin' && bcrypt.compareSync(String(req.body.password || ''), user.passwordHash);
  if (!ok) {
    recordFailedLogin(req);
    res.locals.flash = [{ type: 'error', text: 'Invalid admin credentials.' }];
    return res.status(401).render('auth/login', { title: 'Admin login', mode: 'admin', email: req.body.email || '' });
  }
  clearFailedLogins(req);
  const returnTo = startSession(req, user);
  res.redirect(safeReturn(returnTo && returnTo.startsWith('/admin') ? returnTo : null, '/admin'));
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
