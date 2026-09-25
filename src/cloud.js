// Optional MongoDB mirror for hosts without a persistent disk (e.g. Render's
// free plan, which wipes local files whenever the service sleeps or restarts).
//
// The app keeps using data/db.json and data/uploads as its working copy. When
// MONGODB_URI is set, every save is copied to MongoDB, every uploaded image is
// stored there too, and on startup the latest copy is restored to disk before
// the site starts serving. Without MONGODB_URI this module does nothing.
const fs = require('fs');
const path = require('path');

const URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.MONGODB_DB || 'vector';
const STATE_ID = 'site';

const enabled = Boolean(URI);
let client = null;
let database = null;
let ready = false; // pushes are held back until restore() has finished
let writing = false;
let pendingState = null;

async function connect() {
  if (database) return database;
  const { MongoClient } = require('mongodb');
  client = new MongoClient(URI, { serverSelectionTimeoutMS: 15000 });
  await client.connect();
  database = client.db(DB_NAME);
  return database;
}

// Copy the saved site data and images from MongoDB onto the local disk.
async function restore(dbFile, uploadDir) {
  if (!enabled) return false;
  const d = await connect();
  fs.mkdirSync(path.dirname(dbFile), { recursive: true });
  fs.mkdirSync(uploadDir, { recursive: true });
  const doc = await d.collection('state').findOne({ _id: STATE_ID });
  if (doc && doc.json) fs.writeFileSync(dbFile, doc.json);
  let files = 0;
  for await (const f of d.collection('uploads').find({})) {
    fs.writeFileSync(path.join(uploadDir, path.basename(f._id)), f.data.buffer);
    files += 1;
  }
  console.log(`MongoDB: restored ${doc ? 'site data' : 'nothing yet (first run)'} and ${files} image(s).`);
  return Boolean(doc);
}

function markReady() {
  ready = true;
}

// Save the whole site state. Writes are serialised; if saves arrive while one
// is in flight, only the newest state is written next.
function pushState(state) {
  if (!enabled || !ready) return;
  pendingState = JSON.stringify(state);
  if (!writing) flush();
}

async function flush() {
  writing = true;
  while (pendingState) {
    const json = pendingState;
    pendingState = null;
    try {
      const d = await connect();
      await d.collection('state').replaceOne(
        { _id: STATE_ID },
        { _id: STATE_ID, json, updatedAt: new Date() },
        { upsert: true }
      );
    } catch (err) {
      console.error('MongoDB: could not save site data', err.message);
      if (!pendingState) pendingState = json; // retry with the newest data
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  writing = false;
}

async function pushFile(filename, filePath, contentType) {
  if (!enabled) return;
  try {
    const d = await connect();
    const data = fs.readFileSync(filePath);
    await d.collection('uploads').replaceOne(
      { _id: filename },
      { _id: filename, data, contentType, size: data.length, createdAt: new Date() },
      { upsert: true }
    );
  } catch (err) {
    console.error('MongoDB: could not save image', filename, err.message);
  }
}

async function deleteFile(filename) {
  if (!enabled) return;
  try {
    const d = await connect();
    await d.collection('uploads').deleteOne({ _id: filename });
  } catch (err) {
    console.error('MongoDB: could not delete image', filename, err.message);
  }
}

async function close() {
  if (client) await client.close();
}

module.exports = { enabled, restore, markReady, pushState, pushFile, deleteFile, close };
