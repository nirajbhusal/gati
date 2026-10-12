"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ManifestItem, ManifestStatus } from "@/types/astro";

interface ManifestState {
  items: ManifestItem[];
  hydrated: boolean;
  addItem: (title: string, opts?: Partial<ManifestItem>) => ManifestItem;
  updateItem: (id: string, partial: Partial<ManifestItem>) => void;
  setStatus: (id: string, status: ManifestStatus) => void;
  removeItem: (id: string) => void;
  setHydrated: (v: boolean) => void;
}

export const useManifestStore = create<ManifestState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      addItem: (title, opts = {}) => {
        const item: ManifestItem = {
          id: `m_${Date.now().toString(36)}`,
          title: title.trim(),
          note: opts.note,
          status: opts.status ?? "planted",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          targetDateAd: opts.targetDateAd,
          preferredPaksha: opts.preferredPaksha ?? "any",
        };
        set({ items: [item, ...get().items] });
        return item;
      },
      updateItem: (id, partial) =>
        set({
          items: get().items.map((i) =>
            i.id === id
              ? { ...i, ...partial, updatedAt: new Date().toISOString() }
              : i
          ),
        }),
      setStatus: (id, status) => get().updateItem(id, { status }),
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "gati-manifest",
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
      partialize: (s) => ({ items: s.items }),
    }
  )
);
