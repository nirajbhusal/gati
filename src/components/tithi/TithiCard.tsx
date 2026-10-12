"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Moon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  BS_MONTHS_EN,
  BS_MONTHS_NP,
  WEEKDAYS_EN,
  WEEKDAYS_NP,
  computePanchang,
  formatAD,
  formatDuration,
  festivalsForDay,
  getTodayDual,
  toNepaliDigits,
} from "@/lib/calendar";
import { cn } from "@/lib/utils/cn";

/** Part of day for bilingual clock label */
function dayPart(d: Date): { en: string; np: string } {
  const h = d.getHours();
  if (h >= 4 && h < 12) return { en: "Morning", np: "बिहानको" };
  if (h >= 12 && h < 17) return { en: "Afternoon", np: "दिउँसोको" };
  if (h >= 17 && h < 20) return { en: "Evening", np: "साँझको" };
  return { en: "Night", np: "रातिको" };
}

function formatClock(d: Date): { time: string; meridiem: string } {
  const h24 = d.getHours();
  const h12 = h24 % 12 || 12;
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  return {
    time: `${h12}:${m}:${s}`,
    meridiem: h24 >= 12 ? "PM" : "AM",
  };
}

export function TithiCard({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dual = getTodayDual();
  const p = computePanchang(now, true);
  const festivals = festivalsForDay(dual, computePanchang(dual.jsDate)).filter(
    (f) => !f.id.startsWith("ekadashi")
  );
  const remaining = formatDuration(
    Math.max(0, p.tithiEnd.getTime() - now.getTime())
  );
  const progressPct = Math.round(p.tithiProgress * 100);
  const clock = formatClock(now);
  const part = dayPart(now);

  return (
    <Card glass padding="sm" className="relative overflow-hidden sm:p-5">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-25 sm:h-36 sm:w-36"
        style={{
          background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Unified Today · date · time card — balanced alignment */}
      <div className="relative mb-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-muted)]/55 px-4 py-4 sm:px-5 sm:py-5">
        {/* Centered header */}
        <div className="text-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
            Today · आज
          </p>
          <p className="mt-1 text-sm text-[var(--fg-muted)] sm:text-base">
            {WEEKDAYS_EN[dual.weekDay]}
            <span className="np"> · {WEEKDAYS_NP[dual.weekDay]}</span>
          </p>
        </div>

        {/* Date | Time — two columns on sm+, stacked & centered on mobile */}
        <div className="mt-4 grid gap-4 border-t border-[var(--border)] pt-4 sm:grid-cols-2 sm:gap-6 sm:items-center">
          <div className="text-center sm:text-left sm:pr-4 sm:border-r sm:border-[var(--border)]">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
              Date · मिति
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
              <span className="np text-[var(--accent)]">
                {toNepaliDigits(dual.bs.day)} {BS_MONTHS_NP[dual.bs.month]}{" "}
                {toNepaliDigits(dual.bs.year)}
              </span>
            </h2>
            <p className="mt-1 text-sm font-medium text-[var(--fg)] sm:text-base">
              {dual.bs.day} {BS_MONTHS_EN[dual.bs.month]} {dual.bs.year} BS
            </p>
            <p className="mt-0.5 text-sm text-[var(--fg-muted)]">
              AD {formatAD(dual.ad)}
            </p>
          </div>

          <div className="text-center sm:text-right sm:pl-2">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
              Time · समय
            </p>
            <p className="mt-1.5 text-sm text-[var(--fg-muted)]">
              {part.en}
              <span className="np text-[var(--accent-indigo)]"> · {part.np}</span>
            </p>
            <p
              className="mt-1 text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl"
              aria-live="polite"
            >
              {clock.time}
              <span className="ml-1.5 text-sm font-medium text-[var(--fg-muted)] sm:text-base">
                {clock.meridiem}
              </span>
            </p>
            <p className="np mt-1 text-xs text-[var(--fg-subtle)]">
              {part.np} समय
            </p>
          </div>
        </div>
      </div>

      {/* Earlier tithi section design */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)] sm:text-xs">
            Today&apos;s Tithi · आजको तिथि
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)] sm:text-sm">
              <Moon className="h-3.5 w-3.5" aria-hidden />
              {p.paksha} {p.tithiName}
            </span>
            <span className="np inline-flex rounded-full bg-[var(--accent-indigo-soft)] px-2.5 py-0.5 text-xs text-[var(--accent-indigo)] sm:text-sm">
              {p.pakshaNp} {p.tithiNameNp}
            </span>
          </div>

          {!compact && (
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs sm:grid-cols-4 sm:text-sm">
              <div>
                <dt className="text-[var(--fg-subtle)]">Nakshatra</dt>
                <dd className="font-medium leading-snug">
                  {p.nakshatraName}
                  <span className="np ml-1 block text-[0.7rem] text-[var(--fg-muted)] sm:inline sm:text-sm">
                    {p.nakshatraNameNp}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[var(--fg-subtle)]">Yoga</dt>
                <dd className="font-medium leading-snug">
                  {p.yogaName}
                  <span className="np ml-1 block text-[0.7rem] text-[var(--fg-muted)] sm:inline sm:text-sm">
                    {p.yogaNameNp}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[var(--fg-subtle)]">Karana</dt>
                <dd className="font-medium leading-snug">
                  {p.karanaName}
                  <span className="np ml-1 block text-[0.7rem] text-[var(--fg-muted)] sm:inline sm:text-sm">
                    {p.karanaNameNp}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[var(--fg-subtle)]">Ends in</dt>
                <dd className="font-medium text-[var(--accent)]">{remaining}</dd>
              </div>
            </dl>
          )}

          {festivals.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {festivals.map((f) => (
                <span
                  key={f.id}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-muted)] px-2 py-0.5 text-[0.7rem] font-medium"
                  style={
                    f.color
                      ? { borderColor: `${f.color}55`, color: f.color }
                      : undefined
                  }
                >
                  {f.name} · <span className="np">{f.nameNp}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-row items-center gap-3 self-start sm:flex-col sm:self-center">
          <div
            className="tithi-ring h-20 w-20 sm:h-24 sm:w-24"
            style={{ ["--p" as string]: progressPct }}
            role="img"
            aria-label={`Tithi ${progressPct}% complete`}
          >
            <div className="tithi-ring-inner text-center">
              <div className="text-base font-semibold tabular-nums sm:text-lg">
                {progressPct}%
              </div>
              <div className="text-[0.6rem] text-[var(--fg-subtle)]">tithi</div>
            </div>
          </div>
          {!compact && (
            <Link
              href="/today"
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-indigo)]",
                "hover:underline underline-offset-4 sm:text-sm"
              )}
            >
              Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
