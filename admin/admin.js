/* =============================================================================
   MARENKA — Yönetim Paneli (admin editor)
   Loads window.MENU_DATA, lets you add/edit/delete sections, categories and
   items, auto-saves the working copy to localStorage, and exports a fresh
   customer marenka-menu.html and data/menu.js. No backend — fully offline.

   Available globals (injected by the build):
     window.MENU_DATA              → the published data (reset target)
     window.__CUSTOMER_TEMPLATE_B64 → customer standalone with a __MENU_DATA__ slot
   ========================================================================== */
(function () {
  "use strict";

  var DRAFT_KEY = "marenka.admin.draft.v1";
  var AUTH_KEY = "marenka.admin.auth.v1";
  // SHA-256 of "<user>:<password>" — credentials are NOT stored in plain text.
  var AUTH_HASH = "6cea591e4864646c8f8bce8148e89c74fe505a60afc212552de165a0da521bee";
  var DATA = null;
  var sel = null;        // { type:'section'|'group'|'item', si, gi, ii }
  var open = {};         // expansion state, keys "s0", "s0g1"
  var saveTimer = null;
  var searchQuery = "";  // active search/filter text
  var booted = false;

  /* ---- SHA-256 (self-contained, works in any context) -------------------- */
  var sha256 = function sha256(ascii) {
    function rr(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
    var mathPow = Math.pow, maxWord = mathPow(2, 32), i, j, result = "";
    var words = [], asciiBitLength = ascii.length * 8;
    var hash = sha256.h = sha256.h || [], k = sha256.k = sha256.k || [], primeCounter = k.length;
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) { isComposite[i] = candidate; }
        hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += "\x80";
    while (ascii.length % 64 - 56) ascii += "\x00";
    for (i = 0; i < ascii.length; i++) { j = ascii.charCodeAt(i); if (j >> 8) return; words[i >> 2] |= j << ((3 - i) % 4) * 8; }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), oldHash = hash; hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
        var t1 = hash[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i]
          + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7]
            + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
        var t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(t1 + t2) | 0].concat(hash); hash[4] = (hash[4] + t1) | 0;
      }
      for (i = 0; i < 8; i++) { hash[i] = (hash[i] + oldHash[i]) | 0; }
    }
    for (i = 0; i < 8; i++) { for (j = 3; j + 1; j--) { var b = (hash[i] >> (j * 8)) & 255; result += ((b < 16) ? 0 : "") + b.toString(16); } }
    return result;
  };
  function hashCreds(s) { return sha256(unescape(encodeURIComponent(s))); }

  /* ---- tiny helpers ------------------------------------------------------ */
  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function $(id) { return document.getElementById(id); }
  function bi(tr, en) { return { tr: tr, en: en }; }
  function txt(o) { return o && o.tr != null ? o.tr : (o && o.en) || ""; }
  function slug(s) {
    return String(s || "").toLowerCase()
      .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
      .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  function uniqueSectionId(base) {
    var ids = {}; (DATA.sections || []).forEach(function (s) { ids[s.id] = 1; });
    var id = base || "bolum", n = 1, cand = id;
    while (ids[cand]) { cand = id + "-" + (++n); }
    return cand;
  }

  /* ---- export normalisation (mirror the Python generator) ---------------- */
  // space after , . ; : when followed by a letter (never after a digit)
  function fixSpacing(s) {
    if (s == null) return s;
    s = String(s).replace(/([,.;:])(?=\p{L})/gu, "$1 ").replace(/[ \t]{2,}/g, " ");
    return s.trim();
  }
  var TR_LETTERS = /[şŞğĞıİ]/;
  var FORCE_TR = /\b(Özel|Seri|Filtresiz|Filtreli|Glutensiz|Alkolsüz)\b/i;
  function autoLatin(name, sectionId) {
    if (!name || name.tr == null || name.tr !== name.en) return false;
    if (sectionId === "raki" || sectionId === "sarap") return false;
    if (TR_LETTERS.test(name.tr) || FORCE_TR.test(name.tr)) return false;
    return true;
  }
  // produce a clean, render-ready copy: trim, space-normalise, drop empties
  function cleanForExport(data) {
    var d = clone(data);
    function fixObj(o) { if (o) { if (o.tr != null) o.tr = fixSpacing(o.tr); if (o.en != null) o.en = fixSpacing(o.en); } return o; }
    function emptyBi(o) { return !o || ((!o.tr || !o.tr.trim()) && (!o.en || !o.en.trim())); }
    (d.sections || []).forEach(function (s) {
      fixObj(s.navLabel); fixObj(s.label); fixObj(s.note); fixObj(s.eyebrow);
      if (emptyBi(s.note)) delete s.note;
      if (emptyBi(s.eyebrow)) delete s.eyebrow;
      (s.groups || []).forEach(function (g) {
        fixObj(g.label); fixObj(g.note);
        if (emptyBi(g.note)) delete g.note;
        (g.items || []).forEach(function (it) {
          fixObj(it.name); fixObj(it.desc); fixObj(it.allergens);
          if (emptyBi(it.desc)) delete it.desc;
          if (emptyBi(it.allergens)) delete it.allergens;
          if (it.kcal != null && !String(it.kcal).trim()) delete it.kcal;
          if (it.vol != null && !String(it.vol).trim()) delete it.vol;
          if (it.name && !it.name.latin) delete it.name.latin;
          // pricing: keep exactly one of price / prices
          if (Array.isArray(it.prices)) {
            it.prices = it.prices.filter(function (p) { return p && p.value != null && String(p.value).trim() !== ""; });
            if (!it.prices.length) delete it.prices;
            else delete it.price;
          }
          if (it.price != null && String(it.price).trim() === "") delete it.price;
        });
      });
    });
    return d;
  }

  /* ---- persistence ------------------------------------------------------- */
  function setStatus(msg) { var s = $("status"); if (s) s.textContent = msg; }
  function scheduleSave() {
    setStatus("Kaydediliyor…");
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(DATA));
        var t = new Date();
        setStatus("Kaydedildi ✓ " + ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2));
      } catch (e) { setStatus("Kaydedilemedi (depolama dolu?)"); }
    }, 350);
  }
  function changed() { scheduleSave(); }

  function loadInitial() {
    var draft = null;
    try { draft = localStorage.getItem(DRAFT_KEY); } catch (e) {}
    if (draft) {
      try { DATA = JSON.parse(draft); } catch (e) { DATA = null; }
    }
    if (!DATA) DATA = clone(window.MENU_DATA || { sections: [] });
    if (!DATA.sections) DATA.sections = [];
  }

  /* ---- tree -------------------------------------------------------------- */
  function isSel(t, si, gi, ii) {
    return sel && sel.type === t && sel.si === si &&
      (gi == null || sel.gi === gi) && (ii == null || sel.ii === ii);
  }
  function select(type, si, gi, ii) {
    sel = { type: type, si: si, gi: gi, ii: ii };
    if (type !== "section") open["s" + si] = true;
    if (type === "item") open["s" + si + "g" + gi] = true;
    renderTree(); renderDetail();
  }

  function toolBtn(label, title, cls, fn) {
    var b = el("button", "iconbtn" + (cls ? " " + cls : ""), { type: "button", title: title });
    b.textContent = label;
    b.addEventListener("click", function (e) { e.stopPropagation(); fn(); });
    return b;
  }

  function moveIn(arr, i, dir) {
    var j = i + dir; if (j < 0 || j >= arr.length) return false;
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t; return true;
  }

  function renderTree() {
    if (searchQuery && searchQuery.trim()) renderSearchResults();
    else renderFullTree();
  }

  function norm(s) { return String(s == null ? "" : s).toLocaleLowerCase("tr"); }
  function matchAny(q) {
    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];
      if (o && (norm(o.tr).indexOf(q) >= 0 || norm(o.en).indexOf(q) >= 0)) return true;
    }
    return false;
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function highlight(text, q) {
    var e = escapeHtml(text); if (!q) return e;
    try { return e.replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); }
    catch (_) { return e; }
  }
  function renderSearchResults() {
    var root = $("tree-body"); root.innerHTML = "";
    var q = norm(searchQuery).trim();
    var results = [];
    (DATA.sections || []).forEach(function (s, si) {
      if (matchAny(q, s.label, s.navLabel, s.eyebrow)) results.push({ type: "section", si: si });
      (s.groups || []).forEach(function (g, gi) {
        if (matchAny(q, g.label, g.note)) results.push({ type: "group", si: si, gi: gi });
        (g.items || []).forEach(function (it, ii) {
          if (matchAny(q, it.name, it.desc, it.allergens)) results.push({ type: "item", si: si, gi: gi, ii: ii });
        });
      });
    });
    var head = el("div", "results__head"); head.textContent = results.length + " sonuç";
    root.appendChild(head);
    if (!results.length) { var em = el("div", "results__empty"); em.textContent = "Eşleşen öğe yok."; root.appendChild(em); return; }
    var CAP = 300;
    results.slice(0, CAP).forEach(function (r) { root.appendChild(resultRow(r, q)); });
    if (results.length > CAP) {
      var more = el("div", "results__empty");
      more.textContent = "… ve " + (results.length - CAP) + " sonuç daha. Aramayı daraltın.";
      root.appendChild(more);
    }
  }
  function resultRow(r, q) {
    var s = DATA.sections[r.si];
    var btn = el("button", "result" + (isSel(r.type, r.si, r.gi, r.ii) ? " is-selected" : ""), { type: "button" });
    var kindLabel, kindCls = "", name, path = "";
    if (r.type === "section") { kindLabel = "Bölüm"; kindCls = "result__kind--sec"; name = txt(s.label); }
    else if (r.type === "group") { kindLabel = "Kategori"; kindCls = "result__kind--cat"; name = txt(s.groups[r.gi].label); path = txt(s.label); }
    else { var it = s.groups[r.gi].items[r.ii]; kindLabel = "Ürün"; name = txt(it.name); path = txt(s.label) + " › " + txt(s.groups[r.gi].label); }
    var k = el("span", "result__kind " + kindCls); k.textContent = kindLabel;
    var body = el("div", "result__body");
    var nm = el("div", "result__name"); nm.innerHTML = highlight(name || "(adsız)", q); body.appendChild(nm);
    if (path) { var p = el("div", "result__path"); p.textContent = path; body.appendChild(p); }
    btn.appendChild(k); btn.appendChild(body);
    btn.addEventListener("click", function () { select(r.type, r.si, r.gi, r.ii); });
    return btn;
  }

  function renderFullTree() {
    var root = $("tree-body"); root.innerHTML = "";
    (DATA.sections || []).forEach(function (s, si) {
      var sk = "s" + si;
      var node = el("div", "node node--section");
      var row = el("div", "node__row" + (isSel("section", si) ? " is-selected" : ""));
      var tg = el("button", "node__toggle", { type: "button" });
      tg.textContent = open[sk] ? "▾" : "▸";
      tg.addEventListener("click", function (e) { e.stopPropagation(); open[sk] = !open[sk]; renderTree(); });
      var lab = el("button", "node__label", { type: "button", title: txt(s.label) });
      lab.textContent = txt(s.label) || "(adsız bölüm)";
      var cnt = el("span", "node__count"); cnt.textContent = (s.groups || []).length;
      lab.appendChild(cnt);
      lab.addEventListener("click", function () { open[sk] = true; select("section", si); });
      var tools = el("div", "node__tools");
      tools.appendChild(toolBtn("▲", "Yukarı", "", function () { if (moveIn(DATA.sections, si, -1)) { adjustSel("section", si, -1); changed(); renderTree(); } }));
      tools.appendChild(toolBtn("▼", "Aşağı", "", function () { if (moveIn(DATA.sections, si, 1)) { adjustSel("section", si, 1); changed(); renderTree(); } }));
      tools.appendChild(toolBtn("✕", "Bölümü sil", "iconbtn--danger", function () { delSection(si); }));
      row.appendChild(tg); row.appendChild(lab); row.appendChild(tools);
      node.appendChild(row);

      if (open[sk]) {
        var kids = el("div", "node__children");
        (s.groups || []).forEach(function (g, gi) {
          kids.appendChild(groupNode(s, si, g, gi));
        });
        var addG = el("div", "node__addrow");
        var bG = el("button", "btn btn--sm", { type: "button" }); bG.textContent = "+ Kategori";
        bG.addEventListener("click", function () { addGroup(si); });
        addG.appendChild(bG); kids.appendChild(addG);
        node.appendChild(kids);
      }
      root.appendChild(node);
    });
  }

  function groupNode(s, si, g, gi) {
    var gk = "s" + si + "g" + gi;
    var node = el("div", "node node--group");
    var row = el("div", "node__row" + (isSel("group", si, gi) ? " is-selected" : ""));
    var tg = el("button", "node__toggle", { type: "button" });
    tg.textContent = open[gk] ? "▾" : "▸";
    tg.addEventListener("click", function (e) { e.stopPropagation(); open[gk] = !open[gk]; renderTree(); });
    var lab = el("button", "node__label", { type: "button", title: txt(g.label) });
    lab.textContent = txt(g.label) || "(adsız kategori)";
    var cnt = el("span", "node__count"); cnt.textContent = (g.items || []).length; lab.appendChild(cnt);
    lab.addEventListener("click", function () { open[gk] = true; select("group", si, gi); });
    var tools = el("div", "node__tools");
    tools.appendChild(toolBtn("▲", "Yukarı", "", function () { if (moveIn(s.groups, gi, -1)) { changed(); renderTree(); } }));
    tools.appendChild(toolBtn("▼", "Aşağı", "", function () { if (moveIn(s.groups, gi, 1)) { changed(); renderTree(); } }));
    tools.appendChild(toolBtn("✕", "Kategoriyi sil", "iconbtn--danger", function () { delGroup(si, gi); }));
    row.appendChild(tg); row.appendChild(lab); row.appendChild(tools);
    node.appendChild(row);

    if (open[gk]) {
      var kids = el("div", "node__children");
      (g.items || []).forEach(function (it, ii) {
        kids.appendChild(itemNode(g, si, gi, it, ii));
      });
      var addI = el("div", "node__addrow");
      var bI = el("button", "btn btn--sm", { type: "button" }); bI.textContent = "+ Ürün";
      bI.addEventListener("click", function () { addItem(si, gi); });
      addI.appendChild(bI); kids.appendChild(addI);
      node.appendChild(kids);
    }
    return node;
  }

  function itemNode(g, si, gi, it, ii) {
    var node = el("div", "node node--item");
    var row = el("div", "node__row" + (isSel("item", si, gi, ii) ? " is-selected" : ""));
    var sp = el("button", "node__toggle node__toggle--leaf", { type: "button" }); sp.textContent = "·";
    var lab = el("button", "node__label", { type: "button", title: txt(it.name) });
    lab.textContent = txt(it.name) || "(adsız ürün)";
    lab.addEventListener("click", function () { select("item", si, gi, ii); });
    var tools = el("div", "node__tools");
    tools.appendChild(toolBtn("▲", "Yukarı", "", function () { if (moveIn(g.items, ii, -1)) { changed(); renderTree(); } }));
    tools.appendChild(toolBtn("▼", "Aşağı", "", function () { if (moveIn(g.items, ii, 1)) { changed(); renderTree(); } }));
    tools.appendChild(toolBtn("⧉", "Kopyala", "", function () { dupItem(si, gi, ii); }));
    tools.appendChild(toolBtn("✕", "Ürünü sil", "iconbtn--danger", function () { delItem(si, gi, ii); }));
    row.appendChild(sp); row.appendChild(lab); row.appendChild(tools);
    node.appendChild(row);
    return node;
  }

  function adjustSel(type, i, dir) {
    if (sel && sel.type === "section") { if (sel.si === i) sel.si = i + dir; else if (sel.si === i + dir) sel.si = i; }
  }

  /* ---- structural edits -------------------------------------------------- */
  function addSection() {
    var s = { id: uniqueSectionId("bolum"), navLabel: bi("Yeni Bölüm", "New Section"), label: bi("Yeni Bölüm", "New Section"), groups: [] };
    DATA.sections.push(s); changed(); select("section", DATA.sections.length - 1);
  }
  function delSection(si) {
    if (!confirm("\"" + txt(DATA.sections[si].label) + "\" bölümü ve içindeki tüm kategoriler/ürünler silinsin mi?")) return;
    DATA.sections.splice(si, 1); sel = null; changed(); renderTree(); renderDetail();
  }
  function addGroup(si) {
    DATA.sections[si].groups = DATA.sections[si].groups || [];
    DATA.sections[si].groups.push({ label: bi("Yeni Kategori", "New Category"), items: [] });
    changed(); select("group", si, DATA.sections[si].groups.length - 1);
  }
  function delGroup(si, gi) {
    if (!confirm("\"" + txt(DATA.sections[si].groups[gi].label) + "\" kategorisi silinsin mi?")) return;
    DATA.sections[si].groups.splice(gi, 1); sel = null; changed(); renderTree(); renderDetail();
  }
  function addItem(si, gi) {
    var g = DATA.sections[si].groups[gi]; g.items = g.items || [];
    g.items.push({ name: bi("Yeni Ürün", "New Item"), price: "" });
    changed(); select("item", si, gi, g.items.length - 1);
  }
  function dupItem(si, gi, ii) {
    var g = DATA.sections[si].groups[gi];
    g.items.splice(ii + 1, 0, clone(g.items[ii]));
    changed(); select("item", si, gi, ii + 1);
  }
  function delItem(si, gi, ii) {
    var g = DATA.sections[si].groups[gi];
    if (!confirm("\"" + txt(g.items[ii].name) + "\" ürünü silinsin mi?")) return;
    g.items.splice(ii, 1); sel = null; changed(); renderTree(); renderDetail();
  }

  /* ---- form field builders ---------------------------------------------- */
  function field(labelText, control, hint) {
    var f = el("div", "field");
    if (labelText) { var l = el("label"); l.textContent = labelText; f.appendChild(l); }
    f.appendChild(control);
    if (hint) { var h = el("div", "field__hint"); h.textContent = hint; f.appendChild(h); }
    return f;
  }
  function textInput(value, oninput, ph) {
    var i = el("input", null, { type: "text" }); i.value = value == null ? "" : value;
    if (ph) i.placeholder = ph;
    i.addEventListener("input", function () { oninput(i.value); });
    return i;
  }
  function textArea(value, oninput) {
    var t = el("textarea"); t.value = value == null ? "" : value;
    t.addEventListener("input", function () { oninput(t.value); });
    return t;
  }
  // bilingual input pair bound to obj.tr / obj.en (ensures obj exists)
  function biField(labelText, getObj, opts) {
    opts = opts || {};
    var wrap = el("div", "field");
    if (labelText) { var l = el("label"); l.textContent = labelText; wrap.appendChild(l); }
    var grid = el("div", "bi");
    ["tr", "en"].forEach(function (lang) {
      var col = el("div", "bi__col");
      var cl = el("label"); cl.textContent = lang === "tr" ? "Türkçe" : "English"; col.appendChild(cl);
      var o = getObj();
      var ctrl = opts.area ? textArea(o ? o[lang] : "", set) : textInput(o ? o[lang] : "", set);
      function set(v) {
        var obj = getObj(true); obj[lang] = v;
        if (opts.onchange) opts.onchange(obj);
        changed();
      }
      col.appendChild(ctrl); grid.appendChild(col);
    });
    wrap.appendChild(grid);
    if (opts.hint) { var h = el("div", "field__hint"); h.textContent = opts.hint; wrap.appendChild(h); }
    return wrap;
  }
  // ensure parent[key] is a {tr,en} object (create on demand)
  function ensure(parent, key) { if (!parent[key]) parent[key] = { tr: "", en: "" }; return parent[key]; }

  /* ---- detail editors ---------------------------------------------------- */
  function renderDetail() {
    var host = $("detail"); host.innerHTML = "";
    if (!sel) {
      var e = el("div", "detail__empty");
      e.innerHTML = "<h2>Bir öğe seçin</h2><p>Soldaki ağaçtan bir bölüm, kategori veya ürün seçerek düzenleyin; ya da yeni ekleyin.</p>";
      host.appendChild(e); return;
    }
    var s = DATA.sections[sel.si];
    if (!s) { sel = null; return renderDetail(); }
    if (sel.type === "section") return detailSection(host, s);
    var g = s.groups[sel.gi];
    if (!g) { sel = null; return renderDetail(); }
    if (sel.type === "group") return detailGroup(host, s, g);
    var it = g.items[sel.ii];
    if (!it) { sel = null; return renderDetail(); }
    return detailItem(host, s, g, it);
  }

  function head(host, kind, title) {
    var h = el("div", "detail__head");
    var k = el("span", "detail__kind"); k.textContent = kind; h.appendChild(k);
    host.appendChild(h);
    var t = el("h1", "detail__title"); t.textContent = title; host.appendChild(t);
  }

  function detailSection(host, s) {
    head(host, "Bölüm", txt(s.label) || "(adsız)");
    var card = el("div", "card");
    card.appendChild(biField("Menü sekmesi (kısa ad)", function () { return s.navLabel; }, {
      onchange: function () { renderTreeLabelsLater(); }
    }));
    card.appendChild(biField("Bölüm başlığı", function () { return s.label; }, {
      onchange: function () { renderTreeLabelsLater(); }
    }));
    card.appendChild(biField("Üst başlık / eyebrow (isteğe bağlı)", function (create) { return create ? ensure(s, "eyebrow") : s.eyebrow; },
      { hint: "Başlığın üstündeki küçük etiket (ör. Mutfaktan / İçkiler). Boş bırakılırsa otomatik belirlenir." }));
    card.appendChild(biField("Not (isteğe bağlı)", function (create) { return create ? ensure(s, "note") : s.note; }, { area: true }));
    var idField = field("Kimlik (id) — bağlantı/sekme için", textInput(s.id, function (v) {
      s.id = slug(v) || s.id; changed();
    }), "Yalnızca küçük harf, rakam ve tire. Mevcut bölümlerde değiştirmemeniz önerilir.");
    card.appendChild(idField);
    host.appendChild(card);
  }

  function detailGroup(host, s, g) {
    head(host, "Kategori — " + (txt(s.label) || ""), txt(g.label) || "(adsız)");
    var card = el("div", "card");
    card.appendChild(biField("Kategori adı", function () { return g.label; }, { onchange: renderTreeLabelsLater }));
    card.appendChild(biField("Not (isteğe bağlı)", function (create) { return create ? ensure(g, "note") : g.note; }, { area: true }));
    host.appendChild(card);
  }

  function detailItem(host, s, g, it) {
    head(host, "Ürün — " + (txt(g.label) || ""), txt(it.name) || "(adsız)");

    var c1 = el("div", "card"); c1.appendChild(elTitle("Temel"));
    c1.appendChild(biField("Ürün adı", function () { return it.name; }, { onchange: renderTreeLabelsLater }));
    c1.appendChild(biField("Açıklama / içindekiler (isteğe bağlı)", function (create) { return create ? ensure(it, "desc") : it.desc; }, { area: true }));
    c1.appendChild(biField("Alerjenler (isteğe bağlı)", function (create) { return create ? ensure(it, "allergens") : it.allergens; },
      { hint: "Tam kelimelerle yazın, virgülle ayırın (ör. Gluten, Süt ve Süt Ürünleri)." }));
    var two = el("div", "bi");
    two.appendChild(field("Kalori (kcal)", textInput(it.kcal, function (v) { it.kcal = v.replace(/[^\d]/g, ""); changed(); }, "ör. 750")));
    two.appendChild(field("Hacim etiketi (isteğe bağlı)", textInput(it.vol, function (v) { it.vol = v; changed(); }, "ör. 50 cl"),
      "Şişe biralarda fiyatın yanında gösterilen küçük hacim."));
    c1.appendChild(two);
    var lat = el("div", "check");
    var cb = el("input", null, { type: "checkbox" }); cb.checked = !!(it.name && it.name.latin);
    cb.addEventListener("change", function () { ensure2(it, "name"); if (cb.checked) it.name.latin = true; else delete it.name.latin; changed(); });
    var lid = "lat-" + Math.random().toString(36).slice(2);
    cb.id = lid; var ll = el("label", null, { for: lid });
    ll.textContent = "Uluslararası isim — büyük harfte düz \"I\" kullan (ör. PIZZA, COCKTAIL).";
    lat.appendChild(cb); lat.appendChild(ll);
    c1.appendChild(field("", lat));
    host.appendChild(c1);

    // pricing
    var c2 = el("div", "card"); c2.appendChild(elTitle("Fiyat"));
    var multi = Array.isArray(it.prices) && it.prices.length;
    var seg = el("div", "seg");
    var bSingle = el("button", multi ? "" : "is-on", { type: "button" }); bSingle.textContent = "Tek fiyat";
    var bMulti = el("button", multi ? "is-on" : "", { type: "button" }); bMulti.textContent = "Çoklu fiyat (ölçülü)";
    bSingle.addEventListener("click", function () { delete it.prices; if (it.price == null) it.price = ""; changed(); renderDetail(); });
    bMulti.addEventListener("click", function () { delete it.price; if (!Array.isArray(it.prices) || !it.prices.length) it.prices = [{ label: bi("", ""), value: "" }]; changed(); renderDetail(); });
    seg.appendChild(bSingle); seg.appendChild(bMulti);
    c2.appendChild(field("", seg));

    if (multi) {
      it.prices.forEach(function (p, pi) {
        var row = el("div", "price-row");
        row.appendChild(field("Ölçü (TR)", textInput(p.label && p.label.tr, function (v) { p.label = p.label || { tr: "", en: "" }; p.label.tr = v; changed(); }, "ör. 5 cl")));
        row.appendChild(field("Ölçü (EN)", textInput(p.label && p.label.en, function (v) { p.label = p.label || { tr: "", en: "" }; p.label.en = v; changed(); }, "e.g. 5 cl")));
        row.appendChild(field("Fiyat", textInput(p.value, function (v) { p.value = v; changed(); }, "750")));
        row.appendChild(field("", toolBtnInline("✕", "Satırı sil", function () { it.prices.splice(pi, 1); if (!it.prices.length) { delete it.prices; it.price = ""; } changed(); renderDetail(); })));
        c2.appendChild(row);
      });
      var addP = el("button", "btn btn--sm", { type: "button" }); addP.textContent = "+ Fiyat satırı";
      addP.addEventListener("click", function () { it.prices.push({ label: bi("", ""), value: "" }); changed(); renderDetail(); });
      c2.appendChild(addP);
    } else {
      c2.appendChild(field("Fiyat (TL otomatik eklenir)", textInput(it.price, function (v) { it.price = v; changed(); }, "ör. 350"),
        "Sadece rakam yazın → \"350 TL\". Fiyatı belli değilse \"***\" yazabilirsiniz (TL eklenmez)."));
    }
    host.appendChild(c2);
  }

  function elTitle(t) { var h = el("h3"); h.textContent = t; return h; }
  function ensure2(o, k) { if (!o[k]) o[k] = { tr: "", en: "" }; return o[k]; }
  function toolBtnInline(label, title, fn) {
    var b = el("button", "iconbtn iconbtn--danger", { type: "button", title: title }); b.textContent = label;
    b.addEventListener("click", fn); return b;
  }

  // update only the selected node's tree label without a full re-render (keeps focus)
  var treeLabelTimer = null;
  function renderTreeLabelsLater() {
    if (treeLabelTimer) clearTimeout(treeLabelTimer);
    treeLabelTimer = setTimeout(renderTree, 250);
  }

  /* ---- export / preview / import ---------------------------------------- */
  function decodeTemplate() {
    var b64 = window.__CUSTOMER_TEMPLATE_B64 || "";
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  }
  function buildCustomerHTML() {
    var tpl = decodeTemplate();
    var data = cleanForExport(DATA);
    return tpl.replace("__MENU_DATA__", function () { return JSON.stringify(data); });
  }
  function buildMenuJs() {
    var data = cleanForExport(DATA);
    var header = "/* Marenka — menu content. Generated by the admin panel. */\n" +
      "window.MENU_DATA = ";
    return header + JSON.stringify(data, null, 2) + ";\n";
  }
  function download(filename, text, mime) {
    var blob = new Blob([text], { type: (mime || "text/plain") + ";charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = el("a"); a.href = url; a.download = filename; document.body.appendChild(a);
    a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }
  function preview() {
    try {
      var html = buildCustomerHTML();
      var url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
      window.open(url, "_blank");
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    } catch (e) { alert("Önizleme oluşturulamadı: " + e.message); }
  }
  function importFile(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var text = String(r.result), data;
        if (/\.json$/i.test(file.name)) {
          data = JSON.parse(text);
        } else {
          var m = text.match(/window\.MENU_DATA\s*=\s*([\s\S]*?);\s*(?:<\/script>|$)/);
          var jsonStr = m ? m[1] : text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
          data = JSON.parse(jsonStr);
        }
        if (!data || !Array.isArray(data.sections)) throw new Error("Geçerli bir menü verisi bulunamadı.");
        DATA = data; sel = null; open = {}; changed(); renderTree(); renderDetail();
        toast("Menü içe aktarıldı.");
      } catch (e) { alert("İçe aktarma başarısız: " + e.message); }
    };
    r.readAsText(file);
  }
  function resetToPublished() {
    if (!confirm("Tüm yerel değişiklikler silinip yayınlanan son sürüme dönülsün mü?")) return;
    DATA = clone(window.MENU_DATA || { sections: [] }); sel = null; open = {};
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
    changed(); renderTree(); renderDetail(); toast("Yayınlanan sürüme dönüldü.");
  }

  var toastTimer = null;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.classList.add("is-show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-show"); }, 2200);
  }

  /* ---- boot -------------------------------------------------------------- */
  function bindToolbar() {
    $("btn-preview").addEventListener("click", preview);
    $("btn-html").addEventListener("click", function () { download("marenka-menu.html", buildCustomerHTML(), "text/html"); toast("marenka-menu.html indirildi."); });
    $("btn-data").addEventListener("click", function () { download("menu.js", buildMenuJs(), "text/javascript"); toast("menu.js indirildi."); });
    $("btn-add-section").addEventListener("click", addSection);
    $("btn-reset").addEventListener("click", resetToPublished);
    var fi = $("file-import");
    $("btn-import").addEventListener("click", function () { fi.click(); });
    fi.addEventListener("change", function () { if (fi.files && fi.files[0]) importFile(fi.files[0]); fi.value = ""; });
    $("btn-logout").addEventListener("click", function () {
      try { sessionStorage.removeItem(AUTH_KEY); } catch (e) {}
      location.reload();
    });
    // search / filter
    var si = $("search"), sc = $("search-clear"), st = null;
    si.addEventListener("input", function () {
      sc.hidden = !si.value;
      if (st) clearTimeout(st);
      st = setTimeout(function () { searchQuery = si.value; renderTree(); }, 120);
    });
    sc.addEventListener("click", function () { si.value = ""; sc.hidden = true; searchQuery = ""; renderTree(); si.focus(); });
  }

  function boot() {
    if (booted) return; booted = true;
    loadInitial();
    bindToolbar();
    // expand the first section for convenience
    if (DATA.sections.length) open["s0"] = true;
    renderTree(); renderDetail();
    setStatus(localStorage.getItem(DRAFT_KEY) ? "Yerel taslak yüklendi" : "Hazır");
  }

  /* ---- auth gate --------------------------------------------------------- */
  function unlock() { document.body.classList.add("is-authed"); boot(); }
  function initAuth() {
    var authed = false;
    try { authed = sessionStorage.getItem(AUTH_KEY) === "1"; } catch (e) {}
    if (authed) { unlock(); return; }
    var form = $("login-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var u = ($("login-user").value || "").trim(), p = $("login-pass").value || "";
      if (hashCreds(u + ":" + p) === AUTH_HASH) {
        try { sessionStorage.setItem(AUTH_KEY, "1"); } catch (e2) {}
        $("login-error").hidden = true; unlock();
      } else {
        $("login-error").hidden = false; $("login-pass").value = ""; $("login-pass").focus();
      }
    });
    try { $("login-user").focus(); } catch (e3) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAuth);
  else initAuth();
})();
