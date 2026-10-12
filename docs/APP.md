# Gati (गति) — Application Documentation

**Version:** Phase 2 Week-1 MVP (Web PWA)  
**Tagline:** Move with time. Understand the universe.  
**Product type:** Nepali Patro + Cheena + Astro + Manifest + Trust super-app  

---

## 1. Product overview

Gati is a premium, web-first daily instrument for Nepalis:

- Bikram Sambat (BS) + Gregorian (AD) dual dating & panchang  
- **Digital Cheena** (birth chart) + cosmic planet profile  
- **Ask Astro** + Daily Astro Advisor (illustrative, bilingual)  
- **Manifest** (intention wishlist with muhurat hints)  
- **Trust** (cosmic confidence · graha-gati & timekeeping)  
- Festivals, utilities, customizable home  

**Vision:** Beat Hamro Patro / Nepali Patro on calm UX; clearer than Yodha on daily astro; own cosmic Trust + Manifest intention no competitor packages together.

**Name meaning:** Sanskrit/Nepali *gati* = motion; *graha-gati* = celestial motion behind BS calendars, tithi, and seasons.

---

## 2. Feature map (Week-1 MVP)

| Area | Features |
|------|----------|
| **Home** | Profile greeting, year progress, Today tithi, Daily Astro, festivals, mini calendar, Manifest, Trust tip, Utilities |
| **Patro** | Full BS+AD calendar, Sat–Sun holidays, hover tooltips |
| **Cheena** | Create/view North-Indian chart, Navagraha table, Lahiri sidereal v1 |
| **Astro** | Ask Astro oracle + Daily Focus / Caution / Favorable / Intention |
| **Manifest** | Plant → growing → fulfilled / released |
| **Trust** | Daily विश्वास, brand pillars, how Gati keeps time |
| **More** | Manifest, Trust, Utilities, Profile, Settings, About |
| **Settings** | Theme, text size, widget layout |

### Weekend rule (Nepal)

**Saturday and Sunday** are weekly public holidays in the calendar UI.

---

## 3. Information architecture

```
/                 Home dashboard
/calendar         Patro
/cheena           Digital Cheena list
/cheena/new       Birth wizard
/astro            Ask Astro + daily advisor
/astro/ask        Ask Astro (full)
/manifest         Intentions
/trust            Cosmic confidence (विश्वास)
/more             Overflow nav
/profile          Cosmic profile
/tools            Utilities
/settings         Preferences
/about            About Gati
```

Nav: Home · Patro · Cheena · Astro · More (+ Settings in header).

---

## 4. Technical architecture

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 + design tokens in `globals.css` |
| BS ↔ AD | `nepali-date-converter` |
| Panchang | Custom Meeus-style solar/lunar longitudes (`src/lib/calendar/panchang.ts`), evaluated with Nepal Standard Time (UTC+5:45) |
| Festivals | Rule engine: fixed BS, fixed AD, tithi+month matches (`src/lib/calendar/festivals.ts`) |
| State | Zustand + `localStorage` (`gati-preferences`) |
| PWA | `manifest.webmanifest` + production service worker `public/sw.js` |

### Key source paths

```
src/app/                 Routes & layout
src/components/          UI, calendar, festivals, brand logo component
src/lib/calendar/        BS/AD, panchang, festivals, year progress
src/lib/store/           Preferences
docs/                    Product & brand documentation
brand/                   Logo, icons, banners (export pack)
```

---

## 5. Calendar & accuracy notes

- **BS conversion** follows `nepali-date-converter` coverage.  
- **Tithi-based festivals** are computed from lunar elongation and may differ by ±1 day from some regional almanacs (sunrise / local sky conventions).  
- **Fixed BS national holidays** (e.g. Baisakh 1, Jestha 15) are calendar-exact.  
- Year progress: day-of-year within current BS year (Baisakh 1 → next Baisakh 1).

---

## 6. Preferences (localStorage)

Key: `gati-preferences`

```json
{
  "theme": "system | dark | light",
  "textSize": "sm | md | lg | xl",
  "widgets": [
    { "id": "today-tithi", "visible": true, "order": 0 },
    { "id": "upcoming-festivals", "visible": true, "order": 1 },
    { "id": "mini-calendar", "visible": true, "order": 2 },
    { "id": "quick-tools", "visible": true, "order": 3 }
  ]
}
```

---

## 7. Design system (app)

- **Primary mode:** Dark (space black / charcoal, indigo + muted gold)  
- **Light mode:** Off-white, charcoal text, saffron/gold highlights  
- **Typography:** Inter (Latin) + Noto Sans Devanagari  
- **Motion:** Slow starfield, page fade-in; respects `prefers-reduced-motion`  
- **Logo in UI:** `src/components/brand/GatiLogo.tsx` (SVG)

Full brand export pack: see `docs/BRAND.md` and `brand/`.

---

## 8. Accessibility

- Keyboard-focusable controls (`:focus-visible`)  
- Contrast-aware tokens for dark/light  
- Global text scale  
- Meaningful `aria-label`s on calendar days  
- Hover tooltips complemented by tap-to-select day panel

---

## 9. Run locally

```bash
cd gati
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Requires Node.js 20+.

---

## 10. Roadmap (post Phase 1)

- Push notifications for festivals / tithi transitions  
- Muhurat & auspicious timing  
- Multi-location Nepali diaspora timezones  
- Native iOS / Android shells over the same calendar engine  
- Deeper offline panchang cache  

---

## 11. Related docs

| Doc | Purpose |
|-----|---------|
| `docs/BRAND.md` | Complete brand guidelines |
| `docs/ASSETS.md` | Inventory of logo / icon / banner files |
| `README.md` | Quick start for developers |
| `/about` | In-app About page (product story) |
