"use client";

import { GRAHA_META, RASHI_SHORT_EN } from "@/lib/astro/constants";
import type { CheenaChart } from "@/types/astro";

/**
 * North Indian diamond chart — 12 houses from Lagna.
 * House layout (standard diamond):
 *   top diamond = house 1 (Lagna), then clockwise-ish mapping in cells.
 */
export function NorthIndianChart({ chart }: { chart: CheenaChart }) {
  // Map house 1–12 to SVG cell centers (approximate classic layout)
  const cells: { house: number; x: number; y: number }[] = [
    { house: 1, x: 150, y: 95 },
    { house: 2, x: 95, y: 55 },
    { house: 3, x: 55, y: 95 },
    { house: 4, x: 95, y: 150 },
    { house: 5, x: 55, y: 205 },
    { house: 6, x: 95, y: 245 },
    { house: 7, x: 150, y: 205 },
    { house: 8, x: 205, y: 245 },
    { house: 9, x: 245, y: 205 },
    { house: 10, x: 205, y: 150 },
    { house: 11, x: 245, y: 95 },
    { house: 12, x: 205, y: 55 },
  ];

  const byHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) byHouse[h] = [];
  for (const p of chart.planets) {
    byHouse[p.house].push(GRAHA_META[p.id].glyph);
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <svg viewBox="0 0 300 300" className="h-auto w-full" role="img" aria-label="North Indian Cheena chart">
        <rect width="300" height="300" rx="12" fill="var(--bg-muted)" />
        {/* Outer square */}
        <rect
          x="20"
          y="20"
          width="260"
          height="260"
          fill="var(--bg-elevated)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        {/* Diagonals + mid diamond */}
        <line x1="20" y1="20" x2="280" y2="280" stroke="var(--border)" strokeWidth="1" />
        <line x1="280" y1="20" x2="20" y2="280" stroke="var(--border)" strokeWidth="1" />
        <line x1="150" y1="20" x2="20" y2="150" stroke="var(--border)" strokeWidth="1" />
        <line x1="150" y1="20" x2="280" y2="150" stroke="var(--border)" strokeWidth="1" />
        <line x1="20" y1="150" x2="150" y2="280" stroke="var(--border)" strokeWidth="1" />
        <line x1="280" y1="150" x2="150" y2="280" stroke="var(--border)" strokeWidth="1" />
        <polygon
          points="150,20 280,150 150,280 20,150"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="1.25"
        />

        {cells.map(({ house, x, y }) => {
          const rashi = chart.houseRashi[house - 1];
          const glyphs = byHouse[house];
          return (
            <g key={house}>
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                fontSize="9"
                fill="var(--fg-subtle)"
              >
                {RASHI_SHORT_EN[rashi]}
              </text>
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                fontSize="11"
                fill="var(--fg)"
                fontWeight="600"
              >
                {glyphs.join(" ") || "·"}
              </text>
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                fontSize="8"
                fill="var(--fg-subtle)"
              >
                H{house}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-center text-[0.7rem] text-[var(--fg-subtle)]">
        North Indian style · Lagna in House 1 · glyphs = grahas
      </p>
    </div>
  );
}
