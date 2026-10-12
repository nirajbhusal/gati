"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CheenaChart } from "@/types/astro";

interface CheenaState {
  charts: CheenaChart[];
  hydrated: boolean;
  addChart: (c: CheenaChart) => void;
  removeChart: (id: string) => void;
  getChart: (id: string) => CheenaChart | undefined;
  setHydrated: (v: boolean) => void;
}

export const useCheenaStore = create<CheenaState>()(
  persist(
    (set, get) => ({
      charts: [],
      hydrated: false,
      addChart: (c) => set({ charts: [c, ...get().charts].slice(0, 20) }),
      removeChart: (id) =>
        set({ charts: get().charts.filter((x) => x.id !== id) }),
      getChart: (id) => get().charts.find((x) => x.id === id),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "gati-cheena",
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
      partialize: (s) => ({ charts: s.charts }),
    }
  )
);
