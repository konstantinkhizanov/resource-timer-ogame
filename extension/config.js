// Donation options shown on the support page. Leave a value empty to hide that option.
var OGW_DONATE = {
  kofi: 'https://ko-fi.com/DONATION_LINK',   // card or PayPal via Ko-fi
  paypal: 'https://paypal.me/PAYPAL_NAME',   // direct PayPal
  // Crypto wallets; ones with an empty address are hidden (the whole block if all are empty).
  crypto: [
    { coin: 'USDT', network: 'TRON (TRC20)', address: 'USDT_TRC20_ADDRESS' },
    { coin: 'Bitcoin', network: 'Bitcoin', address: 'BITCOIN_ADDRESS' },
    { coin: 'Ethereum', network: 'Ethereum (ERC20)', address: 'ETHEREUM_ADDRESS' },
    { coin: 'TON', network: 'TON', address: 'TON_ADDRESS' }
  ]
};

// Project page on GitHub (source code and bug reports).
var OGW_REPO_URL = 'https://github.com/konstantinkhizanov/resource-timer-ogame';
