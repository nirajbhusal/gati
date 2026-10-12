"use client";

import { useId } from "react";
import { cn } from "@/lib/utils/cn";

/** Gati — a small cosmic companion: indigo core, gold orbit, friendly eyes. */
export function GatiMascot({
  size = 72,
  className,
  mood = "idle",
  label = "Gati",
}: {
  size?: number;
  className?: string;
  mood?: "idle" | "listen" | "joy";
  label?: string;
}) {
  const blink = mood === "listen";
  const uid = useId().replace(/:/g, "");
  const core = `gati-core-${uid}`;
  const orbit = `gati-orbit-${uid}`;
  return (
    <span
      className={cn("gati-mascot inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
        <defs>
          <radialGradient id={core} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f7f1ff" />
            <stop offset="42%" stopColor="#8b87d4" />
            <stop offset="100%" stopColor="#2a2748" />
          </radialGradient>
          <linearGradient id={orbit} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3d27a" />
            <stop offset="100%" stopColor="#c45c26" />
          </linearGradient>
        </defs>
        <ellipse
          cx="40"
          cy="68"
          rx="16"
          ry="4"
          fill="#000"
          opacity="0.18"
        />
        <ellipse
          className="gati-orbit"
          cx="40"
          cy="40"
          rx="30"
          ry="12"
          fill="none"
          stroke={`url(#${orbit})`}
          strokeWidth="2.2"
          transform="rotate(-18 40 40)"
        />
        <circle cx="62" cy="28" r="3.2" fill="#f3d27a" />
        <circle cx="40" cy="42" r="18" fill={`url(#${core})`} />
        <circle cx="34" cy="38" r="1.6" fill="#fff" opacity="0.7" />
        <g className={cn(blink && "gati-eyes-listen")}>
          <ellipse cx="33.5" cy="41" rx="2.4" ry={blink ? 1.1 : 2.6} fill="#14121c" />
          <ellipse cx="46.5" cy="41" rx="2.4" ry={blink ? 1.1 : 2.6} fill="#14121c" />
          {!blink && (
            <>
              <circle cx="34.3" cy="40.2" r="0.7" fill="#fff" />
              <circle cx="47.3" cy="40.2" r="0.7" fill="#fff" />
            </>
          )}
        </g>
        <path
          d={
            mood === "joy"
              ? "M34 47.5 Q40 52 46 47.5"
              : "M35 47 Q40 50 45 47"
          }
          fill="none"
          stroke="#14121c"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M28 30 Q32 26 36 29"
          fill="none"
          stroke="#f3d27a"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </span>
  );
}
