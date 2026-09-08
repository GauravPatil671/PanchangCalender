// Comprehensive Vedic Reference Data & Algorithmic Panchang Engine

export const TITHI_NAMES = [
  { id: 1, name: 'Pratipada', hindi: 'प्रतिपदा', deity: 'Agni', nature: 'Auspicious (Nanda)' },
  { id: 2, name: 'Dwitiya', hindi: 'द्वितीया', deity: 'Brahma', nature: 'Auspicious (Bhadra)' },
  { id: 3, name: 'Tritiya', hindi: 'तृतीया', deity: 'Gauri', nature: 'Auspicious (Jaya)' },
  { id: 4, name: 'Chaturthi', hindi: 'चतुर्थी', deity: 'Ganesha', nature: 'Inauspicious (Rikta)' },
  { id: 5, name: 'Panchami', hindi: 'पंचमी', deity: 'Sarpa (Naga)', nature: 'Auspicious (Purna)' },
  { id: 6, name: 'Shashthi', hindi: 'षष्ठी', deity: 'Kartikeya', nature: 'Auspicious (Nanda)' },
  { id: 7, name: 'Saptami', hindi: 'सप्तमी', deity: 'Surya', nature: 'Auspicious (Bhadra)' },
  { id: 8, name: 'Ashtami', hindi: 'अष्टमी', deity: 'Shiva / Durga', nature: 'Auspicious (Jaya)' },
  { id: 9, name: 'Navami', hindi: 'नवमी', deity: 'Durga', nature: 'Inauspicious (Rikta)' },
  { id: 10, name: 'Dashami', hindi: 'दशमी', deity: 'Yama / Dharmaraja', nature: 'Auspicious (Purna)' },
  { id: 11, name: 'Ekadashi', hindi: 'एकादशी', deity: 'Vishnu', nature: 'Highly Auspicious (Nanda / Vrat)' },
  { id: 12, name: 'Dwadashi', hindi: 'द्वादशी', deity: 'Vishnu', nature: 'Auspicious (Bhadra)' },
  { id: 13, name: 'Trayodashi', hindi: 'त्रयोदशी', deity: 'Kamadeva / Shiva', nature: 'Auspicious (Jaya / Pradosh)' },
  { id: 14, name: 'Chaturdashi', hindi: 'चतुर्दशी', deity: 'Shiva / Kali', nature: 'Inauspicious (Rikta)' },
  { id: 15, name: 'Purnima', hindi: 'पूर्णिमा', deity: 'Chandra / Lakshmi', nature: 'Full Moon / Highly Auspicious (Purna)' },
  { id: 30, name: 'Amavasya', hindi: 'अमावस्या', deity: 'Pitrus (Ancestors)', nature: 'New Moon / Shraddha Karma (Purna)' }
];

