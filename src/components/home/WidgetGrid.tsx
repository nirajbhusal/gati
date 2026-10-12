"use client";

import Link from "next/link";
import {
  ArrowRightLeft,
  CalendarDays,
  Orbit,
  Sparkles,
} from "lucide-react";
import { MonthGrid } from "@/components/calendar/MonthGrid";
import { DailyAstroCard } from "@/components/astro/DailyAstroCard";
import {
  FestivalCountdownCard,
  UpcomingFestivals,
} from "@/components/festivals/FestivalList";
import { ManifestPreview } from "@/components/home/ManifestPreview";
import { TrustTipCard } from "@/components/home/TrustTipCard";
import { TithiCard } from "@/components/tithi/TithiCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { usePreferences, WIDGET_META } from "@/lib/store/preferences";
import type { WidgetId } from "@/types";
import { cn } from "@/lib/utils/cn";

function QuickToolsWidget() {
  const tiles = [
    {
      href: "/cheena/",
      icon: Orbit,
      title: "Cheena",
      sub: "Birth chart",
      color: "text-[var(--accent)]",
    },
    {
      href: "/tools/",
      icon: ArrowRightLeft,
      title: "BS ↔ AD",
      sub: "Convert dates",
      color: "text-[var(--accent-indigo)]",
    },
    {
      href: "/festivals/",
      icon: Sparkles,
      title: "Festivals",
      sub: "Countdown",
      color: "text-[var(--festival)]",
    },
    {
      href: "/calendar/",
      icon: CalendarDays,
      title: "Patro",
      sub: "Full calendar",
      color: "text-[var(--today)]",
    },
  ] as const;

  return (
    <Card glass padding="sm" className="h-full">
      <CardHeader
        className="mb-3"
        title={
          <>
            Utilities{" "}
            <span className="np text-sm font-normal text-[var(--fg-muted)]">
              उपकरण
            </span>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href + t.title}
              href={t.href}
              className="group flex flex-col gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/60 px-3 py-3 transition hover:border-[var(--border-strong)] hover:bg-[var(--accent-soft)] sm:min-h-[5.5rem]"
            >
              <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", t.color)} />
              <span className="text-sm font-medium leading-tight">{t.title}</span>
              <span className="text-[0.7rem] leading-tight text-[var(--fg-subtle)]">
                {t.sub}
              </span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

function renderWidget(id: WidgetId) {
  switch (id) {
    case "today-tithi":
      return <TithiCard />;
    case "daily-astro":
      return <DailyAstroCard compact />;
    case "upcoming-festivals":
      return (
        <div className="flex h-full min-h-0 flex-col gap-3">
          <div className="min-h-0 flex-1">
            <UpcomingFestivals days={45} limit={5} fill />
          </div>
          <FestivalCountdownCard compact />
        </div>
      );
    case "mini-calendar":
      return <MonthGrid size="medium" fill />;
    case "manifest-preview":
      return <ManifestPreview />;
    case "trust-tip":
      return <TrustTipCard />;
    case "quick-tools":
      return <QuickToolsWidget />;
    default:
      return null;
  }
}

export function WidgetGrid() {
  const widgets = usePreferences((s) => s.widgets);
  const ordered = [...widgets]
    .filter((w) => w.visible)
    .sort((a, b) => a.order - b.order);

  if (ordered.length === 0) {
    return (
      <Card glass className="py-10 text-center">
        <p className="text-[var(--fg-muted)]">All homepage widgets are hidden.</p>
        <Link
          href="/settings/"
          className="mt-2 inline-block text-sm text-[var(--accent-indigo)] hover:underline"
        >
          Customize in Settings
        </Link>
      </Card>
    );
  }

  const fullWidth = new Set<WidgetId>([
    "today-tithi",
    "daily-astro",
    "quick-tools",
    "trust-tip",
  ]);

  const hero = ordered.filter((w) => fullWidth.has(w.id) && w.id !== "quick-tools" && w.id !== "trust-tip");
  const mid = ordered.filter(
    (w) => w.id === "upcoming-festivals" || w.id === "mini-calendar"
  );
  const side = ordered.filter(
    (w) => w.id === "manifest-preview" || w.id === "trust-tip"
  );
  const tools = ordered.filter((w) => w.id === "quick-tools");
  const rest = ordered.filter(
    (w) =>
      !hero.includes(w) &&
      !mid.includes(w) &&
      !side.includes(w) &&
      !tools.includes(w)
  );

  return (
    <div className="flex flex-col gap-4 overflow-visible">
      {hero.map((w) => (
        <div key={w.id} data-widget={w.id} aria-label={WIDGET_META[w.id].title}>
          {renderWidget(w.id)}
        </div>
      ))}

      {mid.length > 0 && (
        <div className="grid grid-cols-1 items-stretch gap-4 overflow-visible md:grid-cols-2 xl:grid-cols-12">
          {mid.map((w) => (
            <div
              key={w.id}
              className={cn(
                "min-h-0 overflow-visible",
                w.id === "upcoming-festivals" &&
                  "col-span-full md:col-span-1 xl:col-span-5",
                w.id === "mini-calendar" &&
                  "col-span-full md:col-span-1 xl:col-span-7"
              )}
              data-widget={w.id}
              aria-label={WIDGET_META[w.id].title}
            >
              {renderWidget(w.id)}
            </div>
          ))}
        </div>
      )}

      {side.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {side.map((w) => (
            <div key={w.id} data-widget={w.id} aria-label={WIDGET_META[w.id].title}>
              {renderWidget(w.id)}
            </div>
          ))}
        </div>
      )}

      {tools.map((w) => (
        <div key={w.id} data-widget={w.id} aria-label={WIDGET_META[w.id].title}>
          {renderWidget(w.id)}
        </div>
      ))}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rest.map((w) => (
            <div key={w.id} data-widget={w.id}>
              {renderWidget(w.id)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
