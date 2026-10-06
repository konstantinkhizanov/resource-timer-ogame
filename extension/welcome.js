document.getElementById('support').href = OGW_DONATE_URL;

function h(tag, cls, ...children) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  el.append(...children);
  return el;
}

// Draws a sample of what the extension adds to OGame, in the chosen language.
function renderDemo(lang) {
  const t = OGW_STRINGS[lang];
  const n = (x) => x.toLocaleString(lang);
  const line = h('div', null, t.readyIn + ': ', h('strong', null, '39m 9s'), ' ', h('span', 'ogw-i', '?'));
  line.id = 'ogw-box';
  document.getElementById('demo-info').replaceChildren(line);
  document.getElementById('ogw-tooltip').replaceChildren(
    h('div', 'ogw-tip-title', t.title),
    h('table', null,
      h('tr', null, h('th', null, t.metal + ':'), h('td', null, n(17240) + ' / ' + n(26000)), h('td', 'ogw-bad', '−' + n(8760)), h('td', null, '39m 9s')),
      h('tr', null, h('th', null, t.crystal + ':'), h('td', null, n(6600) + ' / ' + n(6600)), h('td', 'ogw-ok', '✓'), h('td', 'ogw-ok', t.ready))),
    h('div', 'ogw-tip-foot', t.readyAt + ' 21:47'));
  // Point the tooltip arrow at the "?" icon.
  const icon = document.querySelector('#ogw-box .ogw-i');
  const panel = icon.closest('.demo').getBoundingClientRect();
  const r = icon.getBoundingClientRect();
  document.getElementById('ogw-tooltip').style.left = (r.left + r.width / 2 - panel.left - 21) + 'px';
}

chrome.storage.local.get('lang').then((v) => v.lang, () => null).then((saved) => {
  const lang = ogwUiLang(saved);
  ogwTranslatePage(lang);
  renderDemo(lang);
});
