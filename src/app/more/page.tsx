import Link from "next/link";
import {
  Bookmark,
  Info,
  Orbit,
  Settings,
  Sparkles,
  Stars,
  User,
  Wrench,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const LINKS = [
  { href: "/astro/ask/", label: "Ask Astro", labelNp: "आकाश सोध्नुहोस्", icon: Stars, desc: "Illustrative cosmic readings" },
  { href: "/manifest/", label: "Manifest", labelNp: "इच्छा", icon: Bookmark, desc: "Digital wishlist of intentions" },
  { href: "/trust/", label: "Trust", labelNp: "विश्वास", icon: Orbit, desc: "Confidence in time & cosmos" },
  { href: "/tools/", label: "Utilities", labelNp: "उपकरण", icon: Wrench, desc: "BS ↔ AD and helpers" },
  { href: "/festivals/", label: "Festivals", labelNp: "चाडपर्व", icon: Sparkles, desc: "Dashain timeline now · Tihar next" },
  { href: "/profile/", label: "Profile", labelNp: "प्रोफाइल", icon: User, desc: "Cosmic identity" },
  { href: "/settings/", label: "Settings", labelNp: "सेटिङ", icon: Settings, desc: "Theme, text, widgets" },
  { href: "/about/", label: "About", labelNp: "बारेमा", icon: Info, desc: "Gati story" },
] as const;

export default function MorePage() {
  return (
    <div className="mx-auto max-w-lg space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          More{" "}
          <span className="np text-xl font-normal text-[var(--fg-muted)]">थप</span>
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Manifest, Trust, Utilities, and settings
        </p>
      </header>
      <div className="grid gap-2">
        {LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card
                glass
                padding="sm"
                className="flex items-center gap-3 transition hover:border-[var(--border-strong)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--bg-muted)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">
                    {item.label}{" "}
                    <span className="np text-sm font-normal text-[var(--fg-muted)]">
                      {item.labelNp}
                    </span>
                  </span>
                  <span className="block text-xs text-[var(--fg-subtle)]">
                    {item.desc}
                  </span>
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
