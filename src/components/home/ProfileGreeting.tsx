"use client";

import Link from "next/link";
import { CosmicAvatar } from "@/components/profile/CosmicAvatar";
import { GRAHA_META } from "@/lib/astro/constants";
import { dayPartLabel } from "@/lib/astro/engine";
import { useProfile } from "@/lib/store/profile";

export function ProfileGreeting() {
  const profile = useProfile((s) => s.profile);
  const part = dayPartLabel();

  if (!profile) {
    return (
      <Link
        href="/cheena/new/"
        className="surface-glass flex items-center justify-between gap-3 px-4 py-3 transition hover:border-[var(--border-strong)]"
      >
        <div>
          <p className="text-sm font-medium text-[var(--fg)]">
            Create your cosmic profile
          </p>
          <p className="np text-xs text-[var(--fg-muted)]">
            चिना बनाएर ग्रह-आधारित पहिचान पाउनुहोस्
          </p>
        </div>
        <span className="text-sm text-[var(--accent-indigo)]">Cheena →</span>
      </Link>
    );
  }

  const meta = GRAHA_META[profile.primaryGraha];

  return (
    <Link
      href="/profile/"
      className="surface-glass flex items-center gap-3 px-4 py-3 transition hover:border-[var(--border-strong)]"
    >
      <CosmicAvatar graha={profile.primaryGraha} size={44} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {part.en}, {profile.greetingName ?? profile.name}
          <span className="np text-[var(--fg-muted)]">
            {" "}
            · {part.np} नमस्कार
          </span>
        </p>
        <p className="truncate text-xs text-[var(--fg-subtle)]">
          {meta.glyph} {meta.name} · <span className="np">{meta.nameNp}</span>
        </p>
      </div>
    </Link>
  );
}
