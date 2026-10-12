"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    // Skip in Capacitor / native wrappers (file or capacitor schemes)
    const proto = window.location.protocol;
    if (proto === "capacitor:" || proto === "ionic:" || proto === "file:") return;
    const w = window as Window & { Capacitor?: { isNativePlatform?: () => boolean } };
    if (w.Capacitor?.isNativePlatform?.()) return;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    navigator.serviceWorker.register(`${base}/sw.js`).catch(() => {
      /* ignore SW errors in dev-like hosts */
    });
  }, []);
  return null;
}
