#pragma once
// ---------------------------------------------------------------------------
// v11.7: grafiek 7 dagen in een vrij deel van de flash (niet in RAM).
// Ringbuffer van 6 sectoren vanaf 0x200000 (2 MB). Dit gebied wordt niet
// gebruikt door firmware (< 1 MB), OTA (schrijft net onder 0x3FB000) of de
// instellingen (0x3FB000+). Overleeft herstart, stroomstoring en update.
// Record (8 bytes): uint32 epoch, uint8 vocht x2, uint8 baseline x2,
// uint8 ventilator %, uint8 0xA5. Leeg = 0xFF.
// GET /grafiek.bin: uint32 nu (epoch), uint16 aantal records, uint16 interval,
// daarna alle records in ringvolgorde (oudste eerst; lege overslaan in JS).
// ---------------------------------------------------------------------------
#include <Arduino.h>
#include "esphome/core/preferences.h"
#include "esphome/components/web_server_base/web_server_base.h"
#include <cmath>
#include <cstring>
static const uint32_t ORC_FL_START = 0x200000;
static const uint16_t ORC_FL_SECT = 12;  // v11.12: 6 -> 12 sectoren (48 KB)
static const uint16_t ORC_FL_PER = 4096 / 8;
static const uint16_t ORC_FL_N = ORC_FL_SECT * ORC_FL_PER;
static const uint16_t ORC_GR_INT = 300;
struct OrcFl { bool ok; uint16_t pos; uint16_t geldig; };
inline OrcFl &orc_fl() { static OrcFl f{false, 0, 0}; return f; }
inline bool orc_fl_lees(uint16_t i, uint32_t r[2]) {
  return ESP.flashRead(ORC_FL_START + (uint32_t) i * 8, r, 8);
}
inline void orc_fl_init() {
  auto &f = orc_fl();
  if (ESP.getFlashChipRealSize() < 0x300000) { f.ok = false; return; }
  uint32_t best = 0; int bi = -1; uint16_t g = 0; uint32_t r[2];
  // v11.12: sectoren met onbekende inhoud (niet leeg, geen geldig record) eenmalig wissen
  for (uint16_t s = 0; s < ORC_FL_SECT; s++) {
    bool vreemd = false;
    for (uint16_t j = 0; j < ORC_FL_PER && !vreemd; j++) {
      if (!orc_fl_lees(s * ORC_FL_PER + j, r)) continue;
      bool leeg = r[0] == 0xFFFFFFFF && r[1] == 0xFFFFFFFF;
      bool goed = (r[1] >> 24) == 0xA5 && r[0] > 1600000000UL && r[0] < 2200000000UL;
      if (!leeg && !goed) vreemd = true;
    }
    if (vreemd) ESP.flashEraseSector((ORC_FL_START + (uint32_t) s * 4096) / 4096);
  }
  for (uint16_t i = 0; i < ORC_FL_N; i++) {
    if (!orc_fl_lees(i, r)) continue;
    if (r[0] == 0xFFFFFFFF || (r[1] >> 24) != 0xA5) continue;
    g++;
    if (r[0] >= best) { best = r[0]; bi = i; }
  }
  f.pos = bi < 0 ? 0 : (uint16_t) ((bi + 1) % ORC_FL_N);
  f.geldig = g;
  f.ok = true;
}
inline uint8_t orc_gr_pct(float v) {
  if (std::isnan(v) || v < 0) return 255;
  float x = roundf(v * 2.0f);
  if (x > 250) x = 250;
  return (uint8_t) x;
}
inline void orc_gr_add(uint32_t epoch, float hum, float base, float fan) {
  auto &f = orc_fl();
  if (!f.ok || epoch < 1600000000UL) return;
  if (f.pos % ORC_FL_PER == 0) {
    ESP.flashEraseSector((ORC_FL_START + (uint32_t) f.pos * 8) / 4096);
    f.geldig = f.geldig > ORC_FL_PER ? f.geldig - ORC_FL_PER : 0;
  }
  uint8_t fp = std::isnan(fan) ? 255 : (uint8_t) (fan < 0 ? 0 : (fan > 100 ? 100 : lroundf(fan)));
  uint32_t r[2];
  r[0] = epoch;
  r[1] = (uint32_t) orc_gr_pct(hum) | ((uint32_t) orc_gr_pct(base) << 8) | ((uint32_t) fp << 16) | (0xA5UL << 24);
  ESP.flashWrite(ORC_FL_START + (uint32_t) f.pos * 8, r, 8);
  f.pos = (f.pos + 1) % ORC_FL_N;
  if (f.geldig < ORC_FL_N) f.geldig++;
}
inline uint32_t &orc_nu() { static uint32_t n = 0; return n; }
// v11.15: geheugenbewaking; laagste waarden van deze en de vorige sessie (RTC-geheugen, overleeft een herstart)
struct OrcMem { uint32_t magic; uint32_t heap_blok; uint32_t uptime; uint32_t epoch; };
static const uint32_t ORC_MEM_MAGIC = 0x4F524344;  // 'ORCD'
inline OrcMem &orc_mem() { static OrcMem m{ORC_MEM_MAGIC, 0xFFFFFFFF, 0, 0}; return m; }
inline OrcMem &orc_mem_vorig() { static OrcMem m{0, 0, 0, 0}; return m; }
// v11.16: via ESPHome als RTC-voorkeur (normale RTC-regio), niet meer zelf op woord 124 (dat is van de crash-handler)
inline esphome::ESPPreferenceObject &orc_mem_pref() { static esphome::ESPPreferenceObject p; return p; }
inline void orc_mem_init() {
  OrcMem v{};
  orc_mem_pref() = esphome::global_preferences->make_preference<OrcMem>(ORC_MEM_MAGIC, false);
  if (orc_mem_pref().load(&v) && v.magic == ORC_MEM_MAGIC) orc_mem_vorig() = v;
  orc_mem() = OrcMem{ORC_MEM_MAGIC, 0xFFFFFFFF, 0, 0};
}
inline void orc_mem_tik(uint32_t epoch) {
  auto &m = orc_mem();
  uint32_t heap = ESP.getFreeHeap(), blok = ESP.getMaxFreeBlockSize();
  uint32_t mh = m.heap_blok >> 16, mb = m.heap_blok & 0xFFFF;
  if (heap < mh) mh = heap > 0xFFFF ? 0xFFFF : heap;
  if (blok < mb) mb = blok > 0xFFFF ? 0xFFFF : blok;
  m.heap_blok = (mh << 16) | mb; m.uptime = millis() / 1000; m.epoch = epoch;
  orc_mem_pref().save(&m);
}
inline char *orc_meet() { static char m[200] = "-"; return m; }
class OrcGrafiekHandler : public AsyncWebHandler {
 public:
  bool canHandle(AsyncWebServerRequest *req) const override { return req->url() == "/grafiek.bin"; }
  void handleRequest(AsyncWebServerRequest *req) override {
    uint32_t nu = orc_nu();
    uint16_t n = orc_fl().ok ? ORC_FL_N : 0, start = orc_fl().pos, iv = ORC_GR_INT;
    size_t totaal = 8 + (size_t) n * 8;
    auto *resp = req->beginResponse("application/octet-stream", totaal,
      [nu, n, start, iv, totaal](uint8_t *buf, size_t maxLen, size_t index) -> size_t {
        size_t i = 0;
        uint32_t r[2]; int laatst = -1;
        while (i < maxLen && index + i < totaal) {
          size_t p = index + i;
          if (p < 8) {
            uint8_t k[8]; memcpy(k, &nu, 4); memcpy(k + 4, &n, 2); memcpy(k + 6, &iv, 2);
            buf[i] = k[p];
          } else {
            int rec = (int) ((p - 8) / 8);
            if (rec != laatst) { if (!orc_fl_lees((start + rec) % ORC_FL_N, r)) { r[0] = r[1] = 0xFFFFFFFF; } laatst = rec; }
            buf[i] = ((uint8_t *) r)[(p - 8) % 8];
          }
          i++;
        }
        return i;
      });
    resp->addHeader("Cache-Control", "no-store");
    req->send(resp);
  }
};
// v11.6: diagnose via GET /diag
class OrcDiagHandler : public AsyncWebHandler {
 public:
  bool canHandle(AsyncWebServerRequest *req) const override { return req->url() == "/diag"; }
  void handleRequest(AsyncWebServerRequest *req) override {
    char b[900]; char vg[200] = "geen gegevens"; char tm[24] = "?";
    auto &v = orc_mem_vorig(); auto &m = orc_mem();
    if (v.magic == ORC_MEM_MAGIC) { if (v.epoch) { time_t t = v.epoch; struct tm lt; localtime_r(&t, &lt); strftime(tm, sizeof(tm), "%d-%m %H:%M:%S", &lt); }
      snprintf(vg, sizeof(vg), "laagste vrij %u, kleinste blok %u, liep %ud %02u:%02u, laatst gezien %s", (unsigned) (v.heap_blok >> 16), (unsigned) (v.heap_blok & 0xFFFF), (unsigned) (v.uptime / 86400), (unsigned) (v.uptime / 3600 % 24), (unsigned) (v.uptime / 60 % 60), tm); }
    uint32_t s = millis() / 1000;
    snprintf(b, sizeof(b), "herstartreden: %s\nvrij geheugen: %u bytes\ngrootste blok: %u bytes\nfragmentatie: %u %%\nuptime: %ud %02u:%02u:%02u\ngrafiek flash: %s, punten %u, positie %u\nmeting: %s\nlaagste vrij geheugen deze sessie: %u bytes, kleinste blok: %u bytes\nvorige sessie: %s\ndetails herstart: %s\n",
             ESP.getResetReason().c_str(), (unsigned) ESP.getFreeHeap(), (unsigned) ESP.getMaxFreeBlockSize(),
             (unsigned) ESP.getHeapFragmentation(), (unsigned) (s / 86400), (unsigned) (s / 3600 % 24),
             (unsigned) (s / 60 % 60), (unsigned) (s % 60), orc_fl().ok ? "ok" : "UIT", (unsigned) orc_fl().geldig, (unsigned) orc_fl().pos, orc_meet(),
             (unsigned) (m.heap_blok >> 16), (unsigned) (m.heap_blok & 0xFFFF), vg, ESP.getResetInfo().c_str());
    auto *resp = req->beginResponse(200, "text/plain", b);
    resp->addHeader("Cache-Control", "no-store");
    req->send(resp);
  }
};
// v11.8: eigen startpagina met viewport-instelling (iPhone gebruikt dan de echte schermbreedte)
class OrcIndexHandler : public AsyncWebHandler {
 public:
  OrcIndexHandler(const char *gebruiker, const char *wachtwoord) : gebruiker_(gebruiker), wachtwoord_(wachtwoord) {}
  bool canHandle(AsyncWebServerRequest *req) const override { return req->url() == "/" && req->method() == HTTP_GET; }
  void handleRequest(AsyncWebServerRequest *req) override {
    if (!req->authenticate(gebruiker_, wachtwoord_)) { req->requestAuthentication(); return; }
    auto *resp = req->beginResponse(200, "text/html",
      "<!DOCTYPE html><html><head><meta charset=UTF-8>"
      "<meta name=viewport content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">"
      "<link rel=icon href=data:><style>html,body{overflow-x:hidden;max-width:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%}body{margin:2px}esp-app{display:block;max-width:100%}</style></head><body>"
      "<div id=orc-app></div><script type=module src=/0.js></script></body></html>");
    resp->addHeader("Cache-Control", "no-store");
    req->send(resp);
  }
 private:
  const char *gebruiker_;
  const char *wachtwoord_;
};

// v11.9: schermmeting van de browser (alleen voor diagnose, zichtbaar op /diag)
class OrcMeetHandler : public AsyncWebHandler {
 public:
  bool canHandle(AsyncWebServerRequest *req) const override { return req->url() == "/meet"; }
  void handleRequest(AsyncWebServerRequest *req) override {
    String q;
    for (size_t i = 0; i < req->params(); i++) { auto *p = req->getParam(i); q += p->name() + "=" + p->value() + " "; }
    strncpy(orc_meet(), q.c_str(), 199); orc_meet()[199] = 0;
    req->send(204);
  }
};
