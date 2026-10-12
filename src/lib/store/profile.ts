"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CosmicProfile, GrahaId } from "@/types/astro";

interface ProfileState {
  profile: CosmicProfile | null;
  hydrated: boolean;
  setProfile: (p: CosmicProfile) => void;
  updateProfile: (partial: Partial<CosmicProfile>) => void;
  clearProfile: () => void;
  setHydrated: (v: boolean) => void;
}

export const useProfile = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      hydrated: false,
      setProfile: (profile) => set({ profile }),
      updateProfile: (partial) => {
        const cur = get().profile;
        if (!cur) return;
        set({ profile: { ...cur, ...partial } });
      },
      clearProfile: () => set({ profile: null }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "gati-profile",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (s) => ({ profile: s.profile }),
    }
  )
);

export function createProfileFromBasics(opts: {
  name: string;
  primaryGraha: GrahaId;
  cheenaId?: string;
  moonRashiIndex?: number;
  lagnaRashiIndex?: number;
}): CosmicProfile {
  return {
    name: opts.name.trim(),
    greetingName: opts.name.trim().split(/\s+/)[0],
    primaryGraha: opts.primaryGraha,
    cheenaId: opts.cheenaId,
    moonRashiIndex: opts.moonRashiIndex,
    lagnaRashiIndex: opts.lagnaRashiIndex,
    onboardedAt: new Date().toISOString(),
  };
}
