# Installation und Inbetriebnahme

## Sicherheit

Die Anlage spannungsfrei schalten, den spannungsfreien Zustand prüfen und Arbeiten an Netzspannung durch eine qualifizierte Fachkraft ausführen lassen.

## Erste WLAN-Konfiguration

1. `firmware/orconfanbox.yaml` auf den D1 mini flashen.
2. Mit **OrconFanBox Setup** verbinden.
3. Falls erforderlich, `http://192.168.4.1` öffnen.
4. Das lokale WLAN auswählen und das Passwort eingeben.
5. Nach dem Neustart ist das Gerät normalerweise unter `orconfanbox.local` erreichbar.

## Home Assistant

Diese Funktionen prüfen:

- Ventilator: `orcon_fan_speed`;
- Relais/Bypass: `orcon_speed_bypass`;
- Drehzahlsensor: `orcon_tacho`;
- Anforderung der Originalsteuerung: `orcon_speed_requested`.

## Diagnose

- Kein BME280: Stromversorgung, Masse, SDA, SCL und Adresse `0x76` oder `0x77` prüfen.
- Kein WLAN: Netzwerk erneut über den temporären Zugangspunkt konfigurieren.
- Keine Drehzahlrückmeldung: D5/Tacho-Anschluss prüfen.
