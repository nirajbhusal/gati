# Gati — Android & iOS packaging

Gati’s native shells use **Capacitor** around the static Next.js export (`out/`).

| Platform | Deliverable | Location |
|----------|-------------|----------|
| Android | APK (sideload / testing) | `dist-mobile/Gati-1.0.0-debug.apk` / `Gati-1.0.0-release.apk` |
| Android | AAB (Play Store) | `dist-mobile/Gati-1.0.0-release.aab` |
| iOS | Xcode project | `ios/App/App.xcodeproj` → archive to IPA in Xcode |

App ID: `app.gati.patro` · Version: `1.0.0`

---

## Prerequisites

### Android APK / AAB
- JDK 17+ (`JAVA_HOME`)
- Android SDK (`ANDROID_HOME`) with platform 35 + build-tools
- Capacitor Android project (`android/`)

### iOS App Store IPA
- **macOS with full Xcode** (not only Command Line Tools)
- Apple Developer Program ($99/year)
- CocoaPods / SPM (Capacitor 8 uses Swift Package Manager)

> This machine may not have Xcode installed. The `ios/` project is generated; open it on a Mac with Xcode to produce the App Store IPA.

---

## Build commands

```bash
# 1) Web static export
npm run build

# 2) Sync into native projects
npx cap sync

# 3a) Android
npm run mobile:android          # debug + release APK + AAB → dist-mobile/

# 3b) iOS (requires Xcode)
npm run mobile:ios              # opens Xcode
# Then: Product → Archive → Distribute App → App Store Connect
```

Or use the helper script:

```bash
./scripts/build-mobile.sh
```

---

## Android signing

Release keystore (generated locally):

- File: `mobile-release/gati-release.jks`
- Alias: `gati`
- Passwords: see `android/keystore.properties` (**change before public release**)

**Play Store** prefers uploading the **`.aab`** (Android App Bundle), not the APK.

Keep `mobile-release/` and `android/keystore.properties` private — do not commit passwords to a public repo.

---

## iOS App Store steps

1. Install Xcode from the Mac App Store.  
2. `npm run build && npx cap sync ios`  
3. `npx cap open ios`  
4. In Xcode: set Team (Apple Developer), Bundle ID `app.gati.patro`, version `1.0.0`.  
5. Add app icons from `brand/icons/` (1024×1024 for App Store).  
6. **Product → Archive → Distribute App → App Store Connect**.  
7. Complete listing in App Store Connect (screenshots, privacy, etc.).

You cannot produce a store-ready IPA without Apple signing certificates.

---

## Updating the app after web changes

```bash
npm run build
npx cap sync
npm run mobile:android   # rebuild APK/AAB
```

---

## Notes

- Native apps load the offline static site from the device (no server required for Phase 1).  
- Service worker is disabled inside Capacitor.  
- For push notifications / deep links later, add Capacitor plugins and rebuild.
