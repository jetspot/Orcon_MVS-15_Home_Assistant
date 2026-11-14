;(function () {
  'use strict';
  // smit_webgui.js - gedeelde webpagina voor alle ESP-projecten van Smit Techniek en Service.
  // Ontwerp van de OrconFanBox: inklapbare groepen, licht/donker, één pagina.
  var S = {}, BIND = {}, C = { prefix: 'smit', titel: 'Apparaat', versie: '' };
  var css = ''
    + ':root{--bg:#0f1012;--kaart:#1b1c1f;--kop:#24262a;--rand:#34363b;--tekst:#e6e6e6;--zacht:#9aa0a6;--accent:#03a9f4;--groen:#2e9e4f;--rood:#d9534f}'
    + '@media (prefers-color-scheme:light){:root:not([data-theme=dark]){--bg:#f3f4f6;--kaart:#fff;--kop:#eef0f3;--rand:#d9dce1;--tekst:#1d1f22;--zacht:#5f6368}}:root[data-theme=light]{--bg:#f3f4f6;--kaart:#fff;--kop:#eef0f3;--rand:#d9dce1;--tekst:#1d1f22;--zacht:#5f6368}'
    + ':root{color-scheme:dark}:root[data-theme=light]{color-scheme:light}@media (prefers-color-scheme:light){:root:not([data-theme=dark]){color-scheme:light}}'
    + '.o-thema{margin-left:8px;height:28px;padding:0 10px;border-radius:6px;border:1px solid var(--rand);background:transparent;color:var(--tekst);font-size:13px;cursor:pointer;white-space:nowrap}'
    + 'html,body{background:var(--bg);color:var(--tekst);font:14px/1.35 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'
    + '.o-app{max-width:1200px;margin:0 auto;padding:6px 2px 24px}'
    + '.o-top{display:flex;align-items:center;gap:10px;padding:6px 8px 10px}.o-top h1{font-size:20px;font-weight:600;margin:0}.o-top .s{color:var(--zacht);font-size:12px;margin-left:auto;text-align:right}'
    + '.o-dot{width:10px;height:10px;border-radius:5px;background:var(--rood);display:inline-block}.o-dot.aan{background:var(--groen)}'
    + '.o-kol{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr));gap:10px;align-items:start}.o-kol>div{display:flex;flex-direction:column;gap:10px;min-width:0}'
    + '.o-g{background:var(--kaart);border:1px solid var(--rand);border-radius:10px;overflow:hidden}'
    + '.o-h{display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--kop);font-weight:600;cursor:default;user-select:none}.o-h .n{margin-left:auto;color:var(--zacht);font-weight:400;font-size:12px}'
    + '.o-g.klap .o-h{cursor:pointer}.o-g.dicht .o-b{display:none}'
    + '.o-r{display:flex;align-items:center;gap:8px;padding:7px 12px;border-top:1px solid var(--rand);min-height:22px}.o-r:first-child{border-top:none}'
    + '.o-r .l{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.o-r .v{color:var(--zacht);white-space:nowrap;text-align:right}.o-r.sub .l{padding-left:14px}'
    + '.o-sw{position:relative;display:inline-block;width:64px;height:30px;flex:0 0 64px;box-sizing:border-box;border-radius:15px;background:#666;cursor:pointer;transition:background .2s}.o-sw.aan{background:var(--accent)}'
    + '.o-sw:after{content:"";position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:12px;background:#fff;transition:left .2s}.o-sw.aan:after{left:37px}'
    + '.o-n{position:relative;display:flex;align-items:center;gap:6px;flex:0 0 auto}.o-n input{width:64px;height:30px;box-sizing:border-box;font-size:16px;text-align:center;padding:0 4px;margin:0;border:1px solid var(--rand);border-radius:6px;background:var(--bg);color:var(--tekst);-moz-appearance:textfield;appearance:textfield}'
    + '.o-n input::-webkit-inner-spin-button,.o-n input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}'
    + '.o-n .u{width:30px;color:var(--zacht);text-align:left}.o-n input.fout{border-color:var(--rood)}'
    + '.o-hint{position:absolute;right:100%;top:50%;transform:translateY(-50%);margin-right:8px;padding:2px 6px;white-space:nowrap;font-size:12px;color:var(--zacht);background:var(--kaart);border-radius:4px;pointer-events:none}.o-hint.fout{color:var(--rood)}'
    + '.o-bt{height:30px;padding:0 12px;border-radius:6px;border:1px solid var(--accent);background:transparent;color:var(--accent);font-size:13px;cursor:pointer}'
    + '.o-bt.opslaan{border-color:var(--accent);background:var(--accent);color:#fff}.o-ww{width:150px;height:30px;box-sizing:border-box;font-size:16px;padding:0 6px;border:1px solid var(--rand);border-radius:6px;background:var(--bg);color:var(--tekst)}'
    + '.o-bt.start{border-color:var(--groen);background:var(--groen);color:#fff}.o-bt.stop{border-color:var(--rood);background:var(--rood);color:#fff}.o-bt:active{transform:scale(.97)}'
    + '.o-bt.annuleer{border-color:#5a626b;background:#5a626b;color:#ff6b6b;font-weight:700}.o-dlg{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:99;padding:16px}.o-dlgb{background:var(--kaart);color:var(--tekst);border:1px solid var(--rand);border-radius:10px;padding:16px;max-width:420px;font-size:15px;line-height:1.45}.o-dlgb b{font-size:17px}.o-dlgk{display:flex;gap:10px;justify-content:flex-end}'
    + '.o-slider{flex:1;min-width:90px;accent-color:var(--accent)}'
    + '#o-log{margin:0;padding:8px 12px;height:260px;overflow:auto;font:12px/17px ui-monospace,monospace;white-space:pre-wrap;word-break:break-word}'      + ';';
  css += 'html,body{margin:0;overflow-x:hidden;max-width:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%}*{box-sizing:border-box}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  // Zonder deze regel toont een telefoon de pagina op 980 px breed.
  if (!document.querySelector('meta[name=viewport]')) {
    var mv = document.createElement('meta'); mv.name = 'viewport';
    mv.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
    document.head.appendChild(mv);
  }

  function e(tag, cls, txt) { var x = document.createElement(tag); if (cls) x.className = cls; if (txt != null) x.textContent = txt; return x; }
  function post(pad, opties) { return fetch(location.origin + pad, Object.assign({ method: 'POST', credentials: 'same-origin' }, opties || {})); }
  function stuur(pad) { return post(pad).catch(function () {}); }
  function waarde(id) { var d = S[id]; return d ? d.value : undefined; }
  function gegevens(id) { return S[id] || {}; }
  function getal(id, dec) { var v = waarde(id); if (v === null || v === undefined || v === '' || isNaN(+v)) return '–'; return (+v).toFixed(dec); }
  function jn(id) { var v = waarde(id); return v === undefined ? '–' : (v ? 'ja' : 'nee'); }
  function bind(id, fn) { (BIND[id] = BIND[id] || []).push(fn); }
  function tekst(id, leeg) { var v = waarde(id); return (v === undefined || v === null || v === '') ? (leeg || '–') : String(v); }

  function groep(titel, icoon, klapId, dicht) {
    var g = e('div', 'o-g'), h = e('div', 'o-h'), b = e('div', 'o-b');
    h.appendChild(e('span', null, (icoon ? icoon + '  ' : '') + titel));
    if (klapId) {
      g.classList.add('klap'); var n = e('span', 'n'); h.appendChild(n);
      var open = !dicht;
      try { var sv = localStorage.getItem(C.prefix + 'Klap_' + klapId); if (sv) open = sv == '1'; } catch (x) {}
      var zet = function () { g.classList.toggle('dicht', !open); n.textContent = open ? 'inklappen ▲' : 'uitklappen ▼'; };
      h.addEventListener('click', function () { open = !open; try { localStorage.setItem(C.prefix + 'Klap_' + klapId, open ? '1' : '0'); } catch (x) {} zet(); });
      zet();
    }
    g.appendChild(h); g.appendChild(b); g.body = b; g.head = h; return g;
  }
  function rij(g, label, sub) {
    var r = e('div', 'o-r' + (sub ? ' sub' : ''));
    if (label != null) r.appendChild(e('span', 'l', label));
    if (g) g.body.appendChild(r);
    return r;
  }
  function rijTekst(g, label, ids, fn, sub) {
    var r = rij(g, label, sub), v = e('span', 'v', '–');
    r.appendChild(v);
    var upd = function () { v.textContent = fn(); };
    (ids || []).forEach(function (id) { bind(id, upd); });
    r.zet = function (t) { v.textContent = t; }; r.waardeEl = v;
    try { upd(); } catch (x) {}
    return r;
  }
  function schakelaar(id, fn) {
    var s = e('span', 'o-sw'); s.setAttribute('role', 'switch'); s.tabIndex = 0;
    var klik = function () {
      var aan = !!waarde(id); s.classList.toggle('aan', !aan);
      if (fn) fn(!aan); else stuur('/' + id + '/' + (aan ? 'turn_off' : 'turn_on'));
    };
    s.addEventListener('click', klik);
    bind(id, function () { s.classList.toggle('aan', !!waarde(id)); });
    return s;
  }
  function rijSchakel(g, label, id, sub) {
    var r = rij(g, label, sub), n = e('span', 'o-n');
    n.appendChild(schakelaar(id)); n.appendChild(e('span', 'u', '')); r.appendChild(n);
    return r;
  }
  function rijGetal(g, label, id, sub) {
    var r = rij(g, label, sub), n = e('span', 'o-n'), inp = e('input'), u = e('span', 'u', ''), hint = e('span', 'o-hint');
    inp.type = 'number'; inp.inputMode = 'decimal'; hint.style.display = 'none';
    n.appendChild(hint); n.appendChild(inp); n.appendChild(u); r.appendChild(n);
    var grens = function () { var d = gegevens(id); return [+d.min_value, +d.max_value, +(d.step || 1)]; };
    inp.addEventListener('focus', function () { var gr = grens(); hint.className = 'o-hint'; hint.textContent = 'toegestaan: ' + gr[0] + ' – ' + gr[1] + ' ' + (gegevens(id).uom || ''); hint.style.display = ''; });
    inp.addEventListener('blur', function () { if (!inp.classList.contains('fout')) hint.style.display = 'none'; });
    inp.addEventListener('input', function () { inp.classList.remove('fout'); });
    inp.addEventListener('change', function () {
      var gr = grens(), v = parseFloat(String(inp.value).replace(',', '.'));
      if (isNaN(v) || v < gr[0] || v > gr[1]) { inp.classList.add('fout'); hint.className = 'o-hint fout'; hint.textContent = 'kies ' + gr[0] + ' – ' + gr[1]; hint.style.display = ''; return; }
      inp.classList.remove('fout'); hint.style.display = 'none'; stuur('/' + id + '/set?value=' + encodeURIComponent(v));
    });
    bind(id, function () {
      var d = gegevens(id); u.textContent = d.uom || '';
      inp.min = d.min_value; inp.max = d.max_value; inp.step = d.step || 1;
      if (document.activeElement !== inp && d.value !== undefined) inp.value = d.value;
    });
    return r;
  }
  function invoer(soort, opties) {
    var i = e('input', 'o-ww'); i.type = soort || 'text';
    Object.keys(opties || {}).forEach(function (k) { i[k] = opties[k]; });
    return i;
  }
  function rijInvoer(g, label, i, knoppen, sub) {
    var r = rij(g, label, sub); r.appendChild(i);
    (knoppen || []).forEach(function (k) { r.appendChild(k); });
    return r;
  }
  function knop(tekst, cls, fn) { var b = e('button', 'o-bt' + (cls ? ' ' + cls : ''), tekst); b.type = 'button'; if (fn) b.addEventListener('click', fn); return b; }
  function rijKnoppen(g, label, knoppen, sub) {
    var r = rij(g, label, sub);
    knoppen.forEach(function (k) { r.appendChild(k); });
    return r;
  }
  function rijLink(g, tekst, href) {
    var r = rij(g, null), a = e('a', null, tekst);
    a.href = href; a.target = '_blank'; a.style.color = 'var(--accent)'; r.appendChild(a);
    return r;
  }
  function melding(r) { var m = e('span', 'l', ''); m.style.color = 'var(--zacht)'; r.insertBefore(m, r.firstChild); return m; }

  // Bevestigingsvenster: Annuleren is grijs met rode tekst, de bevestigknop is rood.
  function vraag(titel, regels, jaTekst, fn, jaCls) {
    var o = e('div', 'o-dlg'), d = e('div', 'o-dlgb'), m = e('p', null, ''), k = e('div', 'o-dlgk');
    d.appendChild(e('b', null, titel));
    (regels || []).forEach(function (t) { d.appendChild(e('p', null, t)); });
    m.style.color = 'var(--zacht)';
    var ann = knop('Annuleren', 'annuleer', function () { o.remove(); });
    var ja = knop(jaTekst, jaCls || 'stop', function () {
      ja.disabled = ann.disabled = true; m.textContent = 'Bezig…';
      fn(function (tekst, gelukt) { m.textContent = tekst; if (!gelukt) ja.disabled = ann.disabled = false; });
    });
    k.appendChild(ann); k.appendChild(ja); d.appendChild(m); d.appendChild(k); o.appendChild(d);
    document.body.appendChild(o); return o;
  }

  // Standaardrijen voor de groep Systeem, gelijk op alle apparaten.
  function rijWachtwoord(g) {
    var mk = function (label) { var r = rij(g, label), i = e('input', 'o-ww'); i.type = 'password'; i.autocomplete = 'new-password'; r.appendChild(i); return i; };
    var w1 = mk('Nieuw wachtwoord'), w2 = mk('Herhaal wachtwoord');
    var r = rij(g, null), wm = e('span', 'l', ''); wm.style.color = 'var(--zacht)'; r.appendChild(wm);
    r.appendChild(knop('Opslaan', 'opslaan', function () {
      var a = w1.value, b = w2.value; wm.style.color = 'var(--rood)';
      if (a.length < 5 || a.length > 23 || /[^\x21-\x7e]/.test(a)) { wm.textContent = 'Gebruik 5 tot 23 tekens, zonder spaties'; return; }
      if (a !== b) { wm.textContent = 'De wachtwoorden zijn niet gelijk'; return; }
      wm.style.color = 'var(--zacht)'; wm.textContent = 'Bezig met opslaan…';
      post('/wachtwoord-wijzigen', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'nieuw=' + encodeURIComponent(a) })
        .then(function (res) { return res.text().then(function (t) { return [res.ok, t]; }); })
        .then(function (x) {
          wm.style.color = x[0] ? 'var(--groen)' : 'var(--rood)';
          wm.textContent = x[0] ? 'Opgeslagen – log opnieuw in' : x[1];
          if (x[0]) { w1.value = w2.value = ''; setTimeout(function () { location.reload(); }, 2500); }
        })
        .catch(function () { wm.style.color = 'var(--rood)'; wm.textContent = 'Opslaan mislukt'; });
    }));
    return r;
  }
  function rijReset(g, instelnetwerk) {
    return rijKnoppen(g, 'Wifi en wachtwoord resetten', [knop('Fabrieksreset', 'stop', function () {
      vraag('Fabrieksreset', [
        'De wifi-instellingen worden gewist en het wachtwoord van de webpagina wordt weer admin. Uw instellingen en meetgegevens blijven bewaard.',
        'Daarna start het instelnetwerk "' + instelnetwerk + '". Verbind daarmee om het apparaat opnieuw in te stellen.'
      ], 'Reset', function (klaar) {
        post('/fabrieksreset').then(function (res) { return res.text().then(function (t) { if (!res.ok) throw 0; klaar(t, true); }); })
          .catch(function () { klaar('De reset is mislukt.', false); });
      });
    })]);
  }
  function rijUpdate(g) {
    var r = e('form', 'o-r'); r.method = 'POST'; r.action = '/update'; r.enctype = 'multipart/form-data';
    var f = e('input'); f.type = 'file'; f.name = 'update'; f.accept = '.bin,application/octet-stream'; f.style.flex = '1'; f.style.minWidth = '0';
    r.appendChild(f); r.appendChild(knop('Update', 'start', function () { if (f.files.length) r.submit(); }));
    g.body.appendChild(r); return r;
  }
  function logVak(g) { var pre = e('pre'); pre.id = 'o-log'; g.body.appendChild(pre); return pre; }

  function start(cfg) {
    C.prefix = cfg.prefix || 'smit'; C.titel = cfg.titel || 'Apparaat'; C.versie = cfg.versie || '';
    var klaar = false;
    function bouw() {
      var app = document.getElementById(cfg.app || 'smit-app');
      if (!app && document.body) { app = e('div'); app.id = cfg.app || 'smit-app'; document.body.insertBefore(app, document.body.firstChild); }
      if (!app || klaar) return;
      var oud = document.querySelector('esp-app'); if (oud) oud.remove();
      klaar = true; app.classList.add('o-app'); app.textContent = '';
      if (!document.title) document.title = C.titel;
      var top = e('div', 'o-top'), dot = e('span', 'o-dot'), s = e('span', 's', '');
      top.appendChild(dot); top.appendChild(e('h1', null, C.titel)); top.appendChild(s);
      var THEMA = ['auto', 'licht', 'donker'], TT = { auto: '◐ Auto', licht: '☀ Licht', donker: '☾ Donker' }, thema = 'auto';
      try { var tv = localStorage.getItem(C.prefix + 'Thema'); if (THEMA.indexOf(tv) >= 0) thema = tv; } catch (x) {}
      var tk = e('button', 'o-thema'); tk.type = 'button'; tk.title = 'Licht / donker';
      var zetThema = function () {
        var rt = document.documentElement;
        if (thema == 'licht') rt.setAttribute('data-theme', 'light'); else if (thema == 'donker') rt.setAttribute('data-theme', 'dark'); else rt.removeAttribute('data-theme');
        tk.textContent = TT[thema]; window.dispatchEvent(new Event('resize'));
      };
      tk.addEventListener('click', function () { thema = THEMA[(THEMA.indexOf(thema) + 1) % 3]; try { localStorage.setItem(C.prefix + 'Thema', thema); } catch (x) {} zetThema(); });
      top.appendChild(tk); zetThema(); app.appendChild(top);
      var kol = e('div', 'o-kol'), L = e('div'), R = e('div'); kol.appendChild(L); kol.appendChild(R); app.appendChild(kol);

      var pre = cfg.bouw(API, L, R) || null;

      var src = window.source || new EventSource('/events');
      window.source = src;
      var laatste = 0;
      src.addEventListener('state', function (ev) {
        var d; try { d = JSON.parse(ev.data); } catch (x) { return; }
        S[d.id] = Object.assign(S[d.id] || {}, d); laatste = Date.now();
        (BIND[d.id] || []).forEach(function (fn) { fn(); });
      });
      src.addEventListener('ping', function (ev) {
        laatste = Date.now();
        try {
          var p = JSON.parse(ev.data);
          if (p.uptime !== undefined) {
            var u = +p.uptime;
            s.textContent = 'v' + C.versie + ' · gestart ' + Math.floor(u / 86400) + 'd ' + Math.floor(u / 3600 % 24) + 'u ' + Math.floor(u / 60 % 60) + 'm geleden';
          }
        } catch (x) {}
      });
      if (pre) src.addEventListener('log', function (ev) {
        var t = String(ev.data).replace(/\x1b\[[0-9;]*m/g, ''), nu = new Date().toLocaleTimeString('nl-NL');
        pre.textContent += nu + '  ' + t + '\n';
        var regels = pre.textContent.split('\n'); if (regels.length > 120) pre.textContent = regels.slice(-120).join('\n');
        pre.scrollTop = pre.scrollHeight;
      });
      setInterval(function () { dot.classList.toggle('aan', Date.now() - laatste < 15000); }, 1000);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bouw); else bouw();
    setTimeout(bouw, 500);
  }

  var API = {
    e: e, post: post, stuur: stuur, waarde: waarde, gegevens: gegevens, getal: getal, jn: jn, tekst: tekst, bind: bind,
    groep: groep, rij: rij, rijTekst: rijTekst, rijSchakel: rijSchakel, rijGetal: rijGetal, rijKnoppen: rijKnoppen,
    rijLink: rijLink, schakelaar: schakelaar, knop: knop, melding: melding, vraag: vraag,
    invoer: invoer, rijInvoer: rijInvoer,
    rijWachtwoord: rijWachtwoord, rijReset: rijReset, rijUpdate: rijUpdate, logVak: logVak, start: start
  };
  window.SmitUI = API;
})();
