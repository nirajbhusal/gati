"use client";

import Link from "next/link";
import { DailyAstroCard } from "@/components/astro/DailyAstroCard";
import { Card } from "@/components/ui/Card";
import { useProfile } from "@/lib/store/profile";

export default function AstroPage() {
  const profile = useProfile((s) => s.profile);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Astro Advisor{" "}
          <span className="np text-xl font-normal text-[var(--fg-muted)]">
            ज्योतिष सल्लाह
          </span>
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Calm daily guidance from today&apos;s panchang
          {profile ? " and your Cheena" : ""} — not fear, not spam.
        </p>
      </header>

      <DailyAstroCard />

      {!profile && (
        <Card glass className="text-sm text-[var(--fg-muted)]">
          <p>
            Create a{" "}
            <Link href="/cheena/new/" className="font-medium text-[var(--accent-indigo)] hover:underline">
              Digital Cheena
            </Link>{" "}
            for personalized Moon/Lagna-aware advice and a cosmic profile.
          </p>
        </Card>
      )}

      <Card className="text-xs text-[var(--fg-subtle)]">
        Gati Astro is educational and cultural guidance. It does not replace a
        qualified jyotishi, doctor, or financial advisor.
      </Card>
    </div>
  );
}
