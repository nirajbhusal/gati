/**
 * Panchang engine — astronomical tithi, nakshatra, yoga, karana.
 * Uses Jean Meeus–style solar/lunar longitude formulas, evaluated at
 * Nepal Standard Time (UTC+5:45). Accurate enough for calendar display.
 */

import type { Panchang } from "@/types";
import {
  AMAVASYA_EN,
  AMAVASYA_NP,
  KARANA_EN,
  KARANA_NP,
  NAKSHATRA_EN,
  NAKSHATRA_NP,
  PURNIMA_EN,
  PURNIMA_NP,
  TITHI_NAMES_EN,
  TITHI_NAMES_NP,
  YOGA_EN,
  YOGA_NP,
} from "./constants";

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;
const NEPAL_OFFSET_HOURS = 5 + 45 / 60; // UTC+5:45

function norm360(x: number): number {
  let v = x % 360;
  if (v < 0) v += 360;
  return v;
}

function julianDay(date: Date): number {
  // Convert to Nepal local solar-ish midday if date is midnight-based
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const D =
    date.getUTCDate() +
    (date.getUTCHours() +
      date.getUTCMinutes() / 60 +
      date.getUTCSeconds() / 3600) /
      24;

  let Y = y;
  let M = m;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (Y + 4716)) +
    Math.floor(30.6001 * (M + 1)) +
    D +
    B -
    1524.5
  );
}

/** Create a Date for local Nepal time on a calendar day at given hour */
function nepalDateTime(
  year: number,
  month: number,
  day: number,
  hour = 12
): Date {
  // Store as UTC that represents Nepal local: local = UTC + 5:45
  const utcMs =
    Date.UTC(year, month, day, 0, 0, 0) +
    (hour - NEPAL_OFFSET_HOURS) * 3600000;
  return new Date(utcMs);
}

function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm360(
    357.52911 + 35999.05029 * T - 0.0001537 * T * T
  );
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;
  const Mr = M * DEG;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) +
    0.000289 * Math.sin(3 * Mr);
  const trueLong = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const lambda =
    trueLong -
    0.00569 -
    0.00478 * Math.sin(omega * DEG);
  // Equation of center already applied; e used for completeness in true anomaly if needed
  void e;
  return norm360(lambda);
}

function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const Lp = norm360(
    218.3164477 +
      481267.88123421 * T -
      0.0015786 * T * T +
      (T * T * T) / 538841 -
      (T * T * T * T) / 65194000
  );
  const D = norm360(
    297.8501921 +
      445267.1114034 * T -
      0.0018819 * T * T +
      (T * T * T) / 545868 -
      (T * T * T * T) / 113065000
  );
  const M = norm360(
    357.5291092 +
      35999.0502909 * T -
      0.0001536 * T * T +
      (T * T * T) / 24490000
  );
  const Mp = norm360(
    134.9633964 +
      477198.8675055 * T +
      0.0087414 * T * T +
      (T * T * T) / 69699 -
      (T * T * T * T) / 14712000
  );
  const F = norm360(
    93.272095 +
      483202.0175233 * T -
      0.0036539 * T * T -
      (T * T * T) / 3526000 +
      (T * T * T * T) / 863310000
  );

  // Major periodic terms for longitude (degrees), from ELP/Meeus
  const terms: [number, number, number, number, number][] = [
    [6288774, 0, 0, 1, 0],
    [1274027, 2, 0, -1, 0],
    [658314, 2, 0, 0, 0],
    [213618, 0, 0, 2, 0],
    [-185116, 0, 1, 0, 0],
    [-114332, 0, 0, 0, 2],
    [58793, 2, 0, -2, 0],
    [57066, 2, -1, -1, 0],
    [53322, 2, 0, 1, 0],
    [45758, 2, -1, 0, 0],
    [-40923, 0, 1, -1, 0],
    [-34720, 1, 0, 0, 0],
    [-30383, 0, 1, 1, 0],
    [15327, 2, 0, 0, -2],
    [-12528, 0, 0, 1, 2],
    [10980, 0, 0, 1, -2],
    [10675, 4, 0, -1, 0],
    [10034, 0, 0, 3, 0],
    [8548, 4, 0, -2, 0],
    [-7888, 2, 1, -1, 0],
    [-6766, 2, 1, 0, 0],
    [-5163, 1, 0, -1, 0],
    [4987, 1, 1, 0, 0],
    [4036, 2, -1, 1, 0],
    [3994, 2, 0, 2, 0],
    [3861, 4, 0, 0, 0],
    [3665, 2, 0, -3, 0],
    [-2689, 0, 1, -2, 0],
    [-2602, 2, 0, -1, 2],
    [2390, 2, -1, -2, 0],
    [-2348, 1, 0, 1, 0],
    [2236, 2, -2, 0, 0],
    [-2120, 0, 1, 2, 0],
    [-2069, 0, 2, 0, 0],
    [2048, 2, -2, -1, 0],
    [-1773, 2, 0, 1, -2],
    [-1595, 2, 0, 0, 2],
    [1215, 4, -1, -1, 0],
    [-1110, 0, 0, 2, 2],
    [-892, 3, 0, -1, 0],
    [-810, 2, 1, 1, 0],
    [759, 4, -1, -2, 0],
    [-713, 0, 2, -1, 0],
    [-700, 2, 2, -1, 0],
    [691, 2, 1, -2, 0],
    [596, 2, -1, 0, -2],
    [549, 4, 0, 1, 0],
    [537, 0, 0, 4, 0],
    [520, 4, -1, 0, 0],
    [-487, 1, 0, -2, 0],
    [-399, 2, 1, 0, -2],
    [-381, 0, 0, 2, -2],
    [351, 1, 1, 1, 0],
    [-340, 3, 0, -2, 0],
    [330, 4, 0, -3, 0],
    [327, 2, -1, 2, 0],
    [-323, 0, 2, 1, 0],
    [299, 1, 1, -1, 0],
    [294, 2, 0, 3, 0],
  ];

  let sum = 0;
  for (const [amp, d, m, mp, f] of terms) {
    sum +=
      amp *
      Math.sin(
        (d * D + m * M + mp * Mp + f * F) * DEG
      );
  }

  // Eccentricity correction factor for solar terms involving M (simplified)
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  void E;

  const longitude = Lp + sum / 1000000;
  return norm360(longitude);
}

