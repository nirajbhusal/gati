"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  BS_MONTHS_EN,
  BS_MONTHS_NP,
  WEEKDAYS_EN,
  WEEKDAYS_NP,
  WEEKDAYS_SHORT_EN,
  WEEKDAYS_SHORT_NP,
  addBSMonths,
  computePanchang,
  festivalsForDay,
  formatAD,
  fromBS,
  getMonthGridDays,
  getTodayDual,
  isNepalWeekend,
  isSameBSDay,
  toNepaliDigits,
  weekendHolidayLabel,
} from "@/lib/calendar";
import type { DualDate, Festival, Panchang } from "@/types";
import { cn } from "@/lib/utils/cn";

export function CalendarNav({
  year,
  month,
  onChange,
  onToday,
}: {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
  onToday?: () => void;
}) {
  const prev = () => {
    const p = addBSMonths(year, month, -1);
    onChange(p.year, p.month);
  };
  const next = () => {
    const n = addBSMonths(year, month, 1);
    onChange(n.year, n.month);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button
          variant="icon"
          size="lg"
          onClick={prev}
          aria-label="Previous month"
          className="h-12 w-12"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.25} />
        </Button>
        <Button
          variant="icon"
          size="lg"
          onClick={next}
          aria-label="Next month"
          className="h-12 w-12"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={2.25} />
        </Button>
      </div>

      <div className="min-w-0 flex-1 text-center sm:text-left sm:pl-2">
        <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
          {BS_MONTHS_EN[month]} {year}
        </h1>
        <p className="np truncate text-sm text-[var(--fg-muted)] sm:text-base">
          {BS_MONTHS_NP[month]} {toNepaliDigits(year)}
        </p>
      </div>

      {onToday && (
        <Button variant="secondary" size="md" onClick={onToday}>
          Today
        </Button>
      )}
    </div>
  );
}

