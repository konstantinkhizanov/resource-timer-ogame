// Shows only the donation options configured in config.js.
function setLink(id, url) {
  const el = document.getElementById(id);
  if (url) el.href = url;
  else el.hidden = true;
}
setLink('kofi', OGW_DONATE.kofi);
setLink('paypal', OGW_DONATE.paypal);

const wallet = OGW_DONATE.usdt || {};
if (wallet.address) {
  document.getElementById('net').textContent = wallet.network;
  document.getElementById('address').textContent = wallet.address;
} else {
  document.getElementById('crypto').hidden = true;
}

chrome.storage.local.get('lang').then((v) => v.lang, () => null).then((saved) => {
  const lang = ogwUiLang(saved);
  ogwTranslatePage(lang);
  document.title = OGW_UI[lang].sTitle;

  const copy = document.getElementById('copy');
  copy.addEventListener('click', () => {
    navigator.clipboard.writeText(wallet.address).then(() => {
      copy.textContent = OGW_UI[lang].sCopied;
      setTimeout(() => { copy.textContent = OGW_UI[lang].sCopy; }, 1500);
    });
  });
});
