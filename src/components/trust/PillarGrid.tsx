import { Card, CardHeader } from "@/components/ui/Card";
import { TRUST_PILLARS } from "@/data/trust-cosmos";

const ACCENT = [
  "text-[var(--accent)]",
  "text-[var(--accent-indigo)]",
  "text-[var(--accent)]",
  "text-[var(--accent-indigo)]",
] as const;

export function PillarGrid() {
  return (
    <section>
      <CardHeader
        title={
          <>
            Four pillars{" "}
            <span className="np text-sm font-normal text-[var(--fg-muted)]">
              चार स्तम्भ
            </span>
          </>
        }
        subtitle="The same foundations as Gati’s brand — now as a daily posture."
        className="mb-3 px-0.5"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {TRUST_PILLARS.map((pillar, i) => (
          <Card key={pillar.id} glass padding="sm" className="h-full">
            <p className={`text-sm font-semibold tracking-tight ${ACCENT[i]}`}>
              {pillar.en}{" "}
              <span className="np font-medium text-[var(--fg-muted)]">
                {pillar.np}
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
              {pillar.blurbEn}
            </p>
            <p className="np mt-1 text-xs leading-relaxed text-[var(--fg-subtle)]">
              {pillar.blurbNp}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
