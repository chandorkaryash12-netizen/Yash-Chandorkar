const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

const db = require('./src/db');
const helpers = require('./src/helpers');
const security = require('./src/security');
const theme = require('./src/theme');

const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

db.load();
ensureAdmin();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(security.securityHeaders);
app.use(express.static(path.join(__dirname, 'public'), { maxAge: isProd ? '7d' : 0 }));
app.use('/uploads', express.static(db.UPLOAD_DIR, { maxAge: isProd ? '30d' : 0 }));
app.use(express.urlencoded({ extended: false, limit: '2mb' }));
app.use(
  cookieSession({
    name: 'vector.sid',
    keys: [security.sessionSecret()],
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd && process.env.INSECURE_COOKIES !== '1',
  })
);
app.use(security.loadUser);
app.use(security.exposeFlash);
app.use(security.csrfToken);
// Everything templates need on every page.
app.use((req, res, next) => {
  const data = db.get();
  res.locals.site = data.settings;
  res.locals.content = data.content;
  res.locals.h = helpers;
  res.locals.themeCss = theme.cssVars(data.settings.theme);
  res.locals.fontsUrl = theme.fontsUrl(data.settings.theme);
  res.locals.path = req.path;
  res.locals.navCourses = data.courses.filter((c) => c.published).sort((a, b) => a.order - b.order);
  next();
});
app.use(security.csrfForForms);

app.use('/', require('./src/routes/public'));
app.use('/', require('./src/routes/auth'));
app.use('/dashboard', require('./src/routes/client'));
app.use('/admin', require('./src/routes/admin'));

app.use((req, res) => {
  res.status(404).render('error', { title: 'Page not found', message: 'The page you are looking for does not exist or has moved.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { title: 'Something went wrong', message: 'An unexpected error occurred. Please try again.' });
});

// Create the first admin account if none exists. Credentials come from
// ADMIN_EMAIL / ADMIN_PASSWORD, or a random password is generated and written
// to data/admin-credentials.txt so the owner can log in and change it.
function ensureAdmin() {
  const data = db.get();
  if (data.users.some((u) => u.role === 'admin')) return;
  const email = (process.env.ADMIN_EMAIL || 'chandorkaryash12@gmail.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || helpers.randomToken(6);
  data.users.push({
    id: db.id(),
    name: process.env.ADMIN_NAME || 'Vector Admin',
    email,
    phone: '',
    passwordHash: bcrypt.hashSync(password, 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
  });
  db.save();
  if (!process.env.ADMIN_PASSWORD) {
    const file = path.join(db.DATA_DIR, 'admin-credentials.txt');
    fs.writeFileSync(file, `Admin login: /admin/login\nEmail: ${email}\nPassword: ${password}\n\nChange this password after first login (Admin → My Account), then delete this file.\n`, { mode: 0o600 });
    console.log(`\n  Admin account created → ${email} / ${password}\n  (also saved to ${file})\n`);
  }
}

if (require.main === module) {
  app.listen(PORT, () => console.log(`Vector running at http://localhost:${PORT}`));
}

module.exports = app;
