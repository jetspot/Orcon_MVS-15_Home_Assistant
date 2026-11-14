#pragma once
// smit_setup.h v1.0 - gedeeld door alle ESP-projecten van Smit Techniek en Service.
// - Instelpagina op het instelnetwerk (http://192.168.4.1): stap 1 wifi, stap 2 webwachtwoord (met Overslaan).
// - Fabrieksreset via de webpagina: doet hetzelfde als 3x kort op RST.
// - Webwachtwoord: 5 tot en met 23 zichtbare tekens, zonder spaties.
#include "esphome.h"
#include <functional>
#include "esphome/components/wifi/scan_list.h"
#include "esphome/components/captive_portal/captive_portal.h"

namespace smit {

struct Cfg {
  const char *titel = "Apparaat";
  const char *na = "";                       // extra zin op het laatste scherm van de instelpagina
  bool root_is_setup = true;                 // "/" op het instelnetwerk toont de instelpagina
  std::function<bool(const char *)> zet_ww;  // nieuw webwachtwoord toepassen en bewaren
  std::function<void()> start_reset;         // RST-teller zo zetten dat de volgende start een reset uitvoert
};
inline Cfg &cfg() { static Cfg c; return c; }

inline bool ww_geldig(const char *w) {
  if (w == nullptr) return false;
  size_t n = strlen(w);
  if (n < 5 || n > 23) return false;
  for (size_t i = 0; i < n; i++) { unsigned char c = (unsigned char) w[i]; if (c < 33 || c > 126) return false; }
  return true;
}

inline bool portal_actief() {
  auto *p = esphome::captive_portal::global_captive_portal;
  return p != nullptr && p->is_active();
}

struct Wacht { uint8_t actie = 0; uint32_t om = 0; char ssid[33] = ""; char psk[65] = ""; };
inline Wacht &wacht() { static Wacht w; return w; }

// Elke seconde aanroepen: voert een uitgestelde actie uit nadat het antwoord naar de browser is verstuurd.
inline void tik() {
  Wacht &w = wacht();
  if (w.actie == 0 || (int32_t) (millis() - w.om) < 0) return;
  uint8_t a = w.actie;
  w.actie = 0;
  if (a == 1) {
    ESP_LOGW("reset", "Fabrieksreset via webpagina: herstart");
    if (cfg().start_reset) cfg().start_reset();
    esphome::global_preferences->sync();
    esphome::App.safe_reboot();
  } else if (a == 2) {
    ESP_LOGI("setup", "Wifi opgeslagen via instelpagina: %s", w.ssid);
    esphome::wifi::global_wifi_component->save_wifi_sta(w.ssid, w.psk);
    memset(w.psk, 0, sizeof(w.psk));
  }
}

// Na de start van wifi aanroepen: zonder ingesteld netwerk start het instelnetwerk vrijwel direct.
inline void na_wifi_start() {
  auto *w = esphome::wifi::global_wifi_component;
  if (!w->has_sta() || w->get_sta().get_ssid().empty()) {
    w->set_ap_timeout(1500);
#ifdef USE_API
    // Het instelnetwerk blijft actief tot er iets is ingesteld: niet herstarten omdat er geen API-verbinding is.
    if (esphome::api::global_api_server != nullptr) esphome::api::global_api_server->set_reboot_timeout(0);
#endif
    ESP_LOGW("setup", "Geen wifi ingesteld: instelnetwerk blijft actief");
  }
}

static const char SETUP_HTML[] PROGMEM = R"SMITSETUP(<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Instellen</title><style>
*{box-sizing:border-box}body{margin:0;background:#1b1f24;color:#e9eef5;font:17px system-ui,sans-serif}
main{max-width:520px;margin:auto;padding:16px}h1{font-size:24px;margin:8px 0 2px}.stap{color:#9fb0c0;margin:0 0 12px}
section{background:#262c33;border-radius:10px;padding:16px;margin:0 0 12px}h2{font-size:19px;margin:0 0 8px}
p{line-height:1.45;margin:8px 0}label{display:block;margin:14px 0 6px}
input,select{width:100%;padding:12px;background:#14181c;color:#fff;border:1px solid #5b6875;border-radius:8px;font:inherit}
button{width:100%;padding:13px;border:0;border-radius:8px;font:inherit;margin-top:14px;cursor:pointer;background:#1f7fd6;color:#fff}
button.grijs{background:#5a626b;color:#fff}button.overslaan{background:#5a626b;color:#ff5a5a;font-weight:700}
button:disabled{opacity:.5}#melding{color:#ffb454;min-height:1.4em;white-space:pre-line}[hidden]{display:none!important}
@media(prefers-color-scheme:light){body{background:#f2f4f6;color:#1b1f24}section{background:#fff;border:1px solid #d5dbe1}input,select{background:#fff;color:#111;border-color:#aab4be}.stap{color:#5b6875}#melding{color:#b45f00}}
</style></head><body><main><h1 id="titel">Instellen</h1><p class="stap" id="stap">Stap 1 van 2</p>
<section id="s1"><h2>Wifi</h2><p>Kies uw eigen 2,4 GHz-wifinetwerk en vul het wachtwoord van dat netwerk in.</p>
<label for="lijst">Gevonden netwerken</label><select id="lijst"><option value="">Netwerken laden…</option></select>
<button type="button" class="grijs" id="ververs">Lijst vernieuwen</button>
<label for="ssid">Netwerknaam</label><input id="ssid" maxlength="32" autocomplete="off" autocapitalize="none">
<label for="psk">Wifi-wachtwoord</label><input id="psk" type="password" maxlength="63" autocomplete="off">
<button type="button" id="volgende">Volgende</button></section>
<section id="s2" hidden><h2>Wachtwoord webpagina</h2><p>Kies een nieuw wachtwoord voor de webpagina van dit apparaat. De gebruikersnaam blijft <b>admin</b>.</p><p>Gebruik 5 tot en met 23 tekens, zonder spaties.</p>
<label for="w1">Nieuw wachtwoord</label><input id="w1" type="password" maxlength="23" autocomplete="new-password">
<label for="w2">Nieuw wachtwoord herhalen</label><input id="w2" type="password" maxlength="23" autocomplete="new-password">
<button type="button" id="opslaan">Opslaan</button><button type="button" class="overslaan" id="overslaan">Overslaan</button>
<button type="button" class="grijs" id="terug">Terug naar wifi</button></section>
<section id="s3" hidden><h2>Opgeslagen</h2><p id="klaar"></p></section>
<p id="melding" role="status"></p></main><script>(()=>{'use strict';const q=i=>document.getElementById(i);let naam='',na='';
const toon=n=>{for(const i of[1,2,3])q('s'+i).hidden=i!==n;q('stap').textContent=n<3?'Stap '+n+' van 2':'Klaar';q('melding').textContent='';};
async function lijst(){try{const r=await fetch('/setup-netwerken',{cache:'no-store'});if(!r.ok)throw 0;const c=await r.json();naam=c.naam;na=c.na||'';q('titel').textContent=c.titel+' instellen';document.title=c.titel+' instellen';
const oud=q('lijst').value;q('lijst').replaceChildren(new Option(c.aps.length?'Kies uw netwerk':'Nog geen netwerken gevonden',''));const gezien=new Set();
for(const a of c.aps){if(!a.ssid||gezien.has(a.ssid))continue;gezien.add(a.ssid);q('lijst').add(new Option(a.ssid+' ('+a.rssi+' dB)',a.ssid));}q('lijst').value=oud;}
catch(e){q('melding').textContent='De netwerklijst is nog niet beschikbaar. Druk op Lijst vernieuwen of vul de netwerknaam zelf in.';}}
q('lijst').onchange=()=>{if(q('lijst').value){q('ssid').value=q('lijst').value;q('melding').textContent='';}};q('ververs').onclick=lijst;
q('volgende').onclick=()=>{if(!q('ssid').value.trim()){q('melding').textContent='Kies of vul eerst uw wifinetwerk in.';return;}toon(2);};
q('terug').onclick=()=>toon(1);
async function verstuur(ww){const kn=[q('opslaan'),q('overslaan'),q('terug')];kn.forEach(k=>k.disabled=true);q('melding').textContent='Bezig met opslaan…';
try{const p=new URLSearchParams({ssid:q('ssid').value.trim(),psk:q('psk').value});if(ww)p.set('ww',ww);
const r=await fetch('/setup-opslaan',{method:'POST',body:p});const t=await r.text();if(!r.ok)throw new Error(t);
toon(3);q('klaar').textContent='Het apparaat verbindt nu met "'+q('ssid').value.trim()+'". Verbind uw telefoon of computer weer met uw eigen wifi en open daarna http://'+naam+'.local of het IP-adres van het apparaat. '+(ww?'Log in met gebruikersnaam admin en uw nieuwe wachtwoord.':'Log in met gebruikersnaam admin en wachtwoord admin.')+(na?' '+na:'')+' Lukt het verbinden niet, dan verschijnt het instelnetwerk opnieuw.';}
catch(e){q('melding').textContent=e.message||'Opslaan is mislukt. Probeer het opnieuw.';kn.forEach(k=>k.disabled=false);}}
q('opslaan').onclick=()=>{const a=q('w1').value,b=q('w2').value;if(a.length<5||a.length>23||/\s/.test(a)){q('melding').textContent='Gebruik 5 tot en met 23 tekens, zonder spaties.';return;}
if(a!==b){q('melding').textContent='De twee wachtwoorden zijn niet gelijk.';return;}verstuur(a);};
q('overslaan').onclick=()=>verstuur('');lijst();})();</script></body></html>)SMITSETUP";

class SetupHandler : public AsyncWebHandler {
 public:
  bool canHandle(AsyncWebServerRequest *r) const override {
    if (!portal_actief()) return false;
    const auto &u = r->url();
    if (r->method() == HTTP_POST) return u == "/setup-opslaan";
    if (r->method() != HTTP_GET) return false;
    if (!r->host().startsWith("192.168.4.1")) return true;  // detectie van het besturingssysteem: omleiden
    return u == "/setup" || u == "/setup-netwerken" || (cfg().root_is_setup && u == "/");
  }
  bool isRequestHandlerTrivial() const override { return false; }
  void handleRequest(AsyncWebServerRequest *r) override {
    const auto &u = r->url();
    if (r->method() == HTTP_POST) { opslaan_(r); return; }
    if (!r->host().startsWith("192.168.4.1")) {
      auto *a = r->beginResponse(302, "text/plain", "Open http://192.168.4.1/setup");
      a->addHeader("Location", "http://192.168.4.1/setup");
      a->addHeader("Cache-Control", "no-store");
      r->send(a);
      return;
    }
    if (u == "/setup-netwerken") { netwerken_(r); return; }
    auto *a = r->beginResponse_P(200, "text/html", SETUP_HTML);
    a->addHeader("Cache-Control", "no-store");
    r->send(a);
  }

 protected:
  static String arg_(AsyncWebServerRequest *r, const char *n) {
    if (r->hasParam(n, true)) return r->getParam(n, true)->value();
    if (r->hasParam(n)) return r->getParam(n)->value();
    return String();
  }
  static void json_tekst_(AsyncResponseStream *s, const char *t, size_t n) {
    for (size_t i = 0; i < n; i++) {
      char c = t[i];
      if (c == '"' || c == '\\') { s->print('\\'); s->print(c); }
      else if ((unsigned char) c < 32) s->print(' ');
      else s->print(c);
    }
  }
  void netwerken_(AsyncWebServerRequest *r) {
    auto *s = r->beginResponseStream("application/json");
    s->addHeader("Cache-Control", "no-store");
    s->print("{\"titel\":\"");
    json_tekst_(s, cfg().titel, strlen(cfg().titel));
    s->print("\",\"na\":\"");
    json_tekst_(s, cfg().na, strlen(cfg().na));
    s->print("\",\"naam\":\"");
    s->print(esphome::App.get_name().c_str());
    s->print("\",\"aps\":[");
    bool eerste = true;
    {
      esphome::wifi::ScanResultsLock lock(esphome::wifi::global_wifi_component);
      const auto &res = esphome::wifi::global_wifi_component->get_scan_result();
      for (const auto &scan : res) {
        bool met_slot = false;
        if (!esphome::wifi::should_show_scan_entry(res, scan, met_slot)) continue;
        const auto &ssid = scan.get_ssid();
        if (!eerste) s->print(',');
        eerste = false;
        s->print("{\"ssid\":\"");
        json_tekst_(s, ssid.c_str(), ssid.size());
        s->print("\",\"rssi\":");
        s->print((int) scan.get_rssi());
        s->print('}');
      }
    }
    s->print("]}");
    r->send(s);
  }
  void opslaan_(AsyncWebServerRequest *r) {
    String ssid = arg_(r, "ssid"), psk = arg_(r, "psk"), ww = arg_(r, "ww");
    if (ssid.length() == 0 || ssid.length() > 32 || psk.length() > 63) {
      r->send(400, "text/plain", "Vul een geldige netwerknaam en een geldig wifi-wachtwoord in.");
      return;
    }
    if (ww.length() > 0) {
      if (!ww_geldig(ww.c_str()) || !cfg().zet_ww || !cfg().zet_ww(ww.c_str())) {
        r->send(400, "text/plain", "Gebruik voor het wachtwoord 5 tot en met 23 tekens, zonder spaties.");
        return;
      }
    }
    Wacht &w = wacht();
    strncpy(w.ssid, ssid.c_str(), 32); w.ssid[32] = 0;
    strncpy(w.psk, psk.c_str(), 64); w.psk[64] = 0;
    w.actie = 2;
    w.om = millis() + 1500;
    r->send(200, "text/plain", "Opgeslagen.");
  }
};

// POST /fabrieksreset (met inlog): hetzelfde als 3x kort op RST.
class ResetHandler : public AsyncWebHandler {
 public:
  bool canHandle(AsyncWebServerRequest *r) const override {
    return r->method() == HTTP_POST && r->url() == "/fabrieksreset";
  }
  void handleRequest(AsyncWebServerRequest *r) override {
    Wacht &w = wacht();
    w.actie = 1;
    w.om = millis() + 1500;
    r->send(200, "text/plain", "Reset gestart. Het apparaat herstart en opent het instelnetwerk.");
  }
};

}  // namespace smit
