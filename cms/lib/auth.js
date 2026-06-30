/* =============================================================================
   Marenka CMS — authentication
   Stateless, signed session cookie (HMAC-SHA256). No external dependencies.
   ========================================================================== */
"use strict";

const crypto = require("crypto");
const repo = require("./menu-repo");

const COOKIE = "marenka_sess";
const TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "marenka";
const PASSWORD_IS_DEFAULT = !process.env.ADMIN_PASSWORD;

// Session secret: prefer env; otherwise persist a random one in the DB so
// sessions survive restarts without any configuration.
function sessionSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  let s = repo.getMeta("session_secret");
  if (!s) { s = crypto.randomBytes(32).toString("hex"); repo.setMeta("session_secret", s); }
  return s;
}

function b64url(buf) { return Buffer.from(buf).toString("base64url"); }
function sign(payloadJson) {
  return crypto.createHmac("sha256", sessionSecret()).update(payloadJson).digest("base64url");
}
function timingEqual(a, b) {
  const ba = Buffer.from(String(a)); const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function issueToken() {
  const payload = JSON.stringify({ exp: Date.now() + TTL_MS });
  return b64url(payload) + "." + sign(payload);
}
function verifyToken(token) {
  if (!token || typeof token !== "string" || token.indexOf(".") < 0) return false;
  const [p, sig] = token.split(".");
  let payloadJson;
  try { payloadJson = Buffer.from(p, "base64url").toString("utf8"); } catch (_) { return false; }
  if (!timingEqual(sig, sign(payloadJson))) return false;
  let payload; try { payload = JSON.parse(payloadJson); } catch (_) { return false; }
  return payload && typeof payload.exp === "number" && payload.exp > Date.now();
}

function checkCredentials(user, pass) {
  // Always run both comparisons to avoid leaking which field was wrong.
  const okUser = timingEqual(String(user || ""), USERNAME);
  const okPass = timingEqual(String(pass || ""), PASSWORD);
  return okUser && okPass;
}

/* ---- cookie helpers ------------------------------------------------------- */
function parseCookies(req) {
  const out = {};
  const raw = req.headers.cookie;
  if (!raw) return out;
  raw.split(";").forEach((part) => {
    const i = part.indexOf("=");
    if (i < 0) return;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}
function isSecure(req) {
  if (process.env.COOKIE_SECURE === "1") return true;
  return (req.headers["x-forwarded-proto"] || "").split(",")[0].trim() === "https";
}
function setSessionCookie(req, res) {
  const parts = [
    `${COOKIE}=${issueToken()}`, "HttpOnly", "Path=/", "SameSite=Lax",
    `Max-Age=${Math.floor(TTL_MS / 1000)}`,
  ];
  if (isSecure(req)) parts.push("Secure");
  res.append("Set-Cookie", parts.join("; "));
}
function clearSessionCookie(req, res) {
  const parts = [`${COOKIE}=`, "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=0"];
  if (isSecure(req)) parts.push("Secure");
  res.append("Set-Cookie", parts.join("; "));
}
function isAuthed(req) { return verifyToken(parseCookies(req)[COOKIE]); }

/* ---- middleware ----------------------------------------------------------- */
function requireAuth(req, res, next) {
  if (isAuthed(req)) return next();
  res.status(401).json({ error: "Yetkisiz. Lütfen giriş yapın." });
}

/* ---- login rate limiting (per IP, in-memory) ------------------------------ */
const attempts = new Map(); // ip -> { count, resetAt }
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 1000 * 60 * 10; // 10 minutes
function loginThrottle(req, res, next) {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "?").split(",")[0].trim();
  const now = Date.now();
  let a = attempts.get(ip);
  if (!a || a.resetAt < now) { a = { count: 0, resetAt: now + WINDOW_MS }; attempts.set(ip, a); }
  if (a.count >= MAX_ATTEMPTS) {
    const mins = Math.ceil((a.resetAt - now) / 60000);
    return res.status(429).json({ error: `Çok fazla deneme. ${mins} dk sonra tekrar deneyin.` });
  }
  req._loginIp = ip;
  next();
}
function noteLoginFailure(ip) { const a = attempts.get(ip); if (a) a.count++; }
function resetLoginAttempts(ip) { attempts.delete(ip); }

module.exports = {
  COOKIE, USERNAME, PASSWORD_IS_DEFAULT,
  checkCredentials, setSessionCookie, clearSessionCookie, isAuthed, requireAuth,
  loginThrottle, noteLoginFailure, resetLoginAttempts,
};
