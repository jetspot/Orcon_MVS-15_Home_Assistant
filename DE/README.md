# Orcon Fan Box für Home Assistant

Vollständige deutschsprachige Dokumentation für die OrconFanBox-Firmware, die Home-Assistant-Dashboardkarte und die Installation.

> [!IMPORTANT]
> Zuerst muss die mitgelieferte neue ESPHome-Firmware aus `firmware/orconfanbox.yaml` auf den D1 mini geflasht werden. Ohne diese Firmware funktionieren die beschriebenen Entitäten und die Home-Assistant-Dashboardkarte nicht korrekt.

## Neue Funktionen dieser Firmware

- native Ventilatorsteuerung mit einstellbarer Drehzahl von 0 bis 100 %;
- separate Bedienelemente für niedrige, mittlere und hohe Stufe;
- 15-Minuten-Boost mit Abbruchfunktion;
- automatische Feuchteregelung mit einstellbaren Start- und Stoppgrenzen;
- automatische Bypass-Schaltung, während der Ventilator läuft;
- Messung von Temperatur, Luftfeuchtigkeit und Luftdruck mit einem optionalen BME280;
- Tachometerüberwachung und Erkennung eines Ventilatorfehlers;
- Messung der Drehzahlanforderung der originalen Orcon-Steuerung.

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

## Home Assistant

Typische Entitäten:

```text
fan.orconfanbox_orcon_fan_speed
switch.orconfanbox_orcon_unit_bypass
sensor.orconfanbox_orcon_tacho
sensor.orconfanbox_orcon_speed_requested
```

Die Firmware aktiviert den Bypass automatisch, während der Ventilator läuft, und deaktiviert ihn, wenn der Ventilator stoppt.

## Sicherheit

Die Anlage spannungsfrei schalten. Arbeiten an 230 V müssen von einer entsprechend qualifizierten Fachkraft ausgeführt werden.
