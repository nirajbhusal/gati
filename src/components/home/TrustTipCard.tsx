"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function TrustTipCard() {
  return (
    <Card glass padding="sm">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--holiday)]/10 text-[var(--holiday)]">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
            Before you share · सेयर गर्नु अघि
          </p>
          <p className="mt-1 text-sm text-[var(--fg)]">
            Flood and disaster rumors spread faster than water. Check DHM or
            NDRRMA before forwarding.
          </p>
          <Link
            href="/trust/"
            className="mt-2 inline-block text-sm font-medium text-[var(--accent-indigo)] hover:underline underline-offset-4"
          >
            Open Trust checklist →
          </Link>
        </div>
      </div>
    </Card>
  );
}
