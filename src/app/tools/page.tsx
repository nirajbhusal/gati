"use client";

import { useEffect, useState } from "react";
import { FestivalCountdownCard } from "@/components/festivals/FestivalList";
import { DateConverter } from "@/components/tools/DateConverter";
import { Card, CardHeader } from "@/components/ui/Card";
import {
  computePanchang,
  formatDuration,
  getTodayDual,
  formatBS,
} from "@/lib/calendar";

export default function ToolsPage() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  const dual = getTodayDual();
  const p = computePanchang(now, true);
  const remaining = formatDuration(
    Math.max(0, p.tithiEnd.getTime() - now.getTime())
  );

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Utilities{" "}
          <span className="np text-xl font-normal text-[var(--fg-muted)]">
            उपकरण
          </span>
        </h1>
        <p className="text-sm text-[var(--fg-muted)] sm:text-base">
          Date conversion, live tithi, and festival countdown.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <DateConverter />
        <div className="space-y-5">
          <Card glass>
            <CardHeader
              title="Today's tithi"
              subtitle="Live remaining duration"
            />
            <p className="text-lg font-semibold">
              {p.paksha} {p.tithiName}
            </p>
            <p className="np text-[var(--accent)]">
              {p.pakshaNp} {p.tithiNameNp}
            </p>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {formatBS(dual.bs)}
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-[var(--accent-indigo)]">
              {remaining}
            </p>
            <p className="text-xs text-[var(--fg-subtle)]">until tithi ends</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-muted)]">
              <div
                className="h-full rounded-full bg-[var(--accent-indigo)]"
                style={{ width: `${Math.round(p.tithiProgress * 100)}%` }}
              />
            </div>
          </Card>
          <FestivalCountdownCard />
        </div>
      </div>
    </div>
  );
}
