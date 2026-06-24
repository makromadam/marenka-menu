/* =============================================================================
   MARENKA — menu interactions + renderer
   Deliberately small. JavaScript is limited to:
     · rendering the cards from the single data source (data/menu.js)
     · language switching (TR / EN)            → sets data-lang, persists choice
     · cover ↔ menu view + the back button     → sets data-view (never history.back)
     · sticky-header compaction + sub-nav scroll-spy (progressive enhancement)
   Everything visual lives in CSS.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var CUR = "₺"; // ₺
  var STORE_LANG = "marenka.lang";
  var SUPPORTED = { tr: true, en: true };

  /* ---- tiny DOM helpers -------------------------------------------------- */
  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  // Render a bilingual value as two spans; only the active language shows (CSS).
  function bilingual(tag, cls, value) {
    var frag = document.createDocumentFragment();
    var tr = el(tag, (cls ? cls + " " : "") + "lang tr", { lang: "tr" });
    var en = el(tag, (cls ? cls + " " : "") + "lang en", { lang: "en" });
    tr.textContent = value && value.tr != null ? value.tr : "";
    en.textContent = value && value.en != null ? value.en : value && value.tr != null ? value.tr : "";
    frag.appendChild(tr);
    frag.appendChild(en);
    return frag;
  }

  function slug(s) {
    return String(s)
      .toLowerCase()
      .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
      .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function priceNode(value) {
    var p = el("span", "item__price");
    var cur = el("span", "cur");
    cur.textContent = CUR;
    p.appendChild(cur);
    p.appendChild(document.createTextNode(String(value)));
    return p;
  }

  /* ---- card ------------------------------------------------------------- */
  function renderItem(item) {
    var multi = Array.isArray(item.prices) && item.prices.length;
    var li = el("li", "item" + (multi ? " item--multiprice" : ""));

    var head = el("div", "item__head");
    var name = el("h4", "item__name");
    name.appendChild(bilingual("span", null, item.name));
    head.appendChild(name);

    if (!multi) {
      head.appendChild(el("span", "item__leader", { "aria-hidden": "true" }));
      if (item.price != null && item.price !== "") {
        head.appendChild(priceNode(item.price));
      }
    }
    li.appendChild(head);

    // multi-serving prices (spirits / rakı)
    if (multi) {
      var prices = el("div", "item__prices");
      item.prices.forEach(function (pr) {
        if (pr.value == null || pr.value === "") return;
        var pair = el("span", "item__price-pair");
        var m = el("span", "measure");
        m.appendChild(bilingual("span", null, pr.label));
        var a = el("span", "amount");
        a.textContent = CUR + String(pr.value);
        pair.appendChild(m);
        pair.appendChild(a);
        prices.appendChild(pair);
      });
      li.appendChild(prices);
    }

    // ingredients
    if (item.desc && (item.desc.tr || item.desc.en)) {
      var d = bilingual("p", "item__desc", item.desc);
      li.appendChild(d);
    }

    // allergens (Poppins Light Italic — the only non-serif text in the menu)
    if (item.allergens && (item.allergens.tr || item.allergens.en)) {
      var aWrap = el("p", "item__allergen");
      var labelTr = el("span", "lang tr", { lang: "tr" });
      labelTr.innerHTML = '<span class="item__allergen-label">Alerjen:</span> ' + escapeHtml(item.allergens.tr || item.allergens.en);
      var labelEn = el("span", "lang en", { lang: "en" });
      labelEn.innerHTML = '<span class="item__allergen-label">Allergens:</span> ' + escapeHtml(item.allergens.en || item.allergens.tr);
      aWrap.appendChild(labelTr);
      aWrap.appendChild(labelEn);
      li.appendChild(aWrap);
    }
    return li;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- category + section ------------------------------------------------ */
  function renderCategory(group) {
    var frag = document.createDocumentFragment();
    var cat = el("div", "category");
    var label = el("h3", "category__label");
    label.appendChild(bilingual("span", null, group.label));
    cat.appendChild(label);
    if (group.note && (group.note.tr || group.note.en)) {
      var note = bilingual("p", "category__note", group.note);
      cat.appendChild(note);
    }
    frag.appendChild(cat);

    var list = el("ul", "item-list");
    (group.items || []).forEach(function (it) { list.appendChild(renderItem(it)); });
    frag.appendChild(list);
    return frag;
  }

  function renderSection(section) {
    var sec = el("section", "menu-section", { id: "sec-" + section.id, "aria-labelledby": "h-" + section.id });

    // major banner (FOOD / DRINKS)
    if (section.banner) {
      var banner = el("div", "section-banner");
      var eye = el("span", "section-banner__eyebrow");
      eye.appendChild(bilingual("span", null, section.banner.eyebrow));
      var btitle = el("h2", "section-banner__title");
      btitle.appendChild(bilingual("span", null, section.banner.title));
      var orn = el("div", "section-banner__ornament", { "aria-hidden": "true" });
      orn.appendChild(el("span", "section-banner__diamond"));
      banner.appendChild(eye);
      banner.appendChild(btitle);
      banner.appendChild(orn);
      sec.appendChild(banner);
    }

    // section header
    var head = el("div", "section-head");
    var title = el("h2", "section-head__title", { id: "h-" + section.id });
    title.appendChild(bilingual("span", null, section.label));
    head.appendChild(title);
    if (section.note && (section.note.tr || section.note.en)) {
      head.appendChild(bilingual("p", "section-head__note", section.note));
    }
    sec.appendChild(head);

    (section.groups || []).forEach(function (g) { sec.appendChild(renderCategory(g)); });
    return sec;
  }

  /* ---- sub-nav ----------------------------------------------------------- */
  function renderNav(sections) {
    var track = document.getElementById("subnav-track");
    if (!track) return;
    sections.forEach(function (s) {
      var a = el("a", "subnav__link", { href: "#sec-" + s.id, "data-target": "sec-" + s.id });
      a.appendChild(bilingual("span", null, s.navLabel || s.label));
      track.appendChild(a);
    });
  }

  /* ---- language ---------------------------------------------------------- */
  function setLang(lang) {
    if (!SUPPORTED[lang]) lang = "tr";
    body.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var btns = document.querySelectorAll(".lang-toggle__btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", String(btns[i].getAttribute("data-lang") === lang));
    }
    try { localStorage.setItem(STORE_LANG, lang); } catch (e) {}
  }

  function initLang() {
    // Turkish is the house default; a guest's explicit choice is remembered.
    var saved = null;
    try { saved = localStorage.getItem(STORE_LANG); } catch (e) {}
    if (!SUPPORTED[saved]) saved = "tr";
    setLang(saved);
    document.querySelectorAll(".lang-toggle__btn").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  /* ---- view (cover ↔ menu) ---------------------------------------------- */
  function setView(view) {
    body.setAttribute("data-view", view);
    if (view === "menu") {
      window.scrollTo(0, 0);
      var first = document.querySelector(".subnav__link");
      // move focus into the menu for keyboard/AT users
      var skip = document.getElementById("menu-main");
      if (skip) skip.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function initView() {
    var enter = document.getElementById("enter-menu");
    var back = document.getElementById("back-btn");
    if (enter) enter.addEventListener("click", function () { setView("menu"); });
    if (back) back.addEventListener("click", function () { setView("cover"); });
    setView("cover");
  }

  /* ---- header compaction + scroll-spy ------------------------------------ */
  function initScrollChrome(sections) {
    var onScroll = function () {
      body.setAttribute("data-scrolled", String(window.scrollY > 24));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // scroll-spy for the sub-nav active state
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    var firstId = null;
    document.querySelectorAll(".subnav__link").forEach(function (l) {
      var id = l.getAttribute("data-target");
      links[id] = l;
      if (firstId === null) firstId = id;
    });
    // Prime with the first section active and the strip at its start, so the
    // first pill (e.g. "Kahvaltı") is never half-clipped on open. The strip is
    // only auto-scrolled once the guest has actually scrolled the page.
    var current = firstId;
    if (firstId) links[firstId].setAttribute("aria-current", "true");
    var hasScrolled = false;
    window.addEventListener("scroll", function () { hasScrolled = true; }, { passive: true, once: true });

    var setCurrent = function (id) {
      if (id === current) return;
      current = id;
      for (var key in links) links[key].setAttribute("aria-current", String(key === id));
      var active = links[id];
      if (!hasScrolled || !active || !active.parentNode) return;
      // keep the active pill fully in view; bias toward its start so the
      // previous pill is never left visibly cut at the left edge
      var track = active.parentNode;
      var pad = 16;
      var left = active.offsetLeft - pad;
      var right = active.offsetLeft + active.offsetWidth + pad;
      if (left < track.scrollLeft) {
        track.scrollTo({ left: left, behavior: "smooth" });
      } else if (right > track.scrollLeft + track.clientWidth) {
        track.scrollTo({ left: right - track.clientWidth, behavior: "smooth" });
      }
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setCurrent(e.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    document.querySelectorAll(".menu-section").forEach(function (s) { observer.observe(s); });
  }

  /* ---- boot -------------------------------------------------------------- */
  function build() {
    var data = window.MENU_DATA;
    var main = document.getElementById("menu-main");
    if (!data || !main) return;

    if (data.tagline) {
      var tg = document.getElementById("cover-tagline");
      if (tg) { tg.innerHTML = ""; tg.appendChild(bilingual("span", null, data.tagline)); }
    }

    renderNav(data.sections);
    var frag = document.createDocumentFragment();
    data.sections.forEach(function (s) { frag.appendChild(renderSection(s)); });
    main.appendChild(frag);

    initLang();
    initView();
    initScrollChrome(data.sections);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
