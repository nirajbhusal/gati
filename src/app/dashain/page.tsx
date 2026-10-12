"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Older links land on Festivals, where the Dashain timeline now lives. */
export default function DashainRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/festivals/#bada-dashain");
  }, [router]);
  return (
    <p className="text-sm text-[var(--fg-muted)]">Opening Festivals…</p>
  );
}
