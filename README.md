# Orcon MVS-15 Home Assistant

![Orcon MVS-15 ventilation unit](Info/image.png)

![OrconWifiController](https://img.tindie.com/images/resize/xVi-TWmrzJDUIydKNFNMLN5Bqb4=/p/1200x630/smart/i/639182/products/2023-01-22T21:02:18.328Z-20221230_113158.jpg?1674392573)

[OrconWifiController product page on Tindie](https://www.tindie.com/products/hjhickinson/orconwificontroller-for-orcon-mvs-15/)

---

## English

ESPHome firmware and documentation for controlling an Orcon MVS-15 ventilation unit with Home Assistant.

> [!IMPORTANT]
> First flash the supplied new ESPHome firmware to the D1 mini. Without this firmware, the documented entities and dashboard card will not work correctly.

### Features

- Wi-Fi provisioning through **OrconFanBox Setup** and the captive portal;
- native ESPHome API and wireless OTA updates;
- fan speed adjustable from 0 to 100% through PWM on D6;
- separate low (30%), medium (60%), and high (100%) controls;
- 15-minute boost with a cancel control;
- automatic humidity control with adjustable start and stop thresholds;
- manual and automatic bypass relay control;
- temperature, humidity, and pressure measurements with an optional BME280;
- tachometer measurement of the actual fan speed;
- delayed fan-failure detection;
- `Orcon_Fan_Status` sensor reporting `OK` or `Error`;
- measurement of the original Orcon control request as pulse length;
- ready-to-use Home Assistant dashboard card.

[Open the complete English guide](EN/README.md)

The firmware exposes these seventeen entities:

fan.orconfanbox_orcon_fan_speed - fan power and speed from 0-100%;
switch.orconfanbox_orcon_fan_bypass - manual bypass;
switch.orconfanbox_orcon_humidity_automatic - automatic humidity control;
button.orconfanbox_orcon_fan_low - low speed, 30%;
button.orconfanbox_orcon_fan_medium - medium speed, 60%;
button.orconfanbox_orcon_fan_high - high speed, 100%;
button.orconfanbox_orcon_fan_boost_15_minutes - 15-minute boost;
button.orconfanbox_orcon_fan_boost_cancel - cancel boost and stop the fan;
number.orconfanbox_orcon_humidity_start - automatic-humidity start threshold;
number.orconfanbox_orcon_humidity_stop - automatic-humidity stop threshold;
sensor.orconfanbox_orcon_air_temp - air temperature;
sensor.orconfanbox_orcon_air_pressure - air pressure;
sensor.orconfanbox_orcon_air_humidity - air humidity;
sensor.orconfanbox_orcon_fan_tacho - actual fan speed;
sensor.orconfanbox_orcon_fan_speed_requested - original-control request;
sensor.orconfanbox_orcon_fan_status - fan status OK or Error.
update.orconfanbox_firmware - standard disabled ESPHome entity for firmware updates.
Home Assistant may generate slightly different entity IDs depending on device naming. Always verify the entity list of the ESPHome device.

The firmware automatically enables the bypass while the fan is running and disables it when the fan stops.
---

## Nederlands

ESPHome-firmware en documentatie voor het bedienen van een Orcon MVS-15-ventilatie-unit met Home Assistant.

> [!IMPORTANT]
> Zet eerst de meegeleverde nieuwe ESPHome-firmware op de D1 mini. Zonder deze firmware werken de beschreven entiteiten en dashboardkaart niet correct.

### Functies

- Wi-Fi-configuratie via **OrconFanBox Setup** en de captive portal;
- native ESPHome API en draadloze OTA-updates;
- ventilatorsnelheid instelbaar van 0 tot 100% via PWM op D6;
- aparte knoppen voor laag (30%), middel (60%) en hoog (100%);
- booststand van 15 minuten met annuleerknop;
- automatische vochtregeling met instelbare start- en stopgrenzen;
- handmatige en automatische bediening van het bypassrelais;
- temperatuur-, luchtvochtigheids- en luchtdrukmeting met een optionele BME280;
- tachometermeting van het werkelijke toerental;
- vertraagde detectie van een ventilatorstoring;
- statussensor `Orcon_Fan_Status` met `OK` of `Error`;
- uitlezing van het verzoek van de originele Orcon-bediening als pulslengte;
- kant-en-klare Home Assistant-dashboardkaart.

[Open de volledige Nederlandse handleiding](NL/README.md)

The firmware exposes these seventeen entities:

fan.orconfanbox_orcon_fan_speed - fan power and speed from 0-100%;
switch.orconfanbox_orcon_fan_bypass - manual bypass;
switch.orconfanbox_orcon_humidity_automatic - automatic humidity control;
button.orconfanbox_orcon_fan_low - low speed, 30%;
button.orconfanbox_orcon_fan_medium - medium speed, 60%;
button.orconfanbox_orcon_fan_high - high speed, 100%;
button.orconfanbox_orcon_fan_boost_15_minutes - 15-minute boost;
button.orconfanbox_orcon_fan_boost_cancel - cancel boost and stop the fan;
number.orconfanbox_orcon_humidity_start - automatic-humidity start threshold;
number.orconfanbox_orcon_humidity_stop - automatic-humidity stop threshold;
sensor.orconfanbox_orcon_air_temp - air temperature;
sensor.orconfanbox_orcon_air_pressure - air pressure;
sensor.orconfanbox_orcon_air_humidity - air humidity;
sensor.orconfanbox_orcon_fan_tacho - actual fan speed;
sensor.orconfanbox_orcon_fan_speed_requested - original-control request;
sensor.orconfanbox_orcon_fan_status - fan status OK or Error.
update.orconfanbox_firmware - standard disabled ESPHome entity for firmware updates.
Home Assistant may generate slightly different entity IDs depending on device naming. Always verify the entity list of the ESPHome device.

The firmware automatically enables the bypass while the fan is running and disables it when the fan stops.

---

## Deutsch

ESPHome-Firmware und Dokumentation zur Steuerung einer Orcon-MVS-15-Lüftungsanlage mit Home Assistant.

> [!IMPORTANT]
> Zuerst muss die mitgelieferte neue ESPHome-Firmware auf den D1 mini geflasht werden. Ohne diese Firmware funktionieren die beschriebenen Entitäten und die Dashboardkarte nicht korrekt.

### Funktionen

- WLAN-Einrichtung über **OrconFanBox Setup** und das Captive Portal;
- native ESPHome-API und drahtlose OTA-Updates;
- Ventilatordrehzahl von 0 bis 100% über PWM an D6 einstellbar;
- separate Bedienelemente für niedrig (30%), mittel (60%) und hoch (100%);
- 15-Minuten-Boost mit Abbruchfunktion;
- automatische Feuchteregelung mit einstellbaren Start- und Stoppgrenzen;
- manuelle und automatische Steuerung des Bypass-Relais;
- Messung von Temperatur, Luftfeuchtigkeit und Luftdruck mit einem optionalen BME280;
- Tachometermessung der tatsächlichen Ventilatordrehzahl;
- verzögerte Erkennung eines Ventilatorfehlers;
- Statussensor `Orcon_Fan_Status` mit `OK` oder `Error`;
- Messung der Anforderung der originalen Orcon-Steuerung als Pulslänge;
- einsatzbereite Home-Assistant-Dashboardkarte.

[Vollständige deutsche Anleitung öffnen](DE/README.md)

The firmware exposes these seventeen entities:

fan.orconfanbox_orcon_fan_speed - fan power and speed from 0-100%;
switch.orconfanbox_orcon_fan_bypass - manual bypass;
switch.orconfanbox_orcon_humidity_automatic - automatic humidity control;
button.orconfanbox_orcon_fan_low - low speed, 30%;
button.orconfanbox_orcon_fan_medium - medium speed, 60%;
button.orconfanbox_orcon_fan_high - high speed, 100%;
button.orconfanbox_orcon_fan_boost_15_minutes - 15-minute boost;
button.orconfanbox_orcon_fan_boost_cancel - cancel boost and stop the fan;
number.orconfanbox_orcon_humidity_start - automatic-humidity start threshold;
number.orconfanbox_orcon_humidity_stop - automatic-humidity stop threshold;
sensor.orconfanbox_orcon_air_temp - air temperature;
sensor.orconfanbox_orcon_air_pressure - air pressure;
sensor.orconfanbox_orcon_air_humidity - air humidity;
sensor.orconfanbox_orcon_fan_tacho - actual fan speed;
sensor.orconfanbox_orcon_fan_speed_requested - original-control request;
sensor.orconfanbox_orcon_fan_status - fan status OK or Error.
update.orconfanbox_firmware - standard disabled ESPHome entity for firmware updates.
Home Assistant may generate slightly different entity IDs depending on device naming. Always verify the entity list of the ESPHome device.

The firmware automatically enables the bypass while the fan is running and disables it when the fan stops.
