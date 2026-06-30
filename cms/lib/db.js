/* =============================================================================
   Marenka CMS — SQLite database (better-sqlite3)
   The published menu lives in NORMALISED tables (every field is a column, so
   the live menu is genuinely bound to the database and queryable per field).
   The working draft and published history are kept as JSON snapshots.
   ========================================================================== */
"use strict";

const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const DB_PATH = process.env.DB_PATH || path.join(__dirname, "..", "data", "menu.db");

// Make sure the directory exists (e.g. data/ on a fresh checkout).
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS app_meta (
    key   TEXT PRIMARY KEY,
    value TEXT
  );

  /* ---- published (live) menu — normalised, one row per real entity -------- */
  CREATE TABLE IF NOT EXISTS sections (
    id               TEXT PRIMARY KEY,
    position         INTEGER NOT NULL,
    nav_label_tr     TEXT, nav_label_en TEXT,
    label_tr         TEXT, label_en     TEXT,
    eyebrow_tr       TEXT, eyebrow_en   TEXT,
    note_tr          TEXT, note_en      TEXT,
    footnote_tr      TEXT, footnote_en  TEXT,
    banner_eyebrow_tr TEXT, banner_eyebrow_en TEXT,
    banner_title_tr   TEXT, banner_title_en   TEXT
  );

  CREATE TABLE IF NOT EXISTS groups (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id  TEXT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    position    INTEGER NOT NULL,
    label_tr    TEXT, label_en TEXT,
    note_tr     TEXT, note_en  TEXT
  );

  CREATE TABLE IF NOT EXISTS items (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id     INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    position     INTEGER NOT NULL,
    name_tr      TEXT, name_en TEXT,
    name_latin   INTEGER NOT NULL DEFAULT 0,
    desc_tr      TEXT, desc_en TEXT,
    allergens_tr TEXT, allergens_en TEXT,
    kcal         TEXT,
    vol          TEXT,
    price        TEXT
  );

  CREATE TABLE IF NOT EXISTS item_prices (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id   INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    position  INTEGER NOT NULL,
    label_tr  TEXT, label_en TEXT,
    value     TEXT
  );

  /* ---- top-level published fields that aren't sections (e.g. tagline) ----- */
  CREATE TABLE IF NOT EXISTS published_meta (
    key   TEXT PRIMARY KEY,
    value TEXT
  );

  /* ---- working draft (single row) ----------------------------------------- */
  CREATE TABLE IF NOT EXISTS draft (
    id         INTEGER PRIMARY KEY CHECK (id = 1),
    data_json  TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  /* ---- published history / rollback --------------------------------------- */
  CREATE TABLE IF NOT EXISTS revisions (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    note       TEXT,
    data_json  TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_groups_section ON groups(section_id);
  CREATE INDEX IF NOT EXISTS idx_items_group    ON items(group_id);
  CREATE INDEX IF NOT EXISTS idx_prices_item    ON item_prices(item_id);
`);

module.exports = { db, DB_PATH };
