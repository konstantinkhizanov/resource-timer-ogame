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
      var ls = window.LocalizationStrings;
      var units = ls && ls.timeunits && ls.timeunits.short;
      document.documentElement.setAttribute('data-ogw-res', JSON.stringify({ t: Date.now(), res: out, units: units || null }));
    } catch (e) { /* ignore */ }
  }
  // OGame updates resourcesBar after ajax actions and fleet arrivals, sometimes by replacing it and
  // sometimes in place, so compare the values themselves. Republishing resets the extrapolation start.
  var last = null;
  setInterval(function () {
    var rb = window.resourcesBar;
    var snapshot;
    try { snapshot = JSON.stringify(rb && rb.resources); } catch (e) { snapshot = null; }
    if (snapshot !== last) { last = snapshot; publish(); }
  }, 1000);
})();
