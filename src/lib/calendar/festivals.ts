import type {
  DualDate,
  Festival,
  FestivalOccurrence,
  Panchang,
} from "@/types";
import {
  daysBetween,
  daysInBSMonth,
  fromBS,
  fromJsDate,
  getTodayDual,
} from "./bs-ad";
import { computePanchang } from "./panchang";

/**
 * Official & widely observed Nepal public holidays + major festivals.
 * Fixed BS national days + tithi-based cultural festivals.
 * Weekend weekly holidays (Sat–Sun) are handled in the calendar UI separately.
 */
export const FESTIVALS: Festival[] = [
  // ─── Fixed BS national / public ───
  {
    id: "new-year-bs",
    name: "Nepali New Year",
    nameNp: "नयाँ वर्ष",
    description: "Bikram Sambat New Year — Baisakh 1",
    type: "holiday",
    bsMonth: 0,
    bsDay: 1,
    isPublicHoliday: true,
    color: "#d4a017",
  },
  {
    id: "republic-day",
    name: "Republic Day",
    nameNp: "गणतन्त्र दिवस",
    description: "Jestha 15 — Federal Democratic Republic",
    type: "holiday",
    bsMonth: 1,
    bsDay: 15,
    isPublicHoliday: true,
    color: "#c45c26",
  },
  {
    id: "constitution-day",
    name: "Constitution Day",
    nameNp: "संविधान दिवस",
    description: "Asoj 3 — Constitution of Nepal",
    type: "holiday",
    bsMonth: 5,
    bsDay: 3,
    isPublicHoliday: true,
    color: "#4a6cf7",
  },
  {
    id: "democracy-day",
    name: "Democracy Day",
    nameNp: "प्रजातन्त्र / लोकतन्त्र दिवस",
    description: "Falgun 7",
    type: "holiday",
    bsMonth: 10,
    bsDay: 7,
    isPublicHoliday: true,
  },
  {
    id: "martyrs-day",
    name: "Martyrs' Day",
    nameNp: "शहीद दिवस",
    description: "Magh 16",
    type: "holiday",
    bsMonth: 9,
    bsDay: 16,
    isPublicHoliday: true,
  },
  {
    id: "prithvi-jayanti",
    name: "Prithvi Jayanti / National Unity Day",
    nameNp: "पृथ्वी जयन्ती / राष्ट्रिय एकता दिवस",
    description: "Poush 27",
    type: "holiday",
    bsMonth: 8,
    bsDay: 27,
    isPublicHoliday: true,
  },
  {
    id: "maghe-sankranti",
    name: "Maghe Sankranti",
    nameNp: "माघे संक्रान्ति",
    description: "First day of Magh — winter festival",
    type: "festival",
    bsMonth: 9,
    bsDay: 1,
    isPublicHoliday: true,
    color: "#e8a838",
  },
  {
    id: "tamu-lhosar",
    name: "Tamu Lhosar",
    nameNp: "तमु ल्होसार",
    description: "Poush 15 — Gurung New Year",
    type: "cultural",
    bsMonth: 8,
    bsDay: 15,
    isPublicHoliday: true,
    color: "#9b59b6",
  },
  {
    id: "ghyalpo-lhosar",
    name: "Gyalpo Lhosar",
    nameNp: "ग्याल्पो ल्होसार",
    description: "Falgun 1 — Sherpa New Year",
    type: "cultural",
    bsMonth: 10,
    bsDay: 1,
    isPublicHoliday: true,
    color: "#9b59b6",
  },

  // ─── Fixed AD public / international ───
  {
    id: "new-year-ad",
    name: "New Year's Day",
    nameNp: "अंग्रेजी नयाँ वर्ष",
    type: "holiday",
    adMonth: 0,
    adDay: 1,
    isPublicHoliday: true,
  },
  {
    id: "labour-day",
    name: "International Labour Day",
    nameNp: "अन्तर्राष्ट्रिय मजदुर दिवस",
    description: "1 May",
    type: "holiday",
    adMonth: 4,
    adDay: 1,
    isPublicHoliday: true,
  },
  {
    id: "womens-day",
    name: "International Women's Day",
    nameNp: "अन्तर्राष्ट्रिय नारी दिवस",
    description: "8 March",
    type: "observance",
    adMonth: 2,
    adDay: 8,
  },
  {
    id: "christmas",
    name: "Christmas Day",
    nameNp: "क्रिसमस डे",
    description: "25 December",
    type: "holiday",
    adMonth: 11,
    adDay: 25,
    isPublicHoliday: true,
    color: "#c44",
  },

  // ─── Tithi-based major festivals (public holiday where applicable) ───
  {
    id: "maha-shivaratri",
    name: "Maha Shivaratri",
    nameNp: "महाशिवरात्रि",
    description: "Falgun Krishna Chaturdashi",
    type: "festival",
    tithiMatch: { month: 10, paksha: "Krishna", tithiNumber: 14 },
    isPublicHoliday: true,
    color: "#7c6aef",
  },
  {
    id: "holi",
    name: "Holi / Fagu Purnima",
    nameNp: "होली / फागु पूर्णिमा",
    description: "Falgun Purnima — Festival of Colors",
    type: "festival",
    tithiMatch: { month: 10, paksha: "Shukla", tithiNumber: 15 },
    isPublicHoliday: true,
    color: "#e85d75",
  },
  {
    id: "chaite-dashain",
    name: "Chaite Dashain",
    nameNp: "चैते दशैं",
    description: "Chaitra Shukla Ashtami",
    type: "festival",
    tithiMatch: { month: 11, paksha: "Shukla", tithiNumber: 8 },
    color: "#c45c26",
  },
  {
    id: "rama-navami",
    name: "Ram Navami",
    nameNp: "राम नवमी",
    description: "Chaitra Shukla Navami",
    type: "festival",
    tithiMatch: { month: 11, paksha: "Shukla", tithiNumber: 9 },
    isPublicHoliday: true,
    color: "#c45c26",
  },
  {
    id: "buddha-jayanti",
    name: "Buddha Jayanti",
    nameNp: "बुद्ध जयन्ती",
    description: "Baisakh Purnima — Birth of Buddha",
    type: "festival",
    tithiMatch: { month: 0, paksha: "Shukla", tithiNumber: 15 },
    isPublicHoliday: true,
    color: "#d4a017",
  },
  {
    id: "ubhauli",
    name: "Ubhauli Parva",
    nameNp: "उभौली पर्व",
    description: "Baisakh Purnima — Kirat seasonal festival",
    type: "cultural",
    tithiMatch: { month: 0, paksha: "Shukla", tithiNumber: 15 },
    isPublicHoliday: true,
    color: "#5b8def",
  },
  {
    id: "janai-purnima",
    name: "Janai Purnima / Raksha Bandhan",
    nameNp: "जनै पूर्णिमा / रक्षा बन्धन",
    description: "Shrawan Purnima",
    type: "festival",
    tithiMatch: { month: 3, paksha: "Shukla", tithiNumber: 15 },
    isPublicHoliday: true,
    color: "#f0c14b",
  },
  {
    id: "gai-jatra",
    name: "Gai Jatra",
    nameNp: "गाई जात्रा",
    description: "Bhadra Krishna Pratipada",
    type: "cultural",
    tithiMatch: { month: 4, paksha: "Krishna", tithiNumber: 1 },
    color: "#5b8def",
  },
  {
    id: "krishna-janmashtami",
    name: "Krishna Janmashtami",
    nameNp: "कृष्ण जन्माष्टमी",
    description: "Bhadra Krishna Ashtami",
    type: "festival",
    tithiMatch: { month: 4, paksha: "Krishna", tithiNumber: 8 },
    isPublicHoliday: true,
    color: "#4a6cf7",
  },
  {
    id: "teej",
    name: "Haritalika Teej",
    nameNp: "हरितालिका तीज",
    description: "Bhadra Shukla Tritiya — women's festival",
    type: "festival",
    tithiMatch: { month: 4, paksha: "Shukla", tithiNumber: 3 },
    isPublicHoliday: true,
    color: "#e85d9a",
  },
  {
    id: "rishi-panchami",
    name: "Rishi Panchami",
    nameNp: "ऋषि पञ्चमी",
    description: "Bhadra Shukla Panchami",
    type: "observance",
    tithiMatch: { month: 4, paksha: "Shukla", tithiNumber: 5 },
  },
  {
    id: "indra-jatra",
    name: "Indra Jatra / Yenya",
    nameNp: "इन्द्र जात्रा",
    description: "Bhadra Shukla Dwadashi — Kathmandu valley",
    type: "cultural",
    tithiMatch: { month: 4, paksha: "Shukla", tithiNumber: 12 },
    color: "#9b59b6",
  },
  // Dashain
  {
    id: "ghatasthapana",
    name: "Ghatasthapana",
    nameNp: "घटस्थापना",
    description: "Ashwin Shukla Pratipada — Dashain begins",
    type: "festival",
    tithiMatch: { month: 5, paksha: "Shukla", tithiNumber: 1 },
    isPublicHoliday: true,
    color: "#c45c26",
  },
  {
    id: "phulpati",
    name: "Phulpati",
    nameNp: "फूलपाती",
    description: "Ashwin Shukla Saptami",
    type: "festival",
    tithiMatch: { month: 5, paksha: "Shukla", tithiNumber: 7 },
    isPublicHoliday: true,
    color: "#c45c26",
  },
  {
    id: "maha-ashtami",
    name: "Maha Ashtami",
    nameNp: "महाअष्टमी",
    description: "Ashwin Shukla Ashtami",
    type: "festival",
    tithiMatch: { month: 5, paksha: "Shukla", tithiNumber: 8 },
    isPublicHoliday: true,
    color: "#c45c26",
  },
  {
    id: "maha-navami",
    name: "Maha Navami",
    nameNp: "महानवमी",
    description: "Ashwin Shukla Navami",
    type: "festival",
    tithiMatch: { month: 5, paksha: "Shukla", tithiNumber: 9 },
    isPublicHoliday: true,
    color: "#c45c26",
  },
  {
    id: "vijaya-dashami",
    name: "Vijaya Dashami",
    nameNp: "विजया दशमी",
    description: "Ashwin Shukla Dashami — main Dashain day",
    type: "festival",
    tithiMatch: { month: 5, paksha: "Shukla", tithiNumber: 10 },
    isPublicHoliday: true,
    color: "#c45c26",
  },
  {
    id: "papakunsha-ekadashi",
    name: "Kojagrat Purnima / Dashain ends",
    nameNp: "कोजाग्रत पूर्णिमा",
    description: "Ashwin Purnima — end of Dashain fortnight",
    type: "festival",
    tithiMatch: { month: 5, paksha: "Shukla", tithiNumber: 15 },
    color: "#c45c26",
  },
  // Tihar
  {
    id: "kag-tihar",
    name: "Kag Tihar",
    nameNp: "काग तिहार",
    description: "Kartik Krishna Trayodashi — crow day",
    type: "festival",
    tithiMatch: { month: 6, paksha: "Krishna", tithiNumber: 13 },
    color: "#f0c14b",
  },
  {
    id: "kukur-tihar",
    name: "Kukur Tihar",
    nameNp: "कुकुर तिहार",
    description: "Kartik Krishna Chaturdashi — dog day",
    type: "festival",
    tithiMatch: { month: 6, paksha: "Krishna", tithiNumber: 14 },
    isPublicHoliday: true,
    color: "#f0c14b",
  },
  {
    id: "laxmi-puja",
    name: "Laxmi Puja / Gai Tihar",
    nameNp: "लक्ष्मी पूजा / गाइ तिहार",
    description: "Kartik Amavasya",
    type: "festival",
    tithiMatch: { month: 6, paksha: "Krishna", tithiNumber: 15 },
    isPublicHoliday: true,
    color: "#f0c14b",
  },
  {
    id: "govardhan-puja",
    name: "Govardhan Puja / Goru Tihar",
    nameNp: "गोवर्धन पूजा / गोरु तिहार",
    description: "Kartik Shukla Pratipada",
    type: "festival",
    tithiMatch: { month: 6, paksha: "Shukla", tithiNumber: 1 },
    isPublicHoliday: true,
    color: "#f0c14b",
  },
  {
    id: "bhai-tika",
    name: "Bhai Tika",
    nameNp: "भाइटीका",
    description: "Kartik Shukla Dwitiya",
    type: "festival",
    tithiMatch: { month: 6, paksha: "Shukla", tithiNumber: 2 },
    isPublicHoliday: true,
    color: "#f0c14b",
  },
  {
    id: "chhath",
    name: "Chhath",
    nameNp: "छठ पर्व",
    description: "Kartik Shukla Shashthi",
    type: "festival",
    tithiMatch: { month: 6, paksha: "Shukla", tithiNumber: 6 },
    isPublicHoliday: true,
    color: "#e85d4a",
  },
  {
    id: "udhauli",
    name: "Udhauli Parva",
    nameNp: "उधौली पर्व",
    description: "Mangsir Purnima — Kirat seasonal festival",
    type: "cultural",
    tithiMatch: { month: 7, paksha: "Shukla", tithiNumber: 15 },
    isPublicHoliday: true,
    color: "#5b8def",
  },
  {
    id: "yomari-punhi",
    name: "Yomari Punhi",
    nameNp: "यःमरी पुन्हि",
    description: "Mangsir Purnima — Newar festival",
    type: "cultural",
    tithiMatch: { month: 7, paksha: "Shukla", tithiNumber: 15 },
  },
  {
    id: "sonam-lhosar",
    name: "Sonam Lhosar",
    nameNp: "सोनाम ल्होसार",
    description: "Magh Amavasya — Tamang New Year",
    type: "cultural",
    tithiMatch: { month: 9, paksha: "Krishna", tithiNumber: 15 },
    isPublicHoliday: true,
    color: "#9b59b6",
  },
  {
    id: "saraswati-puja",
    name: "Saraswati Puja / Shree Panchami",
    nameNp: "सरस्वती पूजा / श्री पञ्चमी",
    description: "Magh Shukla Panchami",
    type: "festival",
    tithiMatch: { month: 9, paksha: "Shukla", tithiNumber: 5 },
    isPublicHoliday: true,
    color: "#f0c14b",
  },
  {
    id: "nari-diwas-teej-related",
    name: "Guru Purnima",
    nameNp: "गुरु पूर्णिमा",
    description: "Ashadh Purnima",
    type: "observance",
    tithiMatch: { month: 2, paksha: "Shukla", tithiNumber: 15 },
  },
  // Ekadashi observances
  {
    id: "ekadashi-shukla",
    name: "Ekadashi",
    nameNp: "एकादशी",
    description: "Shukla Paksha Ekadashi",
    type: "observance",
    tithiMatch: { paksha: "Shukla", tithiNumber: 11 },
  },
  {
    id: "ekadashi-krishna",
    name: "Ekadashi",
    nameNp: "एकादशी",
    description: "Krishna Paksha Ekadashi",
    type: "observance",
    tithiMatch: { paksha: "Krishna", tithiNumber: 11 },
  },
];

