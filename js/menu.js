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

  // which sections belong to the "Drinks" macro-group (rest are "Food")
  var DRINK_IDS = { kokteyl: 1, bira: 1, raki: 1, distile: 1 };
  function macroGroup(id) {
    return DRINK_IDS[id] ? { tr: "İçkiler", en: "Drinks" } : { tr: "Yemekler", en: "Food" };
  }

  function renderSection(section, index, sections) {
    var sec = el("section", "menu-section",
      { id: "sec-" + section.id, "aria-labelledby": "h-" + section.id, role: "tabpanel", tabindex: "-1" });

    // page header — consistent across every page: eyebrow (Food/Drinks) + title
    var head = el("div", "section-head");
    var eye = el("span", "section-head__eyebrow");
    eye.appendChild(bilingual("span", null, macroGroup(section.id)));
    head.appendChild(eye);
    var title = el("h2", "section-head__title", { id: "h-" + section.id });
    title.appendChild(bilingual("span", null, section.label));
    head.appendChild(title);
    var orn = el("div", "section-head__ornament", { "aria-hidden": "true" });
    orn.appendChild(el("span", "section-head__diamond"));
    head.appendChild(orn);
    if (section.note && (section.note.tr || section.note.en)) {
      head.appendChild(bilingual("p", "section-head__note", section.note));
    }
    sec.appendChild(head);

    (section.groups || []).forEach(function (g) { sec.appendChild(renderCategory(g)); });

    // page-to-page pager (← previous section · next section →)
    var prev = sections[index - 1], next = sections[index + 1];
    if (prev || next) {
      var pager = el("nav", "pager", { "aria-label": "Sayfalar / Pages" });
      if (prev) {
        var pb = el("button", "pager__btn pager__prev", { type: "button", "data-target": "sec-" + prev.id });
        pb.appendChild(arrowSpan("‹"));
        var pl = el("span", "pager__label"); pl.appendChild(bilingual("span", null, prev.navLabel || prev.label));
        pb.appendChild(pl);
        pager.appendChild(pb);
      } else { pager.appendChild(el("span", "pager__spacer")); }
      if (next) {
        var nb = el("button", "pager__btn pager__next", { type: "button", "data-target": "sec-" + next.id });
        var nl = el("span", "pager__label"); nl.appendChild(bilingual("span", null, next.navLabel || next.label));
        nb.appendChild(nl);
        nb.appendChild(arrowSpan("›"));
        pager.appendChild(nb);
      } else { pager.appendChild(el("span", "pager__spacer")); }
      sec.appendChild(pager);
    }
    return sec;
  }

  function arrowSpan(ch) {
    var s = el("span", "pager__arrow", { "aria-hidden": "true" });
    s.textContent = ch;
    return s;
  }

  /* ---- sub-nav (page tabs) ----------------------------------------------- */
  function renderNav(sections) {
    var track = document.getElementById("subnav-track");
    if (!track) return;
    track.setAttribute("role", "tablist");
    sections.forEach(function (s) {
      var a = el("a", "subnav__link",
        { href: "#sec-" + s.id, "data-target": "sec-" + s.id, role: "tab" });
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
    window.scrollTo(0, 0);
    if (view === "menu") {
      // replay the entrance animation on the active page now that it's visible
      var active = document.querySelector(".menu-section.is-active");
      if (active) {
        active.classList.remove("page-enter");
        void active.offsetWidth;
        active.classList.add("page-enter");
      }
      // move focus into the menu for keyboard/AT users
      var skip = document.getElementById("menu-main");
      if (skip) skip.focus({ preventScroll: true });
    }
  }

  function initView() {
    var enter = document.getElementById("enter-menu");
    var back = document.getElementById("back-btn");
    if (enter) enter.addEventListener("click", function () { setView("menu"); });
    if (back) back.addEventListener("click", function () { setView("cover"); });
    setView("cover");
  }

  /* ---- header compaction ------------------------------------------------- */
  function initScrollChrome() {
    var onScroll = function () {
      body.setAttribute("data-scrolled", String(window.scrollY > 24));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- paging (one section = one page) ----------------------------------- */
  // Only the active section is shown; tabs and the prev/next pager switch
  // pages, so one section never bleeds into the next.
  var currentSection = null;
  function initPaging(sections) {
    var tabs = {};
    document.querySelectorAll(".subnav__link").forEach(function (l) {
      tabs[l.getAttribute("data-target")] = l;
    });
    var pageEls = document.querySelectorAll(".menu-section");

    function showSection(secId, opts) {
      if (!secId || secId === currentSection) return;
      currentSection = secId;
      // pages
      for (var i = 0; i < pageEls.length; i++) {
        pageEls[i].classList.toggle("is-active", pageEls[i].id === secId);
      }
      // restart the entrance animation on the freshly shown page
      var active = document.getElementById(secId);
      if (active) {
        active.classList.remove("page-enter");
        // force reflow so the animation re-triggers every switch
        void active.offsetWidth;
        active.classList.add("page-enter");
      }
      // tabs
      for (var key in tabs) {
        var on = key === secId;
        tabs[key].setAttribute("aria-current", String(on));
        tabs[key].setAttribute("aria-selected", String(on));
      }
      // keep the active tab in view within the strip
      var tab = tabs[secId];
      if (tab && tab.parentNode) {
        var track = tab.parentNode, pad = 16;
        var l = tab.offsetLeft - pad, r = tab.offsetLeft + tab.offsetWidth + pad;
        if (l < track.scrollLeft) track.scrollTo({ left: l, behavior: "smooth" });
        else if (r > track.scrollLeft + track.clientWidth)
          track.scrollTo({ left: r - track.clientWidth, behavior: "smooth" });
      }
      // start each page at the top, under the sticky chrome
      if (!opts || opts.scroll !== false) window.scrollTo({ top: 0, behavior: "auto" });
    }

    // tab clicks
    document.querySelectorAll(".subnav__link").forEach(function (l) {
      l.addEventListener("click", function (e) {
        e.preventDefault();
        showSection(l.getAttribute("data-target"));
      });
    });
    // pager clicks (event-delegated; buttons are inside the pages)
    var mainEl = document.getElementById("menu-main");
    if (mainEl) {
      mainEl.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest(".pager__btn") : null;
        if (btn) showSection(btn.getAttribute("data-target"));
      });
    }

    // expose so the cover→menu entry can (re)assert the first page
    initPaging.show = showSection;
    initPaging.first = sections.length ? "sec-" + sections[0].id : null;
    showSection(initPaging.first, { scroll: false });
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
    data.sections.forEach(function (s, i) { frag.appendChild(renderSection(s, i, data.sections)); });
    main.appendChild(frag);

    initLang();
    initView();
    initScrollChrome();
    initPaging(data.sections);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