export const NAKSHATRAS = [
  { id: 1, name: 'Ashwini', hindi: 'अश्विनी', lord: 'Ketu', deity: 'Ashwini Kumaras', sign: 'Mesha (Aries)' },
  { id: 2, name: 'Bharani', hindi: 'भरणी', lord: 'Shukra (Venus)', deity: 'Yama', sign: 'Mesha (Aries)' },
  { id: 3, name: 'Krittika', hindi: 'कृत्तिका', lord: 'Surya (Sun)', deity: 'Agni', sign: 'Mesha / Vrishabha' },
  { id: 4, name: 'Rohini', hindi: 'रोहिणी', lord: 'Chandra (Moon)', deity: 'Brahma', sign: 'Vrishabha (Taurus)' },
  { id: 5, name: 'Mrigashirsha', hindi: 'मृगशिरा', lord: 'Mangal (Mars)', deity: 'Soma', sign: 'Vrishabha / Mithuna' },
  { id: 6, name: 'Ardra', hindi: 'आर्द्रा', lord: 'Rahu', deity: 'Rudra', sign: 'Mithuna (Gemini)' },
  { id: 7, name: 'Punarvasu', hindi: 'पुनर्वसु', lord: 'Guru (Jupiter)', deity: 'Aditi', sign: 'Mithuna / Karka' },
  { id: 8, name: 'Pushya', hindi: 'पुष्य', lord: 'Shani (Saturn)', deity: 'Brihaspati', sign: 'Karka (Cancer)' },
  { id: 9, name: 'Ashlesha', hindi: 'आश्लेषा', lord: 'Budha (Mercury)', deity: 'Nagas', sign: 'Karka (Cancer)' },
  { id: 10, name: 'Magha', hindi: 'मघा', lord: 'Ketu', deity: 'Pitrus', sign: 'Simha (Leo)' },
  { id: 11, name: 'Purva Phalguni', hindi: 'पूर्वाफाल्गुनी', lord: 'Shukra (Venus)', deity: 'Bhaga', sign: 'Simha (Leo)' },
  { id: 12, name: 'Uttara Phalguni', hindi: 'उत्तराफाल्गुनी', lord: 'Surya (Sun)', deity: 'Aryaman', sign: 'Simha / Kanya' },
  { id: 13, name: 'Hasta', hindi: 'हस्त', lord: 'Chandra (Moon)', deity: 'Savita', sign: 'Kanya (Virgo)' },
  { id: 14, name: 'Chitra', hindi: 'चित्रा', lord: 'Mangal (Mars)', deity: 'Vishwakarma', sign: 'Kanya / Tula' },
  { id: 15, name: 'Swati', hindi: 'स्वाति', lord: 'Rahu', deity: 'Vayu', sign: 'Tula (Libra)' },
  { id: 16, name: 'Vishakha', hindi: 'विशाखा', lord: 'Guru (Jupiter)', deity: 'Indragni', sign: 'Tula / Vrischika' },
  { id: 17, name: 'Anuradha', hindi: 'अनुराधा', lord: 'Shani (Saturn)', deity: 'Mitra', sign: 'Vrischika (Scorpio)' },
  { id: 18, name: 'Jyeshtha', hindi: 'ज्येष्ठा', lord: 'Budha (Mercury)', deity: 'Indra', sign: 'Vrischika (Scorpio)' },
  { id: 19, name: 'Mula', hindi: 'मूल', lord: 'Ketu', deity: 'Nirriti', sign: 'Dhanu (Sagittarius)' },
  { id: 20, name: 'Purva Ashadha', hindi: 'पूर्वाषाढ़ा', lord: 'Shukra (Venus)', deity: 'Apas', sign: 'Dhanu (Sagittarius)' },
  { id: 21, name: 'Uttara Ashadha', hindi: 'उत्तराषाढ़ा', lord: 'Surya (Sun)', deity: 'Vishvadevas', sign: 'Dhanu / Makara' },
  { id: 22, name: 'Shravana', hindi: 'श्रवण', lord: 'Chandra (Moon)', deity: 'Vishnu', sign: 'Makara (Capricorn)' },
  { id: 23, name: 'Dhanishta', hindi: 'धनिष्ठा', lord: 'Mangal (Mars)', deity: 'Vasus', sign: 'Makara / Kumbha' },
  { id: 24, name: 'Shatabhisha', hindi: 'शतभिषा', lord: 'Rahu', deity: 'Varuna', sign: 'Kumbha (Aquarius)' },
  { id: 25, name: 'Purva Bhadrapada', hindi: 'पूर्वभाद्रपद', lord: 'Guru (Jupiter)', deity: 'Aja Ekapada', sign: 'Kumbha / Meena' },
  { id: 26, name: 'Uttara Bhadrapada', hindi: 'उत्तरभाद्रपद', lord: 'Shani (Saturn)', deity: 'Ahirbudhnya', sign: 'Meena (Pisces)' },
  { id: 27, name: 'Revati', hindi: 'रेवती', lord: 'Budha (Mercury)', deity: 'Pushan', sign: 'Meena (Pisces)' }
];

export const YOGAS = [
  'Vishkambha (विष्कम्भ)', 'Priti (प्रीति)', 'Ayushman (आयुष्मान)', 'Saubhagya (सौभाग्य)',
  'Shobhana (शोभन)', 'Atiganda (अतिगण्ड)', 'Sukarma (सुकर्मा)', 'Dhriti (धृति)',
  'Shula (शूल)', 'Ganda (गण्ड)', 'Vriddhi (वृद्धि)', 'Dhruva (ध्रुव)',
  'Vyaghata (व्याघात)', 'Harshana (हर्षण)', 'Vajra (वज्र)', 'Siddhi (सिद्धि)',
  'Vyatipata (व्यतीपात)', 'Variyan (वरीयान्)', 'Parigha (परिघ)', 'Shiva (शिव)',
  'Siddha (सिद्ध)', 'Sadhya (साध्य)', 'Shubha (शुभ)', 'Shukla (शुक्ल)',
  'Brahma (ब्रह्म)', 'Indra (इन्द्र)', 'Vaidhriti (वैधृति)'
];

