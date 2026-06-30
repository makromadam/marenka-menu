/* =============================================================================
   Marenka CMS — menu repository
   Maps the bilingual menu object <-> normalised SQLite tables, validates and
   cleans incoming data, and manages the draft / publish / revision lifecycle.
   ========================================================================== */
"use strict";

const { db } = require("./db");

/* ---- limits (defensive — reject absurd payloads) ------------------------- */
const LIMIT = { sections: 300, groupsPerSection: 1000, itemsPerGroup: 10000, pricesPerItem: 50, str: 5000 };

/* ---- text normalisation (mirrors the client's cleanForExport) ------------ */
function fixSpacing(s) {
  if (s == null) return s;
  s = String(s).replace(/([,.;:])(?=\p{L})/gu, "$1 ").replace(/[ \t]{2,}/g, " ");
  return s.trim();
}
function bi(o) {
  // normalise a {tr,en} pair; returns {tr,en} with trimmed strings
  if (!o || typeof o !== "object") return { tr: "", en: "" };
  return { tr: fixSpacing(o.tr != null ? String(o.tr) : ""), en: fixSpacing(o.en != null ? String(o.en) : "") };
}
function emptyBi(o) { return !o || ((!o.tr || !o.tr.trim()) && (!o.en || !o.en.trim())); }

/* ---- clean: produce a render-ready, canonical copy ----------------------- */
function cleanMenu(input) {
  if (!input || typeof input !== "object") return { sections: [] };
  const out = { sections: [] };

  if (input.tagline && !emptyBi(input.tagline)) out.tagline = bi(input.tagline);

  const sections = Array.isArray(input.sections) ? input.sections : [];
  for (const s of sections) {
    if (!s || typeof s !== "object") continue;
    const sec = {
      id: String(s.id || "").trim(),
      navLabel: bi(s.navLabel),
      label: bi(s.label),
      groups: [],
    };
    const eyebrow = bi(s.eyebrow); if (!emptyBi(eyebrow)) sec.eyebrow = eyebrow;
    const note = bi(s.note);       if (!emptyBi(note)) sec.note = note;
    const footnote = bi(s.footnote); if (!emptyBi(footnote)) sec.footnote = footnote;
    if (s.banner && typeof s.banner === "object") {
      const be = bi(s.banner.eyebrow), bt = bi(s.banner.title);
      if (!emptyBi(be) || !emptyBi(bt)) sec.banner = { eyebrow: be, title: bt };
    }

    const groups = Array.isArray(s.groups) ? s.groups : [];
    for (const g of groups) {
      if (!g || typeof g !== "object") continue;
      const grp = { label: bi(g.label), items: [] };
      const gnote = bi(g.note); if (!emptyBi(gnote)) grp.note = gnote;

      const items = Array.isArray(g.items) ? g.items : [];
      for (const it of items) {
        if (!it || typeof it !== "object") continue;
        const item = { name: bi(it.name) };
        if (it.name && it.name.latin) item.name.latin = true;
        const desc = bi(it.desc); if (!emptyBi(desc)) item.desc = desc;
        const alg = bi(it.allergens); if (!emptyBi(alg)) item.allergens = alg;
        if (it.kcal != null && String(it.kcal).trim() !== "") item.kcal = String(it.kcal).trim();
        if (it.vol != null && String(it.vol).trim() !== "") item.vol = String(it.vol).trim();

        let prices = Array.isArray(it.prices)
          ? it.prices
              .filter((p) => p && p.value != null && String(p.value).trim() !== "")
              .map((p) => ({ label: bi(p.label), value: String(p.value).trim() }))
          : null;
        if (prices && prices.length) {
          item.prices = prices;
        } else if (it.price != null && String(it.price).trim() !== "") {
          item.price = String(it.price).trim();
        }
        grp.items.push(item);
      }
      sec.groups.push(grp);
    }
    out.sections.push(sec);
  }
  return out;
}

