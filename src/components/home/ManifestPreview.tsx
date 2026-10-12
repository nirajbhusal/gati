"use client";

import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { isGentlePlantingDay } from "@/lib/astro/advisor";
import { useManifestStore } from "@/lib/store/manifest";

export function ManifestPreview() {
  const items = useManifestStore((s) => s.items).filter(
    (i) => i.status === "planted" || i.status === "growing"
  );
  const gentle = isGentlePlantingDay();

  return (
    <Card glass>
      <CardHeader
        title={
          <>
            Manifest{" "}
            <span className="np text-sm font-normal text-[var(--fg-muted)]">
              इच्छा
            </span>
          </>
        }
        subtitle={gentle ? "Gentle day to plant" : "Your active intentions"}
        action={
          <Link
            href="/manifest/"
            className="text-sm text-[var(--accent-indigo)] hover:underline"
          >
            Open
          </Link>
        }
      />
      {items.length === 0 ? (
        <p className="text-sm text-[var(--fg-muted)]">
          No active wishes.{" "}
          <Link href="/manifest/" className="text-[var(--accent-indigo)] hover:underline">
            Plant one
          </Link>
        </p>
      ) : (
        <ul className="space-y-2">
          {items.slice(0, 3).map((i) => (
            <li
              key={i.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-muted)]/40 px-3 py-2 text-sm"
            >
              {i.title}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
