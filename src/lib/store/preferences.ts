"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppPreferences, TextSize, ThemeMode, WidgetConfig, WidgetId } from "@/types";
import { TEXT_SIZE_MAP } from "@/lib/calendar/constants";

export const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: "today-tithi", visible: true, order: 0 },
  { id: "daily-astro", visible: true, order: 1 },
  { id: "upcoming-festivals", visible: true, order: 2 },
  { id: "mini-calendar", visible: true, order: 3 },
  { id: "manifest-preview", visible: true, order: 4 },
  { id: "trust-tip", visible: true, order: 5 },
  { id: "quick-tools", visible: true, order: 6 },
];

export const WIDGET_META: Record<
  WidgetId,
  { title: string; titleNp: string; description: string }
> = {
  "today-tithi": {
    title: "Today's Tithi",
    titleNp: "आजको तिथि",
    description: "Rich panchang card for today",
  },
  "daily-astro": {
    title: "Daily Astro",
    titleNp: "दैनिक ज्योतिष",
    description: "Calm daily guidance",
  },
  "upcoming-festivals": {
    title: "Upcoming Festivals",
    titleNp: "आगामी चाडपर्व",
    description: "Next 30–60 days of festivals",
  },
  "mini-calendar": {
    title: "Mini Calendar",
    titleNp: "पात्रो",
    description: "Compact month view",
  },
  "manifest-preview": {
    title: "Manifest",
    titleNp: "इच्छा",
    description: "Intentions wishlist",
  },
  "trust-tip": {
    title: "Trust",
    titleNp: "विश्वास",
    description: "Cosmic confidence",
  },
  "quick-tools": {
    title: "Utilities",
    titleNp: "उपकरण",
    description: "Converter, countdown shortcuts",
  },
};

interface PreferencesState extends AppPreferences {
  hydrated: boolean;
  setTheme: (theme: ThemeMode) => void;
  setTextSize: (size: TextSize) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  setWidgetVisible: (id: WidgetId, visible: boolean) => void;
  reorderWidgets: (widgets: WidgetConfig[]) => void;
  moveWidget: (id: WidgetId, direction: "up" | "down") => void;
  resetWidgets: () => void;
  setHydrated: (v: boolean) => void;
}

const TEXT_ORDER: TextSize[] = ["sm", "md", "lg", "xl"];

function applyTextSize(size: TextSize) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--text-scale",
    TEXT_SIZE_MAP[size]
  );
  document.documentElement.dataset.textSize = size;
}

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && systemDark);
  root.classList.toggle("dark", dark);
  root.dataset.theme = dark ? "dark" : "light";
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set, get) => ({
      theme: "system",
      textSize: "md",
      widgets: DEFAULT_WIDGETS,
      hydrated: false,
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      setTextSize: (textSize) => {
        applyTextSize(textSize);
        set({ textSize });
      },
      increaseTextSize: () => {
        const cur = get().textSize;
        const idx = TEXT_ORDER.indexOf(cur);
        if (idx < TEXT_ORDER.length - 1) {
          get().setTextSize(TEXT_ORDER[idx + 1]);
        }
      },
      decreaseTextSize: () => {
        const cur = get().textSize;
        const idx = TEXT_ORDER.indexOf(cur);
        if (idx > 0) {
          get().setTextSize(TEXT_ORDER[idx - 1]);
        }
      },
      setWidgetVisible: (id, visible) => {
        set({
          widgets: get().widgets.map((w) =>
            w.id === id ? { ...w, visible } : w
          ),
        });
      },
      reorderWidgets: (widgets) => set({ widgets }),
      moveWidget: (id, direction) => {
        const widgets = [...get().widgets].sort((a, b) => a.order - b.order);
        const idx = widgets.findIndex((w) => w.id === id);
        if (idx < 0) return;
        const swap = direction === "up" ? idx - 1 : idx + 1;
        if (swap < 0 || swap >= widgets.length) return;
        const a = widgets[idx];
        const b = widgets[swap];
        const next = widgets.map((w) => {
          if (w.id === a.id) return { ...w, order: b.order };
          if (w.id === b.id) return { ...w, order: a.order };
          return w;
        });
        set({ widgets: next });
      },
      resetWidgets: () => set({ widgets: DEFAULT_WIDGETS }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "gati-preferences",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
          applyTextSize(state.textSize);
          // Merge new default widgets into persisted list
          const have = new Set(state.widgets.map((w) => w.id));
          const merged = [...state.widgets];
          for (const w of DEFAULT_WIDGETS) {
            if (!have.has(w.id)) merged.push(w);
          }
          state.reorderWidgets(
            merged.map((w, i) => ({
              ...w,
              order: DEFAULT_WIDGETS.find((d) => d.id === w.id)?.order ?? i,
            }))
          );
          state.setHydrated(true);
        }
      },
      partialize: (s) => ({
        theme: s.theme,
        textSize: s.textSize,
        widgets: s.widgets,
      }),
    }
  )
);

export function initPreferencesSideEffects() {
  const { theme, textSize } = usePreferences.getState();
  applyTheme(theme);
  applyTextSize(textSize);

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    if (usePreferences.getState().theme === "system") {
      applyTheme("system");
    }
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
