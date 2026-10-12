"use client";

import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CosmicAvatar } from "@/components/profile/CosmicAvatar";
import { NorthIndianChart } from "@/components/cheena/NorthIndianChart";
import { useCheenaStore } from "@/lib/store/cheena";
import { GRAHA_META, RASHI_NP, NAKSHATRA_EN } from "@/lib/astro/constants";
import { useState } from "react";

export default function CheenaPage() {
  const charts = useCheenaStore((s) => s.charts);
  const removeChart = useCheenaStore((s) => s.removeChart);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = charts.find((c) => c.id === (activeId ?? charts[0]?.id));

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Digital Cheena{" "}
            <span className="np text-xl font-normal text-[var(--fg-muted)]">चिना</span>
          </h1>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Birth chart · Lagna · Navagraha — stored on this device
          </p>
        </div>
        <Link href="/cheena/new/">
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4" />
            New Cheena
          </Button>
        </Link>
      </header>

      {charts.length === 0 ? (
        <Card glass className="py-10 text-center">
          <p className="text-[var(--fg-muted)]">No Cheena saved yet.</p>
          <Link
            href="/cheena/new/"
            className="mt-3 inline-block text-sm font-medium text-[var(--accent-indigo)] hover:underline"
          >
            Create your first digital Cheena →
          </Link>
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-1">
            {charts.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                  active?.id === c.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-muted)]"
                }`}
              >
                <CosmicAvatar graha={c.primaryGraha} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{c.input.name}</p>
                  <p className="truncate text-xs text-[var(--fg-muted)]">
                    {c.lagnaNameNp} Lagna · {RASHI_NP[c.moonRashiIndex]} Moon
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-[var(--fg-subtle)] hover:bg-[var(--bg-muted)] hover:text-[var(--danger)]"
                  aria-label="Delete Cheena"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChart(c.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </button>
            ))}
          </div>

          {active && (
            <div className="space-y-4 lg:col-span-2">
              <Card glass>
                <div className="flex flex-wrap items-center gap-3">
                  <CosmicAvatar graha={active.primaryGraha} size={52} />
                  <div>
                    <p className="text-lg font-semibold">{active.input.name}</p>
                    <p className="text-sm text-[var(--fg-muted)]">
                      {active.place.name} · {active.input.birthDateAd}
                      {active.input.birthTime && !active.input.timeUnknown
                        ? ` · ${active.input.birthTime} NPT`
                        : " · time approx"}
                    </p>
                    <p className="text-xs text-[var(--fg-subtle)]">
                      Primary: {GRAHA_META[active.primaryGraha].name} · Moon
                      nakshatra {NAKSHATRA_EN[active.moonNakshatraIndex]}
                    </p>
                  </div>
                </div>
              </Card>
              <Card glass>
                <NorthIndianChart chart={active} />
              </Card>
              <Card className="text-xs text-[var(--fg-subtle)]">
                Ayanamsa (Lahiri approx): {active.ayanamsa.toFixed(2)}° · Guidance
                tool only
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