/* ---- validate: throw a friendly error on anything unusable ---------------- */
function validateMenu(menu) {
  if (!menu || typeof menu !== "object" || !Array.isArray(menu.sections)) {
    throw httpErr(400, "Geçersiz menü verisi: 'sections' dizisi bulunamadı.");
  }
  if (menu.sections.length > LIMIT.sections) throw httpErr(400, "Çok fazla bölüm.");
  const ids = new Set();
  const longest = (o) => Math.max((o && o.tr || "").length, (o && o.en || "").length);
  for (const s of menu.sections) {
    if (!s.id) throw httpErr(400, "Her bölümün bir kimliği (id) olmalı.");
    if (!/^[a-z0-9-]+$/.test(s.id)) throw httpErr(400, `Geçersiz bölüm kimliği: "${s.id}" (yalnızca küçük harf, rakam, tire).`);
    if (ids.has(s.id)) throw httpErr(400, `Yinelenen bölüm kimliği: "${s.id}".`);
    ids.add(s.id);
    if (longest(s.label) > LIMIT.str || longest(s.navLabel) > LIMIT.str) throw httpErr(400, "Metin çok uzun.");
    if (!Array.isArray(s.groups) || s.groups.length > LIMIT.groupsPerSection) throw httpErr(400, "Geçersiz kategori listesi.");
    for (const g of s.groups) {
      if (!Array.isArray(g.items) || g.items.length > LIMIT.itemsPerGroup) throw httpErr(400, "Geçersiz ürün listesi.");
      for (const it of g.items) {
        if (longest(it.name) > LIMIT.str || longest(it.desc) > LIMIT.str || longest(it.allergens) > LIMIT.str) {
          throw httpErr(400, "Ürün metni çok uzun.");
        }
        if (Array.isArray(it.prices) && it.prices.length > LIMIT.pricesPerItem) throw httpErr(400, "Çok fazla fiyat satırı.");
      }
    }
  }
}
function httpErr(status, message) { const e = new Error(message); e.status = status; return e; }

/* ---- assemble the live (published) menu from the normalised tables -------- */
const Q = {
  sections: db.prepare("SELECT * FROM sections ORDER BY position, id"),
  groups: db.prepare("SELECT * FROM groups WHERE section_id = ? ORDER BY position, id"),
  items: db.prepare("SELECT * FROM items WHERE group_id = ? ORDER BY position, id"),
  prices: db.prepare("SELECT * FROM item_prices WHERE item_id = ? ORDER BY position, id"),
  pubMetaAll: db.prepare("SELECT key, value FROM published_meta"),
};
function pair(tr, en) { return { tr: tr || "", en: en || "" }; }
function withOpt(target, key, tr, en) { if ((tr && tr.trim()) || (en && en.trim())) target[key] = pair(tr, en); }

function assembleLive() {
  const menu = { sections: [] };
  for (const row of Q.pubMetaAll.all()) {
    if (row.key === "tagline" && row.value) { try { menu.tagline = JSON.parse(row.value); } catch (_) {} }
  }
  for (const s of Q.sections.all()) {
    const sec = { id: s.id, navLabel: pair(s.nav_label_tr, s.nav_label_en), label: pair(s.label_tr, s.label_en), groups: [] };
    withOpt(sec, "eyebrow", s.eyebrow_tr, s.eyebrow_en);
    withOpt(sec, "note", s.note_tr, s.note_en);
    withOpt(sec, "footnote", s.footnote_tr, s.footnote_en);
    if ((s.banner_eyebrow_tr && s.banner_eyebrow_tr.trim()) || (s.banner_eyebrow_en && s.banner_eyebrow_en.trim()) ||
        (s.banner_title_tr && s.banner_title_tr.trim()) || (s.banner_title_en && s.banner_title_en.trim())) {
      sec.banner = { eyebrow: pair(s.banner_eyebrow_tr, s.banner_eyebrow_en), title: pair(s.banner_title_tr, s.banner_title_en) };
    }
    for (const g of Q.groups.all(s.id)) {
      const grp = { label: pair(g.label_tr, g.label_en), items: [] };
      withOpt(grp, "note", g.note_tr, g.note_en);
      for (const it of Q.items.all(g.id)) {
        const item = { name: pair(it.name_tr, it.name_en) };
        if (it.name_latin) item.name.latin = true;
        withOpt(item, "desc", it.desc_tr, it.desc_en);
        withOpt(item, "allergens", it.allergens_tr, it.allergens_en);
        if (it.kcal != null && String(it.kcal).trim() !== "") item.kcal = it.kcal;
        if (it.vol != null && String(it.vol).trim() !== "") item.vol = it.vol;
        const prices = Q.prices.all(it.id);
        if (prices.length) {
          item.prices = prices.map((p) => ({ label: pair(p.label_tr, p.label_en), value: p.value }));
        } else if (it.price != null && String(it.price).trim() !== "") {
          item.price = it.price;
        }
        grp.items.push(item);
      }
      sec.groups.push(grp);
    }
    menu.sections.push(sec);
  }
  return menu;
}

