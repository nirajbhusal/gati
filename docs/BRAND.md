# Gati (गति) — Complete Brand Guidelines

**Product:** Gati — Nepali Patro  
**Tagline:** Move with time. Understand the universe.  
**Asset pack:** `/brand` (logo · icons · banners)  
**In-app About:** `/about` (product story only — not this full guide)

---

## 1. Brand essence

| Pillar | Expression |
|--------|------------|
| **Precision** | Accurate calendar math, calm instruments, no visual noise |
| **Cosmos** | Deep space blacks, soft indigo, slow starfields |
| **Culture** | Devanagari + English together; subtle mandala geometry |
| **Motion** | Orbit arcs, tithi progress rings, time-of-day nebulae |

**Personality:** Quietly premium · culturally rooted · scientifically calm · morning ritual  

**Not:** Loud festival-poster kitsch · generic SaaS purple · cluttered “everything app” chrome  

### Name
**Gati (गति)** — Sanskrit/Nepali for *motion*, as in *graha-gati*, the movement of celestial bodies that defines Bikram Sambat, tithi, and seasons.

### Tagline usage
- Primary: **Move with time. Understand the universe.**  
- Short: **Move with time**  
- First long-form mention: **Gati (गति)**

---

## 2. Logo system

### 2.1 Mark (symbol)
- Deep space / paper disc with **indigo core**
- **Gold orbital arc** + lunar body = graha-gati
- Center spark = present moment / “tithi now”
- Outer faint ring = mandala / completeness

### 2.2 Wordmark
- **Gati** — Inter / system sans, semibold, tight tracking  
- **गति** — Noto Sans Devanagari, medium, accent gold  
- Pair Latin + Devanagari whenever space allows  

### 2.3 Lockups

| Variant | File | Use |
|---------|------|-----|
| Mark dark | `brand/logo/mark-dark.svg` | App icon base, dark UI |
| Mark light | `brand/logo/mark-light.svg` | Light UI, print on cream |
| Mark mono | `brand/logo/mark-mono.svg` | Single-color / watermark |
| Horizontal lockup | `brand/logo/lockup-horizontal-dark.svg` | Headers, decks |
| React component | `src/components/brand/GatiLogo.tsx` | Live app chrome |

### 2.4 Clear space & size
- Clear space ≥ **½ mark diameter** on all sides  
- Digital mark minimum: **20px**  
- Lockup minimum mark height: **28px**  
- Print mark minimum: **8mm**

### 2.5 Don’t
- Stretch, skew, or rotate the mark arbitrarily  
- Recolor gold/indigo independently outside approved palette  
- Replace गति with another Devanagari face  
- Add drop shadows / 3D bevels / outlines to the mark  
- Place the mark on busy photos without a scrim  

---

## 3. Color

### Dark (primary)

| Name | Hex | Role |
|------|-----|------|
| Space Black | `#07070C` | Background |
| Elevated | `#101018` | Cards |
| Muted surface | `#16161F` | Nested wells |
| Starlight | `#ECEAF2` | Primary text |
| Soft Indigo | `#8B87D4` | Secondary / today |
| Muted Gold | `#D4A84B` | Primary accent |
| Saffron | `#E8A040` | Cultural highlight |

### Light

| Name | Hex | Role |
|------|-----|------|
| Off-white | `#F6F4F0` | Background |
| Paper | `#FFFCF7` | Cards |
| Charcoal | `#1A1814` | Text |
| Deep Indigo | `#4C4A8A` | Links / today |
| Antique Gold | `#B8860B` | Accent |

### Semantic
- **Gold** → time, festival, emphasis  
- **Indigo** → today, navigation, secondary  
- **Weekend / holiday reds** → Sat–Sun & public holidays in calendar only  

Never use pure `#000` for large fills — use Space Black.

---

## 4. Typography

| Use | Family | Weight |
|-----|--------|--------|
| UI / Latin | Inter | 400–600 |
| Devanagari | Noto Sans Devanagari | 400–700 |
| Tabular data | System tabular nums | — |

**Bilingual pattern:** English primary line + Devanagari secondary (muted or gold).  
**App text scale:** S / M / L / XL via `--text-scale` (Settings + header A+/A−).

---

## 5. UI principles (product)

- Glass surfaces + 1px border + soft depth  
- Bento homepage: medium calendar widget + festivals  
- Full calendar: generous day cells, dual BS/AD, hover tooltips  
- Mandala texture ≤ 5% opacity as background only  
- Motion: ambient and slow; honor reduced-motion  

---

## 6. Voice & copy

| Do | Don’t |
|----|-------|
| Calm, precise, respectful | Hype / !! spam |
| Bilingual labels where helpful | Token Nepali as decoration |
| “Tithi ends in 4h 12m” | “OMG almost over” |
| Honest about ±1 day tithi variance | Claim perfect almanac infallibility |

---

## 7. Photography & illustration

- Cosmic gradients, soft nebulae, abstract orbits  
- Prefer generated brand banners in `brand/banners/`  
- Avoid tourist-cliché temple stock as hero art  

---

## 8. Application map

| Surface | Treatment |
|---------|-----------|
| App chrome | `GatiLogo` horizontal lockup ~34px mark |
| PWA / favicon | `brand/icons/icon-*.png` on Space Black rounded square |
| Social / OG | `brand/banners/og-social-16x9.jpg` |
| Marketing dark | `brand/banners/banner-dark-16x9.jpg` |
| Marketing light | `brand/banners/banner-light-16x9.jpg` |
| Master icon art | `brand/icons/app-icon-master.jpg` |

---

## 9. Export checklist

Before shipping creative:

- [ ] Correct logo variant for background (dark / light / mono)  
- [ ] Clear space respected  
- [ ] Tagline spelling exact  
- [ ] Devanagari rendered with Noto (or outlined in final art)  
- [ ] Contrast AA for any overlaid UI text  

---

*Brand foundation for Phase 1. Expand with motion specs and full iconography as the super-app grows.*
