# Aansluiten en ingebruikname

## Veiligheid

Schakel de installatie spanningsloos, controleer dit, en laat werkzaamheden aan netspanning uitvoeren door iemand met de juiste kennis.

## Aansluitingen D1 mini

| Pin | Functie |
|---|---|
| D6 | PWM-sturing ventilator (50 kHz) |
| D5 | tachometer (toerental) |
| D8 | bypassrelais |
| D7 | signaal van de originele Orcon-bediening |
| D2 / D1 | BME280 SDA / SCL (adres 0x76) |

## Eerste start

1. Flash de firmware (zie [FIRMWARE_INSTALLEREN.md](FIRMWARE_INSTALLEREN.md)).
2. Open de webpagina `http://orconfanbox.local` (admin / admin).
3. Controleer onder **Overzicht** de vochtigheid, temperatuur en het toerental.
4. Stel onder **Ventilatorstanden** de normale snelheid in.
5. De baseline (normale luchtvochtigheid) stelt zich in de eerste uren vanzelf in.

## Problemen

- **Geen vochtigheid/temperatuur:** controleer voeding, GND, SDA/SCL en het adres 0x76/0x77.
- **Geen toerental:** controleer de tacho-aansluiting op D5.
- **Box herstart vanzelf:** kijk op `/diag` naar de herstartreden en de laagste geheugenwaarden.
