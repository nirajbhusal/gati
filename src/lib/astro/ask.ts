import { computePanchang } from "@/lib/calendar/panchang";
import { GRAHA_META, RASHI_EN, RASHI_NP } from "./constants";
import type { CheenaChart, CosmicProfile, GrahaId } from "@/types/astro";

export type AskCategory =
  | "career"
  | "love"
  | "travel"
  | "health"
  | "timing"
  | "decision"
  | "general";

export interface AskCategoryMeta {
  id: AskCategory;
  en: string;
  np: string;
  promptEn: string;
  promptNp: string;
}

export const ASK_CATEGORIES: AskCategoryMeta[] = [
  {
    id: "career",
    en: "Career",
    np: "कर्म",
    promptEn: "Is today kind for work and ambition?",
    promptNp: "आज काम र महत्वाकांक्षाका लागि कस्तो छ?",
  },
  {
    id: "love",
    en: "Love",
    np: "प्रेम",
    promptEn: "How should I show care today?",
    promptNp: "आज कसरी माया देखाऔं?",
  },
  {
    id: "travel",
    en: "Travel",
    np: "यात्रा",
    promptEn: "Is movement favored right now?",
    promptNp: "अहिले हिँडडुल शुभ छ?",
  },
  {
    id: "health",
    en: "Health",
    np: "स्वास्थ्य",
    promptEn: "What does the sky ask of my body?",
    promptNp: "आकाशले शरीरलाई के भन्छ?",
  },
  {
    id: "timing",
    en: "Timing",
    np: "समय",
    promptEn: "When should I act — morning or evening?",
    promptNp: "कहिले गर्ने — बिहान वा साँझ?",
  },
  {
    id: "decision",
    en: "Decision",
    np: "निर्णय",
    promptEn: "Help me choose with calm clarity.",
    promptNp: "शान्त स्पष्टतासँग छान्न सहयोग गर्नुहोस्।",
  },
];

export interface AskReading {
  id: string;
  askedAt: string;
  question: string;
  category: AskCategory;
  headline: { en: string; np: string };
  guidance: { en: string; np: string };
  timing: { en: string; np: string };
  sky: { en: string; np: string };
  seal: { en: string; np: string };
  graha?: GrahaId;
  tithiLine: string;
}

type Line = { en: string; np: string };

const HEADLINES: Record<AskCategory, Line[]> = {
  career: [
    { en: "Steady orbit — build, do not scatter.", np: "स्थिर कक्षा — बनाउनुहोस्, छर्नुहोस् होइन।" },
    { en: "One true task outshines ten hurried ones.", np: "एउटा साँचो काम दश हतारभन्दा उज्यालो।" },
    { en: "Ambition breathes better with patience.", np: "धैर्यसँग महत्वाकांक्षा राम्ररी सास फेर्छ।" },
  ],
  love: [
    { en: "Warmth over performance.", np: "प्रदर्शनभन्दा न्यानोपन।" },
    { en: "Listen twice — speak once, softly.", np: "दुईपटक सुन्नुहोस् — एकपटक कोमल बोल्नुहोस्।" },
    { en: "Presence is the rarest gift today.", np: "आज उपस्थितिको उपहार दुर्लभ छ।" },
  ],
  travel: [
    { en: "Short arcs favored over long leaps.", np: "लामो फड्कोभन्दा छोटो चाप शुभ।" },
    { en: "Move when the path feels quiet.", np: "बाटो शान्त लाग्दा हिँड्नुहोस्।" },
    { en: "Prepare the vessel — then sail.", np: "पात्र तयार पार्नुहोस् — अनि हिँड्नुहोस्।" },
  ],
  health: [
    { en: "Nourish the vessel that carries you.", np: "तपाईंलाई बोक्ने पात्रलाई पोषण दिनुहोस्।" },
    { en: "Rest is also motion toward balance.", np: "विश्राम पनि सन्तुलनतिरको गति हो।" },
    { en: "Water, light, and a slower breath.", np: "पानी, उज्यालो र ढिलो सास।" },
  ],
  timing: [
    { en: "Mid-morning holds the clearest signal.", np: "मध्य-बिहान सबैभन्दा स्पष्ट संकेत बोक्छ।" },
    { en: "Let the first meal settle — then act.", np: "पहिलो खाना बसेपछि काम गर्नुहोस्।" },
    { en: "Evening suits closure, not launches.", np: "साँझ समाप्तिको लागि — सुरुवातको होइन।" },
  ],
  decision: [
    { en: "Choose the option that leaves your breath easy.", np: "सास सहज राख्ने विकल्प छान्नुहोस्।" },
    { en: "If both paths shout, wait one tithi.", np: "दुवै बाटो चिच्याए एउटा तिथि पर्खनुहोस्।" },
    { en: "Clarity arrives after a quiet walk.", np: "शान्त हिँडाइपछि स्पष्टता आउँछ।" },
  ],
  general: [
    { en: "Move with time — the sky is already speaking.", np: "समयसँग हिँड्नुहोस् — आकाश बोलिरहेको छ।" },
    { en: "Understand the universe one breath at a time.", np: "एक सासमा ब्रह्माण्ड बुझ्नुहोस्।" },
    { en: "Trust the rhythm you already feel.", np: "तपाईंले महसुस गरेको तालमा विश्वास।" },
  ],
};

