import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GatiLogo } from "@/components/brand/GatiLogo";
import { YearProgressBar } from "@/components/calendar/YearProgress";
import { ProfileGreeting } from "@/components/home/ProfileGreeting";
import { WidgetGrid } from "@/components/home/WidgetGrid";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <section className="surface-glass relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5">
        <div
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <GatiLogo variant="mark" size={48} className="shrink-0 sm:hidden" />
          <GatiLogo
            variant="mark"
            size={56}
            className="hidden shrink-0 sm:block"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Gati
              </h1>
              <span className="np text-lg font-medium text-[var(--accent)] sm:text-xl">
                गति
              </span>
            </div>
            <p className="mt-0.5 text-sm text-[var(--fg-muted)] sm:text-base">
              Move with time.{" "}
              <span className="text-[var(--fg-subtle)]">
                Understand the universe.
              </span>
            </p>
            <p className="mt-1.5 text-xs text-[var(--fg-subtle)] sm:text-sm">
              Patro · Cheena · Astro · Manifest · Trust
            </p>
          </div>
        </div>
      </section>

      <ProfileGreeting />

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
