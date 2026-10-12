"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { GatiMascot } from "@/components/brand/GatiMascot";
import { AskAstro } from "@/components/astro/AskAstro";
import { useAskGati } from "@/components/layout/AskGatiContext";
import { useProfile } from "@/lib/store/profile";
import { cn } from "@/lib/utils/cn";

type Gate = "choose" | "ask";

export function AskGatiSheet() {
  const { open, setOpen } = useAskGati();
  const profile = useProfile((s) => s.profile);
  const [gate, setGate] = useState<Gate>("choose");

  useEffect(() => {
    if (!open) return;
    setGate(profile ? "ask" : "choose");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, profile, setOpen]);

  if (!open) return null;

  return (
    <div className="ask-gati-layer" role="presentation">
      <button
        type="button"
        className="ask-gati-backdrop"
        aria-label="Close Ask Gati"
        onClick={() => setOpen(false)}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-gati-title"
        className="ask-gati-sheet"
      >
        <header className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <GatiMascot size={44} mood={gate === "ask" ? "listen" : "joy"} />
          <div className="min-w-0 flex-1">
            <p
              id="ask-gati-title"
              className="text-sm font-semibold tracking-tight"
            >
              Ask Gati{" "}
              <span className="np font-medium text-[var(--accent)]">गति</span>
            </p>
            <p className="text-xs text-[var(--fg-muted)]">
              {profile
                ? `With ${profile.greetingName ?? profile.name}`
                : "Your cosmic companion"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-xl text-[var(--fg-muted)] hover:bg-[var(--bg-muted)]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="ask-gati-body">
          {gate === "choose" && !profile ? (
            <div className="space-y-4 px-4 py-5">
              <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                A profile lets Gati speak with your Moon and Cheena. You can
                also ask the sky without one.
              </p>
              <Link
                href="/cheena/new/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-4 py-3.5"
              >
                <span>
                  <span className="block text-sm font-semibold text-[var(--fg)]">
                    Set profile first
                  </span>
                  <span className="np block text-xs text-[var(--fg-muted)]">
                    पहिले प्रोफाइल · Digital Cheena
                  </span>
                </span>
                <span className="text-xs font-medium text-[var(--accent)]">
                  Create →
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setGate("ask")}
                className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-muted)]/50 px-4 py-3.5 text-left"
              >
                <span>
                  <span className="block text-sm font-semibold text-[var(--fg)]">
                    Ask without a profile
                  </span>
                  <span className="np block text-xs text-[var(--fg-muted)]">
                    प्रोफाइल बिना सोध्नुहोस्
                  </span>
                </span>
                <span className="text-xs font-medium text-[var(--accent-indigo)]">
                  Continue →
                </span>
              </button>
            </div>
          ) : (
            <div className="px-3 py-3 sm:px-4">
              {!profile && (
                <button
                  type="button"
                  onClick={() => setGate("choose")}
                  className="mb-3 text-xs font-medium text-[var(--accent-indigo)] hover:underline"
                >
                  ← Back to profile choice
                </button>
              )}
              <AskAstro compact />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function AskGatiFab({ className }: { className?: string }) {
  const { open, toggle } = useAskGati();
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn("ask-gati-fab", open && "ask-gati-fab-open", className)}
      aria-expanded={open}
      aria-label={open ? "Close Ask Gati" : "Ask Gati"}
    >
      <GatiMascot size={52} mood={open ? "listen" : "idle"} />
      <span className="ask-gati-fab-label">Ask Gati</span>
    </button>
  );
}
