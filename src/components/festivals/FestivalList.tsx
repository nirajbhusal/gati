"use client";

import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import {
  formatAD,
  formatBS,
  getUpcomingFestivals,
  toNepaliDigits,
} from "@/lib/calendar";
import type { FestivalOccurrence } from "@/types";
import { cn } from "@/lib/utils/cn";

function CountdownBadge({ days }: { days: number }) {
  if (days === 0) {
    return (
      <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
        Today
      </span>
    );
  }
  if (days === 1) {
    return (
      <span className="rounded-full bg-[var(--accent-indigo-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-indigo)]">
        Tomorrow
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[var(--bg-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--fg-muted)] tabular-nums">
      in {days} days
    </span>
  );
}

export function FestivalRow({
  item,
  dense = false,
}: {
  item: FestivalOccurrence;
  dense?: boolean;
}) {
  const { festival, date, daysUntil } = item;
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl transition-colors",
        dense ? "py-1.5 gap-2.5" : "p-3 hover:bg-[var(--bg-muted)]"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex shrink-0 flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]",
          dense ? "h-9 w-9" : "h-11 w-11"
        )}
        style={
          festival.color
            ? {
                borderColor: `${festival.color}40`,
                background: `${festival.color}14`,
              }
            : undefined
        }
      >
        <span
          className={cn(
            "font-semibold tabular-nums leading-none",
            dense ? "text-xs" : "text-sm"
          )}
        >
          {date.bs.day}
        </span>
        <span className="np mt-0.5 text-[0.55rem] leading-none text-[var(--fg-subtle)]">
          {toNepaliDigits(date.bs.day)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium leading-snug">{festival.name}</p>
          {festival.isPublicHoliday && (
            <span className="rounded bg-[var(--holiday)]/15 px-1.5 py-0.5 text-[0.65rem] font-medium text-[var(--holiday)]">
              Holiday
            </span>
          )}
        </div>
        <p className="np text-sm text-[var(--fg-muted)]">{festival.nameNp}</p>
        <p className="mt-0.5 text-xs text-[var(--fg-subtle)]">
          {formatBS(date.bs)} · {formatAD(date.ad, { short: true })}
        </p>
      </div>
      <CountdownBadge days={daysUntil} />
    </div>
  );
}

export function UpcomingFestivals({
  days = 45,
  limit = 8,
  showHeader = true,
  fill = false,
}: {
  days?: number;
  limit?: number;
  showHeader?: boolean;
  /** Stretch card to fill parent height (homepage bento) */
  fill?: boolean;
}) {
  const items = getUpcomingFestivals(days).slice(0, limit);

  return (
    <Card glass className={cn(fill && "flex h-full min-h-0 flex-col")}>
      {showHeader && (
        <CardHeader
          className="mb-2 shrink-0"
          title={
            <>
              Upcoming Festivals{" "}
              <span className="np text-sm font-normal text-[var(--fg-muted)]">
                आगामी चाडपर्व
              </span>
            </>
          }
          subtitle={`Next ${days} days`}
          action={
            <Link
              href="/festivals"
              className="text-sm text-[var(--accent-indigo)] hover:underline underline-offset-4"
            >
              See all
            </Link>
          }
        />
      )}
      {items.length === 0 ? (
        <p className="text-sm text-[var(--fg-muted)]">
          No major festivals in this window.
        </p>
      ) : (
        <div
          className={cn(
            "divide-y divide-[var(--border)]",
            fill && "min-h-0 flex-1"
          )}
        >
          {items.map((item) => (
            <FestivalRow
              key={`${item.festival.id}-${item.date.bs.day}-${item.date.bs.month}`}
              item={item}
              dense
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export function FestivalCountdownCard({
  compact = false,
}: {
  compact?: boolean;
}) {
  const next = getUpcomingFestivals(90)[0];
  if (!next) return null;

  if (compact) {
    return (
      <Card glass padding="sm" className="shrink-0">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
              Next festival
            </p>
            <p className="truncate font-semibold leading-tight">
              {next.festival.name}
            </p>
            <p className="np truncate text-sm text-[var(--accent)]">
              {next.festival.nameNp}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-2xl font-semibold tabular-nums leading-none text-[var(--accent-indigo)]">
              {next.daysUntil === 0 ? "0" : next.daysUntil}
            </p>
            <p className="mt-0.5 text-[0.65rem] text-[var(--fg-subtle)]">
              {next.daysUntil === 0 ? "today" : "days"}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card glass className="text-center">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
        Next festival
      </p>
      <p className="mt-2 text-xl font-semibold">{next.festival.name}</p>
      <p className="np text-[var(--accent)]">{next.festival.nameNp}</p>
      <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-[var(--accent-indigo)]">
        {next.daysUntil === 0 ? "Today" : next.daysUntil}
        {next.daysUntil > 0 && (
          <span className="ml-1.5 text-base font-normal text-[var(--fg-muted)]">
            days
          </span>
        )}
      </p>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">
        {formatBS(next.date.bs)} · {formatAD(next.date.ad, { short: true })}
      </p>
    </Card>
  );
}
