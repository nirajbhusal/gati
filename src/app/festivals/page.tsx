"use client";

import { useMemo, useState } from "react";
import {
  FestivalCountdownCard,
  FestivalRow,
} from "@/components/festivals/FestivalList";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getUpcomingFestivals } from "@/lib/calendar";

export default function FestivalsPage() {
  const [range, setRange] = useState<30 | 60 | 90>(60);
  const items = useMemo(() => getUpcomingFestivals(range), [range]);

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Festivals & Holidays{" "}
          <span className="np text-[var(--fg-muted)] font-normal text-xl">
            चाडपर्व
          </span>
        </h1>
        <p className="text-sm text-[var(--fg-muted)] sm:text-base">
          Upcoming cultural festivals, national holidays, and observances.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <FestivalCountdownCard />
        </div>
        <div className="lg:col-span-2">
          <Card glass>
            <CardHeader
              title="Upcoming"
              subtitle={`Next ${range} days · ${items.length} events`}
              action={
                <div className="flex gap-1">
                  {([30, 60, 90] as const).map((d) => (
                    <Button
                      key={d}
                      size="sm"
                      variant={range === d ? "primary" : "ghost"}
                      onClick={() => setRange(d)}
                    >
                      {d}d
                    </Button>
                  ))}
                </div>
              }
            />
            {items.length === 0 ? (
              <p className="text-sm text-[var(--fg-muted)]">
                No festivals in this range.
              </p>
            ) : (
              <div className="divide-y divide-[var(--border)] -mx-1">
                {items.map((item) => (
                  <FestivalRow
                    key={`${item.festival.id}-${item.date.bs.year}-${item.date.bs.month}-${item.date.bs.day}`}
                    item={item}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <Card padding="md" className="text-sm text-[var(--fg-muted)]">
        <p>
          <strong className="text-[var(--fg)]">Note:</strong> Tithi-based
          festivals are computed from lunar elongation (panchang) and may differ
          by a day from some regional almanacs depending on local sunrise and
          sky-view conventions. Fixed BS national holidays are calendar-exact.
        </p>
      </Card>
    </div>
  );
}
