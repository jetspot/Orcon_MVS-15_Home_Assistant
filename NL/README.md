# Orcon Fan Box voor Home Assistant

Complete Nederlandstalige versie van de OrconFanBox-firmware, Home Assistant-integratie, dashboardkaart en documentatie.

## Belangrijkste wijziging

De ventilatorsnelheid gebruikt de native Home Assistant-entiteit `Orcon_Fan_Speed`. De oude entiteit `Orcon_Unit_Speed` is vervangen en verwijderd.

## Inhoud

- `firmware/orconfanbox.yaml` - ESPHome-firmware
- `dashboard/orconfanbox-card.yaml` - Home Assistant-dashboardkaart
- `custom_components/orcon_fanbox/` - HACS-companionintegratie
- `Info/` - installatie, pinout, compatibiliteit en productinformatie

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
