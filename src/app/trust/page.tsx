import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { TrustHero } from "@/components/trust/TrustHero";
import { DailyConfidence } from "@/components/trust/DailyConfidence";
import { PillarGrid } from "@/components/trust/PillarGrid";
import { MethodSection } from "@/components/trust/MethodSection";

export const metadata: Metadata = {
  title: "Trust",
  description:
    "Trust · विश्वास — confidence in time and the cosmos. Move with time. Understand the universe.",
};

export default function TrustPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-4">
      <TrustHero />
      <DailyConfidence />
      <PillarGrid />
      <MethodSection />
      <Card className="text-xs leading-relaxed text-[var(--fg-subtle)]">
        विश्वास here means confidence in cosmic rhythm and Gati’s timekeeping —
        cultural guidance for moving with the day.
      </Card>
    </div>
  );
}
