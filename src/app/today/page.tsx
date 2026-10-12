"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { TithiCard } from "@/components/tithi/TithiCard";
import {
  computePanchang,
  festivalsForDay,
  formatAD,
  formatBS,
  formatDuration,
  getTodayDual,
  pakshaLabel,
  toNepaliDigits,
  WEEKDAYS_EN,
  WEEKDAYS_NP,
} from "@/lib/calendar";

export default function TodayPage() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  const dual = getTodayDual();
  const p = computePanchang(now, true);
  const dayP = computePanchang(dual.jsDate);
  const festivals = festivalsForDay(dual, dayP);
  const remaining = formatDuration(
    Math.max(0, p.tithiEnd.getTime() - now.getTime())
  );

  const rows = [
    {
      label: "Tithi",
      en: `${p.paksha} ${p.tithiName}`,
      np: `${p.pakshaNp} ${p.tithiNameNp}`,
    },
    {
      label: "Paksha",
      en: pakshaLabel(p.paksha, "en"),
      np: pakshaLabel(p.paksha, "np"),
    },
    {
      label: "Nakshatra",
      en: p.nakshatraName,
      np: p.nakshatraNameNp,
    },
    { label: "Yoga", en: p.yogaName, np: p.yogaNameNp },
    { label: "Karana", en: p.karanaName, np: p.karanaNameNp },
  ];

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Today{" "}
          <span className="np text-[var(--fg-muted)] font-normal text-xl">
            आज
          </span>
        </h1>
        <p className="text-sm text-[var(--fg-muted)]">
          {WEEKDAYS_EN[dual.weekDay]} ·{" "}
          <span className="np">{WEEKDAYS_NP[dual.weekDay]}</span>
        </p>
      </header>

      <TithiCard />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card glass>
          <CardHeader
            title="Panchang"
            subtitle="Live tithi · Nepal Standard Time"
          />
          <dl className="space-y-3">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-3 border-b border-[var(--border)] pb-3 last:border-0"
              >
                <dt className="text-sm text-[var(--fg-subtle)]">{r.label}</dt>
                <dd className="text-right">
                  <div className="font-medium">{r.en}</div>
                  <div className="np text-sm text-[var(--fg-muted)]">{r.np}</div>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-xl bg-[var(--accent-soft)] p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
              Tithi remaining
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--accent)]">
              {remaining}
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-muted)]">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                style={{ width: `${Math.round(p.tithiProgress * 100)}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-[var(--fg-subtle)]">
              {Math.round(p.tithiProgress * 100)}% elapsed · ends ~{" "}
              {p.tithiEnd.toLocaleString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </Card>

        <Card glass>
          <CardHeader title="Date" subtitle="Dual calendar" />
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[var(--fg-subtle)]">Bikram Sambat</p>
              <p className="text-xl font-semibold">{formatBS(dual.bs)}</p>
              <p className="np text-lg text-[var(--accent)]">
                {formatBS(dual.bs, { lang: "np" })}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--fg-subtle)]">Gregorian (AD)</p>
              <p className="text-xl font-semibold">{formatAD(dual.ad)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--fg-subtle)]">Weekday</p>
              <p className="font-medium">
                {WEEKDAYS_EN[dual.weekDay]}{" "}
                <span className="np text-[var(--fg-muted)]">
                  {WEEKDAYS_NP[dual.weekDay]}
                </span>
              </p>
            </div>
            {festivals.length > 0 && (
              <div>
                <p className="text-xs text-[var(--fg-subtle)] mb-2">
                  Today&apos;s observances
                </p>
                <ul className="space-y-2">
                  {festivals.map((f) => (
                    <li
                      key={f.id}
                      className="rounded-xl border border-[var(--border)] px-3 py-2"
                    >
                      <p className="font-medium">{f.name}</p>
                      <p className="np text-sm text-[var(--fg-muted)]">
                        {f.nameNp}
                      </p>
                      {f.description && (
                        <p className="mt-0.5 text-xs text-[var(--fg-subtle)]">
                          {f.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="text-sm text-[var(--fg-muted)]">
        <p>
          Moon phase index:{" "}
          <span className="tabular-nums text-[var(--fg)]">
            {(p.moonPhase * 100).toFixed(1)}%
          </span>{" "}
          through synodic cycle · BS day{" "}
          <span className="np">{toNepaliDigits(dual.bs.day)}</span>
        </p>
      </Card>
    </div>
  );
}
