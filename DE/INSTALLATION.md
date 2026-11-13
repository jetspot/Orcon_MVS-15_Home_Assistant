# Anschluss und Inbetriebnahme

## Sicherheit

Schalten Sie die Anlage spannungsfrei, prüfen Sie dies, und lassen Sie Arbeiten an Netzspannung von einer Fachkraft ausführen.

## Anschlüsse D1 mini

| Pin | Funktion |
|---|---|
| D6 | PWM-Steuerung Lüfter (50 kHz) |
| D5 | Tacho (Drehzahl) |
| D8 | Bypass-Relais |
| D7 | Signal der originalen Orcon-Bedienung |
| D2 / D1 | BME280 SDA / SCL (Adresse 0x76) |

## Erster Start

1. Firmware flashen (siehe [FIRMWARE_INSTALLIEREN.md](FIRMWARE_INSTALLIEREN.md)).
2. `http://orconfanbox.local` öffnen (admin / admin).
3. Unter **Overzicht** Feuchte, Temperatur und Drehzahl prüfen.
4. Unter **Ventilatorstanden** die normale Drehzahl einstellen.
5. Die Baseline (normale Luftfeuchtigkeit) stellt sich in den ersten Stunden selbst ein.

## Probleme

- **Keine Feuchte/Temperatur:** Versorgung, GND, SDA/SCL und Adresse 0x76/0x77 prüfen.
- **Keine Drehzahl:** Tacho-Anschluss an D5 prüfen.
- **Box startet von selbst neu:** unter `/diag` Neustartgrund und niedrigste Speicherwerte prüfen.
