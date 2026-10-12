import type { AskCategory } from "@/lib/astro/ask";
import { cn } from "@/lib/utils/cn";

const stroke = "currentColor";

export function AskCategoryIcon({
  category,
  className,
}: {
  category: AskCategory;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: cn("h-6 w-6", className),
    "aria-hidden": true as const,
  };

  switch (category) {
    case "career":
      return (
        <svg {...common}>
          <path d="M24 40V18" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M24 18c0-6 4-10 10-10 0 6-4 10-10 10Z" stroke={stroke} strokeWidth="1.8" />
          <path d="M24 18c0-6-4-10-10-10 0 6 4 10 10 10Z" stroke={stroke} strokeWidth="1.8" />
          <circle cx="24" cy="12" r="2.2" fill={stroke} />
          <path d="M14 40h20" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "love":
      return (
        <svg {...common}>
          <path
            d="M24 38s-12-7.5-12-16a7 7 0 0 1 12-4.8A7 7 0 0 1 36 22c0 8.5-12 16-12 16Z"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="22" r="10" stroke={stroke} strokeOpacity="0.35" strokeWidth="1.2" />
        </svg>
      );
    case "travel":
      return (
        <svg {...common}>
          <path d="M10 34h28" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M16 34V20l8-6 8 6v14"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M28 14l10-4-2 8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="10" r="1.6" fill={stroke} />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <path
            d="M24 38c-8-5-12-11-12-17a8 8 0 0 1 16 0c0-6 4-10 8-10 0 8-4 14-12 27Z"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="14" r="3" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "timing":
      return (
        <svg {...common}>
          <circle cx="24" cy="26" r="12" stroke={stroke} strokeWidth="1.8" />
          <path d="M24 26V18" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M24 26l7 4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16 10h16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 6h8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "decision":
      return (
        <svg {...common}>
          <path d="M24 8v12" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M24 20l-10 16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M24 20l10 16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="24" cy="8" r="2.5" fill={stroke} />
          <circle cx="14" cy="36" r="2" fill={stroke} opacity="0.7" />
          <circle cx="34" cy="36" r="2" fill={stroke} opacity="0.7" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="10" stroke={stroke} strokeWidth="1.8" />
          <circle cx="24" cy="24" r="3" fill={stroke} />
          <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/** Decorative SVG constellation orb for empty / loading states */
export function ConstellationMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-28 w-28 text-[var(--accent)]", className)}
      fill="none"
      aria-hidden
    >
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeOpacity="0.2" />
      <circle cx="60" cy="60" r="36" stroke="var(--accent-indigo)" strokeOpacity="0.35" />
      <path
        d="M28 70 C40 40 80 40 92 70"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M34 48 C50 30 78 34 90 52"
        stroke="var(--accent-indigo)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="36" cy="52" r="3" fill="currentColor" />
      <circle cx="60" cy="38" r="3.5" fill="var(--accent-indigo)" />
      <circle cx="86" cy="56" r="3" fill="currentColor" />
      <circle cx="60" cy="60" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="72" cy="78" r="2.2" fill="var(--accent-indigo)" />
    </svg>
  );
}
