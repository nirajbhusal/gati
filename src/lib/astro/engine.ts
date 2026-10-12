/**
 * Digital Cheena engine v1 — Lahiri sidereal positions + Lagna.
 * Guidance-grade accuracy; birth-time minutes can shift Lagna.
 */

import { getPlace } from "@/data/nepal-places";
import type {
  BirthInput,
  CheenaChart,
  GrahaId,
  PlanetPosition,
  RashiId,
} from "@/types/astro";
import {
  GRAHA_META,
  NAKSHATRA_EN,
  NAKSHATRA_NP,
  RASHI_EN,
  RASHI_LORD,
  RASHI_NP,
  RASHI_ORDER,
} from "./constants";

const DEG = Math.PI / 180;

function norm360(x: number): number {
  let v = x % 360;
  if (v < 0) v += 360;
  return v;
}

function julianDay(date: Date): number {
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

/** Lahiri ayanamsa approximation (degrees) */
export function lahiriAyanamsa(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return 23.85 + 1.396971 * T; // ~23.85° at J2000, drifts ~50"/yr
}

function sunTropical(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mr = M * DEG;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) +
    0.000289 * Math.sin(3 * Mr);
  return norm360(L0 + C);
}

function moonTropical(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const Lp = norm360(
    218.3164477 +
      481267.88123421 * T -
      0.0015786 * T * T +
      (T * T * T) / 538841
  );
  const D = norm360(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T);
  const M = norm360(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
  const Mp = norm360(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T);
  const F = norm360(93.272095 + 483202.0175233 * T - 0.0036539 * T * T);
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
  ];
  let sum = 0;
  for (const [amp, d, m, mp, f] of terms) {
    sum += amp * Math.sin((d * D + m * M + mp * Mp + f * F) * DEG);
  }
  return norm360(Lp + sum / 1000000);
}

/** Mean planetary longitudes (tropical) — guidance grade */
function meanPlanetTropical(
  jd: number,
  id: Exclude<GrahaId, "sun" | "moon" | "rahu" | "ketu">
): number {
  const T = (jd - 2451545.0) / 36525;
  const d = jd - 2451545.0;
  switch (id) {
    case "mercury":
      return norm360(252.250906 + 4.0923344368 * d);
    case "venus":
      return norm360(181.979801 + 1.602168703 * d);
    case "mars":
      return norm360(355.433 + 0.5240711638 * d);
    case "jupiter":
      return norm360(34.351519 + 0.083129442 * d + 0.0003036 * T * T);
    case "saturn":
      return norm360(50.077444 + 0.033503853 * d + 0.0002124 * T * T);
    default:
      return 0;
  }
}

function rahuTropical(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return norm360(125.0445479 - 1934.1362891 * T + 0.0020762 * T * T);
}

function obliquity(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return 23.439291 - 0.0130042 * T;
}

/** Local sidereal time in degrees */
function localSiderealDeg(jd: number, lonEast: number): number {
  const T = (jd - 2451545.0) / 36525;
  const gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  return norm360(gmst + lonEast);
}

/** Ascendant (tropical) */
function ascendantTropical(jd: number, lat: number, lon: number): number {
  const ramc = localSiderealDeg(jd, lon) * DEG;
  const eps = obliquity(jd) * DEG;
  const phi = lat * DEG;
  const y = Math.cos(ramc);
  const x = -Math.sin(ramc) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps);
  let asc = Math.atan2(y, x) / DEG;
  return norm360(asc);
}

function rashiFromLong(lon: number): {
  index: number;
  id: RashiId;
  degInSign: number;
} {
  const index = Math.floor(norm360(lon) / 30) % 12;
  return {
    index,
    id: RASHI_ORDER[index],
    degInSign: norm360(lon) % 30,
  };
}

function nakshatraFromLong(lon: number): { index: number } {
  return { index: Math.floor(norm360(lon) / (360 / 27)) % 27 };
}

function houseFromLagna(planetLon: number, lagnaLon: number): number {
  const diff = norm360(planetLon - lagnaLon);
  return Math.floor(diff / 30) + 1;
}