function tithiIndexFromLongitudes(sun: number, moon: number): {
  index: number;
  progress: number;
  elongation: number;
} {
  const elongation = norm360(moon - sun);
  const raw = elongation / 12; // 0–30
  const index = Math.floor(raw) % 30;
  const progress = raw - Math.floor(raw);
  return { index, progress, elongation };
}

function findTithiEnd(
  baseJd: number,
  currentIndex: number
): number {
  // Binary search forward for when elongation crosses next 12° boundary
  const targetElong = ((currentIndex + 1) % 30) * 12;
  let lo = baseJd;
  let hi = baseJd + 2; // tithi < ~1.1 days typically, allow 2
  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2;
    const sun = sunLongitude(mid);
    const moon = moonLongitude(mid);
    const elong = norm360(moon - sun);
    // Distance past current tithi start
    const start = currentIndex * 12;
    let past = norm360(elong - start);
    if (past >= 12 || (currentIndex === 29 && elong < 6 && past > 300)) {
      // crossed into next
      hi = mid;
    } else if (targetElong === 0) {
      // wrapping to 0
      if (elong < start && elong < 12) hi = mid;
      else lo = mid;
    } else {
      if (elong >= targetElong || (elong < start && currentIndex > 0)) {
        // careful: if elong wrapped
        if (elong >= targetElong && elong < start + 12 + 6) hi = mid;
        else lo = mid;
      } else {
        lo = mid;
      }
    }
  }
  return (lo + hi) / 2;
}

function jdToDate(jd: number): Date {
  // Inverse of julian day to JS Date (UTC)
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let A = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    A = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E) + f;
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  const dayInt = Math.floor(day);
  const frac = day - dayInt;
  const hours = frac * 24;
  const h = Math.floor(hours);
  const minutes = (hours - h) * 60;
  const min = Math.floor(minutes);
  const sec = Math.floor((minutes - min) * 60);
  return new Date(Date.UTC(year, month - 1, dayInt, h, min, sec));
}

function karanaFromTithi(tithiIndex: number, progress: number): number {
  // Each tithi has 2 karanas; first half and second half
  const half = progress < 0.5 ? 0 : 1;
  const karanaNumber = tithiIndex * 2 + half; // 0–59 over lunar month

  if (karanaNumber === 0) return 10; // Kimstughna
  if (karanaNumber >= 57) {
    // 57 Shakuni, 58 Chatushpada, 59 Naga
    return 7 + (karanaNumber - 57);
  }
  // Movable: Bava..Vishti cycle (0-6) starting at karana 1
  return (karanaNumber - 1) % 7;
}

