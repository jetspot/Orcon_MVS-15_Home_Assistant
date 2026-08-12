# Installation and commissioning

## Safety

Isolate the installation, verify that it is de-energized, and have mains-voltage work performed by a suitably qualified person.

## First-time Wi-Fi setup

1. Flash `firmware/orconfanbox.yaml` to the D1 mini.
2. Connect to **OrconFanBox Setup**.
3. Open `http://192.168.4.1` if necessary.
4. Select the local Wi-Fi network and enter its password.
5. After reboot, the device is normally available at `orconfanbox.local`.

## Home Assistant

Verify these functions:

- fan: `orcon_fan_speed`;
- relay/bypass: `orcon_speed_bypass`;
- tachometer: `orcon_tacho`;
- factory-control request: `orcon_speed_requested`.

## Diagnostics

- No BME280: check power, ground, SDA, SCL, and address `0x76` or `0x77`.
- No Wi-Fi: provision the network again through the temporary access point.
- No tachometer feedback: check the D5/tacho connection.
