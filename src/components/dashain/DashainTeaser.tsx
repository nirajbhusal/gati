"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getDashainTimeline } from "@/lib/calendar/dashain";
import { formatAD, formatBS } from "@/lib/calendar";

export function DashainTeaser() {
  const tl = useMemo(() => getDashainTimeline(), []);
  const today = tl.days.find((d) => d.isToday);
  const next = tl.days.find((d) => d.isUpcoming);
  const focus = today ?? next ?? tl.days[0];

  if (!focus) return null;

  return (
    <Card
      glass
      className="overflow-hidden border-[#c45c26]/25 bg-gradient-to-br from-[#c45c26]/10 via-transparent to-[#d4a84b]/10"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#c45c26]/15 text-[#c45c26]">
          <Sprout className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
            Dashain vibes · दशैँ
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--fg)]">
            {today ? "Today · " : next ? "Up next · " : ""}
            {focus.content.nameEn}{" "}
            <span className="np font-medium text-[#e07a4a]">
              {focus.content.nameNp}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
            Day {focus.content.day}/15 · {formatBS(focus.date.bs)} ·{" "}
            {formatAD(focus.date.ad)}
          </p>
          <p className="mt-2 text-sm text-[var(--fg-muted)] line-clamp-2">
            {focus.content.vibeEn}
          </p>
          <Link
            href="/dashain/"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#c45c26] hover:underline underline-offset-4"
          >
            Full 15-day timeline
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
