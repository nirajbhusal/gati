import { daysInBSMonth, fromBS, fromJsDate, getTodayDual } from "./bs-ad";
import { BS_MONTHS_EN, toNepaliDigits } from "./constants";

export interface BSYearProgress {
  year: number;
  /** 0–100 */
  percent: number;
  dayOfYear: number;
  totalDays: number;
  daysRemaining: number;
  startLabel: string;
  endLabel: string;
}

/** Days elapsed / total in the current Bikram Sambat year (Baisakh 1 → next Baisakh 1). */
export function getBSYearProgress(date: Date = new Date()): BSYearProgress {
  const dual = fromJsDate(date);
  const year = dual.bs.year;
  const start = fromBS(year, 0, 1);
  const nextStart = fromBS(year + 1, 0, 1);

  const startMs = startOfLocal(start.jsDate).getTime();
  const nextMs = startOfLocal(nextStart.jsDate).getTime();
  const nowMs = startOfLocal(dual.jsDate).getTime();

  const totalDays = Math.round((nextMs - startMs) / 86400000);
  const dayOfYear = Math.min(
    totalDays,
    Math.max(1, Math.floor((nowMs - startMs) / 86400000) + 1)
  );
  const daysRemaining = Math.max(0, totalDays - dayOfYear);
  const percent = Math.min(
    100,
    Math.max(0, Math.round(((dayOfYear - 0.5) / totalDays) * 1000) / 10)
  );

  const chaitraDays = daysInBSMonth(year, 11);

  return {
    year,
    percent,
    dayOfYear,
    totalDays,
    daysRemaining,
    startLabel: `1 ${BS_MONTHS_EN[0]} ${year}`,
    endLabel: `${chaitraDays} ${BS_MONTHS_EN[11]} ${year}`,
  };
}

function startOfLocal(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function yearProgressCopy(p: BSYearProgress): {
  en: string;
  np: string;
} {
  return {
    en: `${p.year} is ${p.percent}% complete`,
    np: `${toNepaliDigits(p.year)} ${p.percent}% पूरा`,
  };
}

export function getTodayYearProgress(): BSYearProgress {
  return getBSYearProgress(getTodayDual().jsDate);
}
