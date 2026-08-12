# Orcon Fan Box für Home Assistant

Vollständige deutschsprachige Dokumentation für die OrconFanBox-Firmware, die Home-Assistant-Dashboardkarte und die Installation.

> [!IMPORTANT]
> Zuerst muss die mitgelieferte neue ESPHome-Firmware aus `firmware/orconfanbox.yaml` auf den D1 mini geflasht werden. Ohne diese Firmware funktionieren die beschriebenen Entitäten und die Home-Assistant-Dashboardkarte nicht korrekt.

## Neue Funktionen dieser Firmware

- erste WLAN-Einrichtung über den temporären Zugangspunkt **OrconFanBox Setup** und das Captive Portal;
- direkte Home-Assistant-Verbindung über die native ESPHome-API;
- spätere Firmware-Updates über OTA, ohne den D1 mini erneut über USB anzuschließen;
- native Ventilatorsteuerung mit einstellbarer Drehzahl von 0 bis 100 %;
- PWM-Drehzahlregelung über D6;
- separate Bedienelemente für niedrige (30 %), mittlere (60 %) und hohe Stufe (100 %);
- 15-Minuten-Boost mit Abbruchfunktion;
- automatische Feuchteregelung mit einstellbaren Start- und Stoppgrenzen;
- manuelle Steuerung des Bypass-Relais über `Orcon_Fan_Bypass`;
- automatische Aktivierung des Bypass, während der Ventilator läuft, und Deaktivierung beim Stoppen;
- Messung von Temperatur, Luftfeuchtigkeit und Luftdruck mit einem optionalen BME280;
- Tachometermessung der tatsächlichen Ventilatordrehzahl;
- verzögerte Erkennung eines Ventilatorfehlers, wenn der Ventilator eingeschaltet ist, aber keine Drehzahl gemessen wird;
- Statussensor `Orcon_Fan_Status` mit `OK` oder `Error`;
- Messung der Drehzahlanforderung der originalen Orcon-Steuerung als Pulslänge;
- einsatzbereite Home-Assistant-Dashboardkarte für Drehzahl, Ein/Aus und Bypass.

![OrconWifiController](https://img.tindie.com/images/resize/xVi-TWmrzJDUIydKNFNMLN5Bqb4=/p/1200x630/smart/i/639182/products/2023-01-22T21:02:18.328Z-20221230_113158.jpg?1674392573)

[OrconWifiController auf Tindie ansehen](https://www.tindie.com/products/hjhickinson/orconwificontroller-for-orcon-mvs-15/)

## Inhalt

- `firmware/orconfanbox.yaml` - ESPHome-Firmware
- `dashboard/orconfanbox-card.yaml` - Home-Assistant-Dashboardkarte
- `INSTALLATION.md` - Installation und Inbetriebnahme
- `FIRMWARE_INSTALLIEREN.md` - Schritt-für-Schritt-Installation auf dem D1 mini

## WLAN einrichten

Die öffentliche Firmware enthält keine persönlichen WLAN-Zugangsdaten. Nach dem ersten Start:

1. Mit **OrconFanBox Setup** verbinden.
2. Falls das Portal nicht automatisch erscheint, `http://192.168.4.1` öffnen.
3. Das eigene WLAN auswählen und das Passwort eingeben.
4. Nach dem Neustart ist das Gerät normalerweise unter `orconfanbox.local` erreichbar.

## Home-Assistant-Entitäten

Die Firmware stellt diese siebzehn Entitäten bereit:

- `fan.orconfanbox_orcon_fan_speed` - Ventilator Ein/Aus und Drehzahl 0-100%;
- `switch.orconfanbox_orcon_fan_bypass` - manueller Bypass;
- `switch.orconfanbox_orcon_humidity_automatic` - automatische Feuchteregelung;
- `button.orconfanbox_orcon_fan_low` - niedrige Stufe, 30%;
- `button.orconfanbox_orcon_fan_medium` - mittlere Stufe, 60%;
- `button.orconfanbox_orcon_fan_high` - hohe Stufe, 100%;
- `button.orconfanbox_orcon_fan_boost_15_minutes` - 15-Minuten-Boost;
- `button.orconfanbox_orcon_fan_boost_cancel` - Boost abbrechen und Ventilator stoppen;
- `number.orconfanbox_orcon_humidity_start` - Startgrenze der Feuchteregelung;
- `number.orconfanbox_orcon_humidity_stop` - Stoppgrenze der Feuchteregelung;
- `sensor.orconfanbox_orcon_air_temp` - Lufttemperatur;
- `sensor.orconfanbox_orcon_air_pressure` - Luftdruck;
- `sensor.orconfanbox_orcon_air_humidity` - Luftfeuchtigkeit;
- `sensor.orconfanbox_orcon_fan_tacho` - tatsächliche Ventilatordrehzahl;
- `sensor.orconfanbox_orcon_fan_speed_requested` - Anforderung der Originalsteuerung;
- `sensor.orconfanbox_orcon_fan_status` - Ventilatorstatus `OK` oder `Error`.
- `update.orconfanbox_firmware` - standardmäßig deaktivierte ESPHome-Entität für Firmware-Updates.

Home Assistant kann abhängig von der Gerätebenennung leicht abweichende Entitäts-IDs erzeugen. Deshalb immer die Entitätsliste des ESPHome-Geräts prüfen.

Die Firmware aktiviert den Bypass automatisch, während der Ventilator läuft, und deaktiviert ihn, wenn der Ventilator stoppt.

## Sicherheit

Die Anlage spannungsfrei schalten. Arbeiten an 230 V müssen von einer entsprechend qualifizierten Fachkraft ausgeführt werden.
