import { computePanchang } from "@/lib/calendar/panchang";
import { RASHI_EN, RASHI_NP, GRAHA_META } from "./constants";
import type { CheenaChart, CosmicProfile, GrahaId } from "@/types/astro";

export interface DailyAdvice {
  dateLabel: string;
  focus: { en: string; np: string };
  caution: { en: string; np: string };
  favorable: { en: string; np: string };
  intention: { en: string; np: string };
  moonRashiEn: string;
  moonRashiNp: string;
  tithiLine: string;
  personalized: boolean;
  primaryGraha?: GrahaId;
}

const FOCUS_BY_TITHI: { en: string; np: string }[] = [
  { en: "Begin gently — set one clear intention.", np: "सजिलै सुरु गर्नुहोस् — एउटा स्पष्ट इच्छा राख्नुहोस्।" },
  { en: "Build on yesterday’s effort with steady steps.", np: "हिजोको प्रयासमा स्थिर कदम थप्नुहोस्।" },
  { en: "Connect — conversations open doors today.", np: "जोडिनुहोस् — कुराकानीले ढोका खोल्छ।" },
  { en: "Create or refine something with your hands or mind.", np: "हात वा मनले केही सिर्जना वा परिष्कृत गर्नुहोस्।" },
  { en: "Nurture health, home, or a close bond.", np: "स्वास्थ्य, घर वा नजिकको सम्बन्ध हेरचाह गर्नुहोस्।" },
  { en: "Organize — clear clutter, digital or physical.", np: "व्यवस्थित गर्नुहोस् — अव्यवस्था हटाउनुहोस्।" },
  { en: "Learn — a short study or skill practice helps.", np: "सिक्नुहोस् — छोटो अभ्यास उपयोगी हुन्छ।" },
  { en: "Courage — face one deferred decision.", np: "साहस — एउटा रोकिएको निर्णय सामना गर्नुहोस्।" },
  { en: "Devotion — quiet prayer or gratitude softens the day.", np: "भक्ति — शान्त प्रार्थना वा कृतज्ञता।" },
  { en: "Complete a cycle — finish, deliver, or close.", np: "चक्र पूरा गर्नुहोस् — सक्याउनुहोस् वा बन्द गर्नुहोस्।" },
  { en: "Pause and listen — intuition is louder now.", np: "रोकेर सुन्नुहोस् — अन्तस्करण स्पष्ट छ।" },
  { en: "Share resources or knowledge generously.", np: "ज्ञान वा स्रोत उदारतापूर्वक बाँड्नुहोस्।" },
  { en: "Align with duty — keep a promise you made.", np: "कर्तव्य मिलाउनुहोस् — दिएको वचन पालना गर्नुहोस्।" },
  { en: "Release — let go of one small resentment.", np: "छोड्नुहोस् — सानो गुनासो छोडिदिनुहोस्।" },
  { en: "Illuminate — rest, then renew your aim.", np: "प्रकाश — विश्राम पछि लक्ष्य नयाँ बनाउनुहोस्।" },
];

const CAUTION_BY_PAKSHA = {
  Shukla: {
    en: "Avoid rushing big commitments before midday clarity.",
    np: "मध्यान्ह अघि ठूला प्रतिबद्धता हतार नगर्नुहोस्।",
  },
  Krishna: {
    en: "Avoid harsh words when energy dips in the evening.",
    np: "साँझमा शक्ति कम हुँदा कठोर शब्द नबोलौं।",
  },
};

export function buildDailyAdvice(
  now: Date = new Date(),
  profile?: CosmicProfile | null,
  cheena?: CheenaChart | null
): DailyAdvice {
  const p = computePanchang(now, true);
  const tithiIdx = Math.min(p.tithiNumber - 1, 14);
  const focus = FOCUS_BY_TITHI[tithiIdx] ?? FOCUS_BY_TITHI[0];
  const caution = CAUTION_BY_PAKSHA[p.paksha];

  const moonLon = p.moonLongitude;
  // Approximate tropical→display: use nakshatra already; rashi from moon long / 30
  // panchang moon is tropical-ish; for display use floor
  const moonRashi = Math.floor(((moonLon % 360) + 360) % 360 / 30) % 12;
  const useRashi = cheena?.moonRashiIndex ?? profile?.moonRashiIndex ?? moonRashi;

  const personalized = Boolean(profile?.name || cheena);
  const graha = cheena?.primaryGraha ?? profile?.primaryGraha;

  let favorable = {
    en: "Favorable stretch: mid-morning after the day’s first meal.",
    np: "शुभ समय: बिहानको खानापछिको मध्य-बिहान।",
  };
  if (p.paksha === "Shukla" && p.tithiNumber <= 5) {
    favorable = {
      en: "Favorable: morning hours for new starts and planting intentions.",
      np: "शुभ: नयाँ सुरुवात र इच्छा रोपणका लागि बिहान।",
    };
  } else if (p.tithiNumber >= 11) {
    favorable = {
      en: "Favorable: late afternoon for reflection and gentle closure.",
      np: "शुभ: सोच र कोमल समाप्तिको लागि दिउँसोको अन्त्य।",
    };
  }

  const gName = graha ? GRAHA_META[graha].name : null;
  const intention = personalized && gName
    ? {
        en: `Move with ${gName}'s calm pace — one true action beats ten hurried ones.`,
        np: `${GRAHA_META[graha!].nameNp} को शान्त गतिमा हिँड्नुहोस् — एउटा साँचो काम काफी छ।`,
      }
    : {
        en: "Move with time — one true action beats ten hurried ones.",
        np: "समयसँग चल्नुहोस् — एउटा साँचो काम काफी छ।",
      };

  return {
    dateLabel: now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    focus,
    caution,
    favorable,
    intention,
    moonRashiEn: RASHI_EN[useRashi],
    moonRashiNp: RASHI_NP[useRashi],
    tithiLine: `${p.paksha} ${p.tithiName} · ${p.nakshatraName}`,
    personalized,
    primaryGraha: graha,
  };
}

/** Simple muhurat hint for manifest planting */
export function isGentlePlantingDay(now: Date = new Date()): boolean {
  const p = computePanchang(now, true);
  // Shukla 2–10 or avoid Amavasya/Chaturdashi extremes
  if (p.tithiIndex === 29 || p.tithiIndex === 13 || p.tithiIndex === 14) return false;
  if (p.paksha === "Shukla" && p.tithiNumber >= 2 && p.tithiNumber <= 10) return true;
  if (p.paksha === "Krishna" && p.tithiNumber >= 2 && p.tithiNumber <= 5) return true;
  return false;
}
