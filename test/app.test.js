// End-to-end tests: boots the app on a random port against a throwaway data dir.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vector-test-'));
process.env.DATA_DIR = dataDir;
process.env.ADMIN_EMAIL = 'owner@example.com';
process.env.ADMIN_PASSWORD = 'owner-pass-123';

const app = require('../server');
const db = require('../src/db');

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once('listening', r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// Minimal cookie-aware browser.
function browser() {
  const jar = new Map();
  async function request(url, opts = {}) {
    const headers = { ...(opts.headers || {}) };
    if (jar.size) headers.cookie = [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
    const res = await fetch(base + url, { redirect: 'manual', ...opts, headers });
    for (const c of res.headers.getSetCookie()) {
      const [pair] = c.split(';');
      const i = pair.indexOf('=');
      jar.set(pair.slice(0, i), pair.slice(i + 1));
    }
    return res;
  }
  async function csrf(url) {
    const html = await (await request(url)).text();
    return html.match(/name="_csrf" value="([^"]+)"/)[1];
  }
  async function post(url, fields, from) {
    const token = await csrf(from || url);
    return request(url, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ _csrf: token, ...fields }).toString(),
    });
  }
  return { request, csrf, post };
}

test('public pages render with seeded courses and research', async () => {
  const b = browser();
  const home = await (await b.request('/')).text();
  assert.match(home, /Road Map to Equity Research/);
  assert.match(home, /Gold &amp; Jewellery Research/);
  const course = await (await b.request('/courses/sector-expertise-gold-research')).text();
  assert.match(course, /Module 10/);
  assert.equal((await b.request('/does-not-exist')).status, 404);
});

test('members-only research is locked for visitors', async () => {
  const html = await (await browser().request('/research/jewellery-sector-concall-summary-q4-fy26')).text();
  assert.match(html, /Members-only research/);
  assert.doesNotMatch(html, /Kalyan delivered|FY26 revenue \+43%/);
});

test('POST without CSRF token is rejected', async () => {
  const res = await browser().request('/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'name=x&email=x@y.com&message=hi',
  });
  assert.equal(res.status, 403);
});

test('client signup → enrol → admin approves → course unlocks', async () => {
  const client = browser();
  let res = await client.post('/signup', {
    name: 'Test Client', email: 'client@example.com', phone: '', password: 'secret123', confirm: 'secret123', terms: '1',
  });
  assert.equal(res.status, 302);
  assert.equal(res.headers.get('location'), '/dashboard');

  const course = db.get().courses.find((c) => c.slug === 'road-map-to-equity-research');
  res = await client.post(`/dashboard/enroll/${course.id}`, {}, `/courses/${course.slug}`);
  assert.equal(res.status, 302);
  const enrolment = db.get().enrollments.find((e) => e.courseId === course.id);
  assert.equal(enrolment.status, 'pending');

  // Locked until approved
  res = await client.request(`/dashboard/courses/${course.slug}`);
  assert.equal(res.status, 302);

  // Clients cannot reach admin
  res = await client.request('/admin');
  assert.equal(res.status, 403);

  const admin = browser();
  res = await admin.post('/admin/login', { email: 'owner@example.com', password: 'owner-pass-123' });
  assert.equal(res.headers.get('location'), '/admin');
  res = await admin.post(`/admin/enrollments/${enrolment.id}/status`, { status: 'active' }, '/admin/enrollments');
  assert.equal(res.status, 302);

  res = await client.request(`/dashboard/courses/${course.slug}`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /Course modules/);

  // Members research now readable
  const html = await (await client.request('/research/jewellery-sector-concall-summary-q4-fy26')).text();
  assert.match(html, /Kalyan Jewellers/);
});

test('wrong password and client credentials on admin login are refused', async () => {
  const b = browser();
  let res = await b.post('/login', { email: 'client@example.com', password: 'nope-nope' });
  assert.equal(res.status, 401);
  res = await b.post('/admin/login', { email: 'client@example.com', password: 'secret123' }, '/admin/login');
  assert.equal(res.status, 401);
});

test('admin edits content, lists, theme, course and uploads an image', async () => {
  const admin = browser();
  await admin.post('/admin/login', { email: 'owner@example.com', password: 'owner-pass-123' });

  // Multipart content form with an image upload
  const token = await admin.csrf('/admin/content');
  const form = new FormData();
  form.append('_csrf', token);
  form.append('hero_title', 'Edited headline from admin');
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
  form.append('hero_image', new Blob([png], { type: 'image/png' }), 'hero.png');
  let res = await admin.request('/admin/content', { method: 'POST', body: form });
  assert.equal(res.status, 302);
  const home = await (await admin.request('/')).text();
  assert.match(home, /Edited headline from admin/);
  const heroUrl = db.get().content.hero_image;
  assert.match(heroUrl, /^\/uploads\/.+\.png$/);
  assert.equal((await admin.request(heroUrl)).status, 200);
  assert.equal(db.get().media.length, 1);

  // Non-image uploads are refused
  const bad = new FormData();
  bad.append('_csrf', await admin.csrf('/admin/media'));
  bad.append('files', new Blob(['<script>alert(1)</script>'], { type: 'text/html' }), 'x.html');
  res = await admin.request('/admin/media', { method: 'POST', body: bad });
  assert.equal(db.get().media.length, 1);

  // Repeater list
  const body = new URLSearchParams({ _csrf: await admin.csrf('/admin/lists') });
  body.append('value', '500+'); body.append('label', 'Students');
  body.append('value', '4.9'); body.append('label', 'Rating');
  res = await admin.request('/admin/lists/stats', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: body.toString() });
  assert.deepEqual(db.get().stats, [{ value: '500+', label: 'Students' }, { value: '4.9', label: 'Rating' }]);

  // Theme
  await admin.post('/admin/theme', { primary: '#112233', accent: '#ffaa00', background: '#ffffff', text: '#000000', headingFont: 'Lora', bodyFont: 'Lato', radius: '6' });
  assert.equal(db.get().settings.theme.primary, '#112233');
  assert.match(await (await admin.request('/')).text(), /--primary:#112233/);

  // Course edit through multipart form
  const course = db.get().courses[0];
  const cf = new FormData();
  cf.append('_csrf', await admin.csrf(`/admin/courses/${course.id}`));
  cf.append('title', course.title);
  cf.append('price', '19999');
  cf.append('published', '1');
  cf.append('modulesText', '## Intro\nWhy research matters\n- Topic A\n- Topic B\n\n## Valuation\n- DCF');
  cf.append('materialsText', 'Recording | https://example.com/rec\nBad | javascript:alert(1)');
  res = await admin.request(`/admin/courses/${course.id}`, { method: 'POST', body: cf });
  assert.equal(res.status, 302);
  const saved = db.get().courses.find((c) => c.id === course.id);
  assert.equal(saved.price, 19999);
  assert.deepEqual(saved.modules.map((m) => m.title), ['Intro', 'Valuation']);
  assert.deepEqual(saved.modules[0].topics, ['Topic A', 'Topic B']);
  assert.equal(saved.materials[1].url, '');
});

test('text formatter escapes HTML', () => {
  const { formatText } = require('../src/helpers');
  const html = formatText('## Title\n<script>x</script> **bold**\n- item\n[ok](https://a.b) [bad](javascript:alert(1))');
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /<h2>Title<\/h2>/);
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /<a href="https:\/\/a.b"/);
  assert.doesNotMatch(html, /href="javascript/);
});
