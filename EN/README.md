# OrconFanBox for Home Assistant

ESPHome firmware (v11.18) for a D1 mini (ESP8266) that controls an **Orcon MVS-15** ventilation unit, with humidity-driven boost, its own web page, a 7-day chart and full Home Assistant integration.

> [!IMPORTANT]
> All firmware files are in [`../firmware`](../firmware). Put **all** of them in the same ESPHome folder; the YAML uses the `.h` and `.js` files.

![Web page on a PC](../screenshots/webpagina-pc.png)

## Features

**Fan**
- speed 0–100 % via PWM on D6, tachometer on D5;
- bypass relay on D8, coupled to the fan (fan on = bypass on);
- Low, Medium and High presets (adjustable) and a boost button with adjustable duration;
- fault detection: fan on but no rpm → `Orcon_Fan_Failure`.

**Humidity boost (BME280 on D1/D2)**
- the firmware learns the normal humidity (*baseline*) by itself;
- boost starts at an adjustable **rise** above the baseline (default +8 percentage points);
- **variable boost**: speed follows the rise, from *speed at start* (40 %) to *max speed* (80 %), and at *full-power rise* (+20) to *full-power speed* (100 %);
- after the peak the speed ramps down gradually;
- minimum and maximum boost time, after-phase and detection of a second shower.

**Night mode** with start and end hour and its own speed.

**Remote control**: the original Orcon control signal (D7) is measured (pulse width, period, frequency) and can optionally be followed; pulse values per mode are calibratable.

**Reliable storage**: all settings live in one fixed, compact storage block in flash and survive restarts, power loss and firmware updates.

**7-day chart**: humidity, baseline and fan speed, a point every 5 minutes and on every speed change. Stored in a free flash area (48 KB), so it survives restarts. Choose 1–7 days above the chart.

## Web page

Open `http://orconfanbox.local` or the box's IP address (default login **admin / admin**, change `web_gebruiker` / `web_wachtwoord` at the top of the YAML).

- groups: Overview, Control, Chart, System, Fan presets, Humidity boost, Night mode, Remote control (labels are in Dutch);
- every group can be collapsed; the page remembers your choice;
- input fields show value and unit only; the allowed range appears next to the field when you tap it;
- works on PC (two columns) and phone (one column).

| Phone | Chart |
|---|---|
| ![Phone](../screenshots/webpagina-telefoon.png) | ![Chart](../screenshots/grafiek.png) |

**Diagnostics:** `http://<ip>/diag` shows reset reason, free memory, uptime, chart points and the lowest memory values of this and the previous session.

## Contents

- [`../firmware/orconfanbox.yaml`](../firmware/orconfanbox.yaml) – ESPHome configuration
- `../firmware/orcon_opslag.h` – fixed storage block for settings
- `../firmware/orcon_grafiek.h` – flash chart, start page and `/diag`
- `../firmware/orcon_d7.h` – remote-control measurement on D7
- `../firmware/orcon_webgui.js` – web page
- `../firmware/secrets.example.yaml` – template for your passwords
- [`dashboard/orconfanbox-card.yaml`](dashboard/orconfanbox-card.yaml) – Home Assistant dashboard card
- [`FLASH_FIRMWARE.md`](FLASH_FIRMWARE.md) – flashing the D1 mini
- [`INSTALLATION.md`](INSTALLATION.md) – wiring and first start

## Home Assistant entities

Entity IDs are based on the device name (e.g. `sensor.orconfanbox_orcon_air_humidity`). Always check the entity list of your ESPHome device.

| Type | Entities |
|---|---|
| Fan | `Orcon_Fan_Speed` |
| Switches | `Orcon_Fan_Bypass`, `Orcon_Humidity_Automatic`, `Orcon_Humidity_Variable_Boost`, `Orcon_Night_Mode`, `Orcon_Remote_Control` |
| Buttons | `Orcon_Fan_Low`, `Orcon_Fan_Medium`, `Orcon_Fan_High`, `Orcon_Fan_Boost_15_Minutes`, `Orcon_Fan_Boost_Cancel` |
| Sensors | `Orcon_Fan_Percentage`, `Orcon_Fan_Tacho`, `Orcon_Fan_Speed_Requested`, `Orcon_Air_Temp`, `Orcon_Air_Humidity`, `Orcon_Air_Pressure`, `Orcon_Humidity_Baseline`, `Orcon_Humidity_Rise`, `Orcon_Humidity_Peak`, `Orcon_Humidity_Post_Min`, `Orcon_Remote_Pulse_us`, `Orcon_Remote_Period_us`, `Orcon_Remote_Freq_Hz` |
| Binary sensors | `Orcon_Fan_Failure`, `Orcon_Humidity_Boost` |
| Text sensors | `Orcon_Status_Info`, `Orcon_Fan_Status`, `Orcon_Remote_Stand` |
| Settings (numbers) | `Orcon_Normal_Fan_Speed`, `Orcon_Fan_Low_Speed`, `Orcon_Fan_Medium_Speed`, `Orcon_Fan_High_Speed`, `Orcon_Fan_Boost_Minutes`, `Orcon_Humidity_Rise_Start`, `Orcon_Humidity_Boost_Stop`, `Orcon_Humidity_Rise_Stop`, `Orcon_Humidity_Rise_Restart`, `Orcon_Humidity_Min_Boost_Minutes`, `Orcon_Humidity_Max_Boost_Minutes`, `Orcon_Humidity_Fan_Speed`, `Orcon_Humidity_Boost_Min_Speed`, `Orcon_Humidity_Full_Rise`, `Orcon_Humidity_Full_Speed`, `Orcon_Night_Start_Hour`, `Orcon_Night_End_Hour`, `Orcon_Night_Fan_Speed`, `Orcon_Remote_Auto_us`, `Orcon_Remote_Afwezig_us`, `Orcon_Remote_Stand1_us`, `Orcon_Remote_Stand2_us`, `Orcon_Remote_Stand3_us`, `Orcon_Remote_Tolerance_us` |

## Safety

Disconnect the installation from mains power and have work on 230 V carried out by a qualified person.