/** Nepal weekly public holidays: Saturday & Sunday */
export function isNepalWeekend(weekDay: number): boolean {
  return weekDay === 0 || weekDay === 6; // Sun, Sat
}

export function weekendHolidayLabel(weekDay: number): {
  name: string;
  nameNp: string;
} | null {
  if (weekDay === 6)
    return { name: "Saturday (Weekly holiday)", nameNp: "शनिबार (साप्ताहिक बिदा)" };
  if (weekDay === 0)
    return { name: "Sunday (Weekly holiday)", nameNp: "आइतबार (साप्ताहिक बिदा)" };
  return null;
}

function tithiMatches(f: Festival, p: Panchang, bsMonth: number): boolean {
  const m = f.tithiMatch;
  if (!m) return false;
  if (m.month !== undefined && m.month !== bsMonth) return false;
  if (m.tithiIndex !== undefined && m.tithiIndex === p.tithiIndex) return true;
  if (m.paksha && m.tithiNumber) {
    return p.paksha === m.paksha && p.tithiNumber === m.tithiNumber;
  }
  return false;
}

export function festivalsForDay(
  dual: DualDate,
  panchang?: Panchang
): Festival[] {
  const p = panchang ?? computePanchang(dual.jsDate);
  const result: Festival[] = [];

  for (const f of FESTIVALS) {
    if (
      f.bsMonth !== undefined &&
      f.bsDay !== undefined &&
      dual.bs.month === f.bsMonth &&
      dual.bs.day === f.bsDay
    ) {
      result.push(f);
      continue;
    }
    if (
      f.adMonth !== undefined &&
      f.adDay !== undefined &&
      dual.ad.month === f.adMonth &&
      dual.ad.day === f.adDay
    ) {
      result.push(f);
      continue;
    }
    if (f.tithiMatch && tithiMatches(f, p, dual.bs.month)) {
      result.push(f);
    }
  }

  const seen = new Set<string>();
  return result.filter((f) => {
    if (seen.has(f.id)) return false;
    seen.add(f.id);
    return true;
  });
}

