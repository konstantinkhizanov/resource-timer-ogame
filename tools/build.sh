#!/bin/sh
# Builds store packages:
#   dist/resource-timer-ogame-<version>.zip  -> upload to Chrome Web Store and Firefox Add-ons
#   safari/build/...                         -> local Safari (macOS) debug build (kept between builds,
#                                               Safari loads the extension from there)
set -e
cd "$(dirname "$0")/.."
VERSION=$(sed -n 's/.*"version": "\(.*\)".*/\1/p' extension/manifest.json)
mkdir -p dist && rm -f dist/*.zip
(cd extension && zip -qr -X "../dist/resource-timer-ogame-$VERSION.zip" . -x '.*')
echo "Built dist/resource-timer-ogame-$VERSION.zip"

if [ "$1" = "--safari" ]; then
  xcodebuild -project "safari/Resource Timer for OGame/Resource Timer for OGame.xcodeproj" \
    -scheme "Resource Timer for OGame (macOS)" -configuration Debug -derivedDataPath safari/build \
    CODE_SIGN_IDENTITY="-" CODE_SIGNING_REQUIRED=NO DEVELOPMENT_TEAM="" build | grep -E "error|BUILD"
  open "safari/build/Build/Products/Debug/Resource Timer for OGame.app"
fi
