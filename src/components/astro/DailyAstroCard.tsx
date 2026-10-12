"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { CosmicAvatar } from "@/components/profile/CosmicAvatar";
import { buildDailyAdvice } from "@/lib/astro/advisor";
import { useProfile } from "@/lib/store/profile";
import { useCheenaStore } from "@/lib/store/cheena";
import { GRAHA_META } from "@/lib/astro/constants";

export function DailyAstroCard({ compact = false }: { compact?: boolean }) {
  const profile = useProfile((s) => s.profile);
  const charts = useCheenaStore((s) => s.charts);
  const cheena =
    (profile?.cheenaId && charts.find((c) => c.id === profile.cheenaId)) ||
    charts[0] ||
    null;
  const advice = buildDailyAdvice(new Date(), profile, cheena);

  return (
    <Card glass>
      <CardHeader
        title={
          <>
            Daily Astro{" "}
            <span className="np text-sm font-normal text-[var(--fg-muted)]">
              दैनिक ज्योतिष
            </span>
          </>
        }
        subtitle={advice.tithiLine}
        action={
          advice.primaryGraha ? (
            <CosmicAvatar graha={advice.primaryGraha} size={40} />
          ) : (
            <Sparkles className="h-5 w-5 text-[var(--accent)]" />
          )
        }
      />

      {advice.personalized && profile && (
        <p className="mb-3 text-sm text-[var(--fg-muted)]">
          For{" "}
          <strong className="text-[var(--fg)]">{profile.greetingName ?? profile.name}</strong>
          {advice.primaryGraha && (
            <>
              {" "}
              · {GRAHA_META[advice.primaryGraha].name}
              <span className="np text-[var(--accent)]">
                {" "}
                {GRAHA_META[advice.primaryGraha].nameNp}
              </span>
            </>
          )}
        </p>
      )}

      <div className="space-y-3">
        <AdviceBlock label="Focus · ध्यान" {...advice.focus} />
        {!compact && <AdviceBlock label="Caution · सावधानी" {...advice.caution} />}
        {!compact && (
          <AdviceBlock label="Favorable · शुभ" {...advice.favorable} />
        )}
        <div className="rounded-xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] px-3 py-2.5">
          <p className="text-[0.65rem] uppercase tracking-wider text-[var(--fg-subtle)]">
            Intention · इच्छा
          </p>
          <p className="mt-1 text-sm font-medium">{advice.intention.en}</p>
          <p className="np mt-0.5 text-sm text-[var(--accent)]">
            {advice.intention.np}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
        <p className="text-xs text-[var(--fg-subtle)]">
          Moon · {advice.moonRashiEn}{" "}
          <span className="np">({advice.moonRashiNp})</span>
        </p>
        <Link
          href="/astro/ask/"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-indigo)] hover:underline underline-offset-4"
        >
          Ask Astro
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
}

function AdviceBlock({
  label,
  en,
  np,
}: {
  label: string;
  en: string;
  np: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/40 px-3 py-2.5">
      <p className="text-[0.65rem] uppercase tracking-wider text-[var(--fg-subtle)]">
        {label}
      </p>
      <p className="mt-1 text-sm text-[var(--fg)]">{en}</p>
      <p className="np mt-0.5 text-sm text-[var(--fg-muted)]">{np}</p>
    </div>
  );
}