const GUIDANCE: Record<AskCategory, Line[]> = {
  career: [
    {
      en: "Protect deep-work blocks. Decline noise that pretends to be urgency.",
      np: "गहिरो कामको समय जोगाउनुहोस्। हतार जस्तो देखिने हल्ला अस्वीकार गर्नुहोस्।",
    },
    {
      en: "Finish a visible piece before starting a new constellation of tasks.",
      np: "नयाँ कामको समूह सुरु गर्नु अघि एउटा देखिने टुक्रा सक्याउनुहोस्।",
    },
  ],
  love: [
    {
      en: "Offer a specific kindness — a message, a meal, an unhurried listen.",
      np: "विशेष दया दिनुहोस् — सन्देश, भोजन, वा नहटाइएको सुनाइ।",
    },
    {
      en: "Repair with honesty rather than perfect words.",
      np: "उत्तम शब्दभन्दा इमानदार मेलमिलाप।",
    },
  ],
  travel: [
    {
      en: "Check the practical sky: rest, papers, and one buffer hour.",
      np: "व्यावहारिक आकाश हेर्नुहोस्: विश्राम, कागजात, र एक बफर घण्टा।",
    },
    {
      en: "If the journey is optional, prefer daylight departures.",
      np: "यात्रा ऐच्छिक भए दिउँसोको प्रस्थान राम्रो।",
    },
  ],
  health: [
    {
      en: "Trade one stimulant for water and ten quiet minutes outside.",
      np: "एउटा उत्तेजक बदला पानी र बाहिरका दश शान्त मिनेट।",
    },
    {
      en: "Sleep is the night’s muhurat — guard its beginning.",
      np: "निद्रा रातको मुहूर्त हो — सुरुवात जोगाउनुहोस्।",
    },
  ],
  timing: [
    {
      en: "Launch after the day’s first clear hour; close loops after sunset softens.",
      np: "दिनको पहिलो स्पष्ट घण्टापछि सुरु; सूर्यास्तपछि लुप बन्द।",
    },
    {
      en: "Shukla favors beginnings; Krishna favors editing and release.",
      np: "शुक्लले सुरुवात साथ दिन्छ; कृष्णले सम्पादन र छोडाइ।",
    },
  ],
  decision: [
    {
      en: "Write both futures in one sentence each. Keep the one you can live with tomorrow.",
      np: "दुवै भविष्य एक-एक वाक्यमा लेख्नुहोस्। भोलि बाँच्न सकिने राख्नुहोस्।",
    },
    {
      en: "Ask: which choice aligns with your Cheena’s calm graha — not your fear.",
      np: "सोध्नुहोस्: कुन छनोट चीनको शान्त ग्रहसँग मिल्छ — भयसँग होइन।",
    },
  ],
  general: [
    {
      en: "Name today’s tithi aloud. Let that naming slow your next action.",
      np: "आजको तिथि ठूलो स्वरमा भन्नुहोस्। त्यसले अर्को कदम ढिलो पारोस्।",
    },
    {
      en: "One intentional act beats a scattered wish list.",
      np: "एउटा इरादामय कर्म छरिएको इच्छा सूचीभन्दा बलियो।",
    },
  ],
};

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number, salt: number): T {
  return arr[(seed + salt) % arr.length]!;
}

