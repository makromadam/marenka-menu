/* =============================================================================
   MARENKA — Yönetim Paneli (database edition)
   Edits every field of the menu and talks to the server:
     · GET  /api/draft            → load the working draft
     · PUT  /api/draft            → autosave the draft (debounced)
     · POST /api/publish          → push the draft live (customers update instantly)
     · POST /api/revert-draft     → discard the draft, back to the live menu
     · GET/POST /api/revisions    → published history + restore
   Authentication is a real server session (httpOnly cookie); login is checked
   against the server, never in the browser.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = null;
  var sel = null;        // { type:'section'|'group'|'item', si, gi, ii }
  var open = {};         // expansion state, keys "s0", "s0g1"
  var saveTimer = null;
  var searchQuery = "";  // active search/filter text
  var toolbarBound = false;

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
  function pad2(n) { return ("0" + n).slice(-2); }
  function hhmm() { var t = new Date(); return pad2(t.getHours()) + ":" + pad2(t.getMinutes()); }
  function fmtDate(iso) {
    try { var d = new Date(iso); return pad2(d.getDate()) + "." + pad2(d.getMonth() + 1) + "." + d.getFullYear() + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()); }
    catch (e) { return iso || ""; }
  }
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

  /* ---- API client --------------------------------------------------------- */
  function api(method, url, body) {
    return fetch(url, {
      method: method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      credentials: "same-origin",
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (r) {
      return r.text().then(function (t) {
        var j = {}; try { j = t ? JSON.parse(t) : {}; } catch (_) {}
        if (!r.ok) {
          var e = new Error(j.error || ("Sunucu hatası (" + r.status + ")")); e.status = r.status;
          if (r.status === 401 && url.indexOf("/api/login") < 0) showLogin();
          throw e;
        }
        return j;
      });
    });
  }

  /* ---- export normalisation (used for JSON backups) ----------------------- */
  function fixSpacing(s) {
    if (s == null) return s;
    s = String(s).replace(/([,.;:])(?=\p{L})/gu, "$1 ").replace(/[ \t]{2,}/g, " ");
    return s.trim();
  }
  function cleanForExport(data) {
    var d = clone(data);
    function fixObj(o) { if (o) { if (o.tr != null) o.tr = fixSpacing(o.tr); if (o.en != null) o.en = fixSpacing(o.en); } return o; }
    function emptyBi(o) { return !o || ((!o.tr || !o.tr.trim()) && (!o.en || !o.en.trim())); }
    (d.sections || []).forEach(function (s) {
      fixObj(s.navLabel); fixObj(s.label); fixObj(s.note); fixObj(s.eyebrow); fixObj(s.footnote);
      if (emptyBi(s.note)) delete s.note;
      if (emptyBi(s.eyebrow)) delete s.eyebrow;
      if (emptyBi(s.footnote)) delete s.footnote;
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

  /* ---- persistence (draft autosave) -------------------------------------- */
  function setStatus(msg) { var s = $("status"); if (s) s.textContent = msg; }
  function scheduleSave() {
    if (!DATA) return;
    setStatus("Kaydediliyor…");
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      saveTimer = null;
      api("PUT", "/api/draft", { menu: DATA })
        .then(function () { setStatus("Taslak kaydedildi ✓ " + hhmm()); })
        .catch(function (e) { if (e.status !== 401) setStatus("Kaydedilemedi: " + e.message); });
    }, 500);
  }
  function changed() { scheduleSave(); }

  function flushSave() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    return api("PUT", "/api/draft", { menu: DATA });
  }

  function loadDraft() {
    return api("GET", "/api/draft").then(function (res) {
      DATA = res.menu || { sections: [] };
      if (!DATA.sections) DATA.sections = [];
    });
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
    var bodyEl = el("div", "result__body");
    var nm = el("div", "result__name"); nm.innerHTML = highlight(name || "(adsız)", q); bodyEl.appendChild(nm);
    if (path) { var p = el("div", "result__path"); p.textContent = path; bodyEl.appendChild(p); }
    btn.appendChild(k); btn.appendChild(bodyEl);
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
  function ensure(parent, key) { if (!parent[key]) parent[key] = { tr: "", en: "" }; return parent[key]; }

  /* ---- detail editors ---------------------------------------------------- */
  function renderDetail() {
    var host = $("detail"); host.innerHTML = "";
    if (!sel) {
      var e = el("div", "detail__empty");
      e.innerHTML = "<h2>Bir öğe seçin</h2><p>Soldaki ağaçtan bir bölüm, kategori veya ürün seçerek düzenleyin; ya da yeni ekleyin. Değişiklikler taslağa kaydedilir — “Yayınla” deyince canlı menüye geçer.</p>";
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
    card.appendChild(biField("Alt not (bölümün altında — isteğe bağlı)", function (create) { return create ? ensure(s, "footnote") : s.footnote; },
      { area: true, hint: "Bölümün en altında gösterilir (ör. \"Kahvaltı servisimiz 13.00'a kadardır.\")." }));
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

  /* ---- publish / revert / revisions / backup ----------------------------- */
  function publish() {
    if (!DATA) { toast("Menü henüz yüklenmedi, bir saniye bekleyin."); return; }
    setStatus("Yayınlanıyor…");
    flushSave()
      .then(function () { return api("POST", "/api/publish", { menu: DATA }); })
      .then(function (res) {
        setStatus("Yayınlandı ✓ #" + res.revision + " · " + hhmm());
        toast("Menü yayınlandı — müşteri ekranları anında güncellendi.");
      })
      .catch(function (e) { if (e.status !== 401) { setStatus("Yayınlanamadı"); alert("Yayınlama başarısız: " + e.message); } });
  }

  function revertToPublished() {
    if (!confirm("Yayınlanan son sürüme dönülsün mü? Kaydedilmemiş taslak değişiklikleri silinecek.")) return;
    api("POST", "/api/revert-draft").then(function (res) {
      DATA = res.menu || { sections: [] }; if (!DATA.sections) DATA.sections = [];
      sel = null; open = {}; if (DATA.sections.length) open["s0"] = true;
      renderTree(); renderDetail(); setStatus("Yayınlanan sürüme dönüldü"); toast("Yayınlanan sürüm yüklendi.");
    }).catch(function (e) { if (e.status !== 401) alert(e.message); });
  }

  function openRevisions() {
    api("GET", "/api/revisions").then(function (res) {
      var list = $("revisions-list"); list.innerHTML = "";
      var revs = res.revisions || [];
      if (!revs.length) { var em = el("div", "results__empty"); em.textContent = "Henüz yayınlanmış sürüm yok."; list.appendChild(em); }
      revs.forEach(function (rv) {
        var row = el("div", "rev");
        var meta = el("div", "rev__meta");
        meta.innerHTML = "<strong>#" + rv.id + "</strong> · " + escapeHtml(fmtDate(rv.createdAt)) +
          (rv.note ? " · " + escapeHtml(rv.note) : "") + " <small>(" + rv.sectionCount + " bölüm)</small>";
        var btn = el("button", "btn btn--sm", { type: "button" }); btn.textContent = "Taslağa yükle";
        btn.addEventListener("click", function () { restoreRevision(rv.id); });
        row.appendChild(meta); row.appendChild(btn); list.appendChild(row);
      });
      $("revisions").hidden = false;
    }).catch(function (e) { if (e.status !== 401) alert(e.message); });
  }
  function restoreRevision(id) {
    if (!confirm("#" + id + " sürümü taslağa yüklensin mi? Sonra “Yayınla” ile canlıya alabilirsiniz.")) return;
    api("POST", "/api/revisions/" + id + "/restore").then(function (res) {
      DATA = res.menu || { sections: [] }; if (!DATA.sections) DATA.sections = [];
      sel = null; open = {}; if (DATA.sections.length) open["s0"] = true;
      $("revisions").hidden = true; renderTree(); renderDetail();
      setStatus("Sürüm #" + id + " taslağa yüklendi"); toast("Sürüm yüklendi. Yayınlamak için “Yayınla”ya basın.");
    }).catch(function (e) { if (e.status !== 401) alert(e.message); });
  }

  function download(filename, text, mime) {
    var blob = new Blob([text], { type: (mime || "text/plain") + ";charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = el("a"); a.href = url; a.download = filename; document.body.appendChild(a);
    a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }
  function exportBackup() {
    download("marenka-menu-yedek.json", JSON.stringify(cleanForExport(DATA), null, 2), "application/json");
    toast("Yedek (JSON) indirildi.");
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
        DATA = data; sel = null; open = {}; if (DATA.sections.length) open["s0"] = true;
        changed(); renderTree(); renderDetail();
        toast("Menü içe aktarıldı. Canlıya almak için “Yayınla”.");
      } catch (e) { alert("İçe aktarma başarısız: " + e.message); }
    };
    r.readAsText(file);
  }
  function preview() { window.open("/preview", "_blank", "noopener"); }

  var toastTimer = null;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.classList.add("is-show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-show"); }, 2600);
  }

  /* ---- toolbar ----------------------------------------------------------- */
  function bindToolbar() {
    if (toolbarBound) return; toolbarBound = true;
    $("btn-add-section").addEventListener("click", addSection);
    $("btn-publish").addEventListener("click", publish);
    $("btn-preview").addEventListener("click", preview);
    $("btn-revisions").addEventListener("click", openRevisions);
    $("btn-export").addEventListener("click", exportBackup);
    $("btn-revert").addEventListener("click", revertToPublished);
    var fi = $("file-import");
    $("btn-import").addEventListener("click", function () { fi.click(); });
    fi.addEventListener("change", function () { if (fi.files && fi.files[0]) importFile(fi.files[0]); fi.value = ""; });
    $("btn-logout").addEventListener("click", function () {
      api("POST", "/api/logout").catch(function () {}).then(function () { location.reload(); });
    });
    $("revisions-close").addEventListener("click", function () { $("revisions").hidden = true; });
    $("revisions").addEventListener("click", function (e) { if (e.target.id === "revisions") $("revisions").hidden = true; });
    // search / filter
    var si = $("search"), sc = $("search-clear"), st = null;
    si.addEventListener("input", function () {
      sc.hidden = !si.value;
      if (st) clearTimeout(st);
      st = setTimeout(function () { searchQuery = si.value; renderTree(); }, 120);
    });
    sc.addEventListener("click", function () { si.value = ""; sc.hidden = true; searchQuery = ""; renderTree(); si.focus(); });
  }

  /* ---- boot + auth ------------------------------------------------------- */
  function boot() {
    bindToolbar();
    return loadDraft().then(function () {
      if (DATA.sections.length) open["s0"] = true;
      renderTree(); renderDetail();
      setStatus("Hazır");
    }).catch(function (e) { if (e.status !== 401) setStatus("Yüklenemedi: " + e.message); });
  }

  function showLogin() { document.body.classList.remove("is-authed"); try { $("login-pass").value = ""; $("login-user").focus(); } catch (e) {} }
  function hideLogin() { document.body.classList.add("is-authed"); }

  function initAuth() {
    api("GET", "/api/session")
      .then(function (res) { if (res.authed) { hideLogin(); boot(); } else { showLogin(); } })
      .catch(function () { showLogin(); });

    var form = $("login-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var u = ($("login-user").value || "").trim(), p = $("login-pass").value || "";
      $("login-error").hidden = true;
      api("POST", "/api/login", { username: u, password: p })
        .then(function () { hideLogin(); $("login-error").hidden = true; boot(); })
        .catch(function (err) {
          $("login-error").textContent = err.message || "Kullanıcı adı veya şifre hatalı.";
          $("login-error").hidden = false; $("login-pass").value = ""; try { $("login-pass").focus(); } catch (e2) {}
        });
    });
    try { $("login-user").focus(); } catch (e3) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAuth);
  else initAuth();
})();
