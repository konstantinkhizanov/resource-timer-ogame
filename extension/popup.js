const select = document.getElementById('lang');
document.getElementById('support').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: chrome.runtime.getURL('support.html') });
  window.close();
});

function fillLanguages(lang, saved) {
  select.replaceChildren();
  const auto = new Option(OGW_UI[lang].auto, 'auto');
  select.add(auto);
  for (const [code, name] of Object.entries(OGW_LANG_NAMES)) select.add(new Option(name, code));
  select.value = saved || 'auto';
}

function show(saved) {
  const lang = ogwUiLang(saved);
  ogwTranslatePage(lang);
  fillLanguages(lang, saved);
}

chrome.storage.local.get('lang').then((v) => show(v.lang), () => show());

select.addEventListener('change', () => {
  const value = select.value === 'auto' ? null : select.value;
  (value ? chrome.storage.local.set({ lang: value }) : chrome.storage.local.remove('lang'));
  show(value);
});

ogwFooterLinks();
document.querySelectorAll('[data-repo]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: a.href });
  window.close();
}));
