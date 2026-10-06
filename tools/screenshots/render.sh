#!/bin/sh
# Renders store screenshots (1280x800) and the Chrome promo tile (440x280) into store/screenshots/.
set -e
cd "$(dirname "$0")/../.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
tmp=$(mktemp -d)
cp -R extension "$tmp/ext"
cp tools/screenshots/slides.html tools/screenshots/tile.html tools/screenshots/game-solar-plant.png "$tmp/"
# The popup needs a stub of the extension storage API outside the browser extension.
sed -i '' 's|<script src="config.js"></script>|<script>window.chrome={storage:{local:{get:()=>Promise.resolve({})}},tabs:{create(){}}};</script><script src="config.js"></script>|' "$tmp/ext/popup.html"
mkdir -p store/screenshots
for n in 1 2 3; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --lang=en --accept-lang=en \
    --window-size=1280,800 --screenshot="store/screenshots/screenshot-$n.png" "file://$tmp/slides.html?n=$n" 2>/dev/null
  echo "store/screenshots/screenshot-$n.png"
done
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=440,280 \
  --screenshot=store/screenshots/promo-tile-440x280.png "file://$tmp/tile.html" 2>/dev/null
echo store/screenshots/promo-tile-440x280.png
rm -rf "$tmp"
