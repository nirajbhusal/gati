"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { getDashainTimeline } from "@/lib/calendar/dashain";
import { formatAD, formatBS, toNepaliDigits } from "@/lib/calendar";
import { cn } from "@/lib/utils/cn";

export function DashainHomeCard() {
  const tl = useMemo(() => getDashainTimeline(), []);
  if (!tl.days.length) return null;
  const focus =
    tl.days.find((d) => d.isToday) ??
    tl.days.find((d) => d.isUpcoming) ??
    tl.days[0];

  return (
    <section className="dashain-home">
      <div className="dashain-home-glow" aria-hidden />
      <div className="relative flex flex-wrap items-end justify-between gap-3 px-4 pt-4 sm:px-5">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#f3d27a]">
            <Sprout className="h-3.5 w-3.5" aria-hidden />
            Festivals · चाडपर्व
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {focus.content.nameEn}{" "}
            <span className="np font-medium text-[#f3c7a4]">
              {focus.content.nameNp}
            </span>
          </h2>
          <p className="mt-1 max-w-md text-sm text-white/75">
            Day {focus.content.day} of 15 · {focus.content.vibeEn}
          </p>
          <p className="mt-0.5 text-xs text-white/55">
            {formatBS(focus.date.bs)} · {formatAD(focus.date.ad)}
            {focus.daysUntil > 0 ? ` · in ${focus.daysUntil} days` : ""}
            {focus.isToday ? " · today" : ""}
          </p>
        </div>
        <Link
          href="/festivals/#bada-dashain"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#c45c26] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#c45c26]/30"
        >
          Open festivals
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="dashain-rail relative mt-4 flex gap-2 overflow-x-auto px-4 pb-4 sm:px-5">
        {tl.days.map((d) => (
          <Link
            key={d.content.id}
            href={`/festivals/#dashain-${d.content.id}`}
            className={cn(
              "dashain-pill",
              d.isToday && "is-today",
              d.isPast && "is-past",
              d.content.highlight === "tika" && "is-peak"
            )}
          >
            <span className="text-[0.65rem] uppercase tracking-wide opacity-70">
              {toNepaliDigits(d.content.day)}
            </span>
            <span className="text-lg font-semibold leading-none">{d.content.day}</span>
            <span className="mt-1 line-clamp-2 text-[0.68rem] leading-tight">
              {d.content.nameEn.split("·")[0].trim()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
