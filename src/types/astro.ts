export type GrahaId =
  | "sun"
  | "moon"
  | "mars"
  | "mercury"
  | "jupiter"
  | "venus"
  | "saturn"
  | "rahu"
  | "ketu";

export type RashiId =
  | "mesha"
  | "vrishabha"
  | "mithuna"
  | "karka"
  | "simha"
  | "kanya"
  | "tula"
  | "vrischika"
  | "dhanu"
  | "makara"
  | "kumbha"
  | "meena";

export interface BirthPlace {
  id: string;
  name: string;
  nameNp: string;
  lat: number;
  lon: number;
}

export interface BirthInput {
  name: string;
  gender?: "male" | "female" | "other" | "unspecified";
  /** ISO local date YYYY-MM-DD (AD) */
  birthDateAd: string;
  /** HH:mm 24h, optional — defaults to 12:00 NPT */
  birthTime?: string;
  placeId: string;
  /** If true, birth time unknown — Lagna treated as approximate */
  timeUnknown?: boolean;
}

export interface PlanetPosition {
  id: GrahaId;
  name: string;
  nameNp: string;
  longitude: number; // sidereal 0–360
  rashiIndex: number; // 0–11
  rashi: RashiId;
  rashiName: string;
  rashiNameNp: string;
  degreeInSign: number;
  nakshatraIndex: number;
  nakshatraName: string;
  nakshatraNameNp: string;
  house: number; // 1–12 from Lagna
  isRetrograde?: boolean;
}

export interface CheenaChart {
  id: string;
  createdAt: string;
  input: BirthInput;
  place: BirthPlace;
  ayanamsa: number;
  lagnaLongitude: number;
  lagnaRashiIndex: number;
  lagnaRashi: RashiId;
  lagnaName: string;
  lagnaNameNp: string;
  moonRashiIndex: number;
  moonNakshatraIndex: number;
  primaryGraha: GrahaId;
  planets: PlanetPosition[];
  /** House 1..12 → rashi index */
  houseRashi: number[];
}

export interface CosmicProfile {
  name: string;
  /** Linked cheena id if created */
  cheenaId?: string;
  primaryGraha: GrahaId;
  moonRashiIndex?: number;
  lagnaRashiIndex?: number;
  onboardedAt: string;
  greetingName?: string;
}

export type ManifestStatus = "planted" | "growing" | "fulfilled" | "released";

export interface ManifestItem {
  id: string;
  title: string;
  note?: string;
  status: ManifestStatus;
  createdAt: string;
  targetDateAd?: string;
  preferredPaksha?: "Shukla" | "Krishna" | "any";
  updatedAt: string;
}
