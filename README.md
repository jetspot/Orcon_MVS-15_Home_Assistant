# Orcon MVS-15 Home Assistant

ESPHome firmware and documentation for controlling an Orcon MVS-15 ventilation unit with Home Assistant.

> [!IMPORTANT]
> The supplied ESPHome firmware must be flashed to the D1 mini before using this Home Assistant configuration. / De meegeleverde ESPHome-firmware moet eerst op de D1 mini worden gezet voordat deze Home Assistant-configuratie kan worden gebruikt. / Die mitgelieferte ESPHome-Firmware muss zuerst auf den D1 mini geflasht werden.

## New firmware functions / Nieuwe firmwarefuncties / Neue Firmwarefunktionen

- first-time Wi-Fi provisioning through the temporary **OrconFanBox Setup** access point and captive portal;
- direct Home Assistant connection through the native ESPHome API;
- subsequent firmware updates over OTA without reconnecting the D1 mini over USB;
- native fan control with a percentage speed setting;
- PWM speed control through D6;
- separate low (30%), medium (60%), and high (100%) controls;
- a 15-minute boost with a cancel control;
- automatic humidity control with adjustable start and stop thresholds;
- manual bypass relay control through `Orcon_Unit_Bypass`;
- automatic bypass activation while the fan is running and deactivation when it stops;
- temperature, humidity, and pressure measurements with an optional BME280;
- tachometer measurement of the actual fan speed;
- delayed fan-failure detection when the fan is enabled but no speed is measured;
- `Orcon_Fan` status sensor reporting `OK` or `Error`;
- measurement of the original Orcon control's speed request as pulse length;
- ready-to-use Home Assistant dashboard cards in Dutch, English, and German.

![OrconWifiController](https://img.tindie.com/images/resize/xVi-TWmrzJDUIydKNFNMLN5Bqb4=/p/1200x630/smart/i/639182/products/2023-01-22T21:02:18.328Z-20221230_113158.jpg?1674392573)

[OrconWifiController product page on Tindie](https://www.tindie.com/products/hjhickinson/orconwificontroller-for-orcon-mvs-15/)

## Choose your language / Kies je taal

- [Nederlands](NL/README.md)
- [English](EN/README.md)
- [Deutsch](DE/README.md)

Each language folder contains the guide, installation instructions, dashboard card, and the same unmodified ESPHome firmware.

Elke taalmap bevat de handleiding, installatie-instructies, dashboardkaart en dezelfde ongewijzigde ESPHome-firmware.

Jeder Sprachordner enthält die Anleitung, Installationshinweise, Dashboardkarte und dieselbe unveränderte ESPHome-Firmware.
