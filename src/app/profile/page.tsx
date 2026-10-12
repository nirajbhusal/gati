"use client";

import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CosmicAvatar } from "@/components/profile/CosmicAvatar";
import { GRAHA_META, RASHI_EN, RASHI_NP } from "@/lib/astro/constants";
import { dayPartLabel } from "@/lib/astro/engine";
import { useProfile } from "@/lib/store/profile";
import { useCheenaStore } from "@/lib/store/cheena";

export default function ProfilePage() {
  const profile = useProfile((s) => s.profile);
  const clearProfile = useProfile((s) => s.clearProfile);
  const charts = useCheenaStore((s) => s.charts);
  const part = dayPartLabel();

  if (!profile) {
    return (
      <div className="mx-auto max-w-lg space-y-5">
        <h1 className="text-2xl font-semibold">
          Profile{" "}
          <span className="np text-[var(--fg-muted)] font-normal">प्रोफाइल</span>
        </h1>
        <Card glass className="py-10 text-center">
          <p className="text-[var(--fg-muted)]">
            No cosmic profile yet. Create a Cheena to get a planet-linked identity.
          </p>
          <Link href="/cheena/new/" className="mt-4 inline-block">
            <Button variant="primary">Create Cheena</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const meta = GRAHA_META[profile.primaryGraha];

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <h1 className="text-2xl font-semibold">
        Profile{" "}
        <span className="np text-[var(--fg-muted)] font-normal">प्रोफाइल</span>
      </h1>

      <Card glass className="text-center">
        <div className="flex flex-col items-center gap-3 py-2">
          <CosmicAvatar graha={profile.primaryGraha} size={88} />
          <div>
            <p className="text-xl font-semibold">{profile.name}</p>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {part.en} greeting ·{" "}
              <span className="np text-[var(--accent)]">{part.np} नमस्कार</span>
            </p>
          </div>
          <p className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm text-[var(--accent)]">
            {meta.glyph} {meta.name} · <span className="np">{meta.nameNp}</span>
          </p>
          {profile.moonRashiIndex !== undefined && (
            <p className="text-sm text-[var(--fg-muted)]">
              Moon {RASHI_EN[profile.moonRashiIndex]}{" "}
              <span className="np">({RASHI_NP[profile.moonRashiIndex]})</span>
            </p>
          )}
        </div>
      </Card>

      <Card glass>
        <CardHeader title="Linked Cheena" />
        {profile.cheenaId && charts.some((c) => c.id === profile.cheenaId) ? (
          <Link href="/cheena/" className="text-sm text-[var(--accent-indigo)] hover:underline">
            Open Digital Cheena →
          </Link>
        ) : (
          <p className="text-sm text-[var(--fg-muted)]">
            No linked chart.{" "}
            <Link href="/cheena/new/" className="text-[var(--accent-indigo)] hover:underline">
              Create one
            </Link>
          </p>
        )}
      </Card>

      <Button variant="ghost" onClick={() => clearProfile()}>
        Clear profile on this device
      </Button>
    </div>
  );
}
