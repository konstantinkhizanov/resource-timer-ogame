// Runs in the page context: exposes OGame's resourcesBar to the content script.
(function () {
  function publish() {
    try {
      var rb = window.resourcesBar;
      if (!rb || !rb.resources) return;
      var out = {};
      ['metal', 'crystal', 'deuterium', 'energy'].forEach(function (k) {
        var r = rb.resources[k];
        if (!r) return;
        out[k] = {
          amount: Number(r.amount) || 0,
          storage: Number(r.storage) || 0,
          production: Number(r.production) || 0 // per second
        };
      });
      document.documentElement.setAttribute('data-ogw-res', JSON.stringify({ t: Date.now(), res: out }));
    } catch (e) { /* ignore */ }
  }
  publish();
  // resourcesBar is replaced after ajax actions (e.g. building something); re-publish when it changes.
  var last = null;
  setInterval(function () {
    if (window.resourcesBar !== last) { last = window.resourcesBar; publish(); }
  }, 1000);
})();
