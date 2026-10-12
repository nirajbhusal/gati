export type ThemeMode = "dark" | "light" | "system";
export type TextSize = "sm" | "md" | "lg" | "xl";

export type WidgetId =
  | "today-tithi"
  | "daily-astro"
  | "upcoming-festivals"
  | "mini-calendar"
  | "manifest-preview"
  | "trust-tip"
  | "quick-tools";

export interface WidgetConfig {
  id: WidgetId;
  visible: boolean;
  order: number;
}

export interface AppPreferences {
  theme: ThemeMode;
  textSize: TextSize;
  widgets: WidgetConfig[];
}

export interface BSDate {
  year: number;
  month: number; // 0-11
  day: number;
}

export interface ADDate {
  year: number;
  month: number; // 0-11
  day: number;
}

export interface DualDate {
  bs: BSDate;
  ad: ADDate;
  weekDay: number; // 0=Sunday
  jsDate: Date;
}

export interface Panchang {
  tithiIndex: number; // 0-29
  tithiName: string;
  tithiNameNp: string;
  tithiNumber: number; // 1-15 within paksha
  paksha: "Shukla" | "Krishna";
  pakshaNp: string;
  nakshatraIndex: number; // 0-26
  nakshatraName: string;
  nakshatraNameNp: string;
  yogaIndex: number; // 0-26
  yogaName: string;
  yogaNameNp: string;
  karanaIndex: number;
  karanaName: string;
  karanaNameNp: string;
  /** Fraction through current tithi (0–1) */
  tithiProgress: number;
  /** Approximate end of current tithi */
  tithiEnd: Date;
  /** Remaining ms until tithi ends */
  tithiRemainingMs: number;
  moonPhase: number; // 0–1
  sunLongitude: number;
  moonLongitude: number;
}

export interface Festival {
  id: string;
  name: string;
  nameNp: string;
  description?: string;
  type: "festival" | "holiday" | "observance" | "cultural";
  /** BS fixed date (month 0-11) */
  bsMonth?: number;
  bsDay?: number;
  /** Match by BS month + tithi */
  tithiMatch?: {
    month?: number; // BS month 0-11, optional
    tithiIndex?: number; // 0-29 absolute, or use paksha+number
    paksha?: "Shukla" | "Krishna";
    tithiNumber?: number; // 1-15
  };
  /** Recurring AD fixed date */
  adMonth?: number;
  adDay?: number;
  isPublicHoliday?: boolean;
  color?: string;
}

export interface FestivalOccurrence {
  festival: Festival;
  date: DualDate;
  daysUntil: number;
}

export interface CalendarDay {
  dual: DualDate;
  panchang: Panchang;
  festivals: Festival[];
  isToday: boolean;
  isCurrentMonth: boolean;
  isWeekend: boolean;
}
