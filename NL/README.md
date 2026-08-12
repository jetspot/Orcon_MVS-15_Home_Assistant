# Orcon Fan Box voor Home Assistant

Complete Nederlandstalige versie van de OrconFanBox-firmware, Home Assistant-integratie, dashboardkaart en documentatie.

> [!IMPORTANT]
> Zet eerst de meegeleverde nieuwe ESPHome-firmware uit `firmware/orconfanbox.yaml` op de D1 mini. Zonder deze firmware werken de beschreven entiteiten en de Home Assistant-dashboardkaart niet correct.

![OrconWifiController](https://img.tindie.com/images/resize/xVi-TWmrzJDUIydKNFNMLN5Bqb4=/p/1200x630/smart/i/639182/products/2023-01-22T21:02:18.328Z-20221230_113158.jpg?1674392573)

[Bekijk de OrconWifiController op Tindie](https://www.tindie.com/products/hjhickinson/orconwificontroller-for-orcon-mvs-15/)

## Inhoud

- `firmware/orconfanbox.yaml` - ESPHome-firmware
- `dashboard/orconfanbox-card.yaml` - Home Assistant-dashboardkaart
- `INSTALLATIE.md` - installatie en ingebruikname

## Wi-Fi instellen

De openbare firmware bevat geen persoonlijke Wi-Fi-gegevens. Na de eerste start:

1. Verbind met **OrconFanBox Setup**.
2. Open zo nodig `http://192.168.4.1`.
3. Selecteer het eigen Wi-Fi-netwerk en voer het wachtwoord in.
4. Na de herstart is het apparaat normaal bereikbaar als `orconfanbox.local`.

## Home Assistant

Gebruik doorgaans deze entiteiten:

```text
fan.orconfanbox_orcon_fan_speed
switch.orconfanbox_orcon_unit_bypass
sensor.orconfanbox_orcon_tacho
sensor.orconfanbox_orcon_speed_requested
```

De firmware schakelt de bypass automatisch in wanneer de ventilator draait en uit wanneer de ventilator stopt.

## Veiligheid

Schakel de installatie spanningsloos en laat werkzaamheden aan 230 V door een deskundige uitvoeren.