function parseBirthDate(input: BirthInput): Date {
  const [y, m, d] = input.birthDateAd.split("-").map(Number);
  let hh = 12;
  let mm = 0;
  if (input.birthTime && !input.timeUnknown) {
    const [h, min] = input.birthTime.split(":").map(Number);
    hh = h;
    mm = min || 0;
  }
  // Interpret as Nepal time (UTC+5:45)
  const nptOffset = 5 + 45 / 60;
  const utcMs = Date.UTC(y, m - 1, d, 0, 0, 0) + (hh - nptOffset) * 3600000 + mm * 60000;
  return new Date(utcMs);
}

function makePlanet(
  id: GrahaId,
  siderealLon: number,
  lagnaLon: number
): PlanetPosition {
  const r = rashiFromLong(siderealLon);
  const n = nakshatraFromLong(siderealLon);
  const meta = GRAHA_META[id];
  return {
    id,
    name: meta.name,
    nameNp: meta.nameNp,
    longitude: siderealLon,
    rashiIndex: r.index,
    rashi: r.id,
    rashiName: RASHI_EN[r.index],
    rashiNameNp: RASHI_NP[r.index],
    degreeInSign: r.degInSign,
    nakshatraIndex: n.index,
    nakshatraName: NAKSHATRA_EN[n.index],
    nakshatraNameNp: NAKSHATRA_NP[n.index],
    house: houseFromLagna(siderealLon, lagnaLon),
  };
}

export function computeCheena(input: BirthInput): CheenaChart {
  const place = getPlace(input.placeId);
  if (!place) throw new Error("Unknown birth place");

  const date = parseBirthDate(input);
  const jd = julianDay(date);
  const aya = lahiriAyanamsa(jd);

  const sunS = norm360(sunTropical(jd) - aya);
  const moonS = norm360(moonTropical(jd) - aya);
  const marsS = norm360(meanPlanetTropical(jd, "mars") - aya);
  const mercS = norm360(meanPlanetTropical(jd, "mercury") - aya);
  const jupS = norm360(meanPlanetTropical(jd, "jupiter") - aya);
  const venS = norm360(meanPlanetTropical(jd, "venus") - aya);
  const satS = norm360(meanPlanetTropical(jd, "saturn") - aya);
  const rahuS = norm360(rahuTropical(jd) - aya);
  const ketuS = norm360(rahuS + 180);

  const lagnaTrop = ascendantTropical(jd, place.lat, place.lon);
  const lagnaS = norm360(lagnaTrop - aya);
  const lagnaR = rashiFromLong(lagnaS);
  const moonR = rashiFromLong(moonS);
  const moonN = nakshatraFromLong(moonS);

  const planets: PlanetPosition[] = (
    [
      ["sun", sunS],
      ["moon", moonS],
      ["mars", marsS],
      ["mercury", mercS],
      ["jupiter", jupS],
      ["venus", venS],
      ["saturn", satS],
      ["rahu", rahuS],
      ["ketu", ketuS],
    ] as [GrahaId, number][]
  ).map(([id, lon]) => makePlanet(id, lon, lagnaS));

  const houseRashi = Array.from({ length: 12 }, (_, i) => (lagnaR.index + i) % 12);
  const primaryGraha = RASHI_LORD[moonR.index];

  return {
    id: `cheena_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    input,
    place,
    ayanamsa: aya,
    lagnaLongitude: lagnaS,
    lagnaRashiIndex: lagnaR.index,
    lagnaRashi: lagnaR.id,
    lagnaName: RASHI_EN[lagnaR.index],
    lagnaNameNp: RASHI_NP[lagnaR.index],
    moonRashiIndex: moonR.index,
    moonNakshatraIndex: moonN.index,
    primaryGraha,
    planets,
    houseRashi,
  };
}

export function dayPartLabel(d: Date = new Date()): { en: string; np: string } {
  const h = d.getHours();
  if (h >= 4 && h < 12) return { en: "Morning", np: "बिहानको" };
  if (h >= 12 && h < 17) return { en: "Afternoon", np: "दिउँसोको" };
  if (h >= 17 && h < 20) return { en: "Evening", np: "साँझको" };
  return { en: "Night", np: "रातिको" };
}
