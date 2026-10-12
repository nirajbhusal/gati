"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GatiMascot } from "@/components/brand/GatiMascot";
import { YearProgressBar } from "@/components/calendar/YearProgress";
import { DashainHomeCard } from "@/components/dashain/DashainHomeCard";
import { ProfileGreeting } from "@/components/home/ProfileGreeting";
import { WidgetGrid } from "@/components/home/WidgetGrid";
import { useAskGati } from "@/components/layout/AskGatiContext";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  const { setOpen } = useAskGati();
  return (
    <div className="space-y-5">
      <section className="home-hero relative overflow-hidden">
        <div className="relative flex items-center gap-4">
          <GatiMascot size={84} className="shrink-0" />
          <div className="min-w-0">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
              Move with time
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Gati{" "}
              <span className="np text-[var(--accent)]">गति</span>
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)] sm:text-base">
              Understand the universe — Patro, Festivals, Cheena, and the sky.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--accent-indigo)] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[color-mix(in_srgb,var(--accent-indigo)_35%,transparent)]"
            >
              Ask Gati
            </button>
          </div>
        </div>
      </section>

      <ProfileGreeting />
      <DashainHomeCard />

      <YearProgressBar compact />

      <WidgetGrid />

      <Card glass className="mt-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
              About · बारेमा
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              About Gati{" "}
              <span className="np font-medium text-[var(--accent)]">गति</span>
            </h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--fg-muted)]">
              Named for <em>graha-gati</em> — celestial motion behind the BS
              calendar, tithi, and seasons. A calm daily instrument for Nepal.
            </p>
          </div>
          <Link
            href="/about/"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-[var(--accent-soft)] px-4 py-2.5 text-sm font-medium text-[var(--accent)] transition hover:brightness-110 sm:self-center"
          >
            Read more
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
