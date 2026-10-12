# Gati (गति)

**Move with time. Understand the universe.**

Premium Nepali Patro (calendar) progressive web app — Bikram Sambat dual calendar, panchang, festivals, and essential tools.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

## Mobile (Android / iOS)

Capacitor wrappers around the static web build:

```bash
npm run mobile:android   # → dist-mobile/*.apk + *.aab
npm run mobile:ios       # opens Xcode (requires full Xcode for App Store IPA)
```

| File | Use |
|------|-----|
| `dist-mobile/Gati-1.0.0-debug.apk` | Install / test on Android |
| `dist-mobile/Gati-1.0.0-release.apk` | Signed release APK |
| `dist-mobile/Gati-1.0.0-release.aab` | **Play Store** upload |
| `ios/App/` | Xcode project → Archive → App Store |

See [`docs/MOBILE.md`](docs/MOBILE.md).

## Documentation

| Doc | Description |
|-----|-------------|
| [`docs/APP.md`](docs/APP.md) | **Full product documentation** — features, architecture, IA, prefs |
| [`docs/BRAND.md`](docs/BRAND.md) | **Complete brand guidelines** |
| [`docs/ASSETS.md`](docs/ASSETS.md) | Logo / icon / banner file inventory |
| [`docs/MOBILE.md`](docs/MOBILE.md) | Android APK / iOS App Store packaging |
| [`brand/`](brand/) | Export pack: SVG logos, PNG icons, marketing banners |

In-app: **[/about](/about)** — product story for users (brand guidelines stay in `docs/`, not in the consumer UI).

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · `nepali-date-converter` · custom panchang · Zustand

## License

Private / all rights reserved unless otherwise noted.
