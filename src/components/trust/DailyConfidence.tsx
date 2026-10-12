"use client";

import { useMemo } from "react";
import { Moon, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { computePanchang } from "@/lib/calendar";
import { dailyTrustLine } from "@/data/trust-cosmos";

export function DailyConfidence() {
  const { line, tithiLine, paksha } = useMemo(() => {
    const p = computePanchang(new Date(), true);
    return {
      line: dailyTrustLine(p.paksha, p.tithiNumber),
      tithiLine: `${p.tithiName} · ${p.paksha}`,
      paksha: p.paksha,
    };
  }, []);

  return (
    <Card
      glass
      className="border-[var(--accent-indigo)]/20 bg-[var(--accent-indigo-soft)]/50"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--bg-elevated)] text-[var(--accent-indigo)] shadow-sm">
          {paksha === "Shukla" ? (
            <Sparkles className="h-5 w-5" aria-hidden />
          ) : (
            <Moon className="h-5 w-5" aria-hidden />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
            Today’s विश्वास · {tithiLine}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--fg)] sm:text-base">
            {line.en}
          </p>
          <p className="np mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">
            {line.np}
          </p>
        </div>
      </div>
    </Card>
  );
}
