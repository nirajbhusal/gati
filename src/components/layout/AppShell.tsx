"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  CalendarDays,
  Home,
  LayoutGrid,
  Orbit,
  PanelLeft,
  Settings,
  ShieldCheck,
  Sprout,
  Stars,
  SunMoon,
} from "lucide-react";
import { GatiLogo } from "@/components/brand/GatiLogo";
import { CosmicBackground } from "@/components/effects/Starfield";
import { AskGatiProvider } from "@/components/layout/AskGatiContext";
import { AskGatiFab, AskGatiSheet } from "@/components/layout/AskGatiSheet";
import { Button } from "@/components/ui/Button";
import {
  initPreferencesSideEffects,
  usePreferences,
} from "@/lib/store/preferences";
import { cn } from "@/lib/utils/cn";

const PRIMARY = [
  { href: "/", label: "Home", labelNp: "गृह", icon: Home },
  { href: "/calendar/", label: "Patro", labelNp: "पात्रो", icon: CalendarDays },
  { href: "/dashain/", label: "Dashain", labelNp: "दशैँ", icon: Sprout },
  { href: "/cheena/", label: "Cheena", labelNp: "चिना", icon: Orbit },
  { href: "/more/", label: "More", labelNp: "थप", icon: LayoutGrid },
] as const;

const SIDE_EXTRA = [
  { href: "/astro/", label: "Astro", labelNp: "ज्योतिष", icon: Stars },
  { href: "/manifest/", label: "Manifest", labelNp: "इच्छा", icon: Bookmark },
  { href: "/trust/", label: "Trust", labelNp: "विश्वास", icon: ShieldCheck },
  { href: "/festivals/", label: "Festivals", labelNp: "चाडपर्व", icon: Stars },
  { href: "/settings/", label: "Settings", labelNp: "सेटिङ", icon: Settings },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AskGatiProvider>
      <ShellFrame>{children}</ShellFrame>
    </AskGatiProvider>
  );
}

function ShellFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { increaseTextSize, decreaseTextSize, theme, setTheme, hydrated } =
    usePreferences();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => initPreferencesSideEffects(), []);
  useEffect(() => {
    if (!hydrated) usePreferences.setState({ hydrated: true });
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
      <div className={cn("app-shell", collapsed && "is-collapsed")}>
        <aside className="side-nav" aria-label="Sections">
          <div className="side-brand">
            <Link href="/" className="min-w-0" aria-label="Gati home">
              <GatiLogo variant={collapsed ? "mark" : "lockup"} size={collapsed ? 32 : 30} />
            </Link>
            <button
              type="button"
              className="side-collapse"
              aria-pressed={collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((v) => !v)}
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </div>
          <nav className="side-links">
            {[...PRIMARY.filter((i) => i.href !== "/more/"), ...SIDE_EXTRA].map(
              (item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    title={item.label}
                    className={cn(active && "is-active")}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="side-label">
                      {item.label}
                      <span className="np side-np">{item.labelNp}</span>
                    </span>
                  </Link>
                );
              }
            )}
          </nav>
          <div className="side-foot">
            <Button variant="ghost" size="sm" onClick={decreaseTextSize} aria-label="Smaller text">
              A−
            </Button>
            <Button variant="ghost" size="sm" onClick={increaseTextSize} aria-label="Larger text">
              A+
            </Button>
            <Button variant="icon" size="sm" onClick={cycleTheme} aria-label="Cycle theme">
              <SunMoon className="h-4 w-4" />
            </Button>
          </div>
        </aside>

        <div className="app-main">
          <header className="mobile-top">
            <Link href="/" aria-label="Gati home">
              <GatiLogo variant="lockup" size={30} />
            </Link>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={decreaseTextSize} aria-label="Smaller text">
                A−
              </Button>
              <Button variant="ghost" size="sm" onClick={increaseTextSize} aria-label="Larger text">
                A+
              </Button>
              <Button variant="icon" size="sm" onClick={cycleTheme} aria-label="Cycle theme">
                <SunMoon className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="page-enter app-content">{children}</main>
        </div>

        <nav className="tab-bar" aria-label="Sections">
          {PRIMARY.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(active && "is-active")}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <AskGatiFab />
        <AskGatiSheet />
      </div>
    </>
  );
}
