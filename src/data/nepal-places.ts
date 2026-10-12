import type { BirthPlace } from "@/types/astro";

/** Major Nepal districts / cities with approx coordinates for Lagna. */
export const NEPAL_PLACES: BirthPlace[] = [
  { id: "kathmandu", name: "Kathmandu", nameNp: "काठमाडौं", lat: 27.7172, lon: 85.324 },
  { id: "lalitpur", name: "Lalitpur", nameNp: "ललितपुर", lat: 27.6588, lon: 85.3247 },
  { id: "bhaktapur", name: "Bhaktapur", nameNp: "भक्तपुर", lat: 27.671, lon: 85.4298 },
  { id: "pokhara", name: "Pokhara", nameNp: "पोखरा", lat: 28.2096, lon: 83.9856 },
  { id: "biratnagar", name: "Biratnagar", nameNp: "विराटनगर", lat: 26.4525, lon: 87.2718 },
  { id: "birgunj", name: "Birgunj", nameNp: "वीरगञ्ज", lat: 27.012, lon: 84.8802 },
  { id: "bharatpur", name: "Bharatpur", nameNp: "भरतपुर", lat: 27.6766, lon: 84.4322 },
  { id: "butwal", name: "Butwal", nameNp: "बुटवल", lat: 27.7006, lon: 83.4484 },
  { id: "dharan", name: "Dharan", nameNp: "धरान", lat: 26.8065, lon: 87.2846 },
  { id: "nepalgunj", name: "Nepalgunj", nameNp: "नेपालगञ्ज", lat: 28.05, lon: 81.6167 },
  { id: "hetauda", name: "Hetauda", nameNp: "हेटौंडा", lat: 27.4284, lon: 85.0322 },
  { id: "janakpur", name: "Janakpur", nameNp: "जनकपुर", lat: 26.7288, lon: 85.9263 },
  { id: "dhangadhi", name: "Dhangadhi", nameNp: "धनगढी", lat: 28.6852, lon: 80.6216 },
  { id: "itahari", name: "Itahari", nameNp: "इटहरी", lat: 26.6646, lon: 87.2706 },
  { id: "chitwan", name: "Chitwan", nameNp: "चितवन", lat: 27.5291, lon: 84.3542 },
  { id: "ilam", name: "Ilam", nameNp: "इलाम", lat: 26.911, lon: 87.923 },
  { id: "surkhet", name: "Surkhet", nameNp: "सुर्खेत", lat: 28.6, lon: 81.6167 },
  { id: "baglung", name: "Baglung", nameNp: "बागलुंग", lat: 28.2719, lon: 83.5898 },
  { id: "gorkha", name: "Gorkha", nameNp: "गोरखा", lat: 28.0, lon: 84.6333 },
  { id: "jumla", name: "Jumla", nameNp: "जुम्ला", lat: 29.2742, lon: 82.1838 },
];

export function getPlace(id: string): BirthPlace | undefined {
  return NEPAL_PLACES.find((p) => p.id === id);
}
