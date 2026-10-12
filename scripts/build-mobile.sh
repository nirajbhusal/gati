#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Capacitor 8 requires JDK 21+
if [ -z "${JAVA_HOME:-}" ] || ! "$JAVA_HOME/bin/java" -version 2>&1 | grep -q '"21\|"22\|"23\|"24\|"25'; then
  if [ -d "$HOME/.local/jdk" ]; then
    JAVA_HOME="$(ls -d "$HOME/.local/jdk"/jdk-21*/Contents/Home 2>/dev/null | head -1 || true)"
  fi
fi
export JAVA_HOME="${JAVA_HOME:?Install JDK 21+ and set JAVA_HOME}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
echo "JAVA_HOME=$JAVA_HOME"
"$JAVA_HOME/bin/java" -version

echo "==> Building Next.js static export"
npm run build

echo "==> Syncing Capacitor"
npx cap sync

mkdir -p dist-mobile
echo "sdk.dir=$ANDROID_HOME" > android/local.properties

echo "==> Building Android APK + AAB"
(
  cd android
  chmod +x gradlew
  ./gradlew assembleDebug assembleRelease bundleRelease --no-daemon
)

cp -f android/app/build/outputs/apk/debug/app-debug.apk \
  dist-mobile/Gati-1.0.0-debug.apk
cp -f android/app/build/outputs/apk/release/app-release.apk \
  dist-mobile/Gati-1.0.0-release.apk
cp -f android/app/build/outputs/bundle/release/app-release.aab \
  dist-mobile/Gati-1.0.0-release.aab

echo ""
echo "Android packages:"
ls -lh dist-mobile/
echo ""
echo "iOS: open with → npx cap open ios  (requires Xcode for App Store IPA)"
