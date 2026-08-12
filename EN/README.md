# Orcon Fan Box for Home Assistant

Complete English version of the OrconFanBox firmware, Home Assistant integration, dashboard card, and documentation.

![OrconWifiController](https://img.tindie.com/images/resize/xVi-TWmrzJDUIydKNFNMLN5Bqb4=/p/1200x630/smart/i/639182/products/2023-01-22T21:02:18.328Z-20221230_113158.jpg?1674392573)

[View the OrconWifiController on Tindie](https://www.tindie.com/products/hjhickinson/orconwificontroller-for-orcon-mvs-15/)

## Contents

- `firmware/orconfanbox.yaml` - ESPHome firmware
- `dashboard/orconfanbox-card.yaml` - Home Assistant dashboard card
- `INSTALLATION.md` - installation and commissioning

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