function DayHoverCard({
  dual,
  festivals,
  panchang,
  isWeekend,
}: {
  dual: DualDate;
  festivals: Festival[];
  panchang: Panchang;
  isWeekend: boolean;
}) {
  const weekend = weekendHolidayLabel(dual.weekDay);
  const holidays = festivals.filter((f) => f.isPublicHoliday);
  const others = festivals.filter((f) => !f.isPublicHoliday);

  return (
    <div
      className="cal-day-tooltip pointer-events-none absolute z-50 w-56 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-3 text-left shadow-[var(--shadow-lg)]"
      role="tooltip"
    >
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[var(--fg-subtle)]">
        {WEEKDAYS_EN[dual.weekDay]}
        <span className="np ml-1">· {WEEKDAYS_NP[dual.weekDay]}</span>
      </p>
      <p className="mt-1 text-sm font-semibold leading-snug">
        {dual.bs.day} {BS_MONTHS_EN[dual.bs.month]} {dual.bs.year}
      </p>
      <p className="np text-xs text-[var(--accent)]">
        {toNepaliDigits(dual.bs.day)} {BS_MONTHS_NP[dual.bs.month]}{" "}
        {toNepaliDigits(dual.bs.year)}
      </p>
      <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
        AD {formatAD(dual.ad)}
      </p>

      <div className="mt-2 border-t border-[var(--border)] pt-2">
        <p className="text-xs text-[var(--fg)]">
          <span className="text-[var(--fg-subtle)]">Tithi · </span>
          {panchang.paksha} {panchang.tithiName}
        </p>
        <p className="np text-[0.7rem] text-[var(--fg-muted)]">
          {panchang.pakshaNp} {panchang.tithiNameNp}
        </p>
        <p className="mt-1 text-[0.7rem] text-[var(--fg-subtle)]">
          {panchang.nakshatraName} · {panchang.yogaName}
        </p>
      </div>

      {(isWeekend || festivals.length > 0) && (
        <div className="mt-2 space-y-1 border-t border-[var(--border)] pt-2">
          {weekend && (
            <p className="rounded-md bg-[var(--weekend)]/12 px-2 py-1 text-[0.7rem] font-medium text-[var(--weekend)]">
              {weekend.name}
              <span className="np mt-0.5 block font-normal opacity-90">
                {weekend.nameNp}
              </span>
            </p>
          )}
          {holidays.map((f) => (
            <p
              key={f.id}
              className="rounded-md bg-[var(--holiday)]/12 px-2 py-1 text-[0.7rem] font-medium text-[var(--holiday)]"
            >
              {f.name}
              <span className="np mt-0.5 block font-normal opacity-90">
                {f.nameNp}
              </span>
              {f.isPublicHoliday && (
                <span className="mt-0.5 block text-[0.6rem] font-normal opacity-80">
                  Public holiday
                </span>
              )}
            </p>
          ))}
          {others.map((f) => (
            <p
              key={f.id}
              className="rounded-md bg-[var(--festival)]/12 px-2 py-1 text-[0.7rem] font-medium"
              style={{ color: f.color || "var(--festival)" }}
            >
              {f.name}
              <span className="np mt-0.5 block font-normal opacity-90">
                {f.nameNp}
              </span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

type CalSize = "full" | "medium";

function DayCell({
  dual,
  isCurrentMonth,
  isToday,
  festivals,
  panchang,
  selected,
  onSelect,
  size = "full",
}: {
  dual: DualDate;
  isCurrentMonth: boolean;
  isToday: boolean;
  festivals: Festival[];
  panchang: Panchang;
  selected?: boolean;
  onSelect?: (d: DualDate) => void;
  size?: CalSize;
}) {
  const medium = size === "medium";
  const hasHoliday = festivals.some((f) => f.isPublicHoliday);
  const hasFestival = festivals.length > 0;
  const isWeekend = isNepalWeekend(dual.weekDay);
  const named = festivals.filter((f) => !f.id.startsWith("ekadashi"));
  const displayFestivals = named.length > 0 ? named : festivals;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(dual)}
      className={cn(
        "cal-day group/day relative flex w-full flex-col items-stretch rounded-lg border border-transparent text-left",
        medium ? "p-1 sm:p-1.5" : "p-1 sm:p-1.5",
        !isCurrentMonth && "opacity-40",
        isToday && "is-today bg-[var(--accent-indigo-soft)]",
        isWeekend && "is-weekend",
        hasFestival && "has-festival",
        hasHoliday && "has-holiday",
        selected && "ring-2 ring-[var(--accent)] bg-[var(--accent-soft)]",
        medium && "cal-day-medium"
      )}
      aria-label={[
        `${dual.bs.day} ${BS_MONTHS_EN[dual.bs.month]} ${dual.bs.year}`,
        `AD ${formatAD(dual.ad)}`,
        festivals.map((f) => f.name).join(", ") || undefined,
        isWeekend ? "weekly holiday" : undefined,
      ]
        .filter(Boolean)
        .join(". ")}
      aria-current={isToday ? "date" : undefined}
    >
      {/* Hover tooltip — full + medium (homepage box) */}
      <div className="cal-tooltip-anchor pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 hidden -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover/day:opacity-100 group-focus-visible/day:opacity-100 [@media(hover:hover)]:group-hover/day:block [@media(hover:hover)]:group-focus-visible/day:block">
        <DayHoverCard
          dual={dual}
          festivals={displayFestivals}
          panchang={panchang}
          isWeekend={isWeekend}
        />
      </div>

      <div className="flex items-start justify-between gap-0.5">
        <div className="min-w-0">
          <span
            className={cn(
              "day-num block font-semibold tabular-nums leading-none",
              medium ? "text-sm" : "text-sm sm:text-base",
              isToday && "text-[var(--today)]",
              isWeekend && !isToday && "text-[var(--weekend)]"
            )}
          >
            {dual.bs.day}
          </span>
          {!medium && (
            <span className="np mt-0.5 block text-[0.6rem] leading-none text-[var(--fg-subtle)]">
              {toNepaliDigits(dual.bs.day)}
            </span>
          )}
        </div>
        <div className="text-right">
          <span
            className={cn(
              "block tabular-nums leading-none text-[var(--fg-muted)]",
              medium ? "text-[0.65rem]" : "text-[0.7rem] sm:text-xs"
            )}
          >
            {dual.ad.day}
          </span>
          {!medium && (
            <span className="mt-0.5 block text-[0.55rem] uppercase leading-none text-[var(--fg-subtle)]">
              {
                ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
                  dual.ad.month
                ]
              }
            </span>
          )}
        </div>
      </div>

      {/* Markers */}
      <div
        className={cn(
          "mt-auto flex flex-col gap-0.5 pt-0.5",
          medium ? "min-h-[0.5rem]" : "min-h-[0.75rem] pt-1"
        )}
      >
        {isWeekend && !hasHoliday && !medium && (
          <span className="truncate text-[0.55rem] font-medium leading-tight text-[var(--weekend)]">
            Holiday
          </span>
        )}
        {displayFestivals.slice(0, medium ? 1 : 2).map((f) => (
          <span
            key={f.id}
            className={cn(
              "block truncate leading-tight",
              medium
                ? "h-1.5 w-1.5 rounded-full"
                : "text-[0.55rem] sm:text-[0.6rem]",
              f.isPublicHoliday && !medium && "font-medium text-[var(--holiday)]",
              !f.isPublicHoliday && !medium && "text-[var(--festival)]"
            )}
            style={
              medium
                ? {
                    background:
                      f.color ||
                      (f.isPublicHoliday ? "var(--holiday)" : "var(--festival)"),
                  }
                : f.color && !f.isPublicHoliday
                  ? { color: f.color }
                  : undefined
            }
            title={f.name}
          >
            {medium ? null : f.name}
          </span>
        ))}
        {!medium && displayFestivals.length > 2 && (
          <span className="text-[0.55rem] text-[var(--fg-subtle)]">
            +{displayFestivals.length - 2}
          </span>
        )}
      </div>
    </button>
  );
}

export function MonthGrid({
  initialYear,
  initialMonth,
  /** full = main calendar page; medium = homepage widget box */
  size = "full",
  /** @deprecated use size="medium" */
  compact = false,
  fill = false,
  onDaySelect,
}: {
  initialYear?: number;
  initialMonth?: number;
  size?: CalSize;
  compact?: boolean;
  fill?: boolean;
  onDaySelect?: (d: DualDate, festivals: Festival[]) => void;
}) {
  const calSize: CalSize = compact ? "medium" : size;
  const medium = calSize === "medium";
  const today = getTodayDual();
  const [year, setYear] = useState(initialYear ?? today.bs.year);
  const [month, setMonth] = useState(initialMonth ?? today.bs.month);
  const [selected, setSelected] = useState<DualDate | null>(null);

  const { days } = useMemo(
    () => getMonthGridDays(year, month),
    [year, month]
  );

  const dayData = useMemo(() => {
    const map = new Map<
      string,
      { festivals: Festival[]; panchang: Panchang }
    >();
    for (const d of days) {
      const key = `${d.bs.year}-${d.bs.month}-${d.bs.day}`;
      const p = computePanchang(d.jsDate);
      map.set(key, { festivals: festivalsForDay(d, p), panchang: p });
    }
    return map;
  }, [days]);

  const first = fromBS(year, month, 1);
  const lastDay = days.filter((d) => d.bs.month === month).pop() ?? first;

  const handleSelect = (d: DualDate) => {
    setSelected(d);
    const key = `${d.bs.year}-${d.bs.month}-${d.bs.day}`;
    onDaySelect?.(d, dayData.get(key)?.festivals ?? []);
  };

  return (
    <Card
      glass
      padding={medium ? "sm" : "md"}
      className={cn(
        "overflow-visible",
        medium && "cal-widget-medium h-full",
        fill && "flex h-full min-h-0 flex-col"
      )}
    >
      {!medium && (
        <div className="mb-4">
          <CalendarNav
            year={year}
            month={month}
            onChange={(y, m) => {
              setYear(y);
              setMonth(m);
              setSelected(null);
            }}
            onToday={() => {
              setYear(today.bs.year);
              setMonth(today.bs.month);
              setSelected(today);
            }}
          />
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/50 px-3 py-2.5 text-sm">
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider text-[var(--fg-subtle)]">
                BS
              </span>
              <p className="font-medium">
                {first.bs.day}–{lastDay.bs.day} {BS_MONTHS_EN[month]} {year}
              </p>
              <p className="np text-xs text-[var(--accent)]">
                {toNepaliDigits(first.bs.day)}–{toNepaliDigits(lastDay.bs.day)}{" "}
                {BS_MONTHS_NP[month]} {toNepaliDigits(year)}
              </p>
            </div>
            <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider text-[var(--fg-subtle)]">
                AD / English
              </span>
              <p className="font-medium text-[var(--fg-muted)]">
                {formatAD(first.ad, { short: true })} –{" "}
                {formatAD(lastDay.ad, { short: true })}
              </p>
            </div>
          </div>
        </div>
      )}

      {medium && (
        <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold sm:text-base">
              {BS_MONTHS_EN[month]} {year}
            </p>
            <p className="truncate text-[0.7rem] text-[var(--fg-muted)]">
              {formatAD(first.ad, { short: true })} –{" "}
              {formatAD(lastDay.ad, { short: true })}
            </p>
            <p className="np truncate text-xs text-[var(--fg-muted)]">
              {BS_MONTHS_NP[month]} {toNepaliDigits(year)}
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="icon"
              size="sm"
              aria-label="Previous month"
              onClick={() => {
                const p = addBSMonths(year, month, -1);
                setYear(p.year);
                setMonth(p.month);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="icon"
              size="sm"
              aria-label="Next month"
              onClick={() => {
                const n = addBSMonths(year, month, 1);
                setYear(n.year);
                setMonth(n.month);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="cal-grid mb-1 shrink-0">
        {WEEKDAYS_SHORT_EN.map((d, i) => (
          <div
            key={d}
            className={cn(
              "px-0.5 py-1 text-center text-[0.65rem] font-medium uppercase tracking-wide sm:text-[0.7rem]",
              isNepalWeekend(i)
                ? "text-[var(--weekend)]"
                : "text-[var(--fg-subtle)]"
            )}
            title={
              isNepalWeekend(i)
                ? `${WEEKDAYS_EN[i]} — weekly public holiday in Nepal`
                : WEEKDAYS_EN[i]
            }
          >
            <span className="hidden sm:inline">{d}</span>
            <span className="sm:hidden">{d[0]}</span>
            {!medium && (
              <span className="np mt-0.5 block text-[0.6rem] font-normal normal-case tracking-normal">
                {WEEKDAYS_SHORT_NP[i]}
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "cal-grid cal-grid-days",
          medium && fill && "flex-1 content-start"
        )}
      >
        {days.map((d) => {
          const key = `${d.bs.year}-${d.bs.month}-${d.bs.day}`;
          const data = dayData.get(key);
          return (
            <DayCell
              key={key}
              dual={d}
              isCurrentMonth={d.bs.month === month && d.bs.year === year}
              isToday={isSameBSDay(d.bs, today.bs)}
              festivals={data?.festivals ?? []}
              panchang={data?.panchang ?? computePanchang(d.jsDate)}
              selected={selected ? isSameBSDay(d.bs, selected.bs) : false}
              onSelect={handleSelect}
              size={calSize}
            />
          );
        })}
      </div>

      {selected && !medium && (
        <SelectedDayPanel
          dual={selected}
          festivals={
            dayData.get(
              `${selected.bs.year}-${selected.bs.month}-${selected.bs.day}`
            )?.festivals ?? []
          }
          panchang={
            dayData.get(
              `${selected.bs.year}-${selected.bs.month}-${selected.bs.day}`
            )?.panchang ?? computePanchang(selected.jsDate)
          }
        />
      )}
    </Card>
  );
}

function SelectedDayPanel({
  dual,
  festivals,
  panchang,
}: {
  dual: DualDate;
  festivals: Festival[];
  panchang: Panchang;
}) {
  const p = panchang;
  const weekend = weekendHolidayLabel(dual.weekDay);

  return (
    <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/60 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[var(--fg-subtle)]">
            {WEEKDAYS_EN[dual.weekDay]} ·{" "}
            <span className="np">{WEEKDAYS_NP[dual.weekDay]}</span>
          </p>
          <p className="mt-0.5 text-lg font-semibold">
            {dual.bs.day} {BS_MONTHS_EN[dual.bs.month]} {dual.bs.year}
          </p>
          <p className="np text-sm text-[var(--accent)]">
            {toNepaliDigits(dual.bs.day)} {BS_MONTHS_NP[dual.bs.month]}{" "}
            {toNepaliDigits(dual.bs.year)}
          </p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            English (AD): <strong className="text-[var(--fg)]">{formatAD(dual.ad)}</strong>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[var(--accent)]">
            {p.paksha} {p.tithiName}
          </p>
          <p className="np text-sm text-[var(--fg-muted)]">
            {p.pakshaNp} {p.tithiNameNp}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">
        Nakshatra: {p.nakshatraName} · Yoga: {p.yogaName} · Karana: {p.karanaName}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {weekend && (
          <span className="rounded-lg border border-[var(--weekend)]/30 bg-[var(--weekend)]/10 px-2.5 py-1 text-sm text-[var(--weekend)]">
            {weekend.name}{" "}
            <span className="np opacity-90">{weekend.nameNp}</span>
          </span>
        )}
        {festivals.map((f) => (
          <span
            key={f.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1 text-sm"
          >
            {f.name}{" "}
            <span className="np text-[var(--fg-muted)]">{f.nameNp}</span>
            {f.isPublicHoliday && (
              <span className="ml-1 text-[0.65rem] text-[var(--holiday)]">
                · Holiday
              </span>
            )}
          </span>
        ))}
        {!weekend && festivals.length === 0 && (
          <span className="text-sm text-[var(--fg-subtle)]">
            No festivals marked.
          </span>
        )}
      </div>
    </div>
  );
}
