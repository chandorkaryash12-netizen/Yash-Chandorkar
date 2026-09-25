// Tiny JSON-file datastore. The whole site state lives in data/db.json so it
// can be backed up, versioned or moved between hosts by copying one folder.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { buildSeed } = require('./seed');
const cloud = require('./cloud');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');

let state = null;

function ensureDirs() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function load() {
  ensureDirs();
  if (fs.existsSync(DB_FILE)) {
    state = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    // Fill in any collections added in later versions of the app.
    const seed = buildSeed();
    for (const key of Object.keys(seed)) {
      if (state[key] === undefined) state[key] = seed[key];
    }
    for (const key of Object.keys(seed.content)) {
      if (state.content[key] === undefined) state.content[key] = seed.content[key];
    }
    for (const key of Object.keys(seed.settings)) {
      if (state.settings[key] === undefined) state.settings[key] = seed.settings[key];
    }
    for (const key of Object.keys(seed.settings.sections)) {
      if (state.settings.sections[key] === undefined) state.settings.sections[key] = seed.settings.sections[key];
    }
    for (const key of Object.keys(seed.settings.theme)) {
      if (state.settings.theme[key] === undefined) state.settings.theme[key] = seed.settings.theme[key];
    }
  } else {
    state = buildSeed();
  }
  save();
  return state;
}

// Atomic write: write to a temp file, then rename over the real one.
function save() {
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, DB_FILE);
  cloud.pushState(state);
}

function get() {
  if (!state) load();
  return state;
}

function id() {
  return crypto.randomUUID();
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || id().slice(0, 8);
}

function uniqueSlug(collection, base, exceptId) {
  let slug = slugify(base);
  let n = 2;
  const taken = (s) => collection.some((item) => item.slug === s && item.id !== exceptId);
  while (taken(slug)) slug = `${slugify(base)}-${n++}`;
  return slug;
}

module.exports = { load, save, get, id, slugify, uniqueSlug, DATA_DIR, DB_FILE, UPLOAD_DIR };
