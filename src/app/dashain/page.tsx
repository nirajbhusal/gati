import type { Metadata } from "next";
import { DashainTimeline } from "@/components/dashain/DashainTimeline";

export const metadata: Metadata = {
  title: "Dashain",
  description:
    "Bada Dashain · बडादशैँ — full 15-day timeline with rituals, foods, and vibes from Ghatasthapana to Kojagrat Purnima.",
};

export default function DashainPage() {
  return (
    <div className="mx-auto max-w-2xl page-enter pb-6">
      <DashainTimeline />
    </div>
  );
}
