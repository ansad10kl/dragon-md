// lib/database.js

const { Low, JSONFile } = require('lowdb');
const lodash = require('lodash');
const path = require('path');

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB() {
  await db.read();
  db.data ||= {
    users: {},
    chats: {},
    settings: {},
  };
  db.chain = lodash.chain(db.data);
  return db;
}

module.exports = initDB;
