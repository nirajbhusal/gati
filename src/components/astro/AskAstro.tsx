"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, History, Sparkles, Stars } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CosmicAvatar } from "@/components/profile/CosmicAvatar";
import { AskCategoryIcon, ConstellationMark } from "@/components/astro/CosmicIcons";
import {
  ASK_CATEGORIES,
  craftAskReading,
  type AskCategory,
  type AskReading,
} from "@/lib/astro/ask";
import { useAskStore } from "@/lib/store/ask";
import { useProfile } from "@/lib/store/profile";
import { useCheenaStore } from "@/lib/store/cheena";
import { computePanchang } from "@/lib/calendar";
import { cn } from "@/lib/utils/cn";

type Phase = "idle" | "reading" | "revealed";

export function AskAstro({
  embedded = false,
  compact = false,
}: {
  embedded?: boolean;
  compact?: boolean;
}) {
  const profile = useProfile((s) => s.profile);
  const charts = useCheenaStore((s) => s.charts);
  const cheena =
    (profile?.cheenaId && charts.find((c) => c.id === profile.cheenaId)) ||
    charts[0] ||
    null;

  const history = useAskStore((s) => s.history);
  const addReading = useAskStore((s) => s.addReading);
  const clearHistory = useAskStore((s) => s.clearHistory);

  const [category, setCategory] = useState<AskCategory | null>(null);
  const [question, setQuestion] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [reading, setReading] = useState<AskReading | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const skyLine = useMemo(() => {
    const p = computePanchang(new Date(), true);
    return `${p.paksha} ${p.tithiName} · ${p.nakshatraName}`;
  }, []);

  useEffect(() => {
    if (phase !== "reading") return;
    const t = window.setTimeout(() => {
      const q =
        question.trim() ||
        ASK_CATEGORIES.find((c) => c.id === category)?.promptEn ||
        "What does the sky ask of me today?";
      const result = craftAskReading({
        question: q,
        category: category ?? undefined,
        profile,
        cheena,
      });
      setReading(result);
      addReading(result);
      setPhase("revealed");
    }, 1600);
    return () => window.clearTimeout(t);
  }, [phase, question, category, profile, cheena, addReading]);

  const ask = () => {
    if (!question.trim() && !category) return;
    setPhase("reading");
  };

  const reset = () => {
    setPhase("idle");
    setReading(null);
    setQuestion("");
    setCategory(null);
  };

  const selectCategory = (id: AskCategory) => {
    setCategory(id);
    const meta = ASK_CATEGORIES.find((c) => c.id === id);
    if (meta && !question.trim()) setQuestion(meta.promptEn);
  };

  return (
    <div className={cn("space-y-5", !embedded && !compact && "mx-auto max-w-2xl")}>
      {!compact && (
      <section className="ask-hero relative overflow-hidden rounded-3xl border border-[var(--border)]">
        <div className="absolute inset-0">
          <Image
            src="/astro/orb-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-80 dark:opacity-90"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/75 to-[var(--bg)]/25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,var(--bg)_85%)]" />
        </div>

        <div className="relative px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#f0e6c8] backdrop-blur-md">
                <Stars className="h-3.5 w-3.5" aria-hidden />
                Ask Astro · सोध्नुहोस्
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
                Ask the sky
              </h1>
              <p className="np mt-1 text-lg text-[var(--accent)]">आकाशलाई सोध्नुहोस्</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
                A calm reading from today’s tithi, nakshatra, and your Cheena —
                illustrative, iconic, bilingual.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowHistory((v) => !v)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/15 bg-black/30 text-[var(--fg)] backdrop-blur-md transition hover:bg-black/45"
              aria-label="Ask history"
            >
              <History className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-5 text-xs tracking-wide text-[var(--fg-subtle)]">
            Live sky · {skyLine}
          </p>
        </div>
      </section>
      )}

      {showHistory && (
        <Card glass className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Recent readings</p>
            {history.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs text-[var(--fg-subtle)] hover:text-[var(--fg-muted)]"
              >
                Clear
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-[var(--fg-muted)]">No asks yet — the orb is waiting.</p>
          ) : (
            <ul className="space-y-2">
              {history.slice(0, 5).map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/40 px-3 py-2.5 text-left transition hover:border-[var(--border-strong)]"
                    onClick={() => {
                      setReading(h);
                      setPhase("revealed");
                      setShowHistory(false);
                    }}
                  >
                    <p className="truncate text-sm text-[var(--fg)]">{h.question}</p>
                    <p className="mt-0.5 text-xs text-[var(--fg-subtle)]">
                      {h.headline.en} · {new Date(h.askedAt).toLocaleDateString()}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {phase === "reading" && <ReadingPulse />}

      {phase === "revealed" && reading && (
        <ReadingCard reading={reading} onAskAgain={reset} />
      )}

      {phase !== "reading" && (
        <Card glass className="space-y-4 !p-4 sm:!p-5">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
              Choose a path · बाटो छान्नुहोस्
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {ASK_CATEGORIES.map((c) => {
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectCategory(c.id)}
                    className={cn(
                      "ask-chip group flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 transition",
                      active
                        ? "border-[var(--accent)]/50 bg-[var(--accent-soft)] text-[var(--accent)] shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
                        : "border-[var(--border)] bg-[var(--bg-muted)]/40 text-[var(--fg-muted)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-xl transition",
                        active
                          ? "bg-[var(--bg-elevated)] text-[var(--accent)]"
                          : "bg-[var(--bg-elevated)]/80 text-[var(--accent-indigo)] group-hover:text-[var(--accent)]"
                      )}
                    >
                      <AskCategoryIcon category={c.id} />
                    </span>
                    <span className="text-[0.7rem] font-medium leading-tight">{c.en}</span>
                    <span className="np text-[0.65rem] text-[var(--fg-subtle)]">{c.np}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="ask-q" className="sr-only">
              Your question
            </label>
            <div className="relative">
              <textarea
                id="ask-q"
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask();
                  }
                }}
                placeholder="Ask anything — career, love, timing… · के सोध्न चाहनुहुन्छ?"
                className="min-h-[96px] w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--bg-muted)]/60 px-4 py-3 pr-14 text-sm leading-relaxed text-[var(--fg)] outline-none ring-[var(--accent-indigo)] placeholder:text-[var(--fg-subtle)] focus:ring-2"
              />
              <button
                type="button"
                onClick={ask}
                disabled={!question.trim() && !category}
                className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-indigo)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--accent-indigo)_35%,transparent)] transition enabled:hover:brightness-110 disabled:opacity-40"
                aria-label="Ask Astro"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-[var(--fg-subtle)]">
              Readings stay on this device. Cultural guidance — invite a jyotishi for life decisions.
            </p>
          </div>
        </Card>
      )}

      {phase === "idle" && !showHistory && (
        <div className="flex flex-col items-center gap-2 py-2 text-center">
          <ConstellationMark className="opacity-80" />
          <p className="max-w-xs text-sm text-[var(--fg-muted)]">
            Tap a path or type freely. The orb listens to today’s sky.
          </p>
        </div>
      )}
    </div>
  );
}

