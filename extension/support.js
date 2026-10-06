// Shows only the donation options configured in config.js.
function setLink(id, url) {
  const el = document.getElementById(id);
  if (url) el.href = url;
  else el.hidden = true;
}
setLink('kofi', OGW_DONATE.kofi);
setLink('paypal', OGW_DONATE.paypal);

const wallets = (OGW_DONATE.crypto || []).filter((w) => w.address);
if (!wallets.length) document.getElementById('crypto').hidden = true;

// One row per wallet: coin, network, address and a copy button.
function renderWallets(t) {
  const list = document.getElementById('wallets');
  list.replaceChildren(...wallets.map((w) => {
    const code = document.createElement('code');
    code.textContent = w.address;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'menu-btn';
    copy.textContent = t.sCopy;
    copy.addEventListener('click', () => navigator.clipboard.writeText(w.address).then(() => {
      copy.textContent = t.sCopied;
      setTimeout(() => { copy.textContent = t.sCopy; }, 1500);
    }));
    const head = document.createElement('div');
    const coin = document.createElement('span');
    coin.className = 'coin';
    coin.textContent = w.coin;
    const net = document.createElement('span');
    net.className = 'net';
    net.textContent = ' · ' + t.sNet + ': ' + w.network;
    head.append(coin, net);
    const box = document.createElement('div');
    box.className = 'wallet';
    box.append(code, copy);
    const row = document.createElement('div');
    row.className = 'wallet-row';
    row.append(head, box);
    return row;
  }));
}

chrome.storage.local.get(['lang', 'gameLang']).then((v) => v, () => ({})).then((v) => {
  const lang = ogwUiLang(v.lang, v.gameLang);
  ogwTranslatePage(lang);
  document.title = OGW_UI[lang].sTitle;

  renderWallets(OGW_UI[lang]);
});

ogwFooterLinks();
