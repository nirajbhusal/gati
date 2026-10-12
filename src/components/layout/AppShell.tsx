"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Home,
  LayoutGrid,
  Orbit,
  Settings,
  Sparkles,
  SunMoon,
} from "lucide-react";
import { GatiLogo } from "@/components/brand/GatiLogo";
import { CosmicBackground } from "@/components/effects/Starfield";
import { Button } from "@/components/ui/Button";
import {
  initPreferencesSideEffects,
  usePreferences,
} from "@/lib/store/preferences";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/", label: "Home", labelNp: "गृह", icon: Home },
  { href: "/calendar/", label: "Patro", labelNp: "पात्रो", icon: CalendarDays },
  { href: "/cheena/", label: "Cheena", labelNp: "चिना", icon: Orbit },
  { href: "/astro/", label: "Astro", labelNp: "ज्योतिष", icon: Sparkles },
  { href: "/more/", label: "More", labelNp: "थप", icon: LayoutGrid },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { increaseTextSize, decreaseTextSize, theme, setTheme, hydrated } =
    usePreferences();

  useEffect(() => {
    return initPreferencesSideEffects();
  }, []);

  useEffect(() => {
    if (!hydrated) {
      usePreferences.setState({ hydrated: true });
    }
  }, [hydrated]);

  const cycleTheme = () => {
    const order = ["system", "dark", "light"] as const;
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <>
      <CosmicBackground />
      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl">
          <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
            <Link
              href="/"
              className="group min-w-0 transition-opacity hover:opacity-90"
              aria-label="Gati home"
            >
              <GatiLogo variant="lockup" size={34} />
            </Link>

            <nav
              className="hidden items-center gap-0.5 md:flex"
              aria-label="Primary"
            >
              {NAV.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                        : "text-[var(--fg-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--fg)]"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/settings/"
                className={cn(
                  "ml-1 flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm transition-colors",
                  pathname.startsWith("/settings")
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                    : "text-[var(--fg-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--fg)]"
                )}
              >
                <Settings className="h-4 w-4" aria-hidden />
                Settings
              </Link>
            </nav>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={decreaseTextSize}
                aria-label="Decrease text size"
                title="Decrease text size"
                className="font-serif text-sm"
              >
                A−
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={increaseTextSize}
                aria-label="Increase text size"
                title="Increase text size"
                className="font-serif text-base"
              >
                A+
              </Button>
              <Button
                variant="icon"
                size="sm"
                onClick={cycleTheme}
                aria-label={`Theme: ${theme}. Click to cycle.`}
                title={`Theme: ${theme}`}
              >
                <SunMoon className="h-4 w-4" />
              </Button>
              <Link
                href="/settings/"
                className="grid h-8 w-8 place-items-center rounded-lg text-[var(--fg-muted)] hover:bg-[var(--bg-muted)] md:hidden"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <main className="page-enter mx-auto w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 sm:py-6 pb-[calc(var(--nav-height)+1.25rem)] md:pb-8">
          {children}
        </main>

        <nav
          className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl md:hidden"
          aria-label="Mobile primary"
        >
          <div className="mx-auto grid h-[var(--nav-height)] max-w-lg grid-cols-5 px-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 text-[0.65rem] transition-colors",
                    active ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]"
                  )}
                >
                  <Icon
                    className={cn("h-5 w-5", active && "stroke-[2.25]")}
                    aria-hidden
                  />
                  <span className={cn(active && "font-medium")}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
