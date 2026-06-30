/* =============================================================================
   Marenka CMS — server
   One Express app serves:
     /          → the public, live menu (reads the database, updates via SSE)
     /yonetim   → the admin panel (edits every field, publishes instantly)
     /api/*     → JSON + SSE API
   ========================================================================== */
"use strict";

/* ---- load .env (no dependency) ------------------------------------------- */
(function loadEnv() {
  const fs = require("fs");
  const path = require("path");
  const file = path.join(__dirname, ".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
})();

const path = require("path");
const express = require("express");

const repo = require("./lib/menu-repo");
const auth = require("./lib/auth");
const sse = require("./lib/sse");

const app = express();
app.set("trust proxy", true);
app.use(express.json({ limit: "4mb" }));

/* ---- security headers ----------------------------------------------------- */
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("Content-Security-Policy", [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "script-src 'self'",
    "connect-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "));
  if (req.path.startsWith("/yonetim")) {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }
  next();
});

/* =============================== PUBLIC API ================================ */
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/menu", (req, res) => {
  res.json({ revision: repo.liveRevision(), updatedAt: repo.getMeta("live_updated_at"), menu: repo.assembleLive() });
});

// draft preview (owner only) — used by the /preview page
app.get("/api/menu/draft", auth.requireAuth, (req, res) => {
  const d = repo.getDraft();
  res.json({ updatedAt: d ? d.updatedAt : null, menu: d ? d.menu : repo.assembleLive() });
});

app.get("/api/events", (req, res) => {
  sse.addClient(req, res);
  // greet the new client with the current revision so it can sync if stale
  res.write(`event: menu\ndata: ${JSON.stringify({ revision: repo.liveRevision() })}\n\n`);
});

/* ================================= AUTH =================================== */
app.get("/api/session", (req, res) => res.json({ authed: auth.isAuthed(req) }));

app.post("/api/login", auth.loginThrottle, (req, res) => {
  const { username, password } = req.body || {};
  if (auth.checkCredentials(username, password)) {
    auth.resetLoginAttempts(req._loginIp);
    auth.setSessionCookie(req, res);
    return res.json({ ok: true });
  }
  auth.noteLoginFailure(req._loginIp);
  res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı." });
});

app.post("/api/logout", (req, res) => { auth.clearSessionCookie(req, res); res.json({ ok: true }); });

/* ============================== ADMIN API ================================= */
app.get("/api/draft", auth.requireAuth, (req, res) => {
  const d = repo.getDraft();
  if (d) return res.json({ menu: d.menu, updatedAt: d.updatedAt, revision: repo.liveRevision() });
  // no draft yet → start from the live menu
  res.json({ menu: repo.assembleLive(), updatedAt: null, revision: repo.liveRevision() });
});

app.put("/api/draft", auth.requireAuth, (req, res) => {
  const menu = req.body && req.body.menu;
  if (!menu || typeof menu !== "object" || !Array.isArray(menu.sections)) {
    return res.status(400).json({ error: "Geçersiz menü verisi." });
  }
  if (menu.sections.length > repo.LIMIT.sections) return res.status(400).json({ error: "Çok fazla bölüm." });
  const updatedAt = repo.setDraft(menu);
  res.json({ ok: true, updatedAt });
});

app.post("/api/publish", auth.requireAuth, (req, res) => {
  try {
    const menu = (req.body && req.body.menu) || (repo.getDraft() && repo.getDraft().menu);
    const note = (req.body && typeof req.body.note === "string") ? req.body.note.slice(0, 200) : null;
    const revision = repo.publish(menu, note);
    const updatedAt = repo.getMeta("live_updated_at");
    sse.broadcast("menu", { revision });
    res.json({ ok: true, revision, updatedAt });
  } catch (e) {
    var status = e.status || 500;
    // expose friendly validation messages (4xx); never leak internal errors (5xx)
    res.status(status).json({ error: status < 500 ? (e.message || "Geçersiz menü.") : "Yayınlama sırasında sunucu hatası." });
  }
});

app.post("/api/revert-draft", auth.requireAuth, (req, res) => {
  const menu = repo.assembleLive();
  const updatedAt = repo.setDraft(menu);
  res.json({ ok: true, menu, updatedAt });
});

app.get("/api/revisions", auth.requireAuth, (req, res) => res.json({ revisions: repo.listRevisions(30) }));

app.get("/api/revisions/:id", auth.requireAuth, (req, res) => {
  const menu = repo.getRevision(Number(req.params.id));
  if (!menu) return res.status(404).json({ error: "Sürüm bulunamadı." });
  res.json({ menu });
});

app.post("/api/revisions/:id/restore", auth.requireAuth, (req, res) => {
  const menu = repo.getRevision(Number(req.params.id));
  if (!menu) return res.status(404).json({ error: "Sürüm bulunamadı." });
  const updatedAt = repo.setDraft(menu);
  res.json({ ok: true, menu, updatedAt }); // loaded into the draft; owner reviews then publishes
});

/* =============================== STATIC =================================== */
const PUBLIC_DIR = path.join(__dirname, "public");
const ADMIN_DIR = path.join(__dirname, "admin");

// admin panel (must be registered before the public root static)
app.use("/yonetim", express.static(ADMIN_DIR, { extensions: ["html"] }));
app.get("/yonetim", (req, res) => res.sendFile(path.join(ADMIN_DIR, "index.html")));

// draft preview reuses the public page
app.get("/preview", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "index.html")));

// public menu
app.use(express.static(PUBLIC_DIR, { extensions: ["html"] }));

// API 404s as JSON, everything else falls back to the menu
app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Bulunamadı." });
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

/* ================================ BOOT =================================== */
const PORT = process.env.PORT || 3000;
const seeded = repo.seedIfEmpty();

const server = app.listen(PORT, () => {
  console.log(`\n  Marenka CMS çalışıyor:`);
  console.log(`    • Menü (müşteri):   http://localhost:${PORT}/`);
  console.log(`    • Yönetim paneli:   http://localhost:${PORT}/yonetim`);
  console.log(`    • Yayınlanan sürüm: #${repo.liveRevision()}${seeded ? " (ilk kurulum tohumlandı)" : ""}`);
  if (auth.PASSWORD_IS_DEFAULT) {
    console.log(`\n  ⚠  ADMIN_PASSWORD ayarlanmadı — varsayılan kullanılıyor (kullanıcı: ${auth.USERNAME}, şifre: marenka).`);
    console.log(`     Üretimde mutlaka .env içinde ADMIN_PASSWORD belirleyin.\n`);
  }
});

process.on("unhandledRejection", (err) => { console.error("Beklenmeyen reddetme (unhandledRejection):", err); });
process.on("SIGTERM", () => { server.close(() => process.exit(0)); });
process.on("SIGINT", () => { server.close(() => process.exit(0)); });

module.exports = { app, server };
