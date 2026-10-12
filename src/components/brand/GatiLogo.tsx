import { cn } from "@/lib/utils/cn";

type LogoVariant = "mark" | "wordmark" | "lockup" | "lockup-stacked";

interface GatiLogoProps {
  variant?: LogoVariant;
  className?: string;
  /** Pixel height of the mark (wordmark scales with it) */
  size?: number;
  /** Force monochrome (currentColor) for footer/print */
  mono?: boolean;
  title?: string;
}

/**
 * Gati brand mark: orbital graha-gati — a precise gold arc (motion)
 * around a soft indigo core (time/cosmos), with a small lunar body.
 * Built as SVG so “Gati / गति” stay crisp at every size.
 */
export function GatiLogo({
  variant = "lockup",
  className,
  size = 36,
  mono = false,
  title = "Gati",
}: GatiLogoProps) {
  const markSize = size;
  const gold = mono ? "currentColor" : "var(--logo-gold, #d4a84b)";
  const indigo = mono ? "currentColor" : "var(--logo-indigo, #8b87d4)";
  const core = mono ? "currentColor" : "var(--logo-core, #12121a)";
  const soft = mono ? "currentColor" : "var(--logo-soft, #1c1c28)";

  const Mark = (
    <svg
      width={markSize}
      height={markSize}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={variant !== "mark"}
      role={variant === "mark" ? "img" : undefined}
      className={variant === "mark" ? className : "shrink-0"}
    >
      {variant === "mark" ? <title>{title}</title> : null}
      {/* Outer subtle mandala ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke={gold}
        strokeOpacity={mono ? 0.35 : 0.22}
        strokeWidth="1"
      />
      {/* Soft cosmic disc */}
      <circle cx="32" cy="32" r="22" fill={soft} opacity={mono ? 0.12 : 1} />
      {/* Indigo core */}
      <circle cx="32" cy="32" r="14" fill={indigo} opacity={mono ? 0.35 : 0.35} />
      <circle cx="32" cy="32" r="9" fill={core} opacity={mono ? 0.2 : 1} />
      {/* Orbital arc — motion / gati */}
      <path
        d="M48.5 22.5C52.2 27.8 52.8 35.2 49.2 41.2"
        stroke={gold}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.5 41.5C11.8 36.2 11.2 28.8 14.8 22.8"
        stroke={gold}
        strokeWidth="1.6"
        strokeOpacity={0.45}
        strokeLinecap="round"
        fill="none"
      />
      {/* Lunar body on the orbit */}
      <circle cx="49.2" cy="24.5" r="3.2" fill={gold} />
      <circle
        cx="50.2"
        cy="23.6"
        r="1.1"
        fill={mono ? "currentColor" : "#fff6e0"}
        opacity={0.9}
      />
      {/* Center spark */}
      <circle cx="32" cy="32" r="2" fill={gold} />
    </svg>
  );

  if (variant === "mark") return Mark;

  const word = (
    <span className="flex min-w-0 flex-col justify-center leading-none">
      <span
        className="font-semibold tracking-tight text-[var(--fg)]"
        style={{ fontSize: markSize * 0.42 }}
      >
        Gati
      </span>
      <span
        className="np mt-0.5 font-medium text-[var(--accent)]"
        style={{ fontSize: markSize * 0.28 }}
      >
        गति
      </span>
    </span>
  );

  const tagline = (
    <span
      className="mt-0.5 text-[var(--fg-subtle)]"
      style={{ fontSize: Math.max(10, markSize * 0.22) }}
    >
      Move with time
    </span>
  );

  if (variant === "wordmark") {
    return (
      <span className={cn("inline-flex flex-col", className)} aria-label={title}>
        <span
          className="font-semibold tracking-tight text-[var(--fg)]"
          style={{ fontSize: size * 0.55 }}
        >
          Gati
        </span>
        <span
          className="np font-medium text-[var(--accent)]"
          style={{ fontSize: size * 0.32 }}
        >
          गति
        </span>
      </span>
    );
  }

  if (variant === "lockup-stacked") {
    return (
      <span
        className={cn("inline-flex flex-col items-center gap-2 text-center", className)}
        aria-label={title}
      >
        {Mark}
        <span className="flex flex-col items-center">
          <span
            className="font-semibold tracking-tight text-[var(--fg)]"
            style={{ fontSize: markSize * 0.48 }}
          >
            Gati
          </span>
          <span
            className="np font-medium text-[var(--accent)]"
            style={{ fontSize: markSize * 0.3 }}
          >
            गति
          </span>
          {tagline}
        </span>
      </span>
    );
  }

  // lockup (horizontal)
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={title}
    >
      {Mark}
      <span className="flex min-w-0 flex-col">
        {word}
        <span
          className="hidden text-[var(--fg-subtle)] sm:block"
          style={{ fontSize: Math.max(10, markSize * 0.22), marginTop: 2 }}
        >
          Move with time
        </span>
      </span>
    </span>
  );
}
