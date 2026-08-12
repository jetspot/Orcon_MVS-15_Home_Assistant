# Installatie en ingebruikname

## Veiligheid

Schakel de installatie spanningsloos, verifieer dit en laat werkzaamheden aan netspanning uitvoeren door iemand met de juiste kennis.

## Eerste Wi-Fi-configuratie

1. Flash `firmware/orconfanbox.yaml` op de D1 mini.
2. Verbind met **OrconFanBox Setup**.
3. Open zo nodig `http://192.168.4.1`.
4. Kies het eigen Wi-Fi-netwerk en voer het wachtwoord in.
5. Na de herstart is het apparaat normaal bereikbaar als `orconfanbox.local`.

## Home Assistant

Controleer deze functies:

- ventilator: `orcon_fan_speed`;
- relais/bypass: `orcon_speed_bypass`;
- toerental: `orcon_tacho`;
- verzoek van de originele bediening: `orcon_speed_requested`.

## Diagnose

- Geen BME280: controleer voeding, GND, SDA, SCL en adres `0x76` of `0x77`.
- Geen Wi-Fi: configureer opnieuw via het tijdelijke accesspoint.
- Geen toerental: controleer de D5/tacho-aansluiting.
