#pragma once
// v8: eigen meting van ingang D7 (afstandsbediening): pulsbreedte, periode en aantal pulsen
#include <Arduino.h>

static volatile uint32_t d7_rise_us = 0;
static volatile uint32_t d7_high_us = 0;
static volatile uint32_t d7_period_us = 0;
static volatile uint32_t d7_count = 0;
static volatile uint32_t d7_last_ms = 0;

static void IRAM_ATTR d7_isr() {
  uint32_t now = micros();
  if (digitalRead(D7)) {
    if (d7_rise_us) d7_period_us = now - d7_rise_us;
    d7_rise_us = now;
    d7_count++;
  } else {
    if (d7_rise_us) d7_high_us = now - d7_rise_us;
  }
  d7_last_ms = millis();
}

static void d7_begin() {
  pinMode(D7, INPUT);
  attachInterrupt(digitalPinToInterrupt(D7), d7_isr, CHANGE);
}

static bool d7_active() {
  return d7_last_ms != 0 && (millis() - d7_last_ms) < 2000;
}
