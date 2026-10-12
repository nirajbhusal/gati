import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "icon";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[#1a1510] hover:brightness-110 active:scale-[0.98] font-medium shadow-sm",
  secondary:
    "bg-[var(--bg-muted)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--accent-soft)]",
  ghost:
    "bg-transparent text-[var(--fg-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--fg)]",
  icon:
    "bg-[var(--bg-muted)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--accent-soft)] hover:border-[var(--border-strong)] grid place-items-center",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-5 text-base rounded-xl gap-2",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none select-none",
        variants[variant],
        variant === "icon"
          ? size === "sm"
            ? "h-8 w-8 rounded-lg"
            : size === "lg"
              ? "h-12 w-12 rounded-xl"
              : "h-10 w-10 rounded-xl"
          : sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
