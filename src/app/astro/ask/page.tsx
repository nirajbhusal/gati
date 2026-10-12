import type { Metadata } from "next";
import { AskAstro } from "@/components/astro/AskAstro";

export const metadata: Metadata = {
  title: "Ask Astro",
  description:
    "Ask Astro · आकाशलाई सोध्नुहोस् — calm bilingual readings from today’s sky.",
};

export default function AskAstroPage() {
  return (
    <div className="page-enter pb-6">
      <AskAstro />
    </div>
  );
}