const KEYWORDS: { cat: AskCategory; words: string[] }[] = [
  { cat: "career", words: ["job", "work", "career", "office", "business", "काम", "नौकरी", "व्यापार"] },
  { cat: "love", words: ["love", "partner", "marriage", "relationship", "प्रेम", "माया", "विवाह", "सम्बन्ध"] },
  { cat: "travel", words: ["travel", "trip", "flight", "journey", "यात्रा", "घुम", "उडान"] },
  { cat: "health", words: ["health", "sleep", "energy", "illness", "स्वास्थ्य", "निद्रा", "शक्ति"] },
  { cat: "timing", words: ["when", "timing", "muhurat", "today", "कहिले", "समय", "मुहूर्त", "आज"] },
  { cat: "decision", words: ["decide", "choice", "should i", "or", "निर्णय", "छान", "कि"] },
];

export function detectCategory(question: string, fallback: AskCategory = "general"): AskCategory {
  const q = question.toLowerCase();
  for (const row of KEYWORDS) {
    if (row.words.some((w) => q.includes(w))) return row.cat;
  }
  return fallback;
}

function timingForPaksha(paksha: "Shukla" | "Krishna", tithiNumber: number): Line {
  if (paksha === "Shukla" && tithiNumber <= 5) {
    return {
      en: "Favor new starts mid-morning, after a grounded breakfast.",
      np: "बिहानको खानापछिको मध्य-बिहान नयाँ सुरुवातका लागि शुभ।",
    };
  }
  if (paksha === "Shukla") {
    return {
      en: "Build and refine through late morning into early afternoon.",
      np: "ढिलो बिहानदेखि दिउँसोसम्म बनाउनुहोस् र परिष्कृत गर्नुहोस्।",
    };
  }
  if (tithiNumber >= 11) {
    return {
      en: "Prefer evening reflection and gentle closure over big launches.",
      np: "ठूला सुरुवातभन्दा साँझको सोच र कोमल समाप्ति राम्रो।",
    };
  }
  return {
    en: "Act lightly before dusk; save heavy talks for a rested hour.",
    np: "साँझ अघि हल्का काम; गह्रो कुराकानी विश्रामपछि।",
  };
}

export function craftAskReading(opts: {
  question: string;
  category?: AskCategory;
  profile?: CosmicProfile | null;
  cheena?: CheenaChart | null;
  now?: Date;
}): AskReading {
  const now = opts.now ?? new Date();
  const p = computePanchang(now, true);
  const category = opts.category ?? detectCategory(opts.question);
  const seed = hashSeed(
    `${opts.question}|${category}|${p.tithiIndex}|${p.nakshatraIndex}|${now.toDateString()}`
  );

  const graha =
    opts.cheena?.primaryGraha ??
    opts.profile?.primaryGraha ??
    undefined;

  const moonRashi = Math.floor((((p.moonLongitude % 360) + 360) % 360) / 30) % 12;
  const useRashi = opts.cheena?.moonRashiIndex ?? opts.profile?.moonRashiIndex ?? moonRashi;

  const headline = pick(HEADLINES[category], seed, 1);
  const guidance = pick(GUIDANCE[category], seed, 3);
  const timing = timingForPaksha(p.paksha, p.tithiNumber);

  const sky: Line = {
    en: `Sky note: ${p.paksha} ${p.tithiName}, ${p.nakshatraName} · Moon in ${RASHI_EN[useRashi]}${
      graha ? ` · guided by ${GRAHA_META[graha].name}` : ""
    }.`,
    np: `आकाश: ${p.pakshaNp} ${p.tithiNameNp}, ${p.nakshatraNameNp} · चन्द्र ${RASHI_NP[useRashi]}${
      graha ? ` · ${GRAHA_META[graha].nameNp} को साथ` : ""
    }.`,
  };

  const name = opts.profile?.greetingName ?? opts.profile?.name;
  const seal: Line = name
    ? {
        en: `${name}, move with time — one true action is enough.`,
        np: `${name}, समयसँग हिँड्नुहोस् — एउटा साँचो कर्म काफी छ।`,
      }
    : {
        en: "Move with time. Understand the universe.",
        np: "समयसँग हिँड्नुहोस्। ब्रह्माण्ड बुझ्नुहोस्।",
      };

  return {
    id: `ask-${seed.toString(16)}-${now.getTime().toString(36)}`,
    askedAt: now.toISOString(),
    question: opts.question.trim(),
    category,
    headline,
    guidance,
    timing,
    sky,
    seal,
    graha,
    tithiLine: `${p.paksha} ${p.tithiName} · ${p.nakshatraName}`,
  };
}
