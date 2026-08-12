# Firmware op de D1 mini installeren

## Benodigdheden

- Home Assistant met de ESPHome Device Builder-app;
- een D1 mini die via USB of het netwerk bereikbaar is;
- `firmware/orconfanbox.yaml` uit deze map;
- bij een eerste USB-installatie: een USB-datakabel.

## Eerst een back-up maken

Open in ESPHome de bestaande OrconFanBox-configuratie en bewaar een kopie van de huidige YAML. Noteer zo nodig de gebruikte Wi-Fi- en OTA-instellingen.

## Bestaand apparaat via het netwerk bijwerken

1. Open **Home Assistant → ESPHome Device Builder**.
2. Open **OrconFanBox** en kies **Bewerken**.
3. Vervang de YAML door de inhoud van `firmware/orconfanbox.yaml`.
4. Bewaar eigen Wi-Fi-, API- en OTA-wachtwoorden wanneer die al in de bestaande configuratie staan. Publiceer deze wachtwoorden nooit op GitHub.
5. Klik op **Opslaan**.
6. Klik op **Installeren** en kies **Via het netwerk**.
7. Wacht totdat compilatie, upload en herstart volledig zijn voltooid.
8. Controleer dat OrconFanBox weer **Online** wordt weergegeven.

## Eerste installatie via USB

1. Verbind de D1 mini met een USB-datakabel.
2. Open **ESPHome Device Builder** en maak zo nodig een nieuw apparaat met de naam `orconfanbox`.
3. Open **Bewerken** en plaats de inhoud van `firmware/orconfanbox.yaml` in de editor.
4. Klik op **Opslaan** en daarna op **Installeren**.
5. Kies de USB-installatiemethode die past bij de aansluiting: deze computer of de Home Assistant-server.
6. Selecteer de juiste seriële poort en start de installatie.
7. Verwijder de USB-kabel pas nadat ESPHome meldt dat de installatie is geslaagd.
8. Verbind daarna met **OrconFanBox Setup** en stel het Wi-Fi-netwerk in. Open zo nodig `http://192.168.4.1`.

## Controleren

1. Wacht totdat het apparaat in ESPHome als **Online** verschijnt.
2. Open in Home Assistant het ESPHome-apparaat.
3. Controleer minimaal `Orcon_Fan_Speed`, `Orcon_Unit_Bypass` en `Orcon_Tacho`.
4. Test eerst met een lage ventilatorsnelheid en controleer de tachometerwaarde.

> [!WARNING]
> Onderbreek de voeding niet tijdens het flashen. Werkzaamheden aan 230 V moeten spanningsloos en door een deskundige worden uitgevoerd.
