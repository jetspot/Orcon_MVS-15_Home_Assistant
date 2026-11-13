# Wiring and first start

## Safety

Disconnect the installation from mains power, verify this, and have work on mains voltage carried out by a qualified person.

## D1 mini connections

| Pin | Function |
|---|---|
| D6 | fan PWM control (50 kHz) |
| D5 | tachometer (rpm) |
| D8 | bypass relay |
| D7 | signal from the original Orcon control |
| D2 / D1 | BME280 SDA / SCL (address 0x76) |

## First start

1. Flash the firmware (see [FLASH_FIRMWARE.md](FLASH_FIRMWARE.md)).
2. Open `http://orconfanbox.local` (admin / admin).
3. Check humidity, temperature and rpm under **Overzicht**.
4. Set the normal speed under **Ventilatorstanden**.
5. The baseline (normal humidity) settles automatically during the first hours.

## Troubleshooting

- **No humidity/temperature:** check power, GND, SDA/SCL and address 0x76/0x77.
- **No rpm:** check the tacho connection on D5.
- **Box restarts by itself:** check `/diag` for the reset reason and the lowest memory values.
