#!/bin/sh
# Builds store packages:
#   dist/resource-timer-ogame-<version>-chrome.zip   -> Chrome Web Store (also Edge Add-ons, Opera)
#   dist/resource-timer-ogame-<version>-firefox.zip  -> Firefox Add-ons
#   safari/build/...                                 -> local Safari (macOS) debug build (kept between builds,
#                                                       Safari loads the extension from there)
set -e
cd "$(dirname "$0")/.."
VERSION=$(sed -n 's/.*"version": "\(.*\)".*/\1/p' extension/manifest.json)
mkdir -p dist && rm -f dist/*.zip

# $1 = browser name, $2 = node expression that edits the manifest object `m`
package() {
  tmp=$(mktemp -d)
  cp -R extension/ "$tmp/"
  node -e "const fs=require('fs');const p=process.argv[1];const m=JSON.parse(fs.readFileSync(p));$2;fs.writeFileSync(p,JSON.stringify(m,null,2)+'\n')" "$tmp/manifest.json"
  (cd "$tmp" && zip -qr -X - . -x '.*') > "dist/resource-timer-ogame-$VERSION-$1.zip"
  rm -rf "$tmp"
  echo "Built dist/resource-timer-ogame-$VERSION-$1.zip"
}
package chrome  "delete m.background.scripts; delete m.browser_specific_settings"
package firefox "delete m.background.service_worker"

if [ "$1" = "--safari" ]; then
  xcodebuild -project "safari/Resource Timer for OGame/Resource Timer for OGame.xcodeproj" \
    -scheme "Resource Timer for OGame (macOS)" -configuration Debug -derivedDataPath safari/build \
    CODE_SIGN_IDENTITY="-" CODE_SIGNING_REQUIRED=NO DEVELOPMENT_TEAM="" build | grep -E "error|BUILD"
  open "safari/build/Build/Products/Debug/Resource Timer for OGame.app"
fi
