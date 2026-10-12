/** Bada Dashain · बडादशैँ — Ashwin Shukla Pratipada → Purnima (15 days). */

export interface DashainDayContent {
  day: number; // 1–15
  tithiNumber: number;
  id: string;
  nameEn: string;
  nameNp: string;
  vibeEn: string;
  vibeNp: string;
  summaryEn: string;
  summaryNp: string;
  significanceEn: string;
  significanceNp: string;
  rituals: { en: string; np: string }[];
  foods: { en: string; np: string }[];
  tips: { en: string; np: string }[];
  highlight?: "opening" | "navaratri" | "peak" | "tika" | "closing";
}

export const DASHAIN_OVERVIEW = {
  titleEn: "Bada Dashain",
  titleNp: "बडादशैँ",
  taglineEn: "Fifteen days of Shakti, jamara, and reunion.",
  taglineNp: "पन्ध्र दिन शक्ति, जमर्रा र परिवारको मिलन।",
  storyEn:
    "Dashain remembers Goddess Durga’s nine-night battle with Mahishasura and her victory on the tenth day — Vijaya Dashami. Many households also retell Rama’s return to Ayodhya. Under both stories runs an older harvest rhythm: monsoon ends, rice ripens, and Nepal gathers home.",
  storyNp:
    "दशैँले देवी दुर्गाको नौ रातको युद्ध र दशौं दिनको विजय — विजया दशमी — सम्झाउँछ। धेरै घरमा रामको अयोध्या फिर्ती पनि सुनाइन्छ। दुवै कथामुनि फसलको ताल छ: मनसुन सकिन्छ, धान पाक्छ, नेपाल घर फर्कन्छ।",
  navaratriEn:
    "The first nine nights are Navaratri — each day a form of the Goddess is honoured while jamara grows in the dark Dashain ghar.",
  navaratriNp:
    "पहिला नौ रात नवरात्र — हरेक दिन देवीको रूपको पूजा, अँध्यारो दशैँ घरमा जमर्रा उम्रिन्छ।",
  noteEn:
    "Dates follow Ashwin Shukla tithis computed in Gati. Official leave and muhurat can differ slightly by local sunrise — confirm with the Nepal Panchang Committee when booking travel.",
  noteNp:
    "मितिहरू गतिमा गणना गरिएका आश्विन शुक्ल तिथि हुन्। बिदा र मुहूर्त स्थानीय सूर्योदयअनुसार फरक पर्न सक्छ — यात्राअघि पंचाङ्ग समिति जाँच गर्नुहोस्।",
} as const;