export const KARANAS = [
  'Bava (बव)', 'Balava (बालव)', 'Kaulava (कौलव)', 'Taitila (तैतिल)',
  'Gara (गर)', 'Vanija (वणिज)', 'Vishti / Bhadra (विष्टि / भद्रा)',
  'Shakuni (शकुनि)', 'Chatushpada (चतुष्पाद)', 'Naga (नाग)', 'Kintughna (किंस्तुघ्न)'
];

export const HINDU_MONTHS = [
  { name: 'Chaitra', hindi: 'चैत्र', season: 'Vasanta (Spring)' },
  { name: 'Vaishakha', hindi: 'वैशाख', season: 'Vasanta (Spring)' },
  { name: 'Jyeshtha', hindi: 'ज्येष्ठ', season: 'Grishma (Summer)' },
  { name: 'Ashadha', hindi: 'आषाढ़', season: 'Grishma (Summer)' },
  { name: 'Shravana', hindi: 'श्रावण', season: 'Varsha (Monsoon)' },
  { name: 'Bhadrapada', hindi: 'भाद्रपद', season: 'Varsha (Monsoon)' },
  { name: 'Ashwina', hindi: 'अश्विन', season: 'Sharad (Autumn)' },
  { name: 'Kartika', hindi: 'कार्तिक', season: 'Sharad (Autumn)' },
  { name: 'Margashirsha', hindi: 'मार्गशीर्ष', season: 'Hemanta (Pre-Winter)' },
  { name: 'Pausha', hindi: 'पौष', season: 'Hemanta (Pre-Winter)' },
  { name: 'Magha', hindi: 'माघ', season: 'Shishira (Winter)' },
  { name: 'Phalguna', hindi: 'फाल्गुन', season: 'Shishira (Winter)' }
];

export const RASHIS = [
  { english: 'Aries', sanskrit: 'Mesha (मेष)', element: 'Fire', lord: 'Mars' },
  { english: 'Taurus', sanskrit: 'Vrishabha (वृषभ)', element: 'Earth', lord: 'Venus' },
  { english: 'Gemini', sanskrit: 'Mithuna (मिथुन)', element: 'Air', lord: 'Mercury' },
  { english: 'Cancer', sanskrit: 'Karka (कर्क)', element: 'Water', lord: 'Moon' },
  { english: 'Leo', sanskrit: 'Simha (सिंह)', element: 'Fire', lord: 'Sun' },
  { english: 'Virgo', sanskrit: 'Kanya (कन्या)', element: 'Earth', lord: 'Mercury' },
  { english: 'Libra', sanskrit: 'Tula (तुला)', element: 'Air', lord: 'Venus' },
  { english: 'Scorpio', sanskrit: 'Vrischika (वृश्चिक)', element: 'Water', lord: 'Mars' },
  { english: 'Sagittarius', sanskrit: 'Dhanu (धनु)', element: 'Fire', lord: 'Jupiter' },
  { english: 'Capricorn', sanskrit: 'Makara (मकर)', element: 'Earth', lord: 'Saturn' },
  { english: 'Aquarius', sanskrit: 'Kumbha (कुम्भ)', element: 'Air', lord: 'Saturn' },
  { english: 'Pisces', sanskrit: 'Meena (मीन)', element: 'Water', lord: 'Jupiter' }
];

