import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { METHOD_NOTES } from "@/data/trust-cosmos";

export function MethodSection() {
  return (
    <Card glass>
      <CardHeader
        title={
          <>
            How Gati keeps time{" "}
            <span className="np text-sm font-normal text-[var(--fg-muted)]">
              समय कसरी राख्छ
            </span>
          </>
        }
        subtitle="Precision you can lean on — open Cheena or Patro to see it live."
      />
      <ul className="space-y-3">
        {METHOD_NOTES.map((note) => (
          <li
            key={note.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/35 px-3.5 py-3"
          >
            <p className="text-sm font-medium text-[var(--fg)]">
              {note.titleEn}{" "}
              <span className="np font-normal text-[var(--fg-muted)]">
                · {note.titleNp}
              </span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">
              {note.bodyEn}
            </p>
            <p className="np mt-1 text-xs leading-relaxed text-[var(--fg-subtle)]">
              {note.bodyNp}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/calendar/"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent-soft)] px-3.5 py-2 text-sm font-medium text-[var(--accent)] transition hover:brightness-110"
        >
          Open Patro
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        <Link
          href="/cheena/"
          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/50 px-3.5 py-2 text-sm font-medium text-[var(--fg-muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
        >
          Digital Cheena
        </Link>
        <Link
          href="/astro/"
          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/50 px-3.5 py-2 text-sm font-medium text-[var(--fg-muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
        >
          Astro
        </Link>
      </div>
    </Card>
  );
}
