#pragma once
// ---------------------------------------------------------------------------
// Vast, compact opslagblok voor de OrconFanBox (v11+).
// Wordt als EERSTE flash-voorkeur aangemaakt (on_boot prioriteit 950).
// Grootte NOOIT wijzigen. num[] heeft vaste plaatsen (zie ORC_NUM_* in YAML);
// nieuwe instellingen alleen op vrije plaatsen in num[] of in reserve[].
// ---------------------------------------------------------------------------
#include "esphome/core/preferences.h"
#include <cmath>
static const uint32_t ORC_MAGIC = 0x4F524331;  // 'ORC1'
struct OrcOpslag {
  uint32_t magic;
  float num[32];        // instellingen (getallen), vaste volgorde
  uint32_t schakel;     // bit0 bypass, bit1 automatisch, bit2 nacht, bit3 afstandsbediening, bit4 variabele boost
  float baseline;       // bewaarde baseline
  uint32_t reserve[8];
};
static_assert(sizeof(OrcOpslag) == 172, "OrcOpslag mag niet van grootte veranderen");
inline esphome::ESPPreferenceObject &orc_pref() { static esphome::ESPPreferenceObject p; return p; }
inline OrcOpslag &orc_geladen() { static OrcOpslag d{}; return d; }
// Variabele boost: snelheid bij een stijging (procentpunt) boven de baseline
inline float orc_doel(float stijging, float start, float vol, float mn, float mx, float volsp) {
  if (stijging >= vol) return volsp;
  if (vol <= start) return mx;
  float f = (stijging - start) / (vol - start);
  if (f < 0) f = 0;
  if (f > 1) f = 1;
  return mn + f * (mx - mn);
}
