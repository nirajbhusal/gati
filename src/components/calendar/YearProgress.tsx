"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import {
  getBSYearProgress,
  yearProgressCopy,
  type BSYearProgress,
} from "@/lib/calendar/year-progress";
import { toNepaliDigits } from "@/lib/calendar";
import { cn } from "@/lib/utils/cn";

export function YearProgressBar({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [progress, setProgress] = useState<BSYearProgress | null>(null);

  useEffect(() => {
    const update = () => setProgress(getBSYearProgress(new Date()));
    update();
    const id = window.setInterval(update, 60_000 * 30);
    return () => clearInterval(id);
  }, []);

  if (!progress) {
    return (
      <Card glass padding="sm" className={cn("animate-pulse", className)}>
        <div className="h-10 rounded-lg bg-[var(--bg-muted)]" />
      </Card>
    );
  }

  const copy = yearProgressCopy(progress);

  return (
    <Card glass padding={compact ? "sm" : "md"} className={className}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
            Bikram Sambat year · विक्रम संवत्
          </p>
          <p className="mt-0.5 text-base font-semibold tracking-tight sm:text-lg">
            {copy.en}
            <span className="np ml-2 text-sm font-medium text-[var(--accent)] sm:text-base">
              {toNepaliDigits(progress.year)} · {progress.percent}%
            </span>
          </p>
        </div>
        <p className="shrink-0 text-xs tabular-nums text-[var(--fg-muted)] sm:text-sm">
          Day {progress.dayOfYear}
          <span className="text-[var(--fg-subtle)]"> / {progress.totalDays}</span>
          <span className="mx-1.5 text-[var(--fg-subtle)]">·</span>
          {progress.daysRemaining} left
        </p>
      </div>

      <div
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--bg-muted)] ring-1 ring-[var(--border)]"
        role="progressbar"
        aria-valuenow={progress.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Year ${progress.year} is ${progress.percent} percent complete`}
      >
        <div
          className="year-progress-fill h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      {!compact && (
        <div className="mt-2 flex justify-between text-[0.65rem] text-[var(--fg-subtle)] sm:text-xs">
          <span>{progress.startLabel}</span>
          <span>{progress.endLabel}</span>
        </div>
      )}
    </Card>
  );
}
