import NepaliDate from "nepali-date-converter";
import type { ADDate, BSDate, DualDate } from "@/types";
import {
  BS_MONTHS_EN,
  BS_MONTHS_NP,
  WEEKDAYS_EN,
  WEEKDAYS_NP,
  toNepaliDigits,
} from "./constants";

export function getTodayDual(): DualDate {
  return fromJsDate(new Date());
}

export function fromJsDate(date: Date): DualDate {
  const nd = new NepaliDate(date);
  const bs = nd.getBS();
  const ad = nd.getAD();
  return {
    bs: { year: bs.year, month: bs.month, day: bs.date },
    ad: { year: ad.year, month: ad.month, day: ad.date },
    weekDay: nd.getDay(),
    jsDate: nd.toJsDate(),
  };
}

export function fromBS(year: number, month: number, day: number): DualDate {
  const nd = new NepaliDate(year, month, day);
  const bs = nd.getBS();
  const ad = nd.getAD();
  return {
    bs: { year: bs.year, month: bs.month, day: bs.date },
    ad: { year: ad.year, month: ad.month, day: ad.date },
    weekDay: nd.getDay(),
    jsDate: nd.toJsDate(),
  };
}

export function fromAD(year: number, month: number, day: number): DualDate {
  const d = new Date(year, month, day, 12, 0, 0);
  return fromJsDate(d);
}

export function bsToAd(bs: BSDate): ADDate {
  const dual = fromBS(bs.year, bs.month, bs.day);
  return dual.ad;
}

export function adToBs(ad: ADDate): BSDate {
  const dual = fromAD(ad.year, ad.month, ad.day);
  return dual.bs;
}

/** Days in a given BS month (0-11) */
export function daysInBSMonth(year: number, month: number): number {
  // Probe last day: try 32 down to 28
  for (let d = 32; d >= 28; d--) {
    try {
      const nd = new NepaliDate(year, month, d);
      if (nd.getMonth() === month && nd.getYear() === year) {
        return nd.getDate();
      }
    } catch {
      // invalid
    }
  }
  // Fallback: start of next month minus one
  try {
    const next =
      month === 11
        ? new NepaliDate(year + 1, 0, 1)
        : new NepaliDate(year, month + 1, 1);
    const prev = new Date(next.toJsDate().getTime() - 86400000);
    return new NepaliDate(prev).getDate();
  } catch {
    return 30;
  }
}

export function addBSMonths(
  year: number,
  month: number,
  delta: number
): { year: number; month: number } {
  let m = month + delta;
  let y = year;
  while (m > 11) {
    m -= 12;
    y += 1;
  }
  while (m < 0) {
    m += 12;
    y -= 1;
  }
  return { year: y, month: m };
}

export function isSameBSDay(a: BSDate, b: BSDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function formatBS(
  bs: BSDate,
  opts: { lang?: "en" | "np"; withWeekday?: boolean; weekday?: number } = {}
): string {
  const { lang = "en", withWeekday = false, weekday } = opts;
  if (lang === "np") {
    const m = BS_MONTHS_NP[bs.month];
    const d = toNepaliDigits(bs.day);
    const y = toNepaliDigits(bs.year);
    const base = `${d} ${m} ${y}`;
    if (withWeekday && weekday !== undefined) {
      return `${WEEKDAYS_NP[weekday]}, ${base}`;
    }
    return base;
  }
  const m = BS_MONTHS_EN[bs.month];
  const base = `${bs.day} ${m} ${bs.year}`;
  if (withWeekday && weekday !== undefined) {
    return `${WEEKDAYS_EN[weekday]}, ${base}`;
  }
  return base;
}

export function formatAD(
  ad: ADDate,
  opts: { short?: boolean } = {}
): string {
  const months = opts.short
    ? [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
  return `${ad.day} ${months[ad.month]} ${ad.year}`;
}

export function formatDualHeader(dual: DualDate): {
  bsEn: string;
  bsNp: string;
  adEn: string;
  monthYearEn: string;
  monthYearNp: string;
} {
  return {
    bsEn: formatBS(dual.bs),
    bsNp: formatBS(dual.bs, { lang: "np" }),
    adEn: formatAD(dual.ad),
    monthYearEn: `${BS_MONTHS_EN[dual.bs.month]} ${dual.bs.year}`,
    monthYearNp: `${BS_MONTHS_NP[dual.bs.month]} ${toNepaliDigits(dual.bs.year)}`,
  };
}

/** Build all dual dates for a BS month grid (including leading/trailing days for weeks) */
export function getMonthGridDays(
  year: number,
  month: number
): { days: DualDate[]; daysInMonth: number } {
  const dim = daysInBSMonth(year, month);
  const first = fromBS(year, month, 1);
  const startPad = first.weekDay; // Sunday-first grid

  const days: DualDate[] = [];

  // Previous month padding
  if (startPad > 0) {
    const prev = addBSMonths(year, month, -1);
    const prevDim = daysInBSMonth(prev.year, prev.month);
    for (let i = startPad - 1; i >= 0; i--) {
      days.push(fromBS(prev.year, prev.month, prevDim - i));
    }
  }

  for (let d = 1; d <= dim; d++) {
    days.push(fromBS(year, month, d));
  }

  // Next month padding to complete weeks (6 rows max)
  const remaining = 42 - days.length; // 6*7
  if (remaining > 0) {
    const next = addBSMonths(year, month, 1);
    for (let d = 1; d <= remaining; d++) {
      days.push(fromBS(next.year, next.month, d));
    }
  }

  return { days, daysInMonth: dim };
}

export function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

export function daysBetween(a: Date, b: Date): number {
  const ms =
    startOfLocalDay(b).getTime() - startOfLocalDay(a).getTime();
  return Math.round(ms / 86400000);
}
