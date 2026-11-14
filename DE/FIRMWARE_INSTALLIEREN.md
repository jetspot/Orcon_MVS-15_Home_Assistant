# Firmware auf den D1 mini installieren

## Voraussetzungen

- Home Assistant mit dem **ESPHome Device Builder** oder ESPHome auf dem PC;
- alle Dateien aus [`../firmware`](../firmware);
- für die Erstinstallation: ein USB-Datenkabel.

## Vorbereitung

1. Kopieren Sie **alle** Dateien aus `firmware/` in Ihren ESPHome-Ordner (Home Assistant: `/config/esphome/`).
2. Kopieren Sie `secrets.example.yaml` nach `secrets.yaml` (oder ergänzen Sie Ihre vorhandene) mit `web_gebruiker`, `web_wachtwoord`, `ota_password` und `fallback_ap_password`. **WLAN-Daten sind nicht nötig**: diese stellen Sie über das Einrichtungsnetzwerk ein.
3. Ändern Sie bei Bedarf oben in `orconfanbox.yaml` das Web-Login: `web_gebruiker` und `web_wachtwoord` (Standard admin / admin).

> [!WARNING]
> Veröffentlichen Sie `secrets.yaml` niemals auf GitHub.

## Erstinstallation per USB

1. Verbinden Sie den D1 mini mit einem USB-Datenkabel.
2. Öffnen Sie `orconfanbox.yaml` in ESPHome und wählen Sie **Installieren** → USB.
3. Warten Sie, bis ESPHome die erfolgreiche Installation meldet.
4. Nach dem Flashen startet die Box das Netzwerk **OrconFanBox Setup**. Verbinden Sie sich damit; die Einrichtungsseite `http://192.168.4.1` öffnet sich von selbst. Wählen Sie dort Ihr WLAN und danach ein neues Passwort für die Webseite (oder klicken Sie auf **Overslaan**).

## Aktualisieren über das Netzwerk (OTA)

1. Ersetzen Sie die Dateien in Ihrem ESPHome-Ordner durch die neue Version.
2. Wählen Sie **Installieren** → **Drahtlos**.
3. Ihre Einstellungen und das Diagramm bleiben erhalten.

Alternativ: auf der Webseite unter **Systeem** eine kompilierte `.bin`-Datei wählen und auf **Update** klicken.

## Prüfen

- die Webseite öffnet sich und zeigt Werte;
- `http://<ip>/diag` zeigt `grafiek flash: ok`;
- Home Assistant zeigt das Gerät **OrconFanBox** mit allen Entitäten.
