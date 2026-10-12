"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AskReading } from "@/lib/astro/ask";

interface AskState {
  history: AskReading[];
  addReading: (reading: AskReading) => void;
  clearHistory: () => void;
}

export const useAskStore = create<AskState>()(
  persist(
    (set) => ({
      history: [],
      addReading: (reading) =>
        set((s) => ({
          history: [reading, ...s.history].slice(0, 12),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: "gati-ask-astro" }
  )
);
