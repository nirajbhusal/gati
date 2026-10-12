export interface TrustedSource {
  id: string;
  name: string;
  nameNp: string;
  category: "disaster" | "weather" | "security" | "health" | "news" | "gov";
  url: string;
  note: string;
}

export const TRUSTED_SOURCES: TrustedSource[] = [
  {
    id: "ndrrma",
    name: "NDRRMA",
    nameNp: "राष्ट्रिय विपद् जोखिम न्यूनीकरण तथा व्यवस्थापन प्राधिकरण",
    category: "disaster",
    url: "https://www.bipad.gov.np",
    note: "Official disaster risk reduction & response updates for Nepal.",
  },
  {
    id: "dhm",
    name: "Department of Hydrology & Meteorology",
    nameNp: "जल तथा मौसम विज्ञान विभाग",
    category: "weather",
    url: "https://www.dhm.gov.np",
    note: "Flood, rainfall, and weather bulletins — verify monsoon claims here.",
  },
  {
    id: "nepal-police",
    name: "Nepal Police",
    nameNp: "नेपाल प्रहरी",
    category: "security",
    url: "https://www.nepalpolice.gov.np",
    note: "Official security notices; beware of fake rescue appeals.",
  },
  {
    id: "moha",
    name: "Ministry of Home Affairs",
    nameNp: "गृह मन्त्रालय",
    category: "gov",
    url: "https://www.moha.gov.np",
    note: "Government circulars and emergency coordination.",
  },
  {
    id: "mohp",
    name: "Ministry of Health & Population",
    nameNp: "स्वास्थ्य तथा जनसंख्या मन्त्रालय",
    category: "health",
    url: "https://mohp.gov.np",
    note: "Health advisories — check before sharing medical rumors.",
  },
  {
    id: "rss",
    name: "Rastriya Samachar Samiti (RSS)",
    nameNp: "राष्ट्रिय समाचार समिति",
    category: "news",
    url: "https://rssenglish.com",
    note: "National news agency — cross-check breaking headlines.",
  },
];

export const CLAIM_CHECKLIST = [
  {
    id: "source",
    en: "Is the original source named (agency, outlet, official page)?",
    np: "मूल स्रोत उल्लेख छ (निकाय, मिडिया, आधिकारिक पृष्ठ)?",
  },
  {
    id: "date",
    en: "Does the claim include a clear date and location in Nepal?",
    np: "मिति र नेपालभित्रको स्थान स्पष्ट छ?",
  },
  {
    id: "official",
    en: "Can you find the same fact on DHM, NDRRMA, Police, or a ministry site?",
    np: "DHM, NDRRMA, प्रहरी वा मन्त्रालय साइटमा उही तथ्य भेटिन्छ?",
  },
  {
    id: "image",
    en: "Could the photo/video be old or from another country (reverse search)?",
    np: "तस्बिर/भिडियो पुरानो वा अर्को देशको हुन सक्छ (रिभर्स सर्च)?",
  },
  {
    id: "emotion",
    en: "Is the post designed to make you panic or donate instantly?",
    np: "पोस्टले तुरुन्त डराउने वा दान गर्ने दबाब दिन्छ?",
  },
  {
    id: "share",
    en: "Would you still share if a family member’s safety depended on accuracy?",
    np: "परिवारको सुरक्षा यथार्थमा भर पर्ने भए पनि सेयर गर्थ्यौं?",
  },
] as const;