/* ---- replace the live menu (called inside the publish transaction) -------- */
const insSection = db.prepare(`INSERT INTO sections
  (id, position, nav_label_tr, nav_label_en, label_tr, label_en, eyebrow_tr, eyebrow_en,
   note_tr, note_en, footnote_tr, footnote_en, banner_eyebrow_tr, banner_eyebrow_en, banner_title_tr, banner_title_en)
  VALUES (@id,@position,@nav_label_tr,@nav_label_en,@label_tr,@label_en,@eyebrow_tr,@eyebrow_en,
   @note_tr,@note_en,@footnote_tr,@footnote_en,@banner_eyebrow_tr,@banner_eyebrow_en,@banner_title_tr,@banner_title_en)`);
const insGroup = db.prepare(`INSERT INTO groups (section_id, position, label_tr, label_en, note_tr, note_en)
  VALUES (@section_id,@position,@label_tr,@label_en,@note_tr,@note_en)`);
const insItem = db.prepare(`INSERT INTO items
  (group_id, position, name_tr, name_en, name_latin, desc_tr, desc_en, allergens_tr, allergens_en, kcal, vol, price)
  VALUES (@group_id,@position,@name_tr,@name_en,@name_latin,@desc_tr,@desc_en,@allergens_tr,@allergens_en,@kcal,@vol,@price)`);
const insPrice = db.prepare(`INSERT INTO item_prices (item_id, position, label_tr, label_en, value)
  VALUES (@item_id,@position,@label_tr,@label_en,@value)`);

function replaceLive(menu) {
  db.prepare("DELETE FROM sections").run(); // cascades to groups/items/prices
  db.prepare("DELETE FROM published_meta").run();
  if (menu.tagline) db.prepare("INSERT INTO published_meta (key, value) VALUES ('tagline', ?)").run(JSON.stringify(menu.tagline));

  menu.sections.forEach((s, si) => {
    const b = s.banner || {};
    insSection.run({
      id: s.id, position: si,
      nav_label_tr: s.navLabel.tr, nav_label_en: s.navLabel.en,
      label_tr: s.label.tr, label_en: s.label.en,
      eyebrow_tr: s.eyebrow ? s.eyebrow.tr : null, eyebrow_en: s.eyebrow ? s.eyebrow.en : null,
      note_tr: s.note ? s.note.tr : null, note_en: s.note ? s.note.en : null,
      footnote_tr: s.footnote ? s.footnote.tr : null, footnote_en: s.footnote ? s.footnote.en : null,
      banner_eyebrow_tr: b.eyebrow ? b.eyebrow.tr : null, banner_eyebrow_en: b.eyebrow ? b.eyebrow.en : null,
      banner_title_tr: b.title ? b.title.tr : null, banner_title_en: b.title ? b.title.en : null,
    });
    s.groups.forEach((g, gi) => {
      const gid = insGroup.run({
        section_id: s.id, position: gi,
        label_tr: g.label.tr, label_en: g.label.en,
        note_tr: g.note ? g.note.tr : null, note_en: g.note ? g.note.en : null,
      }).lastInsertRowid;
      g.items.forEach((it, ii) => {
        const iid = insItem.run({
          group_id: gid, position: ii,
          name_tr: it.name.tr, name_en: it.name.en, name_latin: it.name.latin ? 1 : 0,
          desc_tr: it.desc ? it.desc.tr : null, desc_en: it.desc ? it.desc.en : null,
          allergens_tr: it.allergens ? it.allergens.tr : null, allergens_en: it.allergens ? it.allergens.en : null,
          kcal: it.kcal != null ? String(it.kcal) : null,
          vol: it.vol != null ? String(it.vol) : null,
          price: it.prices ? null : (it.price != null ? String(it.price) : null),
        }).lastInsertRowid;
        (it.prices || []).forEach((p, pi) => {
          insPrice.run({ item_id: iid, position: pi, label_tr: p.label.tr, label_en: p.label.en, value: p.value });
        });
      });
    });
  });
}

