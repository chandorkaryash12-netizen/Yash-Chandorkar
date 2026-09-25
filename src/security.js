const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const db = require('./db');
const { randomToken } = require('./helpers');

// ---- Session secret ------------------------------------------------------
function sessionSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const file = path.join(db.DATA_DIR, '.session-secret');
  if (!fs.existsSync(file)) fs.writeFileSync(file, randomToken(32), { mode: 0o600 });
  return fs.readFileSync(file, 'utf8').trim();
}

// ---- Current user --------------------------------------------------------
function loadUser(req, res, next) {
  const userId = req.session && req.session.userId;
  const user = userId ? db.get().users.find((u) => u.id === userId) : null;
  if (userId && !user) req.session = null; // account was deleted
  req.user = user || null;
  res.locals.currentUser = req.user;
  next();
}

function requireLogin(req, res, next) {
  if (req.user) return next();
  req.session.returnTo = req.originalUrl;
  flash(req, 'info', 'Please log in to continue.');
  res.redirect('/login');
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  if (req.user) return res.status(403).render('error', { title: 'Access denied', message: 'This area is for administrators only.' });
  req.session.returnTo = req.originalUrl;
  res.redirect('/admin/login');
}

// ---- Flash messages ------------------------------------------------------
function flash(req, type, text) {
  req.session.flash = [...(req.session.flash || []), { type, text }];
}

function exposeFlash(req, res, next) {
  res.locals.flash = req.session.flash || [];
  if (req.session.flash) delete req.session.flash;
  next();
}

// ---- CSRF ------------------------------------------------------------------
function csrfToken(req, res, next) {
  if (!req.session.csrf) req.session.csrf = randomToken(16);
  res.locals.csrfToken = req.session.csrf;
  next();
}

function tokensMatch(a, b) {
  const x = Buffer.from(String(a || ''));
  const y = Buffer.from(String(b || ''));
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
}

function verifyCsrf(req, res, next) {
  const sent = (req.body && req.body._csrf) || req.get('x-csrf-token');
  if (tokensMatch(sent, req.session.csrf)) return next();
  res.status(403).render('error', {
    title: 'Session expired',
    message: 'Your form session expired. Please go back, refresh the page and try again.',
  });
}

// Multipart forms are parsed later by multer, so they verify CSRF themselves.
function csrfForForms(req, res, next) {
  if (req.method !== 'POST') return next();
  if (req.is('multipart/form-data')) return next();
  return verifyCsrf(req, res, next);
}

// ---- Login rate limiting ------------------------------------------------
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function loginLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && now - entry.start < WINDOW_MS && entry.count >= MAX_ATTEMPTS) {
    flash(req, 'error', 'Too many login attempts. Please wait 15 minutes and try again.');
    return res.redirect(req.originalUrl);
  }
  next();
}

function recordFailedLogin(req) {
  const now = Date.now();
  const entry = attempts.get(req.ip);
  if (!entry || now - entry.start >= WINDOW_MS) attempts.set(req.ip, { start: now, count: 1 });
  else entry.count += 1;
}

function clearFailedLogins(req) {
  attempts.delete(req.ip);
}

// ---- Image uploads -------------------------------------------------------
const ALLOWED = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/x-icon': '.ico',
  'image/vnd.microsoft.icon': '.ico',
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, db.UPLOAD_DIR),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${randomToken(6)}${ALLOWED[file.mimetype]}`),
  }),
  limits: { fileSize: 8 * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED[file.mimetype]) cb(null, true);
    else cb(new Error('Only JPG, PNG, WEBP, GIF or ICO images are allowed.'));
  },
});

// Wrap multer so upload errors become friendly flash messages.
function uploadFields(fields) {
  const handler = upload.fields(fields);
  return (req, res, next) => {
    handler(req, res, (err) => {
      if (err) {
        flash(req, 'error', err.code === 'LIMIT_FILE_SIZE' ? 'Image is too large (max 8 MB).' : err.message);
        return res.redirect(back(req));
      }
      next();
    });
  };
}

function registerUpload(file, uploadedBy) {
  const url = `/uploads/${file.filename}`;
  db.get().media.unshift({
    id: db.id(),
    url,
    name: file.originalname,
    size: file.size,
    uploadedBy,
    createdAt: new Date().toISOString(),
  });
  return url;
}

// Express 5 dropped res.redirect('back'); same-origin referrer or a fallback.
function back(req, fallback = '/') {
  const ref = req.get('Referrer');
  try {
    const u = new URL(ref);
    if (u.host === req.get('host')) return u.pathname + u.search;
  } catch (e) { /* no or bad referrer */ }
  return fallback;
}

function securityHeaders(req, res, next) {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
}

module.exports = {
  sessionSecret,
  loadUser,
  requireLogin,
  requireAdmin,
  flash,
  exposeFlash,
  csrfToken,
  verifyCsrf,
  csrfForForms,
  loginLimiter,
  recordFailedLogin,
  clearFailedLogins,
  uploadFields,
  registerUpload,
  securityHeaders,
  back,
};
