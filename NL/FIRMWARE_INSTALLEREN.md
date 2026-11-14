# Firmware op de D1 mini installeren

## Benodigdheden

- Home Assistant met de **ESPHome Device Builder**, of ESPHome op de pc;
- alle bestanden uit de map [`../firmware`](../firmware);
- bij de eerste installatie: een USB-datakabel.

## Voorbereiden

1. Kopieer **alle** bestanden uit `firmware/` naar uw ESPHome-map (bij Home Assistant: `/config/esphome/`).
2. Kopieer `secrets.example.yaml` naar `secrets.yaml` (of vul uw bestaande `secrets.yaml` aan) met `web_gebruiker`, `web_wachtwoord`, `ota_password` en `fallback_ap_password`. **Wifi-gegevens hoeven er niet in**: die stelt u in via het instelnetwerk.
3. Pas zo nodig bovenin `orconfanbox.yaml` het inlog van de webpagina aan: `web_gebruiker` en `web_wachtwoord` (standaard admin / admin).

> [!WARNING]
> Zet `secrets.yaml` nooit op GitHub.

## Eerste installatie via USB

1. Sluit de D1 mini met een USB-datakabel aan.
2. Open `orconfanbox.yaml` in ESPHome en kies **Installeren** → via USB.
3. Wacht tot ESPHome meldt dat de installatie is geslaagd.
4. Na de installatie start de box het netwerk **OrconFanBox Setup**. Verbind daarmee; de instelpagina `http://192.168.4.1` opent vanzelf. Kies daar uw wifi en daarna een nieuw wachtwoord voor de webpagina (of klik op **Overslaan**).

## Bijwerken via het netwerk (OTA)

1. Vervang de bestanden in uw ESPHome-map door de nieuwe versie.
2. Kies **Installeren** → **Via het netwerk**.
3. Uw instellingen en de grafiek blijven bewaard.

Alternatief: op de webpagina onder **Systeem** een gecompileerd `.bin`-bestand kiezen en op **Update** klikken.

## Controleren

- de webpagina opent en toont de waarden;
- `http://<ip>/diag` toont `grafiek flash: ok`;
- in Home Assistant verschijnt het apparaat **OrconFanBox** met alle entiteiten.
