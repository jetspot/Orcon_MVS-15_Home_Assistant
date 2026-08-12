# Orcon Fan Box for Home Assistant

Complete English version of the OrconFanBox firmware, Home Assistant integration, dashboard card, and documentation.

> [!IMPORTANT]
> First flash the supplied new ESPHome firmware from `firmware/orconfanbox.yaml` to the D1 mini. Without this firmware, the documented entities and Home Assistant dashboard card will not work correctly.

## New functions in this firmware

- first-time Wi-Fi provisioning through the temporary **OrconFanBox Setup** access point and captive portal;
- direct Home Assistant connection through the native ESPHome API;
- subsequent firmware updates over OTA without reconnecting the D1 mini over USB;
- native fan control with an adjustable speed from 0 to 100%;
- PWM speed control through D6;
- separate low (30%), medium (60%), and high (100%) controls;
- a 15-minute boost with a cancel control;
- automatic humidity control with adjustable start and stop thresholds;
- manual bypass relay control through `Orcon_Fan_Bypass`;
- automatic bypass activation while the fan is running and deactivation when it stops;
- temperature, humidity, and pressure measurements with an optional BME280;
- tachometer measurement of the actual fan speed;
- delayed fan-failure detection when the fan is enabled but no speed is measured;
- `Orcon_Fan_Status` sensor reporting `OK` or `Error`;
- measurement of the original Orcon control's speed request as pulse length;
- ready-to-use Home Assistant dashboard card for speed, power, and bypass.

![OrconWifiController](https://img.tindie.com/images/resize/xVi-TWmrzJDUIydKNFNMLN5Bqb4=/p/1200x630/smart/i/639182/products/2023-01-22T21:02:18.328Z-20221230_113158.jpg?1674392573)

[View the OrconWifiController on Tindie](https://www.tindie.com/products/hjhickinson/orconwificontroller-for-orcon-mvs-15/)

## Contents

- `firmware/orconfanbox.yaml` - ESPHome firmware
- `dashboard/orconfanbox-card.yaml` - Home Assistant dashboard card
- `INSTALLATION.md` - installation and commissioning
- `FLASH_FIRMWARE.md` - step-by-step D1 mini firmware installation

## Wi-Fi setup

The public firmware contains no personal Wi-Fi credentials. After first boot:

1. Connect to **OrconFanBox Setup**.
2. Open `http://192.168.4.1` if the portal does not appear automatically.
3. Select the local Wi-Fi network and enter its password.
4. After reboot, the device is normally available at `orconfanbox.local`.

## Home Assistant entities

The firmware exposes these nineteen entities:

- `fan.orconfanbox_orcon_fan_speed` - fan power and speed from 0-100%;
- `switch.orconfanbox_orcon_fan_bypass` - manual bypass;
- `switch.orconfanbox_orcon_humidity_automatic` - automatic humidity control;
- `button.orconfanbox_orcon_fan_low` - low speed, 30%;
- `button.orconfanbox_orcon_fan_medium` - medium speed, 60%;
- `button.orconfanbox_orcon_fan_high` - high speed, 100%;
- `button.orconfanbox_orcon_fan_boost_15_minutes` - 15-minute boost;
- `button.orconfanbox_orcon_fan_boost_cancel` - cancel boost and stop the fan;
- `number.orconfanbox_orcon_humidity_start` - automatic-humidity start threshold;
- `number.orconfanbox_orcon_humidity_stop` - automatic-humidity stop threshold;
- `number.orconfanbox_orcon_humidity_fan_speed` - adjustable fan speed for high humidity, default 80%;
- `number.orconfanbox_orcon_fan_boost_minutes` - adjustable boost duration, default 15 minutes;
- `sensor.orconfanbox_orcon_air_temp` - air temperature;
- `sensor.orconfanbox_orcon_air_pressure` - air pressure;
- `sensor.orconfanbox_orcon_air_humidity` - air humidity;
- `sensor.orconfanbox_orcon_fan_tacho` - actual fan speed;
- `sensor.orconfanbox_orcon_fan_speed_requested` - original-control request;
- `sensor.orconfanbox_orcon_fan_status` - fan status `OK` or `Error`.
- `update.orconfanbox_firmware` - standard disabled ESPHome entity for firmware updates.

Home Assistant may generate slightly different entity IDs depending on device naming. Always verify the entity list of the ESPHome device.

The firmware automatically enables the bypass while the fan is running and disables it when the fan stops.

## Safety

Isolate the installation and have 230 V work performed by a suitably qualified person.
