import type { DualDate } from "@/types";
import { DASHAIN_DAYS, type DashainDayContent } from "@/data/dashain";
import { daysBetween, fromJsDate, getTodayDual } from "./bs-ad";
import { computePanchang } from "./panchang";

/** Ashwin is BS month index 5; Kartik is 6 */
const ASHWIN = 5;

export interface DashainTimelineDay {
  content: DashainDayContent;
  date: DualDate;
  daysUntil: number;
  isToday: boolean;
  isPast: boolean;
  isUpcoming: boolean;
}

export interface DashainTimeline {
  yearBs: number;
  days: DashainTimelineDay[];
  start: DualDate;
  end: DualDate;
  todayIndex: number;
  progress: number;
  inSeason: boolean;
}

/**
 * Collect Ashwin Shukla 1–15 (allowing spill into early Kartik) for a BS year.
 */
function collectShuklaFortnight(yearBs: number): Map<number, DualDate> {
  const adYear = yearBs - 57;
  const cursor = new Date(adYear, 7, 20, 12, 0, 0); // ~20 Aug
  const end = new Date(adYear, 10, 20, 12, 0, 0); // ~20 Nov
  const map = new Map<number, DualDate>();

  for (let d = new Date(cursor); d <= end; d.setDate(d.getDate() + 1)) {
    const dual = fromJsDate(new Date(d.getTime()));
    if (dual.bs.year !== yearBs) continue;
    if (dual.bs.month < ASHWIN - 1 || dual.bs.month > ASHWIN + 1) continue;

    const p = computePanchang(dual.jsDate);
    if (p.paksha !== "Shukla") continue;
    if (p.tithiNumber < 1 || p.tithiNumber > 15) continue;

    // Prefer first occurrence; for Ashwin Shukla fortnight, Pratipada should be in Ashwin
    if (map.has(p.tithiNumber)) continue;

    // Gate: tithi 1 must be Ashwin; later tithis may be Kartik
    if (p.tithiNumber === 1 && dual.bs.month !== ASHWIN) continue;
    if (p.tithiNumber > 1) {
      const first = map.get(1);
      if (!first) continue;
      const gap = daysBetween(first.jsDate, dual.jsDate);
      if (gap < 0 || gap > 20) continue;
    }

    map.set(p.tithiNumber, dual);
    if (map.size === 15) break;
  }

  return map;
}

function buildForYear(yearBs: number, today: DualDate): DashainTimelineDay[] {
  const map = collectShuklaFortnight(yearBs);
  const out: DashainTimelineDay[] = [];

  for (const content of DASHAIN_DAYS) {
    const date = map.get(content.tithiNumber);
    if (!date) continue;
    const until = daysBetween(today.jsDate, date.jsDate);
    out.push({
      content,
      date,
      daysUntil: until,
      isToday: until === 0,
      isPast: until < 0,
      isUpcoming: until > 0,
    });
  }

  return out;
}

/**
 * Build the 15-day Dashain timeline for the active or next season.
 */
export function getDashainTimeline(now: Date = new Date()): DashainTimeline {
  const today = fromJsDate(now);
  let yearBs = today.bs.year;
  let days = buildForYear(yearBs, today);

  if (days.length === 15 && days.every((d) => d.isPast)) {
    yearBs += 1;
    days = buildForYear(yearBs, today);
  } else if (days.length < 10) {
    // Early BS year before Ashwin window resolves — try still current; else next
    const next = buildForYear(yearBs + 1, today);
    if (next.length > days.length) {
      yearBs += 1;
      days = next;
    }
  }

  const start = days[0]?.date ?? today;
  const end = days[days.length - 1]?.date ?? today;
  const todayIndex = days.findIndex((d) => d.isToday);
  const untilStart = daysBetween(today.jsDate, start.jsDate);
  const untilEnd = daysBetween(today.jsDate, end.jsDate);
  const inSeason = untilStart <= 0 && untilEnd >= 0;

  let progress = 0;
  if (days.length) {
    if (untilEnd < 0) progress = 1;
    else if (untilStart > 0) progress = 0;
    else {
      const idx = todayIndex >= 0 ? todayIndex : days.findIndex((d) => !d.isPast);
      progress = Math.min(1, Math.max(0, ((idx >= 0 ? idx : 0) + 0.5) / days.length));
    }
  }

  return {
    yearBs,
    days,
    start,
    end,
    todayIndex,
    progress,
    inSeason,
  };
}

export function getDashainDayToday(
  now: Date = new Date()
): DashainTimelineDay | null {
  return getDashainTimeline(now).days.find((d) => d.isToday) ?? null;
}

export type { DashainDayContent };
