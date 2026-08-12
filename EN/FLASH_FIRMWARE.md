# Installing the firmware on the D1 mini

## Requirements

- Home Assistant with the ESPHome Device Builder app;
- a D1 mini reachable through USB or the network;
- `firmware/orconfanbox.yaml` from this folder;
- for a first USB installation: a USB data cable.

## Make a backup first

Open the existing OrconFanBox configuration in ESPHome and save a copy of its current YAML. Record any Wi-Fi and OTA settings that must be retained.

## Update an existing device over the network

1. Open **Home Assistant → ESPHome Device Builder**.
2. Open **OrconFanBox** and select **Edit**.
3. Replace the YAML with the contents of `firmware/orconfanbox.yaml`.
4. Retain personal Wi-Fi, API, and OTA passwords from the existing configuration when required. Never publish these passwords on GitHub.
5. Select **Save**.
6. Select **Install** and then **Wirelessly**.
7. Wait for compilation, upload, and restart to finish completely.
8. Verify that OrconFanBox returns to **Online**.

## First installation over USB

1. Connect the D1 mini with a USB data cable.
2. Open **ESPHome Device Builder** and, if necessary, create a device named `orconfanbox`.
3. Select **Edit** and place the contents of `firmware/orconfanbox.yaml` in the editor.
4. Select **Save**, followed by **Install**.
5. Choose the USB installation method matching the connection: this computer or the Home Assistant server.
6. Select the correct serial port and start installation.
7. Do not disconnect USB until ESPHome reports a successful installation.
8. Connect to **OrconFanBox Setup** and configure Wi-Fi. Open `http://192.168.4.1` if necessary.

## Verification

1. Wait for the device to appear as **Online** in ESPHome.
2. Open the ESPHome device in Home Assistant.
3. Verify at least `Orcon_Fan_Speed`, `Orcon_Unit_Bypass`, and `Orcon_Tacho`.
4. Test with a low fan speed first and check the tachometer value.

> [!WARNING]
> Do not interrupt power while flashing. Isolate the installation and have 230 V work performed by a suitably qualified person.
