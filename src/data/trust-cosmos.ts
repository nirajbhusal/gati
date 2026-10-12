/** Cosmic Trust · विश्वास — confidence in time and the universe. */

export interface TrustPillar {
  id: string;
  en: string;
  np: string;
  blurbEn: string;
  blurbNp: string;
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    id: "time",
    en: "Time",
    np: "समय",
    blurbEn: "BS and AD move together — one sky, two ways of naming the day.",
    blurbNp: "विक्रम संवत् र ईस्वी सँगसँगै चल्छन् — एउटै आकाश, दुई नाम।",
  },
  {
    id: "cosmos",
    en: "Cosmos",
    np: "ब्रह्माण्ड",
    blurbEn: "Tithi, nakshatra, and graha-gati are the quiet math behind the Patro.",
    blurbNp: "तिथि, नक्षत्र र ग्रह-गति पंचाङ्गको शान्त गणित हुन्।",
  },
  {
    id: "culture",
    en: "Culture",
    np: "संस्कृति",
    blurbEn: "Festivals and muhurat are living memory — kept precise, never loud.",
    blurbNp: "चाडपर्व र मुहूर्त जीवित स्मृति हुन् — सटीक, शान्त।",
  },
  {
    id: "motion",
    en: "Motion",
    np: "गति",
    blurbEn: "Trust the rhythm: waxing opens, waning settles, full moon illuminates.",
    blurbNp: "तालमा विश्वास: शुक्ल खोल्छ, कृष्ण शान्त पार्छ, पूर्णिमा उज्यालो।",
  },
];

export interface MethodNote {
  id: string;
  titleEn: string;
  titleNp: string;
  bodyEn: string;
  bodyNp: string;
}

export const METHOD_NOTES: MethodNote[] = [
  {
    id: "dual",
    titleEn: "Dual dating",
    titleNp: "दोहोरो मिति",
    bodyEn:
      "Every day carries Bikram Sambat and Gregorian labels so planning stays clear across both worlds.",
    bodyNp:
      "हरेक दिनमा विक्रम संवत् र ग्रेगोरियन दुवै — दुवै संसारमा योजना स्पष्ट रहोस्।",
  },
  {
    id: "lahiri",
    titleEn: "Lahiri ayanāṃśa",
    titleNp: "लाहिरि अयनांश",
    bodyEn:
      "Sidereal positions for Cheena use the Lahiri frame — the same reference many Nepali panchangs rely on.",
    bodyNp:
      "चीनका लागि नक्षत्रीय स्थिति लाहिरि ढाँचामा — धेरै नेपाली पंचाङ्गले प्रयोग गर्ने सन्दर्भ।",
  },
  {
    id: "panchang",
    titleEn: "Five limbs",
    titleNp: "पञ्चाङ्ग",
    bodyEn:
      "Tithi, vāra, nakshatra, yoga, and karana are computed from lunar–solar geometry, then shown in calm bilingual copy.",
    bodyNp:
      "तिथि, वार, नक्षत्र, योग, करण — चन्द्र-सूर्य ज्यामितिबाट गणना, द्विभाषी शान्त प्रस्तुति।",
  },
  {
    id: "intent",
    titleEn: "Calm guidance",
    titleNp: "शान्त मार्गदर्शन",
    bodyEn:
      "Astro and Manifest invite timing awareness alongside a jyotishi, doctor, and your own judgment.",
    bodyNp:
      "ज्योतिष र इच्छा समयको चेतना दिन्छन् — ज्योतिषी, चिकित्सक र आफ्नो विवेकसँगै।",
  },
];

export interface DailyTrustLine {
  en: string;
  np: string;
}

/** Soft confidence lines keyed by paksha + rough tithi band. */
export function dailyTrustLine(
  paksha: "Shukla" | "Krishna",
  tithiNumber: number
): DailyTrustLine {
  if (paksha === "Shukla" && tithiNumber <= 5) {
    return {
      en: "Waxing light — trust a small beginning. One clear step is enough.",
      np: "बढ्दो ज्योति — सानो सुरुवातमा विश्वास। एउटा स्पष्ट कदम काफी छ।",
    };
  }
  if (paksha === "Shukla" && tithiNumber >= 11) {
    return {
      en: "Near fullness — trust completion. Finish what you already started.",
      np: "पूर्णता नजिक — समाप्तिमा विश्वास। सुरु गरिसकेको काम सक्याउनुहोस्।",
    };
  }
  if (paksha === "Krishna" && tithiNumber <= 5) {
    return {
      en: "Waning quiet — trust rest and release. Soften before you push.",
      np: "घट्दो शान्ति — विश्राम र छोडाइमा विश्वास। धकेल्नु अघि कोमल हुनुहोस्।",
    };
  }
  if (paksha === "Krishna" && tithiNumber >= 11) {
    return {
      en: "Deep night of the fortnight — trust listening. Insight arrives in stillness.",
      np: "पक्षको गहिरो रात — सुनाइमा विश्वास। शान्तिमा अन्तर्दृष्टि आउँछ।",
    };
  }
  return {
    en: "Steady mid-fortnight — trust the middle path. Neither rush nor freeze.",
    np: "मध्य पक्ष — मध्यम मार्गमा विश्वास। न हतार, न ठहर।",
  };
}

export const HOME_TRUST_TIPS: DailyTrustLine[] = [
  {
    en: "Graha-gati is the motion behind every tithi. Move with it — do not chase it.",
    np: "ग्रह-गति हरेक तिथिको पछाडिको चाल हो। पछ्याउनुहोस् होइन — सँगै हिँड्नुहोस्।",
  },
  {
    en: "Understand the universe by naming today’s sky: tithi, paksha, nakshatra.",
    np: "आजको आकाश नाम गरेर ब्रह्माण्ड बुझ्नुहोस्: तिथि, पक्ष, नक्षत्र।",
  },
  {
    en: "Trust the instrument: dual dates keep BS culture and AD planning in one glance.",
    np: "उपकरणमा विश्वास: दोहोरो मितिले संस्कृति र योजना एकै नजरमा राख्छ।",
  },
];
