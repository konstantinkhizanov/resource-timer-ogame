(function () {
  'use strict';

  const RES = ['metal', 'crystal', 'deuterium'];
  // Language: the game's own language, unless the user picked one in the popup.
  let LOCALE = ogwDetectLang();
  let T = OGW_STRINGS[LOCALE];
  function applyLang(override) {
    LOCALE = ogwDetectLang(override);
    T = OGW_STRINGS[LOCALE];
    const box = document.getElementById('ogw-box');
    if (box) box.replaceChildren(); // force a re-render in the new language
  }
  // Storage is optional: a failure here must never stop the timer itself.
  try {
    chrome.storage.local.get('lang').then((v) => applyLang(v.lang), () => {});
    // Remember the game's language so the extension's own pages can match it.
    Promise.resolve(chrome.storage.local.set({ gameLang: ogwDetectLang() })).catch(() => {});
    chrome.storage.onChanged.addListener((changes) => { if (changes.lang) applyLang(changes.lang.newValue); });
  } catch (e) {
    console.warn('[Resource Timer] storage unavailable', e);
  }

  // Inject the page-context script so we can read OGame's resourcesBar.
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL('inject.js');
  s.onload = () => s.remove();
  (document.head || document.documentElement).appendChild(s);

  const parseNum = (str) => {
    const m = String(str || '').replace(/[^\d-]/g, '');
    return m ? Number(m) : 0;
  };

  // The amount shown in OGame's resource bar right now. The game keeps it live, including
  // deliveries from transports and expeditions. Null if it's abbreviated (e.g. "1.2M") or missing.
  function liveBarAmount(key) {
    const el = document.getElementById('resources_' + key);
    const text = el ? el.textContent.trim() : '';
    return /^[\d.,\s\u00a0'’]+$/.test(text) ? parseNum(text) : null;
  }

  // Current state of a resource: amount now, storage cap, production per second.
  function getResource(key) {
    const raw = document.documentElement.getAttribute('data-ogw-res');
    if (raw) {
      try {
        const { t, res } = JSON.parse(raw);
        const r = res[key];
        if (r) {
          let amount = liveBarAmount(key);
          if (amount == null) {
            // Extrapolate from the last known amount.
            const elapsed = (Date.now() - t) / 1000;
            amount = r.amount;
            if (amount < r.storage) amount = Math.min(r.storage, amount + r.production * elapsed);
          }
          return { amount, storage: r.storage, perSec: r.production };
        }
      } catch (e) { /* fall through */ }
    }
    // Fallback: resource bar DOM + tooltip (Available / Storage / Production per hour).
    const el = document.getElementById('resources_' + key);
    const amount = el ? parseNum(el.dataset.raw || el.textContent) : 0;
    const box = document.getElementById(key + '_box');
    const tip = box && (box.getAttribute('title') || box.dataset.tooltipTitle || '');
    const nums = (tip.match(/[-+]?\d[\d.,]*/g) || []).map(parseNum);
    return { amount, storage: nums[1] || Infinity, perSec: (nums[2] || 0) / 3600 };
  }

  // Seconds from an OGame duration text such as "3m 2s" or "1h 9m 28s", using the game's own unit letters.
  function parseDuration(text) {
    let u = null;
    try { u = JSON.parse(document.documentElement.getAttribute('data-ogw-res') || '{}').units; } catch (e) { /* default units */ }
    u = u || {};
    const map = {};
    map[(u.week || 'w').toLowerCase()] = 604800;
    map[(u.day || 'd').toLowerCase()] = 86400;
    map[(u.hour || 'h').toLowerCase()] = 3600;
    map[(u.minute || 'm').toLowerCase()] = 60;
    map[(u.second || 's').toLowerCase()] = 1;
    let total = 0;
    let found = false;
    for (const m of String(text).matchAll(/(\d+)\s*([^\d\s.,:]+)/g)) {
      const k = m[2].toLowerCase();
      if (map[k] != null) { total += Number(m[1]) * map[k]; found = true; }
    }
    return found ? total : null;
  }

  // In OGame, a queued building/research pays its cost when it starts, i.e. when the current
  // construction in the same queue finishes. Returns { rem: seconds until then, queued: items
  // already waiting } or null when that queue is idle (or this is the shipyard, which pays upfront).
  const QUEUE_BOX = { supplies: 'building', facilities: 'building', research: 'research', lfbuildings: 'lfbuilding', lfresearch: 'lfresearch' };
  function queueInfo() {
    const key = QUEUE_BOX[new URLSearchParams(location.search).get('component')];
    if (!key) return null;
    const box = document.querySelector(`[id^="productionbox${key}"]`);
    const cd = box && box.querySelector('.countdown, [data-end], time');
    if (!cd) return null;
    let rem = parseDuration(cd.textContent);
    if (rem == null) {
      const end = Number(cd.getAttribute('data-end'));
      if (end) rem = ((end > 1e12 ? end : end * 1000) - Date.now()) / 1000;
    }
    if (rem == null || rem <= 0) return null;
    return { rem, queued: box.querySelectorAll('.queuePic, table.queue td').length };
  }

  function fmtDuration(sec) {
    sec = Math.ceil(sec);
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const parts = [];
    if (d) parts.push(d + 'd');
    if (h) parts.push(h + 'h');
    if (m) parts.push(m + 'm');
    if (!d && !h) parts.push(s + 's');
    return parts.join(' ');
  }

  function fmtClock(sec) {
    const d = new Date(Date.now() + sec * 1000);
    const sameDay = d.toDateString() === new Date().toDateString();
    const time = d.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    return sameDay ? time : d.toLocaleDateString(LOCALE, { day: '2-digit', month: '2-digit' }) + ' ' + time;
  }

  const fmtNum = (n) => Math.ceil(n).toLocaleString(LOCALE);

  function getCosts(details) {
    const costs = {};
    details.querySelectorAll('.costs li').forEach((li) => {
      const key = RES.find((k) => li.classList.contains(k));
      if (key) costs[key] = Number(li.dataset.value) || parseNum(li.textContent);
    });
    return costs;
  }

  function getQuantity(details) {
    const input = details.querySelector('#build_amount, input[name="menge"]');
    if (!input) return 1; // buildings / research
    const n = parseInt(input.value, 10);
    return n > 0 ? n : 1;
  }

  function render() {
    const details = document.getElementById('technologydetails');
    if (!details || !details.querySelector('.costs')) return;

    const costs = getCosts(details);
    const qty = getQuantity(details);
    let box = details.querySelector('#ogw-box');
    if (!box) {
      // Add the line to OGame's own info list ("Production duration", "Construction possible", ...).
      // Fall back to right after the costs if that list isn't found.
      const ref = details.querySelector('.build_duration, .possible_build_start, .information li');
      const list = ref && ref.parentElement;
      box = document.createElement(list && list.tagName === 'UL' ? 'li' : 'div');
      box.id = 'ogw-box';
      if (list) list.appendChild(box);
      else details.querySelector('.costs').insertAdjacentElement('afterend', box);
      // Match the font of OGame's own info lines.
      if (ref) {
        const cs = getComputedStyle(ref);
        box.style.fontSize = cs.fontSize;
        box.style.color = cs.color;
        box.style.lineHeight = cs.lineHeight;
        box.style.marginTop = cs.marginTop;
      }
    }

    let maxWait = 0;
    let impossible = null;
    const rows = [];
    for (const key of RES) {
      const need = (costs[key] || 0) * qty;
      if (!need) continue;
      const r = getResource(key);
      const missing = Math.max(0, need - r.amount);
      let time;
      if (!missing) {
        time = h('td', 'ogw-ok', T.ready);
      } else if (need > r.storage) {
        impossible = impossible || T.storageSmall;
        time = h('td', 'ogw-bad', T.storage + ' ' + fmtNum(r.storage));
      } else if (r.perSec <= 0) {
        impossible = impossible || T.noProd;
        time = h('td', 'ogw-bad', T.noProd);
      } else {
        const wait = missing / r.perSec;
        maxWait = Math.max(maxWait, wait);
        time = h('td', null, fmtDuration(wait));
      }
      rows.push(h('tr', null,
        h('th', null, T[key] + ':'),
        h('td', null, fmtNum(Math.min(r.amount, need)) + ' / ' + fmtNum(need)),
        h('td', missing ? 'ogw-bad' : 'ogw-ok', missing ? '−' + fmtNum(missing) : '✓'),
        time));
    }

    const qtyLabel = qty > 1 ? ` ×${qty}` : '';
    let line;
    if (!rows.length || (!impossible && maxWait === 0)) {
      line = [h('strong', 'ogw-ok', T.enough + qtyLabel)];
    } else if (impossible) {
      line = [T.cant + qtyLabel + ': ', h('strong', 'ogw-bad', impossible)];
    } else {
      line = [T.readyIn + qtyLabel + ': ', h('strong', null, fmtDuration(maxWait))];
    }

    // Something is already being built in this queue: will the resources be there when ours starts?
    const queue = impossible || !maxWait ? null : queueInfo();
    const late = queue && maxWait > queue.rem;
    if (queue) line.push(' · ', h('span', late ? 'ogw-bad' : 'ogw-ok', late ? '✗ ' + T.queueLate : '✓ ' + T.queueOk));
    const lineNode = h('span', null, ...line, ' ', h('span', 'ogw-i', '?'));
    if (box.innerHTML !== lineNode.innerHTML) box.replaceChildren(...lineNode.childNodes);

    box.ogwTip = h('div', null,
      h('div', 'ogw-tip-title', T.title + qtyLabel),
      h('table', null, ...rows),
      maxWait && !impossible ? h('div', 'ogw-tip-foot', T.readyAt + ' ' + fmtClock(maxWait)) : '',
      queue ? h('div', late ? 'ogw-tip-queue ogw-bad' : 'ogw-tip-queue ogw-ok',
        T.queueStarts + ': ' + fmtDuration(queue.rem) + ' (' + fmtClock(queue.rem) + ')') : '',
      queue && queue.queued ? h('div', 'ogw-tip-note', '+' + queue.queued + ' ' + T.queueMore) : '');
    if (tooltip.style.display === 'block') tooltip.replaceChildren(...box.ogwTip.cloneNode(true).childNodes);
  }

  // Builds an element: h('td', 'cls', 'text', childNode, ...)
  function h(tag, cls, ...children) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    for (const c of children) if (c !== '' && c != null) el.append(c);
    return el;
  }

  // OGame-style hover tooltip for the "?" icon.
  const tooltip = document.createElement('div');
  tooltip.id = 'ogw-tooltip';
  document.body.appendChild(tooltip);
  document.addEventListener('mouseover', (e) => {
    const icon = e.target.closest && e.target.closest('#ogw-box .ogw-i');
    if (!icon) return;
    const tip = icon.parentElement.ogwTip;
    tooltip.replaceChildren(...(tip ? tip.cloneNode(true).childNodes : []));
    tooltip.style.display = 'block';
    const r = icon.getBoundingClientRect();
    const left = Math.max(4, Math.min(window.innerWidth - tooltip.offsetWidth - 4, r.left + r.width / 2 - tooltip.offsetWidth / 2));
    tooltip.style.left = left + 'px';
    tooltip.style.top = (r.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.setProperty('--ogw-arrow', (r.left + r.width / 2 - left) + 'px');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest('#ogw-box .ogw-i')) tooltip.style.display = 'none';
  });

  function safeRender() {
    try {
      render();
    } catch (e) {
      console.error('[Resource Timer]', e);
    }
  }

  setInterval(safeRender, 1000);
  document.addEventListener('input', (e) => {
    if (e.target.matches('#build_amount, input[name="menge"]')) safeRender();
  });
  new MutationObserver(() => {
    const d = document.getElementById('technologydetails');
    if (d && !d.querySelector('#ogw-box')) safeRender();
  }).observe(document.body, { childList: true, subtree: true });
})();