/**
 * Compute full panchang for a given JS Date.
 * Uses Nepal Standard Time noon for the civil day by default when
 * the input is a calendar date (local midnight components).
 */
export function computePanchang(date: Date, useExactTime = false): Panchang {
  let evalDate: Date;
  if (useExactTime) {
    evalDate = date;
  } else {
    // Evaluate at ~6 AM Nepal time for “day’s tithi” (common civil convention),
    // or noon — we use 5:45 AM UTC+5:45 equivalent of local sunrise-ish: 6:00 NPT
    evalDate = nepalDateTime(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      6
    );
  }

  const jd = julianDay(evalDate);
  const sun = sunLongitude(jd);
  const moon = moonLongitude(jd);
  const { index: tithiIndex, progress } = tithiIndexFromLongitudes(sun, moon);

  const paksha: "Shukla" | "Krishna" =
    tithiIndex < 15 ? "Shukla" : "Krishna";
  const tithiNumber = (tithiIndex % 15) + 1;

  let tithiName: string;
  let tithiNameNp: string;
  if (tithiIndex === 14) {
    tithiName = PURNIMA_EN;
    tithiNameNp = PURNIMA_NP;
  } else if (tithiIndex === 29) {
    tithiName = AMAVASYA_EN;
    tithiNameNp = AMAVASYA_NP;
  } else {
    const ni = (tithiNumber - 1) % 15;
    tithiName = TITHI_NAMES_EN[ni === 14 ? 13 : ni]; // 1-14 names; 15 handled above
    // For numbers 1-14 use index 0-13; for non-purnima/amavasya index is 0-13
    const nameIdx = Math.min(tithiNumber - 1, 13);
    tithiName = TITHI_NAMES_EN[nameIdx];
    tithiNameNp = TITHI_NAMES_NP[nameIdx];
  }

  const nakshatraRaw = moon / (360 / 27);
  const nakshatraIndex = Math.floor(nakshatraRaw) % 27;

  const yogaRaw = norm360(sun + moon) / (360 / 27);
  const yogaIndex = Math.floor(yogaRaw) % 27;

  const karanaIndex = karanaFromTithi(tithiIndex, progress);

  // Approximate tithi end via stepping
  let endJd = jd;
  const startElong = tithiIndex * 12;
  for (let step = 0; step < 48; step++) {
    endJd = jd + step * (1 / 24); // hourly
    const s = sunLongitude(endJd);
    const m = moonLongitude(endJd);
    const el = norm360(m - s);
    const past = norm360(el - startElong);
    if (past >= 12) break;
  }
  // Refine with binary search in last hour
  let lo = endJd - 1 / 24;
  let hi = endJd;
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2;
    const s = sunLongitude(mid);
    const m = moonLongitude(mid);
    const el = norm360(m - s);
    const past = norm360(el - startElong);
    if (past >= 12) hi = mid;
    else lo = mid;
  }
  const tithiEnd = jdToDate((lo + hi) / 2);
  const now = useExactTime ? date : new Date();
  const tithiRemainingMs = Math.max(0, tithiEnd.getTime() - now.getTime());

  const moonPhase = norm360(moon - sun) / 360;

  return {
    tithiIndex,
    tithiName,
    tithiNameNp,
    tithiNumber,
    paksha,
    pakshaNp: paksha === "Shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष",
    nakshatraIndex,
    nakshatraName: NAKSHATRA_EN[nakshatraIndex],
    nakshatraNameNp: NAKSHATRA_NP[nakshatraIndex],
    yogaIndex,
    yogaName: YOGA_EN[yogaIndex],
    yogaNameNp: YOGA_NP[yogaIndex],
    karanaIndex,
    karanaName: KARANA_EN[karanaIndex],
    karanaNameNp: KARANA_NP[karanaIndex],
    tithiProgress: progress,
    tithiEnd,
    tithiRemainingMs,
    moonPhase,
    sunLongitude: sun,
    moonLongitude: moon,
  };
}

export function formatDuration(ms: number): string {
  if (ms <= 0) return "ending soon";
  const totalMin = Math.floor(ms / 60000);
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  if (hours > 48) {
    const days = Math.floor(hours / 24);
    const h = hours % 24;
    return `${days}d ${h}h`;
  }
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function pakshaLabel(paksha: "Shukla" | "Krishna", lang: "en" | "np" = "en"): string {
  if (lang === "np") return paksha === "Shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
  return paksha === "Shukla" ? "Shukla Paksha" : "Krishna Paksha";
}

// silence unused helper if tree-shaken issues
void findTithiEnd;
void RAD;
