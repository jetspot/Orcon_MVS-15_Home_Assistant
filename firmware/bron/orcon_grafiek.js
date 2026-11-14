
;(function () {
  // v11.7: grafiek 7 dagen (vocht, baseline, ventilator) uit de flash van de box
  // iPhone/telefoon: juiste schermbreedte
  if (!document.querySelector('meta[name=viewport]')) { var mv = document.createElement('meta'); mv.name = 'viewport'; mv.content = 'width=device-width, initial-scale=1'; document.head.appendChild(mv); }
  if (document.body) document.body.style.margin = '2px'; else document.addEventListener('DOMContentLoaded', function () { document.body.style.margin = '2px'; });
  var DAG = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
  // v11.11: zelf te kiezen aantal dagen (1-7), onthouden in de browser
  var DAGEN = 2; try { var sv = parseInt(localStorage.getItem('orcDagen'), 10); if (sv >= 1 && sv <= 7) DAGEN = sv; } catch (e) {}
  function zetDagen(n) {
    n = parseInt(n, 10); if (isNaN(n)) return; if (n < 1) n = 1; if (n > 7) n = 7; DAGEN = n;
    try { localStorage.setItem('orcDagen', String(n)); } catch (e) {}
    var col = kolom(), inp = col ? col.querySelector('#orcDagen') : null; if (inp && String(inp.value) !== String(n)) inp.value = n;
    zoom = null; hover = -1; teken();
  }
  var data = null, hover = -1, canvas = null;
  // v11.20: inzoomen door een stuk te selecteren (muis slepen / vinger horizontaal vegen)
  var zoom = null, sel = null;
  function knopAlles() { var col = kolom(), b = col ? col.querySelector('#orcAlles') : null; if (b) b.style.display = zoom ? '' : 'none'; }
  function zetZoom(z) { zoom = z; sel = null; hover = -1; knopAlles(); teken(); }
  function pxNaarT(px) { return maat.t0 + (px - maat.L) / maat.pw * maat.span; }
  function kolom() {
    return document.getElementById('orc-grafiek-plek');
  }
  function maak() {
    var col = kolom(); if (!col) return null;
    var c = col.querySelector('#orcGrafiek');
    if (!c) {
      var wrap = document.createElement('div'); wrap.id = 'orcGrafiekBox'; wrap.style.marginBottom = '16px';
      var h = document.createElement('div'); h.className = 'tab-header'; h.textContent = 'Grafiek';
      var b = document.createElement('div'); b.className = 'tab-container'; b.style.padding = '8px 12px';
      c = document.createElement('canvas'); c.id = 'orcGrafiek';
      c.style.cssText = 'width:100%;height:340px;display:block;touch-action:pan-y';
      var lg = document.createElement('div'); lg.style.cssText = 'font-size:12px;opacity:.85;margin-top:4px';
      lg.innerHTML = '<span style="color:#03a9f4">━</span> Vocht &nbsp;&nbsp;<span style="color:#9e9e9e">┅</span> Baseline &nbsp;&nbsp;<span style="color:#ff9800">■</span> Ventilator % &nbsp;&nbsp;<span id="orcGrInfo" style="opacity:.7"></span>';
      var ct = document.createElement('div'); ct.style.cssText = 'display:flex;align-items:center;gap:10px;margin:2px 0 10px';
      var kn = 'min-width:44px;height:36px;font-size:18px;line-height:1;border-radius:6px;border:1px solid rgba(128,128,128,.6);background:transparent;color:inherit;cursor:pointer;padding:0';
      ct.innerHTML = '<span>Dagen:</span><input id="orcDagen" type="number" min="1" max="7" step="1" inputmode="numeric" style="width:3.2em;height:34px;font-size:16px;text-align:center;box-sizing:border-box">'
        + '<button id="orcOp" type="button" aria-label="Meer dagen" style="' + kn + '">\u25B2</button><button id="orcNeer" type="button" aria-label="Minder dagen" style="' + kn + '">\u25BC</button>'
        + '<button id="orcAlles" type="button" style="' + kn + ';font-size:14px;padding:0 12px;margin-left:auto;display:none">Alles tonen</button>';
      var inp = ct.querySelector('#orcDagen'); inp.value = DAGEN;
      inp.addEventListener('input', function () { if (inp.value !== '') zetDagen(inp.value); });
      inp.addEventListener('change', function () { zetDagen(inp.value === '' ? DAGEN : inp.value); inp.value = DAGEN; });
      ct.querySelector('#orcOp').addEventListener('click', function () { zetDagen(DAGEN + 1); });
      ct.querySelector('#orcNeer').addEventListener('click', function () { zetDagen(DAGEN - 1); });
      ct.querySelector('#orcAlles').addEventListener('click', function () { zetZoom(null); });
      b.appendChild(ct); b.appendChild(c); b.appendChild(lg); wrap.appendChild(h); wrap.appendChild(b);
      col.insertBefore(wrap, col.firstChild);
      var px = function (cx) { var r = c.getBoundingClientRect(), x = cx - r.left; return Math.max(maat.L, Math.min(maat.L + maat.pw, x)); };
      var sleept = false;
      var klaar = function () { if (sel && Math.abs(sel.b - sel.a) > 8) { var a = pxNaarT(Math.min(sel.a, sel.b)), b = pxNaarT(Math.max(sel.a, sel.b)); if (b - a < 6e5) { var m = (a + b) / 2; a = m - 3e5; b = m + 3e5; } zetZoom({ van: a, tot: b }); } else { sel = null; teken(); } };
      c.style.cursor = 'crosshair';
      c.addEventListener('mousedown', function (e) { if (e.button !== 0) return; sleept = true; sel = { a: px(e.clientX), b: px(e.clientX) }; hover = -1; e.preventDefault(); });
      window.addEventListener('mousemove', function (e) { if (sleept) { sel.b = px(e.clientX); teken(); } });
      window.addEventListener('mouseup', function () { if (sleept) { sleept = false; klaar(); } });
      c.addEventListener('mousemove', function (e) { if (!sleept) zweef(e.clientX); });
      c.addEventListener('mouseleave', function () { if (!sleept) { hover = -1; teken(); } });
      c.addEventListener('dblclick', function () { zetZoom(null); });
      var t0x = 0, t0y = 0, modus = '', laatsteTik = 0;
      c.addEventListener('touchstart', function (e) { var t = e.touches[0]; if (!t || e.touches.length > 1) return; t0x = t.clientX; t0y = t.clientY; modus = ''; }, { passive: true });
      c.addEventListener('touchmove', function (e) {
        var t = e.touches[0]; if (!t) return; var dx = Math.abs(t.clientX - t0x), dy = Math.abs(t.clientY - t0y);
        if (!modus && (dx > 10 || dy > 10)) modus = dx > dy ? 'sel' : 'scroll';
        if (modus == 'sel') { if (!sel) sel = { a: px(t0x), b: px(t.clientX) }; else sel.b = px(t.clientX); hover = -1; teken(); }
      }, { passive: true });
      c.addEventListener('touchend', function (e) {
        if (modus == 'sel') { klaar(); }
        else if (!modus) { var nu2 = Date.now(); if (nu2 - laatsteTik < 350) { zetZoom(null); laatsteTik = 0; } else { laatsteTik = nu2; zweef(t0x); } }
        modus = '';
      }, { passive: true });
      canvas = c; teken();
    }
    canvas = c;
    return c;
  }
  function haal() {
    fetch(location.origin + '/grafiek.bin', { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) { return r.arrayBuffer(); })
      .then(function (buf) {
        var dv = new DataView(buf); if (buf.byteLength < 8) return;
        var nuDev = dv.getUint32(0, true), n = dv.getUint16(4, true), iv = dv.getUint16(6, true), nu = Date.now(), p = [];
        for (var i = 0; i < n && 8 + i * 8 + 7 < buf.byteLength; i++) {
          var o = 8 + i * 8, ep = dv.getUint32(o, true), h = dv.getUint8(o + 4), bl = dv.getUint8(o + 5), f = dv.getUint8(o + 6), m = dv.getUint8(o + 7);
          if (m != 0xA5 || ep == 0xFFFFFFFF || !nuDev) continue;
          var t = nu - (nuDev - ep) * 1000; if (t < nu - 7 * 864e5 || t > nu + 6e4) continue;
          p.push({ t: t, h: h == 255 ? null : h / 2, b: bl == 255 ? null : bl / 2, f: f == 255 ? null : f });
        }
        p.sort(function (a, b) { return a.t - b.t; });
        data = { p: p, iv: iv }; teken();
      }).catch(function () {});
  }
  function kleur() {
    var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var a = document.querySelector('esp-app');
    if (a && a.getAttribute('scheme')) dark = a.getAttribute('scheme') == 'dark';
    if (canvas) {
      var m = getComputedStyle(canvas).color.match(/\d+/g);
      if (m && m.length >= 3) dark = (+m[0] + +m[1] + +m[2]) > 382;
    }
    return dark ? { fg: '#e0e0e0', grid: 'rgba(255,255,255,.12)', tip: 'rgba(30,30,30,.92)' } : { fg: '#222', grid: 'rgba(0,0,0,.12)', tip: 'rgba(255,255,255,.95)' };
  }
  var maat = {};
  function teken() {
    var c = canvas; if (!c) return;
    var dpr = window.devicePixelRatio || 1, W = c.clientWidth, H = c.clientHeight; if (!W || !H) return;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    var g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    var k = kleur(); g.font = '11px sans-serif'; g.lineWidth = 1;
    var L = 34, R = 8, T = 8, onder = 18, tus = 26;
    var hA = H - T - onder - tus, h1 = Math.round(hA * 0.66), h2 = hA - h1, y1 = T, y2 = T + h1 + tus;
    var nu = Date.now(), tE = zoom ? zoom.tot : nu, t0 = zoom ? zoom.van : nu - DAGEN * 864e5, span = tE - t0, pw = W - L - R;
    function X(t) { return L + (t - t0) / span * pw; }
    var p = data ? data.p : [], mn = 100, mx = 0;
    p.forEach(function (q) { if (q.t < t0 || q.t > tE) return; [q.h, q.b].forEach(function (v) { if (v != null) { if (v < mn) mn = v; if (v > mx) mx = v; } }); });
    if (mn > mx) { mn = 30; mx = 70; }
    var st = (mx - mn) > 40 ? 20 : ((mx - mn) > 15 ? 10 : 5);
    mn = Math.max(0, Math.floor((mn - 2) / st) * st); mx = Math.min(100, Math.ceil((mx + 2) / st) * st); if (mx <= mn) mx = mn + st;
    function YH(v) { return y1 + h1 - (v - mn) / (mx - mn) * h1; }
    function YF(v) { return y2 + h2 - v / 100 * h2; }
    maat = { L: L, pw: pw, t0: t0, H: H, W: W, span: span };
    // raster vocht
    g.strokeStyle = k.grid; g.fillStyle = k.fg; g.textAlign = 'right'; g.textBaseline = 'middle';
    for (var v = mn; v <= mx + 0.01; v += st) { var y = Math.round(YH(v)) + .5; g.beginPath(); g.moveTo(L, y); g.lineTo(W - R, y); g.stroke(); g.fillText(v + '%', L - 4, y); }
    [0, 50, 100].forEach(function (v) { var y = Math.round(YF(v)) + .5; g.beginPath(); g.moveTo(L, y); g.lineTo(W - R, y); g.stroke(); g.fillText(v + '%', L - 4, y); });
    // dagen
    g.textAlign = 'center'; g.textBaseline = 'top';
    var d = new Date(t0); d.setHours(0, 0, 0, 0); var rechts = -1e9;
    for (; d.getTime() < tE + 864e5; d.setDate(d.getDate() + 1)) {
      var tm = d.getTime();
      if (tm > t0 && tm < tE) { var x = Math.round(X(tm)) + .5; g.beginPath(); g.moveTo(x, y1); g.lineTo(x, y2 + h2); g.stroke(); }
      var dl = Math.min(tE, tm + 864e5) - Math.max(t0, tm), mid = Math.max(t0, tm) + dl / 2;
      var lab = (pw / (span / 864e5) < 46) ? DAG[d.getDay()] : DAG[d.getDay()] + ' ' + d.getDate(), lw = g.measureText(lab).width;
      if (span > 2.5 * 864e5 && dl > 864e5 * 0.5 && X(mid) - lw / 2 > rechts + 4) { g.fillText(lab, X(mid), y2 + h2 + 4); rechts = X(mid) + lw / 2; }
    }
    if (span <= 2.5 * 864e5) {
      var uren = span / 36e5, stap = uren <= 1 ? 10 : uren <= 3 ? 30 : uren <= 8 ? 60 : uren <= 16 ? 120 : uren <= 30 ? 180 : 360;
      var hd = new Date(t0); hd.setSeconds(0, 0); var mm = hd.getHours() * 60 + hd.getMinutes(); hd.setHours(0, Math.ceil(mm / stap) * stap, 0, 0); rechts = L - 2;
      for (; hd.getTime() <= tE; hd.setMinutes(hd.getMinutes() + stap)) {
        var xx = Math.round(X(hd.getTime())) + .5, middernacht = hd.getHours() == 0 && hd.getMinutes() == 0;
        if (!middernacht) { g.save(); g.globalAlpha = .5; g.beginPath(); g.moveTo(xx, y1); g.lineTo(xx, y2 + h2); g.stroke(); g.restore(); }
        var lb = middernacht ? DAG[hd.getDay()] + ' ' + hd.getDate() : ('0' + hd.getHours()).slice(-2) + ':' + ('0' + hd.getMinutes()).slice(-2), lbw = g.measureText(lb).width;
        if (xx - lbw / 2 > rechts + 4 && xx + lbw / 2 < W) { g.fillText(lb, xx, y2 + h2 + 4); rechts = xx + lbw / 2; }
      }
    }
    if (!p.length) { g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('Nog geen gegevens - elke 5 min een punt', L + pw / 2, y1 + h1 / 2); info(0); return; }
    var gat = (data.iv || 300) * 1000 * 2.5;
    g.save(); g.beginPath(); g.rect(L, 0, pw, H); g.clip();
    function lijn(veld, Y, kl, streep, vul) {
      g.save(); g.strokeStyle = kl; g.lineWidth = vul ? 1.2 : 1.6; if (streep) g.setLineDash([5, 4]);
      var seg = [], segs = [];
      for (var i = 0; i < p.length; i++) {
        var q = p[i]; if (q.t < t0) continue;
        if (q[veld] == null || (seg.length && q.t - seg[seg.length - 1].t > gat)) { if (seg.length) segs.push(seg); seg = []; if (q[veld] == null) continue; }
        seg.push(q);
      }
      if (seg.length) segs.push(seg);
      segs.forEach(function (s) {
        g.beginPath(); s.forEach(function (q, j) { var x = X(q.t), y = Y(q[veld]); if (j) g.lineTo(x, y); else g.moveTo(x, y); });
        if (vul) { g.stroke(); g.lineTo(X(s[s.length - 1].t), Y(0)); g.lineTo(X(s[0].t), Y(0)); g.closePath(); g.fillStyle = vul; g.fill(); }
        else g.stroke();
      });
      g.restore();
    }
    lijn('f', YF, '#ff9800', false, 'rgba(255,152,0,.30)');
    lijn('b', YH, '#9e9e9e', true, null);
    lijn('h', YH, '#03a9f4', false, null);
    g.restore();
    if (sel) { var sa = Math.min(sel.a, sel.b), sb = Math.max(sel.a, sel.b); g.fillStyle = 'rgba(3,169,244,.18)'; g.fillRect(sa, y1, sb - sa, y2 + h2 - y1); g.strokeStyle = 'rgba(3,169,244,.8)'; g.strokeRect(sa + .5, y1 + .5, sb - sa, y2 + h2 - y1); }
    info(p.length);
    if (hover >= 0 && hover < p.length) {
      var q = p[hover], x = X(q.t);
      g.strokeStyle = k.fg; g.globalAlpha = .5; g.beginPath(); g.moveTo(x + .5, y1); g.lineTo(x + .5, y2 + h2); g.stroke(); g.globalAlpha = 1;
      var dt = new Date(q.t);
      var r = [DAG[dt.getDay()] + ' ' + dt.getDate() + '-' + (dt.getMonth() + 1) + ' ' + ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2),
        'Vocht: ' + (q.h == null ? '-' : q.h.toFixed(1) + ' %'), 'Baseline: ' + (q.b == null ? '-' : q.b.toFixed(1) + ' %'), 'Ventilator: ' + (q.f == null ? '-' : q.f + ' %')];
      g.font = '12px sans-serif'; var bw = 0; r.forEach(function (s) { bw = Math.max(bw, g.measureText(s).width); }); bw += 16;
      var bh = r.length * 16 + 8, bx = x + 10; if (bx + bw > W - R) bx = x - 10 - bw; var by = y1 + 4;
      g.fillStyle = k.tip; g.strokeStyle = 'rgba(128,128,128,.6)'; g.fillRect(bx, by, bw, bh); g.strokeRect(bx + .5, by + .5, bw, bh);
      g.fillStyle = k.fg; g.textAlign = 'left'; g.textBaseline = 'top';
      r.forEach(function (s, i) { g.fillText(s, bx + 8, by + 6 + i * 16); });
      [['h', YH, '#03a9f4'], ['b', YH, '#9e9e9e'], ['f', YF, '#ff9800']].forEach(function (a) { if (q[a[0]] != null) { g.fillStyle = a[2]; g.beginPath(); g.arc(x, a[1](q[a[0]]), 3, 0, 7); g.fill(); } });
    }
  }
  function info(n) {
    var col = kolom(); var el = col ? col.querySelector('#orcGrInfo') : null; if (!el) return;
    var mi = data && data.p.length ? Math.round((Date.now() - data.p[0].t) / 6e4) : 0, u = Math.floor(mi / 60), m = mi % 60;
    var tt = function (t) { var d = new Date(t); return DAG[d.getDay()] + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); };
    el.textContent = !n ? '' : zoom ? '(ingezoomd: ' + tt(zoom.van) + ' – ' + tt(zoom.tot) + ')' : '(' + n + ' punten, ' + (u >= 24 ? Math.floor(u / 24) + 'd ' + (u % 24) + 'u' : u + 'u ' + m + 'm') + ')';
  }
  function zweef(cx) {
    if (!canvas || !data || !data.p.length) return;
    var r = canvas.getBoundingClientRect(), t = maat.t0 + (cx - r.left - maat.L) / maat.pw * maat.span;
    var best = -1, bd = 1e15;
    data.p.forEach(function (q, i) { var dd = Math.abs(q.t - t); if (dd < bd) { bd = dd; best = i; } });
    hover = bd < 30 * 6e4 ? best : -1; teken();
  }
  var breed = 0;
  setInterval(function () { var c = maak(); if (c && c.clientWidth != breed) { breed = c.clientWidth; teken(); } }, 1000);
  setInterval(haal, 60000);
  setTimeout(haal, 1500);
  window.addEventListener('resize', teken);
})();

;(function () {
  // v11.13: schermmeting naar /diag (diagnose telefoonweergave)
  function meet() {
    var t = document.getElementById('orc-app'); if (!t) return setTimeout(meet, 1000);
    var r = t.getBoundingClientRect(), vv = window.visualViewport;
    var q = 'iw=' + innerWidth + '&sw=' + document.documentElement.scrollWidth + '&app=' + Math.round(r.width) + '&vv=' + (vv ? Math.round(vv.width) + 'x' + vv.scale.toFixed(2) : '-') + '&ua=' + encodeURIComponent(navigator.userAgent.slice(0, 80));
    fetch(location.origin + '/meet?' + q, { credentials: 'same-origin', cache: 'no-store' }).catch(function () {});
  }
  setTimeout(meet, 4000);
})();