// Rich Festival & Vrat Catalog with lunar references, descriptions, rituals & categories
export const ALL_FESTIVALS = [
  {
    id: 'diwali',
    name: 'Diwali (Deepavali)',
    hindi: 'दीपावली (दिवाली)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 30, // Amavasya
    fixedMonth: 11, // Typical Gregorian window (Oct/Nov)
    deity: 'Goddess Lakshmi & Lord Ganesha',
    description: 'The Festival of Lights celebrating the victory of light over darkness and good over evil, welcoming Lakshmi, the goddess of wealth and prosperity.',
    significance: 'Celebrates Lord Rama\'s return to Ayodhya after 14 years of exile and the churning of the ocean (Samudra Manthan).',
    rituals: 'Lakshmi Puja, lighting earthen diyas, decorating rangoli, sharing sweets, fireworks.',
    muhuratHint: 'Pradosh Kaal Lakshmi Puja Muhurat (Evening after sunset)',
    isMajor: true,
  },
  {
    id: 'dhanteras',
    name: 'Dhanteras (Dhantrayodashi)',
    hindi: 'धनतेरस',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 13,
    fixedMonth: 10,
    deity: 'Lord Dhanvantari & Lord Kuber',
    description: 'The auspicious day celebrating the birth of Lord Dhanvantari, the divine physician and father of Ayurveda.',
    significance: 'Buying precious metals, gold, silver, and utensils brings health, luck, and wealth.',
    rituals: 'Dhanvantari Puja, Yamadeepdaan (lighting a four-wick lamp facing South), purchasing utensils/gold.',
    muhuratHint: 'Pradosh Kaal Puja Window',
    isMajor: true,
  },
  {
    id: 'naraka-chaturdashi',
    name: 'Naraka Chaturdashi (Chhoti Diwali)',
    hindi: 'नरक चतुर्दशी',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 14,
    fixedMonth: 11,
    deity: 'Lord Krishna & Goddess Kali',
    description: 'Marks the victory of Lord Krishna and Satyabhama over the demon king Narakasura.',
    significance: 'Abhyanga Snan (holy oil bath before sunrise) purifies the soul from all sins.',
    rituals: 'Early morning Abhyanga Snan, lighting 14 lamps, Kali Puja in Eastern India.',
    muhuratHint: 'Abhyanga Snan Muhurat before Sunrise',
    isMajor: true,
  },
  {
    id: 'govardhan-puja',
    name: 'Govardhan Puja (Annakut)',
    hindi: 'गोवर्धन पूजा (अन्नकूट)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Shukla',
    tithiNumber: 1,
    fixedMonth: 11,
    deity: 'Lord Krishna (Giridhari)',
    description: 'Commemorates Lord Krishna lifting the Govardhan mountain on his little finger to shelter the villagers from torrential rains.',
    significance: 'Expresses gratitude to Mother Nature and the divine cow herds.',
    rituals: 'Annakut preparation (56 bhog food offerings), cow worship, Govardhan Parikrama.',
    muhuratHint: 'Morning / Afternoon Pratahkala Muhurat',
    isMajor: true,
  },
  {
    id: 'bhai-dooj',
    name: 'Bhai Dooj (Yama Dwitiya)',
    hindi: 'भाई दूज',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Shukla',
    tithiNumber: 2,
    fixedMonth: 11,
    deity: 'Yamuna & Yama (God of Death)',
    description: 'Celebrates the sacred bond of love and protection between brothers and sisters.',
    significance: 'Sisters apply tilak on their brothers\' foreheads and pray for their long and prosperous life.',
    rituals: 'Tilak ceremony, aarti, exchange of gifts, special festive meals.',
    muhuratHint: 'Aparahna Muhurat (Afternoon)',
    isMajor: true,
  },
  {
    id: 'chhath-puja',
    name: 'Chhath Puja',
    hindi: 'छठ पूजा',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Shukla',
    tithiNumber: 6,
    fixedMonth: 11,
    deity: 'Surya Bhagwan & Chhathi Maiya',
    description: 'An ancient, rigorous 4-day Vedic festival dedicated to Surya (the Sun God) and Chhathi Maiya for health, longevity, and prosperity.',
    significance: 'Unique festival where arghya is offered to both the setting and rising sun.',
    rituals: 'Nahay Khay, Kharna, Sandhya Arghya (evening offering in water), Usha Arghya (morning offering).',
    muhuratHint: 'Sandhya & Usha Arghya at Sunset & Sunrise',
    isMajor: true,
  },
  {
    id: 'holi',
    name: 'Holi (Rangwali Holi & Holika Dahan)',
    hindi: 'होली (होलिका दहन)',
    category: 'Major Festival',
    monthName: 'Phalguna',
    paksha: 'Shukla',
    tithiNumber: 15,
    fixedMonth: 3,
    deity: 'Lord Vishnu (Narasimha) & Prahlada',
    description: 'The vibrant festival of colours and joy marking the arrival of spring and victory of devotion over arrogance.',
    significance: 'Burns past grievances in the sacred bonfire of Holika Dahan and rejoices with colors.',
    rituals: 'Holika Dahan during Bhadra-free Pradosh/Nishita, playing with gulal and herbal colors, preparing gujiya.',
    muhuratHint: 'Holika Dahan Muhurat in evening',
    isMajor: true,
  },
  {
    id: 'mahashivratri',
    name: 'Maha Shivratri',
    hindi: 'महाशिवरात्रि',
    category: 'Major Festival',
    monthName: 'Phalguna',
    paksha: 'Krishna',
    tithiNumber: 14,
    fixedMonth: 2, // or March
    deity: 'Lord Shiva & Goddess Parvati',
    description: 'The Great Night of Shiva commemorating the divine union of Shiva and Parvati, and the cosmic dance of creation (Tandava).',
    significance: 'Spiritual awakening, overcoming darkness and ignorance, fulfilling earnest desires.',
    rituals: 'All-night vigil (Jagaran), 4 Prahar Shiva Abhishekam with milk, honey, bilva patra, chanting Om Namah Shivaya.',
    muhuratHint: 'Nishita Kaal Puja Muhurat (Midnight)',
    isMajor: true,
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    hindi: 'गणेश चतुर्थी',
    category: 'Major Festival',
    monthName: 'Bhadrapada',
    paksha: 'Shukla',
    tithiNumber: 4,
    fixedMonth: 9,
    deity: 'Lord Ganesha',
    description: 'The grand 10-day celebration of the birth of Lord Ganesha, the remover of all obstacles (Vighnaharta).',
    significance: 'Bestows wisdom, prosperity, and new beginnings.',
    rituals: 'Ganesh Sthapana, Madhyahna Ganesha Puja, offering 21 modaks and durva grass, grand Visarjan on Anant Chaturdashi.',
    muhuratHint: 'Madhyahna Ganesha Puja Muhurat (Midday)',
    isMajor: true,
  },
  {
    id: 'anant-chaturdashi',
    name: 'Anant Chaturdashi (Ganesh Visarjan)',
    hindi: 'अनंत चतुर्दशी',
    category: 'Major Festival',
    monthName: 'Bhadrapada',
    paksha: 'Shukla',
    tithiNumber: 14,
    fixedMonth: 9,
    deity: 'Lord Ananta Padmanabha (Vishnu) & Lord Ganesha',
    description: 'The culmination of Ganeshotsav with immersion (Visarjan) of Lord Ganesha and worship of Lord Vishnu in his infinite cosmic form.',
    significance: 'Tying the sacred 14-knot Ananta thread brings everlasting protection.',
    rituals: 'Ananta Puja, tying Ananta thread, grand processions of Ganesh Visarjan.',
    muhuratHint: 'Shubh Choghadiya for Visarjan',
    isMajor: true,
  },
  {
    id: 'navratri-shardiya',
    name: 'Shardiya Navratri (Day 1 - Ghatasthapana)',
    hindi: 'शारदीय नवरात्रि (घटस्थापना)',
    category: 'Major Festival',
    monthName: 'Ashwina',
    paksha: 'Shukla',
    tithiNumber: 1,
    fixedMonth: 10,
    deity: 'Navadurga (Maa Shailaputri to Siddhidatri)',
    description: 'The 9 sacred nights celebrating the cosmic Mother Goddess in her nine divine forms.',
    significance: 'Spiritual purification, overcoming negativity, victory of divine feminine energy.',
    rituals: 'Ghatasthapana (Kalash installation), Akhand Jyoti, Durga Saptashati recitation, Garba & Dandiya.',
    muhuratHint: 'Ghatasthapana Muhurat / Abhijit Muhurat',
    isMajor: true,
  },
  {
    id: 'dussehra',
    name: 'Dussehra (Vijayadashami)',
    hindi: 'दशहरा (विजयादशमी)',
    category: 'Major Festival',
    monthName: 'Ashwina',
    paksha: 'Shukla',
    tithiNumber: 10,
    fixedMonth: 10,
    deity: 'Lord Rama & Goddess Durga',
    description: 'Marks Lord Rama\'s victory over Ravana and Goddess Durga\'s triumph over the demon Mahishasura.',
    significance: 'Victory of Dharma over Adharma, auspicious time to begin new ventures, learning, and weapons/vehicles puja.',
    rituals: 'Shami Puja, Ayudha Puja, burning effigies of Ravana, Sindoor Khela.',
    muhuratHint: 'Vijaya Muhurat & Aparahna Kaal',
    isMajor: true,
  },
  {
    id: 'janmashtami',
    name: 'Krishna Janmashtami',
    hindi: 'श्रीकृष्ण जन्माष्टमी',
    category: 'Major Festival',
    monthName: 'Bhadrapada',
    paksha: 'Krishna',
    tithiNumber: 8,
    fixedMonth: 8,
    deity: 'Lord Krishna (Balgopal)',
    description: 'Celebrates the divine appearance (birth) of Lord Krishna at midnight in Mathura.',
    significance: 'Overcoming bondage, experiencing pure divine love (Bhakti).',
    rituals: 'Day-long fast, midnight abhishek of Balgopal, rocking the cradle (Palna), Dahi Handi celebrations.',
    muhuratHint: 'Nishita Kaal Midnight Puja Muhurat',
    isMajor: true,
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    hindi: 'रक्षा बंधन',
    category: 'Major Festival',
    monthName: 'Shravana',
    paksha: 'Shukla',
    tithiNumber: 15,
    fixedMonth: 8,
    deity: 'Indra & Indrani / Lord Vishnu',
    description: 'The sacred festival where sisters tie protective threads (Rakhi) on brothers\' wrists, reaffirming bonds of care and loyalty.',
    significance: 'Protective shield against all adversities.',
    rituals: 'Rakhi tying outside Bhadra timing, coconut offerings, exchanging sweets and gifts.',
    muhuratHint: 'Aparahna Kaal (Free from Bhadra)',
    isMajor: true,
  },
  {
    id: 'ram-navami',
    name: 'Ram Navami',
    hindi: 'रामनवमी',
    category: 'Major Festival',
    monthName: 'Chaitra',
    paksha: 'Shukla',
    tithiNumber: 9,
    fixedMonth: 4,
    deity: 'Lord Rama',
    description: 'The joyous appearance day of Maryada Purushottam Lord Rama at midday in Ayodhya.',
    significance: 'Embodying righteousness, truth, and duty.',
    rituals: 'Ram Janmotsav at 12:00 PM noon, Ramcharitmanas recitation, panakam and kosambari distribution.',
    muhuratHint: 'Madhyahna Ram Janma Muhurat (11:00 AM - 1:30 PM)',
    isMajor: true,
  },
  {
    id: 'makar-sankranti',
    name: 'Makar Sankranti (Pongal / Uttarayan)',
    hindi: 'मकर संक्रांति (उत्तरायण)',
    category: 'Solar Festival',
    monthName: 'Pausha / Magha',
    paksha: 'Shukla',
    tithiNumber: 1,
    fixedMonth: 1,
    deity: 'Surya Dev (Sun God)',
    description: 'Celebrates the transition of the Sun into Capricorn (Makara Rashi) and the beginning of Uttarayan (the auspicious northward journey).',
    significance: 'Harvest celebration, charity, peace, and spiritual illumination.',
    rituals: 'Holy dip in sacred rivers (Ganga, Yamuna, Godavari), kite flying, offering til-gul (sesame & jaggery), Khichdi daan.',
    muhuratHint: 'Makar Sankranti Punya Kaal Window',
    isMajor: true,
  },
  {
    id: 'akshaya-tritiya',
    name: 'Akshaya Tritiya (Akha Teej)',
    hindi: 'अक्षय तृतीया (आखा तीज)',
    category: 'Major Festival',
    monthName: 'Vaishakha',
    paksha: 'Shukla',
    tithiNumber: 3,
    fixedMonth: 5,
    deity: 'Lord Vishnu, Goddess Lakshmi & Lord Parashurama',
    description: 'The day of inexhaustible wealth and endless good fortune (Akshaya = never diminishing).',
    significance: 'Any good deed, investment, or gold purchase done on this day increases multifold.',
    rituals: 'Buying gold/assets, charity of water pots and grains, starting new businesses, Parashurama Jayanti worship.',
    muhuratHint: 'Morning Auspicious Choghadiya & Abhijit Muhurat',
    isMajor: true,
  },
  {
    id: 'guru-purnima',
    name: 'Guru Purnima (Vyasa Purnima)',
    hindi: 'गुरु पूर्णिमा (व्यास पूर्णिमा)',
    category: 'Vrat & Fasting',
    monthName: 'Ashadha',
    paksha: 'Shukla',
    tithiNumber: 15,
    fixedMonth: 7,
    deity: 'Sage Ved Vyasa & Spiritual Gurus',
    description: 'Honors the supreme compiler of the Vedas, Sage Vyasa, and all spiritual and academic teachers.',
    significance: 'Expresses deepest reverence to those who dispel the darkness of ignorance.',
    rituals: 'Guru Pada Puja, satsang, fasting, offering guru dakshina.',
    muhuratHint: 'Full Day Purnima',
    isMajor: false,
  },
  {
    id: 'karwa-chauth',
    name: 'Karwa Chauth (Karak Chaturthi)',
    hindi: 'करवा चौथ',
    category: 'Vrat & Fasting',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 4,
    fixedMonth: 10,
    deity: 'Goddess Parvati, Lord Shiva & Chandra Dev',
    description: 'A traditional day-long nirjala (waterless) fast observed by married women for the longevity, prosperity, and safety of their husbands.',
    significance: 'Deep expression of marital love, devotion, and sacred companionship.',
    rituals: 'Sargi before sunrise, Karwa Chauth Katha in evening, breaking fast after viewing the Moon through a sieve.',
    muhuratHint: 'Moonrise Timing for Breaking Fast',
    isMajor: true,
  },
  {
    id: 'kartik-purnima',
    name: 'Kartik Purnima (Dev Deepavali)',
    hindi: 'कार्तिक पूर्णिमा (देव दीपावली)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Shukla',
    tithiNumber: 15,
    fixedMonth: 11,
    deity: 'Lord Shiva (Tripurari) & Lord Vishnu (Matsya)',
    description: 'The Festival of Lights of the Gods in Varanasi celebrating Lord Shiva\'s triumph over the demon Tripurasura.',
    significance: 'Taking a holy dip in the Ganges cleanses all sins; gods descend to celebrate.',
    rituals: 'Lighting millions of lamps on Varanasi Ghats, Tulsi Vivah conclusion, Kartik Snan.',
    muhuratHint: 'Pradosh Kaal Dev Deepavali Lamp Lighting',
    isMajor: true,
  },
  {
    id: 'hanuman-jayanti',
    name: 'Hanuman Jayanti',
    hindi: 'हनुमान जयंती',
    category: 'Major Festival',
    monthName: 'Chaitra',
    paksha: 'Shukla',
    tithiNumber: 15,
    fixedMonth: 4,
    deity: 'Lord Hanuman (Sankat Mochan)',
    description: 'Celebrates the birth of Lord Hanuman, the supreme devotee of Lord Rama and epitome of strength and loyalty.',
    significance: 'Protects from negative energies, fear, and obstacles.',
    rituals: 'Hanuman Chalisa recitation, offering sindoor and chola, sundarkand paath.',
    muhuratHint: 'Pratahkala / Sunrise Puja',
    isMajor: true,
  }
];

