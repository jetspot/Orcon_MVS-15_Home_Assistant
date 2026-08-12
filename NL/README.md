# Orcon Fan Box voor Home Assistant

Complete Nederlandstalige versie van de OrconFanBox-firmware, Home Assistant-integratie, dashboardkaart en documentatie.

> [!IMPORTANT]
> Zet eerst de meegeleverde nieuwe ESPHome-firmware uit `firmware/orconfanbox.yaml` op de D1 mini. Zonder deze firmware werken de beschreven entiteiten en de Home Assistant-dashboardkaart niet correct.

## Nieuwe functies in deze firmware

- eerste Wi-Fi-configuratie via het tijdelijke accesspoint **OrconFanBox Setup** en de captive portal;
- directe koppeling met Home Assistant via de native ESPHome API;
- volgende firmware-updates via OTA, zonder de D1 mini opnieuw via USB aan te sluiten;
- native ventilatorbediening met een instelbare snelheid van 0 tot 100%;
- PWM-snelheidsregeling via D6;
- aparte knoppen voor laag (30%), middel (60%) en hoog (100%);
- een booststand van 15 minuten met een annuleerknop;
- automatische vochtregeling met instelbare start- en stopgrenzen;
- handmatige bediening van het bypassrelais via `Orcon_Fan_Bypass`;
- automatisch inschakelen van de bypass wanneer de ventilator draait en uitschakelen wanneer hij stopt;
- meting van temperatuur, luchtvochtigheid en luchtdruk met een optionele BME280;
- tachometermeting van het werkelijke ventilatortoerental;
- vertraagde detectie van een ventilatorstoring wanneer de ventilator is ingeschakeld maar geen toerental wordt gemeten;
- statussensor `Orcon_Fan_Status` met `OK` of `Error`;
- uitlezing van het snelheidsverzoek van de originele Orcon-bediening als pulslengte;
- kant-en-klare Home Assistant-dashboardkaart voor snelheid, aan/uit en bypass.

![OrconWifiController](https://img.tindie.com/images/resize/xVi-TWmrzJDUIydKNFNMLN5Bqb4=/p/1200x630/smart/i/639182/products/2023-01-22T21:02:18.328Z-20221230_113158.jpg?1674392573)

[Bekijk de OrconWifiController op Tindie](https://www.tindie.com/products/hjhickinson/orconwificontroller-for-orcon-mvs-15/)

## Inhoud

- `firmware/orconfanbox.yaml` - ESPHome-firmware
- `dashboard/orconfanbox-card.yaml` - Home Assistant-dashboardkaart
- `INSTALLATIE.md` - installatie en ingebruikname
- `FIRMWARE_INSTALLEREN.md` - stap voor stap firmware op de D1 mini zetten

## Wi-Fi instellen

De openbare firmware bevat geen persoonlijke Wi-Fi-gegevens. Na de eerste start:

1. Verbind met **OrconFanBox Setup**.
2. Open zo nodig `http://192.168.4.1`.
3. Selecteer het eigen Wi-Fi-netwerk en voer het wachtwoord in.
4. Na de herstart is het apparaat normaal bereikbaar als `orconfanbox.local`.

## Home Assistant-entiteiten

De firmware biedt deze twintig entiteiten aan:

- `fan.orconfanbox_orcon_fan_speed` - ventilator aan/uit en snelheid 0-100%;
- `sensor.orconfanbox_orcon_fan_percentage` - huidige ingestelde ventilatorsnelheid in procenten;
- `switch.orconfanbox_orcon_fan_bypass` - handmatige bypass;
- `switch.orconfanbox_orcon_humidity_automatic` - automatische vochtregeling;
- `button.orconfanbox_orcon_fan_low` - lage stand, 30%;
- `button.orconfanbox_orcon_fan_medium` - middelste stand, 60%;
- `button.orconfanbox_orcon_fan_high` - hoge stand, 100%;
- `button.orconfanbox_orcon_fan_boost_15_minutes` - boost gedurende 15 minuten;
- `button.orconfanbox_orcon_fan_boost_cancel` - boost annuleren en ventilator stoppen;
- `number.orconfanbox_orcon_humidity_start` - startgrens automatische vochtregeling;
- `number.orconfanbox_orcon_humidity_stop` - stopgrens automatische vochtregeling;
- `number.orconfanbox_orcon_humidity_fan_speed` - instelbare ventilatorsnelheid bij hoge luchtvochtigheid, standaard 80%;
- `number.orconfanbox_orcon_fan_boost_minutes` - instelbare boostduur, standaard 15 minuten;
- `sensor.orconfanbox_orcon_air_temp` - luchttemperatuur;
- `sensor.orconfanbox_orcon_air_pressure` - luchtdruk;
- `sensor.orconfanbox_orcon_air_humidity` - luchtvochtigheid;
- `sensor.orconfanbox_orcon_fan_tacho` - werkelijk ventilatortoerental;
- `sensor.orconfanbox_orcon_fan_speed_requested` - verzoek van de originele bediening;
- `sensor.orconfanbox_orcon_fan_status` - ventilatorstatus `OK` of `Error`.
- `update.orconfanbox_firmware` - standaard uitgeschakelde ESPHome-entiteit voor firmware-updates.

Home Assistant kan afhankelijk van de naamgeving iets andere entiteits-ID's genereren. Controleer daarom altijd de entiteitslijst van het ESPHome-apparaat.

De firmware schakelt de bypass automatisch in wanneer de ventilator draait en uit wanneer de ventilator stopt.

## Veiligheid

Schakel de installatie spanningsloos en laat werkzaamheden aan 230 V door een deskundige uitvoeren.
