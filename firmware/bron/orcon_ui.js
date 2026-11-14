;(function () {
  'use strict';
  // Webpagina OrconFanBox. De opmaak komt uit smit_webgui.js (gedeeld met de andere ESP's).
  // Namen in Home Assistant blijven ongewijzigd; dit is alleen de webpagina.
  var VERSIE = '__VERSIE__';
  var st = document.createElement('style');
  st.textContent = '#orc-grafiek-plek .tab-header{display:none}#orc-grafiek-plek #orcGrafiekBox{margin:0!important}';
  document.head.appendChild(st);

  SmitUI.start({
    app: 'orc-app', prefix: 'orc', titel: 'OrconFanBox', versie: VERSIE,
    bouw: function (U, L, R) {
      var e = U.e, waarde = U.waarde, getal = U.getal, jn = U.jn;

      var g = U.groep('Overzicht', '◉', 'overzicht');
      U.rijTekst(g, 'Status', ['text_sensor/Orcon_Status_Info'], function () { return waarde('text_sensor/Orcon_Status_Info') || '–'; });
      U.rijTekst(g, 'Ventilator', ['sensor/Orcon_Fan_Percentage', 'sensor/Orcon_Fan_Tacho'], function () { return getal('sensor/Orcon_Fan_Percentage', 0) + ' %  ·  ' + getal('sensor/Orcon_Fan_Tacho', 0) + ' p/min'; });
      U.rijTekst(g, 'Vocht / baseline / stijging', ['sensor/Orcon_Air_Humidity', 'sensor/Orcon_Humidity_Baseline', 'sensor/Orcon_Humidity_Rise'], function () { return getal('sensor/Orcon_Air_Humidity', 1) + ' / ' + getal('sensor/Orcon_Humidity_Baseline', 1) + ' / ' + getal('sensor/Orcon_Humidity_Rise', 1) + ' %'; });
      U.rijTekst(g, 'Piek / laagste na boost', ['sensor/Orcon_Humidity_Peak', 'sensor/Orcon_Humidity_Post_Min'], function () { return getal('sensor/Orcon_Humidity_Peak', 1) + ' / ' + getal('sensor/Orcon_Humidity_Post_Min', 1) + ' %'; });
      U.rijTekst(g, 'Temperatuur / luchtdruk', ['sensor/Orcon_Air_Temp', 'sensor/Orcon_Air_Pressure'], function () { return getal('sensor/Orcon_Air_Temp', 1) + ' °C  ·  ' + getal('sensor/Orcon_Air_Pressure', 0) + ' hPa'; });
      U.rijTekst(g, 'Vochtboost / storing', ['binary_sensor/Orcon_Humidity_Boost', 'binary_sensor/Orcon_Fan_Failure', 'text_sensor/Orcon_Fan_Status'], function () { return jn('binary_sensor/Orcon_Humidity_Boost') + ' / ' + jn('binary_sensor/Orcon_Fan_Failure') + ' (' + (waarde('text_sensor/Orcon_Fan_Status') || '–') + ')'; });
      L.appendChild(g);

      g = U.groep('Bediening', '⚙', 'bediening');
      var r = U.rij(g, 'Ventilator'), sl = e('input', 'o-slider'), sv = e('span', 'u', '');
      r.firstChild.style.flex = '0 0 auto';
      sl.type = 'range'; sl.min = 0; sl.max = 100; sl.step = 1;
      r.appendChild(sl);
      var fn = e('span', 'o-n'); fn.appendChild(U.schakelaar('fan/Orcon_Fan_Speed')); fn.appendChild(sv); r.appendChild(fn);
      var schuift = false;
      sl.addEventListener('input', function () { schuift = true; sv.textContent = sl.value + '%'; });
      sl.addEventListener('change', function () { schuift = false; U.stuur('/fan/Orcon_Fan_Speed/turn_on?speed_level=' + sl.value); });
      U.bind('fan/Orcon_Fan_Speed', function () { var d = U.gegevens('fan/Orcon_Fan_Speed'); if (!schuift && d.speed_level !== undefined) { sl.value = d.speed_level; sv.textContent = d.speed_level + '%'; } });
      U.rijSchakel(g, 'Bypass', 'switch/Orcon_Fan_Bypass');
      U.rijSchakel(g, 'Automatisch (vocht)', 'switch/Orcon_Humidity_Automatic');
      U.rijKnoppen(g, 'Stand', [
        U.knop('Laag', '', function () { U.stuur('/button/Orcon_Fan_Low/press'); }),
        U.knop('Midden', '', function () { U.stuur('/button/Orcon_Fan_Medium/press'); }),
        U.knop('Hoog', '', function () { U.stuur('/button/Orcon_Fan_High/press'); })
      ]);
      var bk = U.knop('Start', 'start', function () { U.stuur('/button/Orcon_Fan_Boost_15_Minutes/press'); });
      U.bind('number/Orcon_Fan_Boost_Minutes', function () { var v = waarde('number/Orcon_Fan_Boost_Minutes'); bk.textContent = (v !== undefined && v !== null && v !== '') ? 'Start ' + Math.round(+v) + ' min' : 'Start'; });
      U.rijKnoppen(g, 'Boost', [bk, U.knop('Stop', 'stop', function () { U.stuur('/button/Orcon_Fan_Boost_Cancel/press'); })]);
      L.appendChild(g);

      g = U.groep('Grafiek', '📈', 'grafiek');
      var plek = e('div'); plek.id = 'orc-grafiek-plek'; g.body.appendChild(plek); L.appendChild(g);

      g = U.groep('Systeem', '🛠', 'systeem', true);
      U.rijTekst(g, 'Firmware', [], function () { return 'v' + VERSIE; });
      U.rijTekst(g, 'Gevraagde snelheid (diagnose)', ['sensor/Orcon_Fan_Speed_Requested'], function () { return U.tekst('sensor/Orcon_Fan_Speed_Requested'); });
      U.rijLink(g, 'Diagnose (/diag) openen', '/diag');
      U.rijWachtwoord(g);
      U.rijReset(g, 'OrconFanBox Setup');
      U.rijUpdate(g);
      var pre = U.logVak(g);
      L.appendChild(g);

      g = U.groep('Ventilatorstanden', '🌀', 'standen');
      U.rijGetal(g, 'Normaal', 'number/Orcon_Normal_Fan_Speed');
      U.rijGetal(g, 'Laag', 'number/Orcon_Fan_Low_Speed');
      U.rijGetal(g, 'Midden', 'number/Orcon_Fan_Medium_Speed');
      U.rijGetal(g, 'Hoog', 'number/Orcon_Fan_High_Speed');
      U.rijGetal(g, 'Boostknop duur', 'number/Orcon_Fan_Boost_Minutes');
      R.appendChild(g);

      g = U.groep('Vochtboost', '💧', 'vochtboost');
      U.rijGetal(g, 'Start bij stijging', 'number/Orcon_Humidity_Rise_Start');
      U.rijGetal(g, 'Stop onder baseline +', 'number/Orcon_Humidity_Boost_Stop');
      U.rijGetal(g, 'Nafase klaar onder baseline +', 'number/Orcon_Humidity_Rise_Stop');
      U.rijGetal(g, 'Tweede douche bij stijging', 'number/Orcon_Humidity_Rise_Restart');
      U.rijGetal(g, 'Minimale duur', 'number/Orcon_Humidity_Min_Boost_Minutes');
      U.rijGetal(g, 'Maximale duur', 'number/Orcon_Humidity_Max_Boost_Minutes');
      U.rijSchakel(g, 'Variabele boost', 'switch/Orcon_Humidity_Variable_Boost');
      U.rijGetal(g, 'Snelheid bij start', 'number/Orcon_Humidity_Boost_Min_Speed', true);
      U.rijGetal(g, 'Snelheid max', 'number/Orcon_Humidity_Fan_Speed', true);
      U.rijGetal(g, 'Vol vermogen bij stijging', 'number/Orcon_Humidity_Full_Rise', true);
      U.rijGetal(g, 'Snelheid vol vermogen', 'number/Orcon_Humidity_Full_Speed', true);
      R.appendChild(g);

      g = U.groep('Nachtstand', '🌙', 'nacht');
      U.rijSchakel(g, 'Nachtstand', 'switch/Orcon_Night_Mode');
      U.rijGetal(g, 'Begin', 'number/Orcon_Night_Start_Hour');
      U.rijGetal(g, 'Einde', 'number/Orcon_Night_End_Hour');
      U.rijGetal(g, 'Snelheid', 'number/Orcon_Night_Fan_Speed');
      R.appendChild(g);

      g = U.groep('Afstandsbediening', '📡', 'afstand', true);
      U.rijSchakel(g, 'Afstandsbediening volgen', 'switch/Orcon_Remote_Control');
      U.rijTekst(g, 'Stand', ['text_sensor/Orcon_Remote_Stand'], function () { return waarde('text_sensor/Orcon_Remote_Stand') || '–'; });
      U.rijTekst(g, 'Puls / periode / frequentie', ['sensor/Orcon_Remote_Pulse_us', 'sensor/Orcon_Remote_Period_us', 'sensor/Orcon_Remote_Freq_Hz'], function () { return getal('sensor/Orcon_Remote_Pulse_us', 0) + ' us · ' + getal('sensor/Orcon_Remote_Period_us', 0) + ' us · ' + getal('sensor/Orcon_Remote_Freq_Hz', 0) + ' Hz'; });
      U.rijGetal(g, 'Kalibratie Auto', 'number/Orcon_Remote_Auto_us', true);
      U.rijGetal(g, 'Kalibratie Afwezig', 'number/Orcon_Remote_Afwezig_us', true);
      U.rijGetal(g, 'Kalibratie stand 1', 'number/Orcon_Remote_Stand1_us', true);
      U.rijGetal(g, 'Kalibratie stand 2', 'number/Orcon_Remote_Stand2_us', true);
      U.rijGetal(g, 'Kalibratie stand 3', 'number/Orcon_Remote_Stand3_us', true);
      U.rijGetal(g, 'Tolerantie', 'number/Orcon_Remote_Tolerance_us', true);
      R.appendChild(g);

      return pre;
    }
  });
})();
