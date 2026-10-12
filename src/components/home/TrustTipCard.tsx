"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Orbit } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { HOME_TRUST_TIPS } from "@/data/trust-cosmos";

export function TrustTipCard() {
  const tip = useMemo(() => {
    const day = Math.floor(Date.now() / 86_400_000);
    return HOME_TRUST_TIPS[day % HOME_TRUST_TIPS.length];
  }, []);

  return (
    <Card glass padding="sm">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent-indigo-soft)] text-[var(--accent-indigo)]">
          <Orbit className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
            Trust · विश्वास
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--fg)]">{tip.en}</p>
          <p className="np mt-1 text-xs leading-relaxed text-[var(--fg-muted)]">
            {tip.np}
          </p>
          <Link
            href="/trust/"
            className="mt-2 inline-block text-sm font-medium text-[var(--accent-indigo)] hover:underline underline-offset-4"
          >
            Explore विश्वास →
          </Link>
        </div>
      </div>
    </Card>
  );
}
