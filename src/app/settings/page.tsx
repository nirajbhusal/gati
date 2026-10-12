"use client";

import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Moon,
  Monitor,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import {
  usePreferences,
  WIDGET_META,
  DEFAULT_WIDGETS,
} from "@/lib/store/preferences";
import type { TextSize, ThemeMode } from "@/types";
import { cn } from "@/lib/utils/cn";

const THEMES: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
  { id: "system", label: "System", icon: Monitor },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "light", label: "Light", icon: Sun },
];

const SIZES: { id: TextSize; label: string }[] = [
  { id: "sm", label: "S" },
  { id: "md", label: "M" },
  { id: "lg", label: "L" },
  { id: "xl", label: "XL" },
];

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize,
    widgets,
    setWidgetVisible,
    moveWidget,
    resetWidgets,
  } = usePreferences();

  const ordered = [...widgets].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings{" "}
          <span className="np text-[var(--fg-muted)] font-normal text-xl">
            सेटिङ
          </span>
        </h1>
        <p className="text-sm text-[var(--fg-muted)]">
          Theme, text size, and homepage layout. Preferences stay on this
          device.
        </p>
      </header>

      <Card glass>
        <CardHeader title="Appearance" subtitle="Theme mode" />
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map((t) => {
            const Icon = t.icon;
            const active = theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition",
                  active
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--bg-muted)]/40 text-[var(--fg-muted)] hover:border-[var(--border-strong)]"
                )}
              >
                <Icon className="h-5 w-5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card glass>
        <CardHeader
          title="Text size"
          subtitle="Global scale across the entire app (A+ / A− also in the header)"
        />
        <div className="flex gap-2">
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setTextSize(s.id)}
              className={cn(
                "flex-1 rounded-xl border py-3 font-medium transition",
                textSize === s.id
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--fg-muted)] hover:bg-[var(--bg-muted)]"
              )}
              style={{
                fontSize:
                  s.id === "sm"
                    ? "0.85rem"
                    : s.id === "md"
                      ? "1rem"
                      : s.id === "lg"
                        ? "1.1rem"
                        : "1.2rem",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-[var(--fg-muted)]">
          Sample: Baisakh ·{" "}
          <span className="np">बैशाख</span> · Vijaya Dashami
        </p>
      </Card>

      <Card glass>
        <CardHeader
          title="Homepage layout"
          subtitle="Show, hide, and reorder dashboard widgets"
          action={
            <Button
              size="sm"
              variant="ghost"
              onClick={() => resetWidgets()}
            >
              Reset
            </Button>
          }
        />
        <ul className="space-y-2">
          {ordered.map((w, idx) => {
            const meta = WIDGET_META[w.id];
            return (
              <li
                key={w.id}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/30 px-3 py-3"
              >
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    className="rounded p-0.5 text-[var(--fg-subtle)] hover:bg-[var(--bg-muted)] hover:text-[var(--fg)] disabled:opacity-30"
                    disabled={idx === 0}
                    onClick={() => moveWidget(w.id, "up")}
                    aria-label={`Move ${meta.title} up`}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded p-0.5 text-[var(--fg-subtle)] hover:bg-[var(--bg-muted)] hover:text-[var(--fg)] disabled:opacity-30"
                    disabled={idx === ordered.length - 1}
                    onClick={() => moveWidget(w.id, "down")}
                    aria-label={`Move ${meta.title} down`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-tight">{meta.title}</p>
                  <p className="np text-xs text-[var(--fg-muted)]">
                    {meta.titleNp}
                  </p>
                  <p className="text-xs text-[var(--fg-subtle)]">
                    {meta.description}
                  </p>
                </div>
                <Button
                  variant="icon"
                  size="sm"
                  onClick={() => setWidgetVisible(w.id, !w.visible)}
                  aria-label={w.visible ? "Hide widget" : "Show widget"}
                  aria-pressed={w.visible}
                >
                  {w.visible ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4 opacity-50" />
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-[var(--fg-subtle)]">
          Default order:{" "}
          {DEFAULT_WIDGETS.map((w) => WIDGET_META[w.id].title).join(" → ")}
        </p>
      </Card>

      <Card className="text-sm text-[var(--fg-muted)]">
        <p className="font-medium text-[var(--fg)]">About Gati (गति)</p>
        <p className="mt-1">
          From Sanskrit/Nepali for motion — <em>graha-gati</em>, the movement of
          celestial bodies that underlies the Bikram Sambat calendar, tithi
          system, and seasonal cycles.
        </p>
        <p className="mt-2 text-xs text-[var(--fg-subtle)]">
          Phase 1 · Web PWA · Preferences in localStorage · Offline-friendly
          static shell
        </p>
        <a
          href="/about"
          className="mt-3 inline-flex text-sm font-medium text-[var(--accent-indigo)] hover:underline underline-offset-4"
        >
          Open About →
        </a>
      </Card>
    </div>
  );
}
