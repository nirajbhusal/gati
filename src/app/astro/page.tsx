"use client";

import Link from "next/link";
import { AskAstro } from "@/components/astro/AskAstro";
import { DailyAstroCard } from "@/components/astro/DailyAstroCard";
import { Card } from "@/components/ui/Card";
import { useProfile } from "@/lib/store/profile";

export default function AstroPage() {
  const profile = useProfile((s) => s.profile);

  return (
    <div className="mx-auto max-w-2xl space-y-8 page-enter pb-6">
      <AskAstro embedded />

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3 px-0.5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Daily advisor{" "}
              <span className="np text-sm font-normal text-[var(--fg-muted)]">
                दैनिक सल्लाह
              </span>
            </h2>
            <p className="mt-0.5 text-sm text-[var(--fg-muted)]">
              Focus, caution, and intention from today’s panchang
            </p>
          </div>
        </div>
        <DailyAstroCard />
      </section>

      {!profile && (
        <Card glass className="text-sm text-[var(--fg-muted)]">
          <p>
            Create a{" "}
            <Link
              href="/cheena/new/"
              className="font-medium text-[var(--accent-indigo)] hover:underline"
            >
              Digital Cheena
            </Link>{" "}
            so Ask Astro and Daily can speak with your Moon and Lagna.
          </p>
        </Card>
      )}

      <Card className="text-xs leading-relaxed text-[var(--fg-subtle)]">
        Gati Astro is cultural guidance woven from tithi and graha-gati. Invite a
        qualified jyotishi for consequential life decisions.
      </Card>
    </div>
  );
}
