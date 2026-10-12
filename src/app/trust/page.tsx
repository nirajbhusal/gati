"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CLAIM_CHECKLIST, TRUSTED_SOURCES } from "@/data/trusted-sources";
import { cn } from "@/lib/utils/cn";

export default function TrustPage() {
  const [claim, setClaim] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean | null>>({});
  const [started, setStarted] = useState(false);

  const score = useMemo(() => {
    const values = Object.values(checks).filter((v) => v !== null && v !== undefined);
    if (values.length === 0) return null;
    const yes = values.filter((v) => v === true).length;
    return Math.round((yes / CLAIM_CHECKLIST.length) * 100);
  }, [checks]);

  const toggle = (id: string, val: boolean) => {
    setChecks((c) => ({ ...c, [id]: val }));
  };

  const start = () => {
    setStarted(true);
    setChecks(Object.fromEntries(CLAIM_CHECKLIST.map((c) => [c.id, null])));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Trust{" "}
          <span className="np text-xl font-normal text-[var(--fg-muted)]">
            विश्वास
          </span>
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Fact-check habits inspired by flood-time misinformation — verify before
          you share.
        </p>
      </header>

      <Card glass className="border-[var(--holiday)]/20 bg-[var(--holiday)]/5 text-sm text-[var(--fg-muted)]">
        <p className="font-medium text-[var(--fg)]">Before you share</p>
        <p className="mt-1">
          During disasters, fake rescue appeals and old photos spread fast. Pause.
          Check an official source. Then share.
        </p>
      </Card>

      <Card glass>
        <CardHeader
          title="Claim checker"
          subtitle="Paste a claim or link — answer the checklist"
        />
        <textarea
          className="min-h-[88px] w-full rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2 text-sm"
          placeholder="e.g. “Bridge collapsed in X district — donate to this QR”"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        />
        <Button variant="primary" className="mt-3" onClick={start} disabled={!claim.trim()}>
          Start checklist
        </Button>

        {started && (
          <div className="mt-5 space-y-3">
            {CLAIM_CHECKLIST.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]/40 px-3 py-3"
              >
                <p className="text-sm text-[var(--fg)]">{item.en}</p>
                <p className="np mt-0.5 text-sm text-[var(--fg-muted)]">{item.np}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggle(item.id, true)}
                    className={cn(
                      "rounded-lg px-3 py-1 text-xs font-medium",
                      checks[item.id] === true
                        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "bg-[var(--bg-elevated)] text-[var(--fg-muted)]"
                    )}
                  >
                    Yes / हो
                  </button>
                  <button
                    type="button"
                    onClick={() => toggle(item.id, false)}
                    className={cn(
                      "rounded-lg px-3 py-1 text-xs font-medium",
                      checks[item.id] === false
                        ? "bg-[var(--holiday)]/15 text-[var(--holiday)]"
                        : "bg-[var(--bg-elevated)] text-[var(--fg-muted)]"
                    )}
                  >
                    No / होइन
                  </button>
                </div>
              </div>
            ))}
            {score !== null && (
              <Card className="text-sm">
                <p className="font-medium text-[var(--fg)]">
                  Checklist score: {score}%
                </p>
                <p className="mt-1 text-[var(--fg-muted)]">
                  {score >= 70
                    ? "Stronger signals — still open the official page before sharing."
                    : "Weak signals — do not share until you verify with a trusted source below."}
                </p>
              </Card>
            )}
          </div>
        )}
      </Card>

      <Card glass>
        <CardHeader
          title="Trusted sources"
          subtitle="Official channels for Nepal — bookmark these"
        />
        <ul className="space-y-2">
          {TRUSTED_SOURCES.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-[var(--border)] px-3 py-3 transition hover:bg-[var(--bg-muted)]"
              >
                <p className="font-medium text-[var(--fg)]">{s.name}</p>
                <p className="np text-sm text-[var(--accent)]">{s.nameNp}</p>
                <p className="mt-1 text-xs text-[var(--fg-subtle)]">{s.note}</p>
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="text-xs text-[var(--fg-subtle)]">
        Gati Trust does not issue absolute verdicts. It teaches a verification
        process so rumors — like those during floods — spread less harm.
      </Card>
    </div>
  );
}
