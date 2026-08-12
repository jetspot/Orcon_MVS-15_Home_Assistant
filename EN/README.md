# Orcon Fan Box for Home Assistant

Complete English version of the OrconFanBox firmware, Home Assistant integration, dashboard card, and documentation.

> [!IMPORTANT]
> First flash the supplied new ESPHome firmware from `firmware/orconfanbox.yaml` to the D1 mini. Without this firmware, the documented entities and Home Assistant dashboard card will not work correctly.

## New functions in this firmware

- native fan control with an adjustable speed from 0 to 100%;
- separate low, medium, and high controls;
- a 15-minute boost with a cancel control;
- automatic humidity control with adjustable start and stop thresholds;
- automatic bypass switching while the fan is running;
- temperature, humidity, and pressure measurements with an optional BME280;
- tachometer monitoring and fan-failure detection;
- measurement of the speed request from the original Orcon control.

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

## Home Assistant

Typical entities are:

```text
fan.orconfanbox_orcon_fan_speed
switch.orconfanbox_orcon_unit_bypass
sensor.orconfanbox_orcon_tacho
sensor.orconfanbox_orcon_speed_requested
```

The firmware automatically enables the bypass while the fan is running and disables it when the fan stops.

## Safety

Isolate the installation and have 230 V work performed by a suitably qualified person.
