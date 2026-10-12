import type { Metadata } from "next";
import { MonthGrid } from "@/components/calendar/MonthGrid";
import { YearProgressBar } from "@/components/calendar/YearProgress";
import {
  formatAD,
  formatBS,
  getTodayDual,
  WEEKDAYS_EN,
  WEEKDAYS_NP,
} from "@/lib/calendar";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Full Bikram Sambat + Gregorian dual calendar with tithi, festivals, and Nepal public holidays.",
};

export default function CalendarPage() {
  const today = getTodayDual();

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Calendar{" "}
            <span className="np text-xl font-normal text-[var(--fg-muted)]">
              पात्रो
            </span>
          </h1>
          <p className="text-sm text-[var(--fg-muted)] sm:text-base">
            BS + English dual view · hover a day for tithi, festivals & holidays
          </p>
        </div>
        <div className="shrink-0 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm sm:text-right">
          <p className="text-[0.65rem] uppercase tracking-wider text-[var(--fg-subtle)]">
            Today · आज
          </p>
          <p className="font-semibold">{formatBS(today.bs)}</p>
          <p className="np text-xs text-[var(--accent)]">
            {formatBS(today.bs, { lang: "np" })}
          </p>
          <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
            {WEEKDAYS_EN[today.weekDay]} ·{" "}
            <span className="np">{WEEKDAYS_NP[today.weekDay]}</span>
          </p>
          <p className="text-xs text-[var(--fg-muted)]">
            AD {formatAD(today.ad)}
          </p>
        </div>
      </header>

      <YearProgressBar />

      <MonthGrid />

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--fg-subtle)]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--today)]" /> Today
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--festival)]" />{" "}
          Festival
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--holiday)]" />{" "}
          Public holiday
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[var(--weekend)]/35" /> Sat
          & Sun weekly holiday
        </span>
      </div>
    </div>
  );
}
