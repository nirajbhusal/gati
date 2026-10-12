import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DASHAIN_OVERVIEW } from "../src/data/dashain";
import { formatAD, formatBS } from "../src/lib/calendar";
import { getDashainTimeline } from "../src/lib/calendar/dashain";

const tl = getDashainTimeline(new Date());
const payload = {
  name: DASHAIN_OVERVIEW.titleEn,
  nameNp: DASHAIN_OVERVIEW.titleNp,
  tagline: DASHAIN_OVERVIEW.taglineEn,
  taglineNp: DASHAIN_OVERVIEW.taglineNp,
  story: DASHAIN_OVERVIEW.storyEn,
  storyNp: DASHAIN_OVERVIEW.storyNp,
  yearBs: tl.yearBs,
  inSeason: tl.inSeason,
  generatedAt: new Date().toISOString(),
  source: "Gati",
  license: "Cultural reference data for the Gati Patro. Confirm muhurat with the Nepal Panchang Committee.",
  start: {
    bs: formatBS(tl.start.bs),
    ad: formatAD(tl.start.ad),
    iso: tl.start.jsDate.toISOString().slice(0, 10),
  },
  end: {
    bs: formatBS(tl.end.bs),
    ad: formatAD(tl.end.ad),
    iso: tl.end.jsDate.toISOString().slice(0, 10),
  },
  days: tl.days.map((d) => ({
    day: d.content.day,
    id: d.content.id,
    name: d.content.nameEn,
    nameNp: d.content.nameNp,
    vibe: d.content.vibeEn,
    vibeNp: d.content.vibeNp,
    summary: d.content.summaryEn,
    summaryNp: d.content.summaryNp,
    significance: d.content.significanceEn,
    significanceNp: d.content.significanceNp,
    rituals: d.content.rituals,
    foods: d.content.foods,
    tips: d.content.tips,
    highlight: d.content.highlight ?? null,
    bs: formatBS(d.date.bs),
    bsNp: formatBS(d.date.bs, { lang: "np" }),
    ad: formatAD(d.date.ad),
    iso: d.date.jsDate.toISOString().slice(0, 10),
    isToday: d.isToday,
  })),
};

const out = resolve(process.cwd(), "public/api/dashain.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(payload, null, 2) + "\n");
console.log(`Wrote ${out} (${payload.days.length} days, VS ${payload.yearBs})`);