/* ---- meta helpers --------------------------------------------------------- */
function getMeta(key) { const r = db.prepare("SELECT value FROM app_meta WHERE key = ?").get(key); return r ? r.value : null; }
function setMeta(key, value) { db.prepare("INSERT INTO app_meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(key, String(value)); }
function liveRevision() { return Number(getMeta("live_revision") || 0); }

/* ---- draft ---------------------------------------------------------------- */
function getDraft() {
  const r = db.prepare("SELECT data_json, updated_at FROM draft WHERE id = 1").get();
  if (!r) return null;
  try { return { menu: JSON.parse(r.data_json), updatedAt: r.updated_at }; } catch (_) { return null; }
}
function setDraft(menu, now) {
  const ts = now || new Date().toISOString();
  db.prepare(`INSERT INTO draft (id, data_json, updated_at) VALUES (1, @j, @t)
              ON CONFLICT(id) DO UPDATE SET data_json=@j, updated_at=@t`).run({ j: JSON.stringify(menu), t: ts });
  return ts;
}

/* ---- publish (atomic) ----------------------------------------------------- */
const publishTxn = db.transaction((cleaned, note, now) => {
  replaceLive(cleaned);
  const rev = liveRevision() + 1;
  setMeta("live_revision", rev);
  setMeta("live_updated_at", now);
  db.prepare("INSERT INTO revisions (created_at, note, data_json) VALUES (?, ?, ?)").run(now, note || null, JSON.stringify(cleaned));
  setDraft(cleaned, now); // keep the draft in sync with what's now live
  return rev;
});
function publish(menu, note) {
  const cleaned = cleanMenu(menu);
  validateMenu(cleaned);
  const now = new Date().toISOString();
  return publishTxn(cleaned, note, now);
}

/* ---- revisions ------------------------------------------------------------ */
function listRevisions(limit) {
  const rows = db.prepare("SELECT id, created_at, note FROM revisions ORDER BY id DESC LIMIT ?").all(limit || 30);
  return rows.map((r) => {
    let count = 0;
    try { count = (JSON.parse(db.prepare("SELECT data_json FROM revisions WHERE id=?").get(r.id).data_json).sections || []).length; } catch (_) {}
    return { id: r.id, createdAt: r.created_at, note: r.note, sectionCount: count };
  });
}
function getRevision(id) {
  const r = db.prepare("SELECT data_json FROM revisions WHERE id = ?").get(id);
  if (!r) return null;
  try { return JSON.parse(r.data_json); } catch (_) { return null; }
}

/* ---- first-boot seed ------------------------------------------------------ */
function seedIfEmpty() {
  const hasLive = db.prepare("SELECT COUNT(*) c FROM sections").get().c > 0 || liveRevision() > 0;
  if (hasLive) return false;
  let seed;
  try { seed = require("../data/seed.js"); } catch (_) { seed = { sections: [] }; }
  publish(seed, "İlk kurulum (seed)");
  return true;
}

module.exports = {
  cleanMenu, validateMenu, assembleLive, getDraft, setDraft,
  publish, listRevisions, getRevision, liveRevision, getMeta, setMeta, seedIfEmpty, LIMIT,
};