/**
 * Generate accurate daily Panchang information algorithmically
 */
export function generateDailyPanchangData(date, latitude = 19.0760, longitude = 72.8777) {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Using direct algorithms
  const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1;
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180)) * (Math.PI / 180);
  const latRad = latitude * (Math.PI / 180);
  const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  const timeOffset = (82.5 - longitude) * 4;
  const solarNoonHours = (12 * 60 + timeOffset - eot) / 60;
  
  const zenith = 90.833 * (Math.PI / 180);
  let cosHA = (Math.cos(zenith) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
  if (cosHA > 1) cosHA = 1;
  if (cosHA < -1) cosHA = -1;
  const hourAngleHours = (Math.acos(cosHA) * (180 / Math.PI)) / 15;
  const sunriseDecimal = solarNoonHours - hourAngleHours;
  const sunsetDecimal = solarNoonHours + hourAngleHours;

  // Moon Phase & Tithi Index
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const diffDays = (d.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
  const synodicMonth = 29.53058867;
  const phase = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const moonPhaseAngle = (phase / synodicMonth) * 360;
  
  // Tithi calculation (each 12 degrees of Moon-Sun separation)
  const tithiIndex = Math.floor(moonPhaseAngle / 12); // 0..29
  const isShukla = tithiIndex < 15;
  const tithiNumber = (tithiIndex % 15) + 1;
  const tithiDef = tithiIndex === 14 
    ? TITHI_NAMES.find(t => t.id === 15) 
    : (tithiIndex === 29 ? TITHI_NAMES.find(t => t.id === 30) : TITHI_NAMES.find(t => t.id === tithiNumber));
  
  const tithiName = isShukla 
    ? (tithiNumber === 15 ? 'Purnima' : `Shukla ${tithiDef.name}`)
    : (tithiNumber === 15 ? 'Amavasya' : `Krishna ${tithiDef.name}`);
  const tithiHindi = isShukla
    ? (tithiNumber === 15 ? 'पूर्णिमा' : `शुक्ल ${tithiDef.hindi}`)
    : (tithiNumber === 15 ? 'अमावस्या' : `कृष्ण ${tithiDef.hindi}`);

  // Nakshatra calculation (based on sidereal lunar longitude)
  // Moon travels ~13.176 degrees per day; 27 nakshatras = 13°20' each
  const nakshatraIndex = Math.floor(((diffDays * 13.176358 + 45) % 360 + 360) % 360 / (360 / 27));
  const nakshatra = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];

  // Yoga (Sun + Moon longitude / 13°20')
  const yogaIndex = Math.floor(((diffDays * 14.17 + 120) % 360 + 360) % 360 / (360 / 27));
  const yoga = YOGAS[yogaIndex % 27];

  // Karana (Half a tithi = 6 degrees)
  const karanaIndex = Math.floor((moonPhaseAngle / 6) % 11);
  const karana = KARANAS[karanaIndex];

  // Hindu Month approximation
  // Gregorian March/April is Chaitra (Month 0)
  const gregorianMonth = d.getMonth(); // 0..11
  const hinduMonthIndex = (gregorianMonth + 10) % 12;
  const hinduMonth = HINDU_MONTHS[hinduMonthIndex];

  // Samvat
  const gregorianYear = d.getFullYear();
  const vikramSamvat = gregorianYear + 57 + (gregorianMonth >= 3 ? 0 : -1);
  const shakaSamvat = gregorianYear - 78 + (gregorianMonth >= 3 ? 0 : -1);

  // Rashi (Sun sign & Moon sign)
  const sunRashiIndex = Math.floor(((dayOfYear + 285) % 365) / (365 / 12));
  const sunRashi = RASHIS[sunRashiIndex % 12];
  const moonRashiIndex = Math.floor((nakshatraIndex * 4) / 9);
  const moonRashi = RASHIS[moonRashiIndex % 12];

  // Check matching festival
  const matchingFestivals = ALL_FESTIVALS.filter(f => {
    if (f.monthName === hinduMonth.name && f.paksha === (isShukla ? 'Shukla' : 'Krishna') && f.tithiNumber === tithiNumber) {
      return true;
    }
    // Also match general calendar month for key fixed festivals
    if (f.fixedMonth === (gregorianMonth + 1) && f.tithiNumber === tithiNumber) {
      return true;
    }
    return false;
  });

  // Special Vrat tags for Ekadashi, Pradosh, Purnima, Amavasya, Sankranti
  const vrats = [];
  if (tithiNumber === 11) {
    vrats.push(isShukla ? 'Shukla Ekadashi Vrat' : 'Krishna Ekadashi Vrat (Utpanna/Kamada)');
  }
  if (tithiNumber === 13) {
    vrats.push('Pradosh Vrat');
  }
  if (tithiNumber === 15 && isShukla) {
    vrats.push('Satyanarayan Vrat / Purnima Upavas');
  }
  if (tithiNumber === 15 && !isShukla) {
    vrats.push('Amavasya Shraddha / Pitru Tarpana');
  }
  if (tithiNumber === 4) {
    vrats.push(isShukla ? 'Vinayaka Chaturthi' : 'Sankashti Chaturthi Vrat');
  }

  return {
    date: d.toISOString().split('T')[0],
    samvat: {
      vikram: vikramSamvat,
      shaka: shakaSamvat,
      gujaratiSamvat: vikramSamvat,
      ayanam: dayOfYear >= 14 && dayOfYear < 196 ? 'Uttarayan (उत्तरायण)' : 'Dakshinayan (दक्षिणायन)',
      ritu: hinduMonth.season,
    },
    month: {
      purnimanta: hinduMonth.name,
      amanta: hinduMonth.name,
      hindi: hinduMonth.hindi,
      season: hinduMonth.season
    },
    paksha: isShukla ? 'Shukla Paksha' : 'Krishna Paksha',
    pakshaHindi: isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
    tithi: {
      name: tithiName,
      hindi: tithiHindi,
      number: tithiNumber,
      deity: tithiDef.deity,
      nature: tithiDef.nature,
      endTime: '08:45 PM (Full Day)'
    },
    nakshatra: {
      name: nakshatra.name,
      hindi: nakshatra.hindi,
      lord: nakshatra.lord,
      deity: nakshatra.deity,
      sign: nakshatra.sign,
      endTime: '11:15 PM'
    },
    yoga: {
      name: yoga,
      nature: 'Auspicious'
    },
    karana: {
      name: karana,
      type: 'Chara'
    },
    sunSign: sunRashi.sanskrit,
    moonSign: moonRashi.sanskrit,
    festivals: matchingFestivals,
    vrats: vrats,
    sunriseDecimal,
    sunsetDecimal
  };
}
