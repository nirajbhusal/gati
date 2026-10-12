"use client";

import { GRAHA_META } from "@/lib/astro/constants";
import type { GrahaId } from "@/types/astro";
import { cn } from "@/lib/utils/cn";

export function CosmicAvatar({
  graha,
  size = 48,
  className,
  label,
}: {
  graha: GrahaId;
  size?: number;
  className?: string;
  label?: string;
}) {
  const meta = GRAHA_META[graha];
  return (
    <div
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 30%, ${meta.color}55, #12121a 70%)`,
        boxShadow: `0 0 0 1px ${meta.color}44, 0 0 20px ${meta.color}22`,
      }}
      title={label ?? `${meta.name} · ${meta.nameNp}`}
      role="img"
      aria-label={label ?? `${meta.name} avatar`}
    >
      <svg
        width={size * 0.85}
        height={size * 0.85}
        viewBox="0 0 64 64"
        aria-hidden
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke={meta.color}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <path
          d="M44 18 C50 26 50 38 44 46"
          fill="none"
          stroke={meta.color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="46" cy="20" r="3.5" fill={meta.color} />
        <circle cx="32" cy="32" r="7" fill={meta.color} opacity="0.85" />
        <text
          x="32"
          y="36"
          textAnchor="middle"
          fontSize="10"
          fill="#0a0a10"
          fontWeight="600"
        >
          {meta.glyph}
        </text>
      </svg>
    </div>
  );
}
