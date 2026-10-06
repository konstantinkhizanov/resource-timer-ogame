# Resource Timer for OGame

A small browser extension for [OGame](https://ogame.gameforge.com) that tells you **how long to wait until your planet has enough resources** to build a building, research a technology, or produce ships and defences.

- One line in the item details: `Resources ready in: 39m 9s`
- Hover the **?** icon for a per-resource breakdown (have / need / missing / time) and the exact time it will be ready
- Respects the quantity you type for ships and defences
- Warns when the cost exceeds your storage or a resource isn't being produced
- Speaks the language your OGame server uses (EN, DE, FR, ES, IT, PL, PT, RU, TR, NL, CS, SK, HU, RO, EL, DA, SV, HR)
- Toolbar popup with a language picker (defaults to the game's language)
- Collects no data, needs no permissions beyond the OGame pages

I built this for myself, and OGame got so much better once I always knew exactly when I could build next. Now it's yours too.

> Unofficial fan project. Not affiliated with or endorsed by Gameforge. OGame is a trademark of Gameforge 4D GmbH.

## Install

- **Firefox:** _link coming soon_
- **Chrome / Edge / Opera / Brave:** _link coming soon_
- **Safari (macOS / iOS):** _link coming soon_

## Support

The extension is free. If it saves you time, you can buy me a coffee: **DONATION_LINK**

## Development

```
extension/        the extension itself (shared by all browsers)
  i18n.js         translations + language detection
  content.js      reads costs and resources, renders the line and tooltip
  inject.js       runs in the page to read OGame's resourcesBar
  popup.*         toolbar popup (how-to, language picker, support link)
  welcome.*       page opened once after install
  ui-strings.js   translations for popup and welcome page
  config.js       donation link
  background.js   opens the welcome page on install
safari/           Xcode project wrapping the extension for Safari
tools/build.sh    builds dist/*-chrome.zip and dist/*-firefox.zip; --safari also builds the Safari app
tools/make-icons.swift   renders the icons
store/            store listing texts and icons
```

Try it locally:
- **Chrome:** `chrome://extensions` → Developer mode → Load unpacked → `extension/`
- **Firefox:** `about:debugging` → This Firefox → Load Temporary Add-on → `extension/manifest.json`
- **Safari:** Settings → Developer → Allow unsigned extensions → Add Temporary Extension → `extension/`

When adding a new file to `extension/`, also add it to the Safari Xcode project (both the macOS and iOS extension targets).

### Adding a language
Add an entry to `OGW_STRINGS` in `extension/i18n.js`. If the OGame server code differs from the language code (e.g. `br` → `pt`), add it to `OGW_LANG_ALIASES`.

## License
MIT
