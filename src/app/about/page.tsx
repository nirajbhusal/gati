import type { Metadata } from "next";
import Link from "next/link";
import { GatiLogo } from "@/components/brand/GatiLogo";
import { Card, CardHeader } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Gati (गति) — Nepali Patro. Move with time. Understand the universe.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-4 text-center sm:text-left">
        <div className="flex justify-center sm:justify-start">
          <GatiLogo variant="lockup-stacked" size={64} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            About Gati{" "}
            <span className="np text-[var(--accent)] font-medium">गति</span>
          </h1>
          <p className="mt-2 text-base text-[var(--fg-muted)] sm:text-lg">
            Move with time. Understand the universe.
          </p>
        </div>
      </header>

      <Card glass>
        <CardHeader title="Meaning" />
        <p className="text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
          <strong className="text-[var(--fg)]">Gati</strong> is Sanskrit/Nepali
          for <em>motion</em> — specifically{" "}
          <em className="text-[var(--accent)]">graha-gati</em>, the movement of
          celestial bodies. The Bikram Sambat calendar, tithi system, and
          seasonal cycles are calculated from this planetary motion. The name
          holds both cultural root and cosmic precision.
        </p>
      </Card>

      <Card glass>
        <CardHeader title="What Gati is" subtitle="Phase 1 · Web PWA" />
        <ul className="space-y-2 text-sm text-[var(--fg-muted)] sm:text-base">
          <li>
            A clean Nepali Patro with{" "}
            <strong className="text-[var(--fg)]">BS + English (AD)</strong> dual
            dates
          </li>
          <li>
            Daily{" "}
            <strong className="text-[var(--fg)]">
              tithi, paksha, nakshatra, yoga, karana
            </strong>
          </li>
          <li>
            Festivals &amp; national holidays, with Saturday &amp; Sunday as
            weekly holidays in Nepal
          </li>
          <li>BS ↔ AD tools, year progress, and a customizable home</li>
        </ul>
      </Card>

      <Card glass>
        <CardHeader title="Vision" />
        <p className="text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
          Start focused and elegant — then grow into the daily essential
          super-app for Nepalis: reminders, muhurat, notifications, and native
          mobile — without losing the calm, precise feel of a premium time
          instrument.
        </p>
      </Card>

      <Card glass>
        <CardHeader title="Design" />
        <p className="text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
          Inspired by Apple’s clarity and a SpaceX / cosmic restraint: dark
          space as primary, light mode for daytime reading, bilingual
          typography, and quiet cultural geometry — never loud poster kitsch.
        </p>
      </Card>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/settings"
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] px-4 py-2 text-[var(--fg-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--fg)]"
        >
          Settings
        </Link>
        <Link
          href="/calendar"
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] px-4 py-2 text-[var(--fg-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--fg)]"
        >
          Open calendar
        </Link>
        <Link
          href="/"
          className="rounded-xl bg-[var(--accent-soft)] px-4 py-2 font-medium text-[var(--accent)]"
        >
          Home
        </Link>
      </div>

      <p className="pb-2 text-center text-xs text-[var(--fg-subtle)] sm:text-left">
        Full product &amp; brand documentation for contributors lives in the{" "}
        <code className="text-[var(--fg-muted)]">docs/</code> folder of the
        project — not inside the consumer app UI.
      </p>
    </div>
  );
}
