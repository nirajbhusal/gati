"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Flower2,
  Sparkles,
  Sprout,
  Sun,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DASHAIN_OVERVIEW } from "@/data/dashain";
import {
  getDashainTimeline,
  type DashainTimelineDay,
} from "@/lib/calendar/dashain";
import { formatAD, formatBS, toNepaliDigits } from "@/lib/calendar";
import { WEEKDAYS_EN, WEEKDAYS_NP } from "@/lib/calendar/constants";
import { cn } from "@/lib/utils/cn";

const HIGHLIGHT_STYLE: Record<string, string> = {
  opening: "from-[#c45c26]/25 via-[#d4a84b]/10 to-transparent",
  navaratri: "from-[var(--accent-indigo)]/15 via-transparent to-transparent",
  peak: "from-[#c45c26]/30 via-[#e07a4a]/10 to-transparent",
  tika: "from-[#d4a84b]/35 via-[#c45c26]/15 to-transparent",
  closing: "from-[var(--accent-indigo)]/25 via-[#d4a84b]/10 to-transparent",
};

export function DashainTimeline() {
  const timeline = useMemo(() => getDashainTimeline(), []);
  const [openId, setOpenId] = useState<string | null>(() => {
    const today = timeline.days.find((d) => d.isToday);
    if (today) return today.content.id;
    const next = timeline.days.find((d) => d.isUpcoming);
    return next?.content.id ?? timeline.days[0]?.content.id ?? null;
  });

  const active = timeline.days.find((d) => d.content.id === openId) ?? null;

  return (
    <div className="space-y-5">
      <Hero timelineYear={timeline.yearBs} inSeason={timeline.inSeason} />

      <OverviewCard
        start={timeline.start}
        end={timeline.end}
        progress={timeline.progress}
        dayCount={timeline.days.length}
        inSeason={timeline.inSeason}
      />

      <Garland />

      <div className="dashain-rail -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="Dashain patro strip">
        {timeline.days.map((d) => (
          <button
            key={d.content.id}
            type="button"
            onClick={() => {
              setOpenId(d.content.id);
              document
                .getElementById(`dashain-${d.content.id}`)
                ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }}
            className={cn(
              "patro-bead",
              d.isToday && "is-today",
              openId === d.content.id && "is-active",
              d.isPast && "is-past"
            )}
          >
            <span className="text-[0.6rem] uppercase tracking-wide opacity-70">
              {d.isToday ? "Today" : `D${d.content.day}`}
            </span>
            <span className="text-base font-semibold leading-none">{d.date.bs.day}</span>
            <span className="np text-[0.62rem] opacity-80">
              {d.content.nameNp.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>

      <ul className="day-cards">
        {timeline.days.map((d) => (
          <li key={d.content.id} id={`dashain-${d.content.id}`}>
            <DayCard
              day={d}
              open={openId === d.content.id}
              onToggle={() =>
                setOpenId((id) => (id === d.content.id ? null : d.content.id))
              }
            />
          </li>
        ))}
      </ul>

      <ShareBar yearBs={timeline.yearBs} />

      {active && (
        <p className="text-center text-xs text-[var(--fg-subtle)]">
          Viewing Day {active.content.day} · {active.content.nameEn}{" "}
          <span className="np">· {active.content.nameNp}</span>
        </p>
      )}

      <Card className="text-xs leading-relaxed text-[var(--fg-subtle)]">
        {DASHAIN_OVERVIEW.noteEn}
        <span className="np mt-1 block">{DASHAIN_OVERVIEW.noteNp}</span>
      </Card>
    </div>
  );
}

function Garland() {
  return (
    <svg viewBox="0 0 360 28" className="dashain-garland mx-auto w-full max-w-lg" aria-hidden>
      <path d="M8 6 Q180 26 352 6" fill="none" stroke="currentColor" className="text-[#c45c26]/50" strokeWidth="1.2" />
      {Array.from({ length: 11 }, (_, i) => {
        const t = i / 10;
        const x = 8 + t * 344;
        const y = 6 + Math.sin(t * Math.PI) * 18;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4.2"
            fill={i % 2 ? "#e6c36a" : "#c45c26"}
          />
        );
      })}
    </svg>
  );
}

function ShareBar({ yearBs }: { yearBs: number }) {
  const [copied, setCopied] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const path = `${base}/api/dashain.json`;
  const share = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Bada Dashain ${yearBs}`,
          text: "Gati Dashain timeline",
          url,
        });
        return;
      }
    } catch {
      /* fall through to copy */
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <Card glass className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium">Share this timeline</p>
        <p className="mt-0.5 text-xs text-[var(--fg-subtle)]">
          Public JSON API · <code className="text-[var(--accent-indigo)]">{path}</code>
        </p>
      </div>
      <button
        type="button"
        onClick={share}
        className="rounded-full bg-[var(--accent-indigo)] px-4 py-2 text-sm font-medium text-white"
      >
        {copied ? "Copied" : "Share API"}
      </button>
    </Card>
  );
}

function Hero({
  timelineYear,
  inSeason,
}: {
  timelineYear: number;
  inSeason: boolean;
}) {
  return (
    <section className="dashain-hero relative overflow-hidden rounded-3xl border border-[#c45c26]/25">
      <div className="absolute inset-0">
        <Image
          src="/dashain/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="(max-width: 768px) 100vw, 672px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-[var(--bg)]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,92,38,0.25),transparent_55%)]" />
      </div>
      <div className="relative px-5 pb-7 pt-9 sm:px-8 sm:pb-9 sm:pt-11">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#d4a84b]/35 bg-black/30 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#f5e6c8] backdrop-blur-md">
          <Sprout className="h-3.5 w-3.5" aria-hidden />
          {inSeason ? "Dashain is live" : "Dashain season"} · VS{" "}
          {toNepaliDigits(timelineYear)}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
          {DASHAIN_OVERVIEW.titleEn}{" "}
          <span className="np text-[var(--accent)]">{DASHAIN_OVERVIEW.titleNp}</span>
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
          {DASHAIN_OVERVIEW.taglineEn}
        </p>
        <p className="np mt-1 max-w-lg text-sm text-[#e07a4a]">
          {DASHAIN_OVERVIEW.taglineNp}
        </p>
      </div>
    </section>
  );
}

function OverviewCard({
  start,
  end,
  progress,
  dayCount,
  inSeason,
}: {
  start: DashainTimelineDay["date"];
  end: DashainTimelineDay["date"];
  progress: number;
  dayCount: number;
  inSeason: boolean;
}) {
  return (
    <Card glass className="space-y-4 overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
            Full fortnight · पन्ध्र दिन
          </p>
          <p className="mt-1 text-sm text-[var(--fg)]">
            {formatBS(start.bs)} → {formatBS(end.bs)}
          </p>
          <p className="text-xs text-[var(--fg-muted)]">
            {formatAD(start.ad)} → {formatAD(end.ad)} · {dayCount} days mapped
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            inSeason
              ? "bg-[#c45c26]/15 text-[#c45c26]"
              : "bg-[var(--bg-muted)] text-[var(--fg-muted)]"
          )}
        >
          {inSeason ? "In season · चलिरहेको" : "Upcoming / past season"}
        </span>
      </div>

      <div>
        <div className="mb-1.5 flex justify-between text-[0.65rem] text-[var(--fg-subtle)]">
          <span>Ghatasthapana</span>
          <span>Kojagrat</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-muted)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#c45c26] via-[#d4a84b] to-[var(--accent-indigo)] transition-all duration-500"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
          {DASHAIN_OVERVIEW.storyEn}
        </p>
        <p className="np text-sm leading-relaxed text-[var(--fg-subtle)]">
          {DASHAIN_OVERVIEW.storyNp}
        </p>
      </div>
      <p className="rounded-xl border border-[#d4a84b]/20 bg-[#d4a84b]/08 px-3 py-2 text-sm text-[var(--fg-muted)]">
        {DASHAIN_OVERVIEW.navaratriEn}
        <span className="np mt-1 block text-[var(--fg-subtle)]">
          {DASHAIN_OVERVIEW.navaratriNp}
        </span>
      </p>
    </Card>
  );
}

function DayCard({
  day,
  open,
  onToggle,
}: {
  day: DashainTimelineDay;
  open: boolean;
  onToggle: () => void;
}) {
  const c = day.content;
  const wd = WEEKDAYS_EN[day.date.weekDay];
  const wdNp = WEEKDAYS_NP[day.date.weekDay];
  const gradient = c.highlight ? HIGHLIGHT_STYLE[c.highlight] : "";

  return (
    <Card
        glass
        padding="none"
        className={cn(
          "overflow-hidden transition",
          day.isToday && "ring-1 ring-[#c45c26]/40",
          open && "border-[#c45c26]/30"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "flex w-full items-start gap-3 bg-gradient-to-br px-4 py-3.5 text-left sm:px-5",
            gradient
          )}
          aria-expanded={open}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--bg-elevated)] text-[#c45c26] shadow-sm">
            <DayIcon highlight={c.highlight} day={c.day} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
                Day {c.day} · दिन {toNepaliDigits(c.day)}
              </span>
              {day.isToday && (
                <span className="rounded-full bg-[#c45c26] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
                  Today
                </span>
              )}
              {c.highlight === "tika" && (
                <span className="rounded-full bg-[#d4a84b]/20 px-2 py-0.5 text-[0.6rem] font-medium text-[#d4a84b]">
                  Peak
                </span>
              )}
            </span>
            <span className="mt-0.5 block text-base font-semibold tracking-tight text-[var(--fg)]">
              {c.nameEn}{" "}
              <span className="np font-medium text-[#e07a4a]">{c.nameNp}</span>
            </span>
            <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
              {wd} {formatAD(day.date.ad)} ·{" "}
              <span className="np">
                {wdNp} {formatBS(day.date.bs, { lang: "np" })}
              </span>
              {day.daysUntil > 0 && (
                <span className="text-[var(--fg-subtle)]"> · in {day.daysUntil}d</span>
              )}
              {day.daysUntil < 0 && (
                <span className="text-[var(--fg-subtle)]">
                  {" "}
                  · {Math.abs(day.daysUntil)}d ago
                </span>
              )}
            </span>
            <span className="mt-1 block text-sm text-[var(--fg-muted)]">
              {c.vibeEn}
              <span className="np text-[var(--fg-subtle)]"> · {c.vibeNp}</span>
            </span>
          </span>
          <ChevronDown
            className={cn(
              "mt-1 h-5 w-5 shrink-0 text-[var(--fg-subtle)] transition",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="space-y-4 border-t border-[var(--border)] px-4 py-4 sm:px-5">
            <Block title="Summary · सार" en={c.summaryEn} np={c.summaryNp} />
            <Block
              title="Significance · महत्त्व"
              en={c.significanceEn}
              np={c.significanceNp}
            />

            <Section title="Rituals · विधि">
              <ul className="space-y-2">
                {c.rituals.map((r, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/40 px-3 py-2.5"
                  >
                    <p className="text-sm text-[var(--fg)]">{r.en}</p>
                    <p className="np mt-0.5 text-sm text-[var(--fg-muted)]">{r.np}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="grid gap-3 sm:grid-cols-2">
              <Section title="Foods · खानेकुरा">
                <ul className="space-y-1.5">
                  {c.foods.map((f, i) => (
                    <li key={i} className="text-sm text-[var(--fg-muted)]">
                      {f.en}
                      <span className="np block text-xs text-[var(--fg-subtle)]">
                        {f.np}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Tips · सुझाव">
                <ul className="space-y-1.5">
                  {c.tips.map((t, i) => (
                    <li key={i} className="text-sm text-[var(--fg-muted)]">
                      {t.en}
                      <span className="np block text-xs text-[var(--fg-subtle)]">
                        {t.np}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </div>
        )}
      </Card>
  );
}

function DayIcon({
  highlight,
  day,
}: {
  highlight?: string;
  day: number;
}) {
  if (highlight === "opening") return <Sprout className="h-5 w-5" />;
  if (highlight === "peak") return <Flower2 className="h-5 w-5" />;
  if (highlight === "tika") return <Sparkles className="h-5 w-5" />;
  if (highlight === "closing") return <Sun className="h-5 w-5" />;
  return <span className="text-sm font-bold">{day}</span>;
}

function Block({
  title,
  en,
  np,
}: {
  title: string;
  en: string;
  np: string;
}) {
  return (
    <div>
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
        {title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg)]">{en}</p>
      <p className="np mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">{np}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
        {title}
      </p>
      {children}
    </div>
  );
}
