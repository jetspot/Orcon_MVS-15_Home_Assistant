# Firmware auf dem D1 mini installieren

## Voraussetzungen

- Home Assistant mit der ESPHome-Device-Builder-App;
- ein über USB oder das Netzwerk erreichbarer D1 mini;
- `firmware/orconfanbox.yaml` aus diesem Ordner;
- für die erste USB-Installation: ein USB-Datenkabel.

## Zuerst eine Sicherung erstellen

Die bestehende OrconFanBox-Konfiguration in ESPHome öffnen und eine Kopie der aktuellen YAML-Datei speichern. Benötigte WLAN- und OTA-Einstellungen notieren.

## Vorhandenes Gerät über das Netzwerk aktualisieren

1. **Home Assistant → ESPHome Device Builder** öffnen.
2. **OrconFanBox** öffnen und **Bearbeiten** wählen.
3. Die YAML durch den Inhalt von `firmware/orconfanbox.yaml` ersetzen.
4. Eigene WLAN-, API- und OTA-Passwörter aus der bestehenden Konfiguration bei Bedarf beibehalten. Diese Passwörter niemals auf GitHub veröffentlichen.
5. **Speichern** wählen.
6. **Installieren** und anschließend **Über das Netzwerk** wählen.
7. Warten, bis Kompilierung, Upload und Neustart vollständig abgeschlossen sind.
8. Prüfen, ob OrconFanBox wieder als **Online** angezeigt wird.

## Erste Installation über USB

1. Den D1 mini mit einem USB-Datenkabel verbinden.
2. **ESPHome Device Builder** öffnen und bei Bedarf ein Gerät mit dem Namen `orconfanbox` erstellen.
3. **Bearbeiten** wählen und den Inhalt von `firmware/orconfanbox.yaml` in den Editor einfügen.
4. **Speichern** und anschließend **Installieren** wählen.
5. Die passende USB-Installationsmethode wählen: dieser Computer oder der Home-Assistant-Server.
6. Den richtigen seriellen Anschluss auswählen und die Installation starten.
7. USB erst trennen, wenn ESPHome die erfolgreiche Installation meldet.
8. Mit **OrconFanBox Setup** verbinden und das WLAN konfigurieren. Falls erforderlich, `http://192.168.4.1` öffnen.

## Kontrolle

1. Warten, bis das Gerät in ESPHome als **Online** erscheint.
2. Das ESPHome-Gerät in Home Assistant öffnen.
3. Mindestens `Orcon_Fan_Speed`, `Orcon_Unit_Bypass` und `Orcon_Tacho` prüfen.
4. Zuerst mit niedriger Ventilatordrehzahl testen und den Tachometerwert kontrollieren.

> [!WARNING]
> Während des Flashens die Stromversorgung nicht unterbrechen. Arbeiten an 230 V müssen spannungsfrei und durch eine entsprechend qualifizierte Fachkraft ausgeführt werden.