export function getUpcomingFestivals(
  days = 60,
  opts: { includeObservances?: boolean } = {}
): FestivalOccurrence[] {
  const { includeObservances = false } = opts;
  const start = getTodayDual();
  const occurrences: FestivalOccurrence[] = [];
  const seen = new Set<string>();

  for (let i = 0; i <= days; i++) {
    const js = new Date(
      start.jsDate.getFullYear(),
      start.jsDate.getMonth(),
      start.jsDate.getDate() + i,
      12,
      0,
      0
    );
    const dual = fromJsDate(js);
    const p = computePanchang(dual.jsDate);
    const list = festivalsForDay(dual, p).filter((f) => {
      if (f.type === "observance" && !includeObservances) {
        return false;
      }
      return true;
    });

    for (const festival of list) {
      const key = `${festival.id}-${dual.bs.year}-${dual.bs.month}-${dual.bs.day}`;
      if (seen.has(key)) continue;
      seen.add(key);
      occurrences.push({
        festival,
        date: dual,
        daysUntil: daysBetween(start.jsDate, dual.jsDate),
      });
    }
  }

  return occurrences.sort((a, b) => a.daysUntil - b.daysUntil);
}

export function getFestivalsInBSMonth(
  year: number,
  month: number
): FestivalOccurrence[] {
  const dim = daysInBSMonth(year, month);
  const today = getTodayDual();
  const out: FestivalOccurrence[] = [];
  const seen = new Set<string>();

  for (let day = 1; day <= dim; day++) {
    const dual = fromBS(year, month, day);
    const p = computePanchang(dual.jsDate);
    for (const festival of festivalsForDay(dual, p)) {
      if (festival.type === "observance" && festival.id.startsWith("ekadashi"))
        continue;
      const key = festival.id + day;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        festival,
        date: dual,
        daysUntil: daysBetween(today.jsDate, dual.jsDate),
      });
    }
  }
  return out;
}
