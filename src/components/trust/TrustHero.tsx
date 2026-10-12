import { Orbit } from "lucide-react";

export function TrustHero() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/60 px-5 py-6 sm:px-7 sm:py-8">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--logo-indigo) 45%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--logo-gold) 40%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-muted)]/60 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
            <Orbit className="h-3.5 w-3.5 text-[var(--accent-indigo)]" aria-hidden />
            Cosmic confidence
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Trust{" "}
            <span className="np text-xl font-medium text-[var(--accent)] sm:text-2xl">
              विश्वास
            </span>
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
            Move with time. Understand the universe.
          </p>
          <p className="np mt-1 max-w-md text-sm text-[var(--fg-subtle)]">
            समयसँग हिँड्नुहोस्। ब्रह्माण्ड बुझ्नुहोस्।
          </p>
        </div>
        <p className="max-w-[14rem] text-xs leading-relaxed text-[var(--fg-subtle)] sm:text-right">
          Confidence in graha-gati — the celestial motion that shapes the Patro,
          Cheena, and your day’s pace.
        </p>
      </div>
    </header>
  );
}