function ReadingPulse() {
  return (
    <Card glass className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="ask-pulse relative grid h-24 w-24 place-items-center">
        <span className="absolute inset-0 rounded-full bg-[var(--accent-indigo)]/20 blur-xl" />
        <ConstellationMark className="relative h-20 w-20 animate-pulse" />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--fg)]">Reading the sky…</p>
        <p className="np mt-1 text-sm text-[var(--accent)]">आकाश पढ्दै…</p>
      </div>
    </Card>
  );
}

function ReadingCard({
  reading,
  onAskAgain,
}: {
  reading: AskReading;
  onAskAgain: () => void;
}) {
  return (
    <article className="ask-reveal space-y-3">
      <Card
        glass
        className="overflow-hidden border-[var(--accent)]/25 !p-0 shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_12%,transparent)]"
      >
        <div className="border-b border-[var(--border)] bg-gradient-to-br from-[var(--accent-indigo-soft)] via-transparent to-[var(--accent-soft)] px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
                Your reading · तपाईंको पाठ
              </p>
              <p className="mt-2 text-xs text-[var(--fg-muted)] line-clamp-2">
                “{reading.question}”
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-[var(--fg)] sm:text-2xl">
                {reading.headline.en}
              </h2>
              <p className="np mt-1 text-base text-[var(--accent)]">{reading.headline.np}</p>
            </div>
            {reading.graha ? (
              <CosmicAvatar graha={reading.graha} size={52} />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <Sparkles className="h-5 w-5" />
              </span>
            )}
          </div>
          <p className="mt-4 text-xs text-[var(--fg-subtle)]">{reading.tithiLine}</p>
        </div>

        <div className="space-y-3 px-5 py-5 sm:px-6">
          <Block label="Guidance · मार्गदर्शन" {...reading.guidance} />
          <Block label="Timing · समय" {...reading.timing} accent />
          <Block label="Sky · आकाश" {...reading.sky} soft />
          <div className="rounded-2xl border border-[var(--accent-indigo)]/25 bg-[var(--accent-indigo-soft)] px-4 py-3">
            <p className="text-sm font-medium text-[var(--fg)]">{reading.seal.en}</p>
            <p className="np mt-1 text-sm text-[var(--accent-indigo)]">{reading.seal.np}</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={onAskAgain}>
          Ask again
        </Button>
        <Link
          href="/cheena/"
          className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/50 px-4 py-2 text-sm font-medium text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
        >
          Deepen with Cheena
        </Link>
        <Link
          href="/manifest/"
          className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/50 px-4 py-2 text-sm font-medium text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
        >
          Plant an intention
        </Link>
      </div>
    </article>
  );
}

function Block({
  label,
  en,
  np,
  accent,
  soft,
}: {
  label: string;
  en: string;
  np: string;
  accent?: boolean;
  soft?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3",
        accent
          ? "border-[var(--accent)]/30 bg-[var(--accent-soft)]/60"
          : soft
            ? "border-[var(--border)] bg-[var(--bg-muted)]/30"
            : "border-[var(--border)] bg-[var(--bg-muted)]/45"
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg)]">{en}</p>
      <p className="np mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">{np}</p>
    </div>
  );
}
