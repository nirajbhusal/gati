"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { isGentlePlantingDay } from "@/lib/astro/advisor";
import { useManifestStore } from "@/lib/store/manifest";
import type { ManifestStatus } from "@/types/astro";
import { cn } from "@/lib/utils/cn";

const STATUS_LABEL: Record<ManifestStatus, { en: string; np: string }> = {
  planted: { en: "Planted", np: "रोपिएको" },
  growing: { en: "Growing", np: "बढ्दै" },
  fulfilled: { en: "Fulfilled", np: "पूर्ण" },
  released: { en: "Released", np: "छोडिएको" },
};

export default function ManifestPage() {
  const { items, addItem, setStatus, removeItem } = useManifestStore();
  const [title, setTitle] = useState("");
  const gentle = isGentlePlantingDay();

  const plant = () => {
    if (!title.trim()) return;
    addItem(title.trim(), { preferredPaksha: "Shukla" });
    setTitle("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Manifest{" "}
          <span className="np text-xl font-normal text-[var(--fg-muted)]">इच्छा</span>
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Digital wishlist of intentions — plant when timing is kinder.
        </p>
      </header>

      <Card
        glass
        className={cn(
          "text-sm",
          gentle
            ? "border-[var(--accent)]/30 bg-[var(--accent-soft)]/40"
            : "text-[var(--fg-muted)]"
        )}
      >
        {gentle ? (
          <p>
            <strong className="text-[var(--fg)]">Today is gentle for planting.</strong>{" "}
            आज इच्छा रोप्न मिल्ने दिन हो — tithi supports new intentions.
          </p>
        ) : (
          <p>
            Timing is ordinary today. You can still plant — or wait for a softer
            Shukla window.
          </p>
        )}
      </Card>

      <Card glass>
        <CardHeader title="Plant an intention" subtitle="Kept only on this device" />
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="h-10 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] px-3 text-sm"
            placeholder="e.g. Steady health · परिवारको शान्ति"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && plant()}
          />
          <Button variant="primary" onClick={plant}>
            Plant
          </Button>
        </div>
      </Card>

      {items.length === 0 ? (
        <Card glass className="py-8 text-center text-sm text-[var(--fg-muted)]">
          No intentions yet. Plant your first wish above.
        </Card>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <Card glass padding="sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--fg-subtle)]">
                      {STATUS_LABEL[item.status].en}{" "}
                      <span className="np">· {STATUS_LABEL[item.status].np}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(
                      ["planted", "growing", "fulfilled", "released"] as ManifestStatus[]
                    ).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(item.id, s)}
                        className={cn(
                          "rounded-lg px-2 py-1 text-[0.65rem] transition",
                          item.status === s
                            ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                            : "text-[var(--fg-subtle)] hover:bg-[var(--bg-muted)]"
                        )}
                      >
                        {STATUS_LABEL[s].en}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="rounded-lg px-2 py-1 text-[0.65rem] text-[var(--danger)] hover:bg-[var(--bg-muted)]"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
