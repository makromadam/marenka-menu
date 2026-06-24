# Marenka — Online Menu

A standalone, mobile-first digital menu for **Marenka**. Pure **HTML + CSS**
with a tiny vanilla-JS layer. No framework, no build step — open `index.html`
in any modern browser (or serve the folder) and it runs. Designed to be opened
straight from a QR code at the table.

- **Bilingual** (Türkçe / English) from a single data source — no duplicated markup.
- **Cover screen → menu** flow with a back button that returns to the cover
  (never `history.back()`, since the menu runs standalone).
- Centered logo, sticky header that compacts on scroll, sticky section sub-nav
  with scroll-spy, classic dotted-leader product rows, gold accent lines, and a
  soft one-time fade-up entrance.
- Accessible: semantic landmarks, `:focus-visible`, `prefers-reduced-motion`,
  `lang` kept in sync, AA-contrast white text on the terracotta canvas.
- Print stylesheet (white paper, dark ink, UI hidden).

## File structure

```
marenka-menu/
├── index.html            # markup shell + inline logo sprite
├── css/
│   └── style.css         # design system (:root tokens) + all components
├── js/
│   └── menu.js           # renders cards from data + language / view / nav logic
├── data/
│   └── menu.js           # ← THE menu content (TR/EN). Edit this to update the menu.
└── assets/
    ├── logo.svg          # Marenka wordmark (themeable via `currentColor`)
    ├── favicon.svg
    └── fonts/            # Playfair Display (Regular/Medium/Bold/ExtraBold/Black)
```

> Poppins Light Italic (used **only** for the allergen line) is loaded from
> Google Fonts in `index.html`; everything else is Playfair Display, bundled
> locally. If you later host Poppins yourself, add an `@font-face` for it in
> `css/style.css` and drop the Google Fonts `<link>`.

## Editing the menu — `data/menu.js`

The whole menu is one object, `window.MENU_DATA`. Every piece of text is
`{ tr, en }`, so the two languages stay in sync from one place. Shape:

```js
window.MENU_DATA = {
  tagline: { tr: "…", en: "…" },          // shown on the cover screen
  sections: [
    {
      id: "kahvalti",                       // unique; used for the anchor + sub-nav
      navLabel: { tr: "Kahvaltı", en: "Breakfast" },   // short label in the sub-nav
      label:    { tr: "Kahvaltı", en: "Breakfast" },   // section heading
      banner:   { eyebrow: {tr,en}, title: {tr,en} },  // optional big "Food/Drinks" banner
      note:     { tr: "…", en: "…" },        // optional line under the heading
      groups: [
        {
          label: { tr: "Omletler", en: "Omelettes" },  // category label
          note:  { tr: "…", en: "…" },                 // optional
          items: [
            {
              name: { tr: "Sade Omlet", en: "Plain Omelette" },
              desc: { tr: "…", en: "…" },               // optional ingredients line
              allergens: { tr: "Yumurta, Süt", en: "Egg, Milk" }, // optional
              price: "350"                              // single price → dotted leader
            },
            {
              name: { tr: "Beefeater", en: "Beefeater" },
              prices: [                                  // multiple servings → price list
                { label: { tr: "5 cl", en: "5 cl" }, value: "500" },
                { label: { tr: "Şişe", en: "Bottle" }, value: "6000" }
              ],
              allergens: { tr: "Gluten", en: "Gluten" }
            }
          ]
        }
      ]
    }
  ]
};
```

Rules of thumb:

- **Add a dish** → add an item object to the right `groups[].items` array.
- **Single price** → `price: "350"`. **Multiple servings** → `prices: [ … ]`.
- A field left out simply isn't rendered (e.g. omit `desc` or `allergens`).
- The currency symbol (₺) is added automatically.
- Section order on the page = array order in `sections`. The sub-nav is built
  from it automatically.

## Restyling — `css/style.css`

All colors, fonts and spacing are CSS custom properties at the top of the file
under `:root`. Change them once and the whole menu follows. Key tokens:

| Token | Meaning |
|-------|---------|
| `--bg` | terracotta canvas (`#a45729`) |
| `--cream` / `--cream-soft` / `--allergen` | text (white tones) |
| `--gold` / `--gold-deep` | accent lines, dots, borders, hover |
| `--font-serif` | Playfair Display (everything except the allergen line) |
| `--font-allergen` | Poppins Light Italic (allergen line only) |
| `--space-1 … --space-12` | 4/8-based spacing scale |
| `--content-max` | max reading width (cards are centered within it) |

Type sizes are fluid (`clamp()`), so they scale smoothly from 320 px to desktop.

## Notes

- The English text was translated from the client's Turkish source; have a
  native speaker proof it before launch, especially **allergen wording**.
- `data/menu.js` is the source of truth going forward — edit it directly.