export const DASHAIN_DAYS: DashainDayContent[] = [
  {
    day: 1,
    tithiNumber: 1,
    id: "ghatasthapana",
    nameEn: "Ghatasthapana",
    nameNp: "घटस्थापना",
    vibeEn: "Quiet beginning · kalash & seed",
    vibeNp: "शान्त सुरुवात · कलश र बीउ",
    summaryEn:
      "Dashain opens. A sanctified kalash is established and barley (or maize) seeds are sown in clean sand inside the Dashain ghar — kept away from sunlight so jamara grows pale gold.",
    summaryNp:
      "दशैँ सुरु। पवित्र कलश स्थापना गरी सफा बालुवामा जौ/मकैको बीउ छरिन्छ — जमर्रा पहेंलो हुन घाम नपरोस्।",
    significanceEn:
      "The Goddess is invited into the home. The jamara that sprouts from this day becomes the blessing worn on Vijaya Dashami.",
    significanceNp:
      "घरमा देवीको आह्वान। आज उम्रिएको जमर्रा विजया दशमीमा आशीर्वाद बन्छ।",
    rituals: [
      {
        en: "Clean and darken the Dashain ghar; place kalash on sand with holy water.",
        np: "दशैँ घर सफा र अँध्यारो पार्नुहोस्; बालुवामा पवित्र जलसहित कलश राख्नुहोस्।",
      },
      {
        en: "Sow jamara seeds; light a continuous oil lamp (akhanda jyoti) if tradition allows.",
        np: "जमर्रा छर्नुहोस्; परम्पराअनुसार अखण्ड ज्योति बाल्नुहोस्।",
      },
      {
        en: "Begin daily morning puja for the Navaratri stretch.",
        np: "नवरात्रभर बिहानको दैनिक पूजा सुरु गर्नुहोस्।",
      },
    ],
    foods: [
      { en: "Simple sattvic meals; many households begin festive shopping.", np: "सादा सात्त्विक भोजन; धेरै घरमा किनमेल सुरु।" },
    ],
    tips: [
      { en: "Book long-distance travel early — buses fill from today onward.", np: "लामो दूरीको यात्रा चाँडै बुक गर्नुहोस्।" },
      { en: "Water jamara gently each morning without flooding the sand.", np: "बिहान जमर्रालाई हल्का पानी दिनुहोस्।" },
    ],
    highlight: "opening",
  },
  {
    day: 2,
    tithiNumber: 2,
    id: "dwitiya",
    nameEn: "Dwitiya · Navaratri Day 2",
    nameNp: "द्वितीया · नवरात्र दोस्रो दिन",
    vibeEn: "Jamara wakes · soft green shoots",
    vibeNp: "जमर्रा ब्यूँझन्छ · कोमल अंकुर",
    summaryEn:
      "Second day of Navaratri. Jamara is watered; the lamp is tended. Households continue Durga puja and prepare the home for guests.",
    summaryNp:
      "नवरात्रको दोस्रो दिन। जमर्रालाई पानी, बत्तीको हेरचाह। दुर्गा पूजा र पाहुना तयारी।",
    significanceEn:
      "Devotion builds in quiet repetition — the same room, the same lamp, growing life.",
    significanceNp:
      "शान्त दोहोरिने भक्ति — उही कोठा, उही बत्ती, बढ्दो जीवन।",
    rituals: [
      { en: "Morning puja and jamara watering.", np: "बिहानको पूजा र जमर्रा सिँचाइ।" },
      { en: "Keep the Dashain ghar sealed from harsh light.", np: "दशैँ घर कडा उज्यालोबाट जोगाउनुहोस्।" },
    ],
    foods: [{ en: "Seasonal fruits and light dal-bhat.", np: "मौसमी फल र हल्का दालभात।" }],
    tips: [
      { en: "Buy new clothes for children before peak prices near Dashami.", np: "दशमी नजिकै महँगो हुनुअघि नयाँ लुगा किन्नुहोस्।" },
    ],
    highlight: "navaratri",
  },
  {
    day: 3,
    tithiNumber: 3,
    id: "tritiya",
    nameEn: "Tritiya · Navaratri Day 3",
    nameNp: "तृतीया · नवरात्र तेस्रो दिन",
    vibeEn: "Courtyard buzz · ping ropes appear",
    vibeNp: "आँगनको चहलपहल · पिङको डोरी",
    summaryEn:
      "Villages and neighbourhoods start raising bamboo swings (ping). Navaratri worship continues; jamara lengthens.",
    summaryNp:
      "गाउँ र टोलमा बाँसको पिङ ठडिन्छ। नवरात्र पूजा जारी; जमर्रा लामो हुन्छ।",
    significanceEn:
      "Joy enters the festival early — play alongside prayer.",
    significanceNp:
      "चाँडै आनन्द आउँछ — प्रार्थनासँगै खेल।",
    rituals: [
      { en: "Continue Navaratri puja; some visit local Durga shrines at dawn.", np: "नवरात्र पूजा; बिहान स्थानीय दुर्गा मन्दिर।" },
      { en: "Help raise or bless community ping if your area does so.", np: "टोलको पिङ ठड्याउन सहयोग।" },
    ],
    foods: [{ en: "Sel roti batter prep begins in many kitchens.", np: "धेरै भान्सामा सेलरोटीको तयारी।" }],
    tips: [
      { en: "Check swing ropes for safety before children climb.", np: "पिङको डोरी सुरक्षित छ कि जाँच गर्नुहोस्।" },
    ],
    highlight: "navaratri",
  },
  {
    day: 4,
    tithiNumber: 4,
    id: "chaturthi",
    nameEn: "Chaturthi · Navaratri Day 4",
    nameNp: "चतुर्थी · नवरात्र चौथो दिन",
    vibeEn: "Deepening puja · travel plans firm",
    vibeNp: "गहिरिँदो पूजा · यात्रा पक्का",
    summaryEn:
      "Mid-Navaratri rhythm. Families finalize who hosts tika, who travels, and which relatives will arrive after Dashami.",
    summaryNp:
      "नवरात्रको मध्य ताल। टीका कसले दिने, को आउने — योजना पक्का।",
    significanceEn:
      "Dashain is logistics as much as liturgy — love needs a timetable.",
    significanceNp:
      "दशैँ विधि जत्तिकै व्यवस्थापन पनि हो — मायालाई समयतालिका चाहिन्छ।",
    rituals: [
      { en: "Morning and evening lamp; recite Durga stotra if practiced.", np: "बिहान-साँझ बत्ती; दुर्गा स्तोत्र।" },
    ],
    foods: [{ en: "Meat shopping may begin for households that feast later.", np: "पछि भोज गर्ने घरमा मासु किनमेल।" }],
    tips: [
      { en: "Confirm leave with employers; private offices vary in holiday length.", np: "कार्यालयको बिदा अवधि पुष्टि गर्नुहोस्।" },
    ],
    highlight: "navaratri",
  },
  {
    day: 5,
    tithiNumber: 5,
    id: "panchami",
    nameEn: "Panchami · Navaratri Day 5",
    nameNp: "पञ्चमी · नवरात्र पाँचौं दिन",
    vibeEn: "Half-grown jamara · gold tint",
    vibeNp: "आधा उम्रिएको जमर्रा · सुनौलो छाया",
    summaryEn:
      "Jamara shows its characteristic yellow-green. Temples dedicated to forms of the Goddess see steady dawn crowds.",
    summaryNp:
      "जमर्रा पहेंलो-हरियो देखिन्छ। देवी मन्दिरमा बिहानको भीड बढ्छ।",
    significanceEn:
      "The sprouts mirror the fortnight — pale from devotion in the dark.",
    significanceNp:
      "अंकुरले पक्ष झल्काउँछ — अँध्यारो भक्तिबाट पहेंलो।",
    rituals: [
      { en: "Offer flowers and incense in the Dashain ghar.", np: "दशैँ घरमा फूल र धूप।" },
      { en: "Optional temple visit before sunrise.", np: "सूर्योदयअघि मन्दिर (ऐच्छिक)।" },
    ],
    foods: [{ en: "Fresh yoghurt and rice for those observing light vows.", np: "व्रतमा दही-भात।" }],
    tips: [
      { en: "Photograph jamara growth once — then put the phone away for puja.", np: "जमर्राको एउटा फोटो — अनि पूजामा फोन टाढा।" },
    ],
    highlight: "navaratri",
  },
  {
    day: 6,
    tithiNumber: 6,
    id: "shashthi",
    nameEn: "Shashthi · Navaratri Day 6",
    nameNp: "षष्ठी · नवरात्र छैटौं दिन",
    vibeEn: "Eve of Phulpati · sacred bouquet ready",
    vibeNp: "फूलपातीको पूर्वसन्ध्या · पवित्र थुङ्गा",
    summaryEn:
      "Preparation for Phulpati. Banana stalks, sugarcane, flowers, and sacred leaves are gathered for tomorrow’s procession into the home.",
    summaryNp:
      "फूलपातीको तयारी। केराको थाँक्रो, उखु, फूल र पात भोलिको घर प्रवेशका लागि।",
    significanceEn:
      "Nature’s abundance is brought to meet the Goddess already present in the kalash.",
    significanceNp:
      "प्रकृतिको प्रचुरता कलशमा बसेकी देवीसँग जोडिन्छ।",
    rituals: [
      { en: "Assemble or buy the phulpati bundle.", np: "फूलपातीको थुङ्गा तयार/किन्ने।" },
      { en: "Clean courtyards and entryways for tomorrow.", np: "भोलिका लागि आँगन सफा।" },
    ],
    foods: [{ en: "Sugarcane chewing begins as a festive snack.", np: "उखु चपाउने रौनक।" }],
    tips: [
      { en: "In Kathmandu, note state Phulpati timing if you want to watch the ceremony.", np: "काठमाडौंमा राज्य स्तरीय फूलपाती समय हेर्नुहोस्।" },
    ],
    highlight: "navaratri",
  },
  {
    day: 7,
    tithiNumber: 7,
    id: "phulpati",
    nameEn: "Phulpati (Fulpati)",
    nameNp: "फूलपाती",
    vibeEn: "Sacred leaves enter · drums & salute",
    vibeNp: "पवित्र पात भित्र · नगरा र सलामी",
    summaryEn:
      "Phulpati — “flower-leaf” — is carried into homes and the Dashain ghar. Historically a royal procession from Gorkha to Hanuman Dhoka; today a state ceremony continues in Kathmandu with the President receiving Phulpati.",
    summaryNp:
      "फूलपाती घर र दशैँ घरमा भित्र्याइन्छ। पहिले गोरखा–हनुमानढोका शाही जुलुस; अहिले राष्ट्रपतिसमक्ष राज्य समारोह।",
    significanceEn:
      "The living greens join jamara — fertility, victory, and welcome in one bouquet.",
    significanceNp:
      "हरियाली जमर्रासँग जोडिन्छ — उर्वरता, विजय र स्वागत।",
    rituals: [
      { en: "Bring phulpati into the house with respect; place near the kalash.", np: "आदरसाथ फूलपाती भित्र्याई कलशनजिक राख्नुहोस्।" },
      { en: "Special puja of the jamara room.", np: "जमर्रा कोठाको विशेष पूजा।" },
    ],
    foods: [
      { en: "Festive snacks; many start preparing large meals for the peak days.", np: "पर्वको खाजा; ठूला भोजको तयारी।" },
    ],
    tips: [
      { en: "Public holiday energy rises — expect crowded highways.", np: "बिदाको चहलपहल — सडक भरिन्छ।" },
    ],
    highlight: "peak",
  },
  {
    day: 8,
    tithiNumber: 8,
    id: "maha-ashtami",
    nameEn: "Maha Ashtami",
    nameNp: "महाअष्टमी",
    vibeEn: "Fierce form · Kalratri intensity",
    vibeNp: "उग्र रूप · कालरात्रि",
    summaryEn:
      "Durga is honoured in her fiercest aspect. Some temples and households offer bali; many now use symbolic offerings (ash gourd, coconut). The night is sometimes called Kalratri.",
    summaryNp:
      "दुर्गाको उग्र रूपको पूजा। कतै बलिसहित; धेरैले प्रतीकात्मक चढावा (फर्सी, नरिवल)। रातलाई कालरात्रि भनिन्छ।",
    significanceEn:
      "Courage faces chaos — the Goddess’s power before victory day.",
    significanceNp:
      "साहसले अराजकता सामना — विजयअघिको शक्ति।",
    rituals: [
      { en: "Kalratri / Ashtami puja in the evening.", np: "साँझ कालरात्रि/अष्टमी पूजा।" },
      { en: "Symbolic or traditional offerings per family custom.", np: "परिवार परम्पराअनुसार चढावा।" },
    ],
    foods: [
      { en: "Meat feasts in many homes; vegetarian alternatives widely respected.", np: "धेरै घरमा मासु; शाकाहारी विकल्प सम्मानित।" },
    ],
    tips: [
      { en: "If attending temples, go early — queues form before dawn on Navami.", np: "मन्दिर जाने हो भने चाँडै — नवमीमा बिहानै लाइन।" },
    ],
    highlight: "peak",
  },
  {
    day: 9,
    tithiNumber: 9,
    id: "maha-navami",
    nameEn: "Maha Navami",
    nameNp: "महानवमी",
    vibeEn: "Ayudha Puja · tools & Taleju",
    vibeNp: "आयुध पूजा · हतियार र तलेजु",
    summaryEn:
      "Peak ritual day. Ayudha Puja blesses tools, vehicles, and machines. Taleju in Kathmandu traditionally opens to the public. Licensed sites may hold the main bali ceremonies.",
    summaryNp:
      "मुख्य विधि दिन। आयुध पूजा — औजार, सवारी, मेसिन। तलेजु सार्वजनिक रूपमा खुल्ने परम्परा। इजाजतप्राप्त स्थलमा मुख्य बलि।",
    significanceEn:
      "Work itself is sacred — the instruments of livelihood receive the Goddess’s grace.",
    significanceNp:
      "काम नै पवित्र — जीविकोपार्जनका औजारमा देवीको कृपा।",
    rituals: [
      { en: "Bless vehicles and tools with tika and flowers.", np: "सवारी/औजारमा टीका र फूल।" },
      { en: "Visit Taleju or local Durga temples if open.", np: "तलेजु वा स्थानीय दुर्गा मन्दिर।" },
    ],
    foods: [
      { en: "Rich festive thali; share with neighbours.", np: "भव्य थाली; छिमेकीसँग बाँड्नुहोस्।" },
    ],
    tips: [
      { en: "Prepare tika plate (rice, yoghurt, vermilion) for tomorrow.", np: "भोलिका लागि टीका थाल तयार (चामल, दही, सिन्दूर)।" },
    ],
    highlight: "peak",
  },
  {
    day: 10,
    tithiNumber: 10,
    id: "vijaya-dashami",
    nameEn: "Vijaya Dashami",
    nameNp: "विजया दशमी",
    vibeEn: "Tika · jamara · dakshina · homecoming",
    vibeNp: "टीका · जमर्रा · दक्षिणा · घरफिर्ती",
    summaryEn:
      "The heart of Dashain. Elders place red tika (rice, yoghurt, vermilion) and jamara on younger relatives’ foreheads, with dakshina (gift/money) and blessings. Family reunions peak; the tika queue can last all day.",
    summaryNp:
      "दशैँको हृदय। जेष्ठले कान्छालाई रातो टीका र जमर्रा, दक्षिणा र आशीर्वाद। परिवार मिलनको चरम; टीका लाइन दिनभर।",
    significanceEn:
      "Victory of dharma — and the living transmission of care across generations.",
    significanceNp:
      "धर्मको विजय — र पुस्तापारि हेरचाहको जीवित प्रवाह।",
    rituals: [
      {
        en: "Receive and give tika in age order; wear jamara behind the ear or in the hair.",
        np: "उमेर क्रममा टीका; जमर्रा कान/कपालमा।",
      },
      {
        en: "Seek elders you could not visit — tika continues for days after.",
        np: "भेट्न नसकेका जेष्ठ खोज्नुहोस् — टीका दिनौं चल्छ।",
      },
    ],
    foods: [
      { en: "Feast foods: meat curries, sel roti, sweets, fresh fruit.", np: "भोज: मासु तरकारी, सेलरोटी, मिठाई, फल।" },
    ],
    tips: [
      {
        en: "Muhurat is guidance from the panchang; many families take tika when elders are ready.",
        np: "मुहूर्त पंचाङ्ग मार्गदर्शन हो; धेरै घर जेष्ठ तयार हुँदा टीका लगाउँछन्।",
      },
      {
        en: "Carry small notes for dakshina if you will bless younger relatives.",
        np: "कान्छालाई आशीर्वाद दिने हो भने सानो दक्षिणा राख्नुहोस्।",
      },
    ],
    highlight: "tika",
  },
  {
    day: 11,
    tithiNumber: 11,
    id: "ekadashi",
    nameEn: "Ekadashi · Tika continues",
    nameNp: "एकादशी · टीका जारी",
    vibeEn: "Second wave of visits",
    vibeNp: "भेटघाटको दोस्रो लहर",
    summaryEn:
      "Tika season continues. Relatives who could not arrive on Dashami visit elders. Some observe Dashain-related Ekadashi vows.",
    summaryNp:
      "टीका याम जारी। दशमीमा नआएकाले जेष्ठ भेट्छन्। कतै एकादशी व्रत।",
    significanceEn:
      "No one is left out of the blessing circle if travel ran late.",
    significanceNp:
      "यात्रा ढिलो भए पनि आशीर्वादको घेराबाट कोही छुट्दैन।",
    rituals: [
      { en: "Continue giving/receiving tika with remaining family.", np: "बाँकी परिवारसँग टीका।" },
    ],
    foods: [{ en: "Leftover feast creativity; share plates with neighbours.", np: "भोजको बाँकी; छिमेकीसँग थाल।" }],
    tips: [
      { en: "Message distant elders — a call counts when roads are hard.", np: "टाढाका जेष्ठलाई फोन — सडक गाह्रो भए पनि।" },
    ],
  },
  {
    day: 12,
    tithiNumber: 12,
    id: "dwadashi",
    nameEn: "Dwadashi · Extended blessings",
    nameNp: "द्वादशी · विस्तारित आशीर्वाद",
    vibeEn: "Village paths · returning guests",
    vibeNp: "गाउँको बाटो · फर्कने पाहुना",
    summaryEn:
      "More tika visits across villages and cities. Children still in new clothes; ping swings stay busy.",
    summaryNp:
      "गाउँ-सहरमा थप टीका भेट। नयाँ लुगामा बच्चा; पिङ चल्छ।",
    significanceEn:
      "Community widens — friends and married daughters’ families keep circulating.",
    significanceNp:
      "समुदाय फैलिन्छ — साथी र विवाहित छोरीका परिवार घुमिरहन्छन्।",
    rituals: [
      { en: "Visit maternal homes or in-laws as custom dictates.", np: "माईती/ससुराली भेट (परम्पराअनुसार)।" },
    ],
    foods: [{ en: "Tea, sweets, and perpetual snack trays for guests.", np: "चिया, मिठाई, पाहुनाका लागि खाजा।" }],
    tips: [
      { en: "Rest voices — talking all day is a real Dashain sport.", np: "आवाज जोगाउनुहोस् — दिनभर कुरा दशैँको खेल हो।" },
    ],
  },
  {
    day: 13,
    tithiNumber: 13,
    id: "trayodashi",
    nameEn: "Trayodashi · Softening feast",
    nameNp: "त्रयोदशी · मत्थर भोज",
    vibeEn: "Full moon approaching · quieter nights",
    vibeNp: "पूर्णिमा नजिक · शान्त रात",
    summaryEn:
      "Feasting softens. Families finish remaining tika obligations and begin thinking about returning to work after Kojagrat.",
    summaryNp:
      "भोज मत्थर। बाँकी टीका सक्याउँदै कोजाग्रतपछिको काम सोचिन्छ।",
    significanceEn:
      "The festival teaches both intensity and release.",
    significanceNp:
      "पर्वले तीव्रता र छोडाइ दुवै सिकाउँछ।",
    rituals: [
      { en: "Optional final temple thanks for a safe reunion season.", np: "सुरक्षित मिलनका लागि धन्यवाद पूजा (ऐच्छिक)।" },
    ],
    foods: [{ en: "Lighter soups and greens after rich days.", np: "भरिपूर्ण दिनपछि हल्का झोल र साग।" }],
    tips: [
      { en: "Start packing if you must travel before the full moon rush reverses.", np: "पूर्णिमाअघि फर्कने हो भने सामान बाँध्न थाल्नुहोस्।" },
    ],
  },
  {
    day: 14,
    tithiNumber: 14,
    id: "chaturdashi",
    nameEn: "Chaturdashi · Eve of Kojagrat",
    nameNp: "चतुर्दशी · कोजाग्रत पूर्वसन्ध्या",
    vibeEn: "Lamp oil ready · cards & vigil prep",
    vibeNp: "तेल तयार · तास र जाग्राम",
    summaryEn:
      "Preparation for Kojagrat Purnima — the night of staying awake with Lakshmi. Some begin disposing of wilted jamara after final blessings.",
    summaryNp:
      "कोजाग्रत पूर्णिमा — लक्ष्मीसँग जाग्रामको तयारी। अन्तिम आशीर्वादपछि ओइलाएको जमर्रा विसर्जन थाल्ने पनि।",
    significanceEn:
      "Wealth is watched with wakefulness — attention as offering.",
    significanceNp:
      "सम्पत्ति जागरुकतासँग जोडिन्छ — ध्यान नै चढावा।",
    rituals: [
      { en: "Clean the Lakshmi corner; prepare lamps and sweets.", np: "लक्ष्मी कोण सफा; बत्ती र मिठाई।" },
    ],
    foods: [{ en: "Sweet rice or kheer for tomorrow’s vigil.", np: "भोलिको जाग्रामका लागि खिर।" }],
    tips: [
      { en: "Plan a gentle overnight — tea, cards, stories; not exhaustion.", np: "हल्का रात योजना — चिया, तास, कथा; थकान होइन।" },
    ],
  },
  {
    day: 15,
    tithiNumber: 15,
    id: "kojagrat-purnima",
    nameEn: "Kojagrat Purnima",
    nameNp: "कोजाग्रत पूर्णिमा",
    vibeEn: "Full moon vigil · Lakshmi · farewell",
    vibeNp: "पूर्णिमा जाग्राम · लक्ष्मी · बिदाइ",
    summaryEn:
      "Dashain closes. Kojagrat means “who is awake?” — devotees keep night vigil and worship Mahalakshmi. Remaining jamara is respectfully immersed. Tika season ends.",
    summaryNp:
      "दशैँ सकिन्छ। कोजाग्रत — “को जागेको?” — रातभर जाग्राम र महालक्ष्मी पूजा। बाँकी जमर्रा आदरसाथ विसर्जन। टीका याम समाप्त।",
    significanceEn:
      "Prosperity blesses the watchful. The fortnight returns to ordinary time with gratitude.",
    significanceNp:
      "जागरुकलाई समृद्धिको आशीर्वाद। कृतज्ञतासँग सामान्य समयमा फिर्ती।",
    rituals: [
      {
        en: "Evening Lakshmi puja; keep lamps lit; stay awake as health allows.",
        np: "साँझ लक्ष्मी पूजा; बत्ती; स्वास्थ्यले धानेसम्म जाग्राम।",
      },
      {
        en: "Immerse jamara in a clean river, pond, or designated place.",
        np: "जमर्रा नदी/पोखरी वा तोकिएको ठाउँमा विसर्जन।",
      },
    ],
    foods: [
      { en: "Kheer, fruits, and shared midnight snacks during vigil.", np: "खिर, फल, जाग्रामका खाजा।" },
    ],
    tips: [
      {
        en: "Government holiday windows often run through today — confirm return-to-work dates.",
        np: "सरकारी बिदा प्रायः आजसम्म — काम फिर्ती मिति पुष्टि गर्नुहोस्।",
      },
    ],
    highlight: "closing",
  },
];

export function dashainDayByTithi(tithiNumber: number): DashainDayContent | undefined {
  return DASHAIN_DAYS.find((d) => d.tithiNumber === tithiNumber);
}
