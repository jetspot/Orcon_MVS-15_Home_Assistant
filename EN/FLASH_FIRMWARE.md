# Flashing the D1 mini

## Requirements

- Home Assistant with the **ESPHome Device Builder**, or ESPHome on a PC;
- all files from [`../firmware`](../firmware);
- for the first install: a USB data cable.

## Preparation

1. Copy **all** files from `firmware/` to your ESPHome folder (Home Assistant: `/config/esphome/`).
2. Copy `secrets.example.yaml` to `secrets.yaml` (or extend your existing one) with `wifi_ssid`, `wifi_password`, `ota_password` and `ap_password`.
3. Optionally change the web login at the top of `orconfanbox.yaml`: `web_gebruiker` and `web_wachtwoord` (default admin / admin).

> [!WARNING]
> Never publish `secrets.yaml` on GitHub.

## First install via USB

1. Connect the D1 mini with a USB data cable.
2. Open `orconfanbox.yaml` in ESPHome and choose **Install** → USB.
3. Wait until ESPHome reports success.
4. If the box cannot find your Wi-Fi it starts the access point **OrconFanBox Setup**. Connect to it and open `http://192.168.4.1` to choose your network.

## Updating over the network (OTA)

1. Replace the files in your ESPHome folder with the new version.
2. Choose **Install** → **Wirelessly**.
3. Your settings and the chart are kept.

Alternative: on the web page under **Systeem** choose a compiled `.bin` file and click **Update**.

## Check

- the web page opens and shows values;
- `http://<ip>/diag` shows `grafiek flash: ok`;
- Home Assistant shows the device **OrconFanBox** with all entities.
