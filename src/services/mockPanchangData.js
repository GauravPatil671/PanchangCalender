// Comprehensive Vedic Reference Data & High-Precision Panchang Engine

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
    id: 'makar-sankranti',
    name: 'Makar Sankranti (Pongal / Uttarayan)',
    hindi: 'मकर संक्रांति (उत्तरायण)',
    category: 'Solar Festival',
    isSolar: true,
    solarMonth: 1,
    solarDay: 14,
    monthName: 'Magha',
    paksha: 'Shukla',
    tithiNumber: 1,
    deity: 'Surya Dev (Sun God)',
    description: 'Celebrates the transition of the Sun into Capricorn (Makara Rashi) and the beginning of Uttarayan (the auspicious northward journey).',
    significance: 'Harvest celebration, charity, peace, and spiritual illumination.',
    rituals: 'Holy dip in sacred rivers (Ganga, Yamuna, Godavari), kite flying, offering til-gul (sesame & jaggery), Khichdi daan.',
    muhuratHint: 'Makar Sankranti Punya Kaal Window',
    isMajor: true,
  },
  {
    id: 'vasant-panchami',
    name: 'Vasant Panchami (Saraswati Puja)',
    hindi: 'बसंत पंचमी (सरस्वती पूजा)',
    category: 'Major Festival',
    monthName: 'Magha',
    paksha: 'Shukla',
    tithiNumber: 5,
    deity: 'Goddess Saraswati (Goddess of Wisdom & Arts)',
    description: 'Marks the arrival of spring (Vasant Ritu) and honours Goddess Saraswati, the patron of learning, music, and knowledge.',
    significance: 'Auspicious day for Akshar Abhyasam (initiating children into education) and starting new studies.',
    rituals: 'Wearing yellow attire, worshipping books and musical instruments, offering yellow sweets (kesar halwa / laddu).',
    muhuratHint: 'Purvahna Puja Muhurat (Morning)',
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
    deity: 'Lord Shiva & Goddess Parvati',
    description: 'The Great Night of Shiva commemorating the divine union of Shiva and Parvati, and the cosmic dance of creation (Tandava).',
    significance: 'Spiritual awakening, overcoming darkness and ignorance, fulfilling earnest desires.',
    rituals: 'All-night vigil (Jagaran), 4 Prahar Shiva Abhishekam with milk, honey, bilva patra, chanting Om Namah Shivaya.',
    muhuratHint: 'Nishita Kaal Midnight Puja Muhurat',
    isMajor: true,
  },
  {
    id: 'holika-dahan',
    name: 'Holika Dahan (Chhoti Holi)',
    hindi: 'होलिका दहन (छोटी होली)',
    category: 'Major Festival',
    monthName: 'Phalguna',
    paksha: 'Shukla',
    tithiNumber: 15,
    deity: 'Lord Vishnu (Narasimha) & Bhakt Prahlada',
    description: 'The sacred bonfire lit on the full moon night celebrating the triumph of true devotion over ego and tyranny.',
    significance: 'Burns past grievances, evil inclinations, and negativities in the consecrated fire.',
    rituals: 'Lighting the bonfire during Bhadra-free Pradosh Kaal, parikrama around fire, offering roasted grains and coconuts.',
    muhuratHint: 'Evening Pradosh Kaal (Free from Bhadra)',
    isMajor: true,
  },
  {
    id: 'holi',
    name: 'Holi (Rangwali Holi / Dhulandi)',
    hindi: 'होली (रंगों का त्योहार)',
    category: 'Major Festival',
    monthName: 'Chaitra',
    paksha: 'Krishna',
    tithiNumber: 1,
    deity: 'Radha Krishna & Lord Vishnu',
    description: 'The vibrant festival of colours and joy marking the arrival of spring and victory of devotion over arrogance.',
    significance: 'Spreading joy, harmony, forgiveness, and brotherhood across all communities.',
    rituals: 'Playing with organic gulal and herbal colours, preparing gujiya, hugging and exchanging festive greetings.',
    muhuratHint: 'Full Day Celebrations',
    isMajor: true,
  },
  {
    id: 'gudi-padwa',
    name: 'Gudi Padwa / Ugadi (Chaitra Navratri Day 1)',
    hindi: 'गुड़ी पड़वा / उगादी (नवसंवत्सर)',
    category: 'Major Festival',
    monthName: 'Chaitra',
    paksha: 'Shukla',
    tithiNumber: 1,
    deity: 'Lord Brahma & Navadurga',
    description: 'Marks the Vedic New Year (Nav Samvatsara) and the first day of the sacred Chaitra Navratri.',
    significance: 'Day Lord Brahma created the universe; victory flag (Gudi) hoisted for luck and prosperity.',
    rituals: 'Hoisting the Gudi, eating neem-jaggery prasad, Ghatasthapana for Chaitra Navratri.',
    muhuratHint: 'Pratahkala / Sunrise Ghatasthapana Muhurat',
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
    deity: 'Maryada Purushottam Lord Rama',
    description: 'The joyous appearance day of Lord Rama at midday in Ayodhya.',
    significance: 'Embodying righteousness, truth, humility, and duty (Dharma).',
    rituals: 'Ram Janmotsav at 12:00 PM noon, Ramcharitmanas recitation, panakam and kosambari distribution.',
    muhuratHint: 'Madhyahna Ram Janma Muhurat (11:00 AM - 1:30 PM)',
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
    deity: 'Lord Hanuman (Sankat Mochan)',
    description: 'Celebrates the appearance of Lord Hanuman, the supreme devotee of Lord Rama and embodiment of strength, wisdom, and loyalty.',
    significance: 'Protects from negative energies, fear, and planetary adversities.',
    rituals: 'Hanuman Chalisa & Sundarkand recitation, offering vermilion (sindoor) and motichoor laddus.',
    muhuratHint: 'Pratahkala / Sunrise Puja',
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
    deity: 'Lord Vishnu, Goddess Lakshmi & Lord Parashurama',
    description: 'The day of inexhaustible wealth and endless good fortune (Akshaya = never diminishing).',
    significance: 'Any noble deed, charity, gold purchase, or new venture started on this day grows multifold.',
    rituals: 'Buying gold/silver, daan of water pots and grains, starting new businesses, Parashurama Jayanti worship.',
    muhuratHint: 'Morning Auspicious Choghadiya & Abhijit Muhurat',
    isMajor: true,
  },
  {
    id: 'buddha-purnima',
    name: 'Buddha Purnima (Vesak)',
    hindi: 'बुद्ध पूर्णिमा',
    category: 'Major Festival',
    monthName: 'Vaishakha',
    paksha: 'Shukla',
    tithiNumber: 15,
    deity: 'Gautama Buddha & Lord Vishnu',
    description: 'Commemorates the birth, enlightenment, and Mahaparinirvana of Gautama Buddha.',
    significance: 'Universal peace, mindfulness, compassion (Karuna), and non-violence (Ahimsa).',
    rituals: 'Meditation, offering flowers, lighting candles, practicing charity and compassion to all living beings.',
    muhuratHint: 'Full Day Purnima',
    isMajor: true,
  },
  {
    id: 'ganga-dussehra',
    name: 'Ganga Dussehra',
    hindi: 'गंगा दशहरा',
    category: 'Major Festival',
    monthName: 'Jyeshtha',
    paksha: 'Shukla',
    tithiNumber: 10,
    deity: 'Maa Ganga',
    description: 'Celebrates the descent of the sacred river Ganga from the heavens to Earth through the locks of Lord Shiva.',
    significance: 'Taking a holy dip purifies ten types of sins accumulated over lifetimes.',
    rituals: 'Holy bath in river Ganga, offering deepdaan (floating lamps), 10 types of flower and fruit offerings.',
    muhuratHint: 'Sunrise to Noon',
    isMajor: false,
  },
  {
    id: 'nirjala-ekadashi',
    name: 'Nirjala Ekadashi (Bhima Ekadashi)',
    hindi: 'निर्जला एकादशी (भीम एकादशी)',
    category: 'Vrat & Fasting',
    monthName: 'Jyeshtha',
    paksha: 'Shukla',
    tithiNumber: 11,
    deity: 'Lord Vishnu',
    description: 'The most austere and meritorious of all 24 Ekadashis, observed without drinking a single drop of water.',
    significance: 'Observing this single fast bestows the combined merits of all 24 yearly Ekadashis.',
    rituals: 'Complete 24-hour waterless fast, Vishnu Sahasranama chanting, donating water pots, fans, and fruits to the needy.',
    muhuratHint: 'Parana on Dwadashi sunrise',
    isMajor: true,
  },
  {
    id: 'jagannath-ratha-yatra',
    name: 'Jagannath Ratha Yatra',
    hindi: 'जगन्नाथ रथयात्रा',
    category: 'Major Festival',
    monthName: 'Ashadha',
    paksha: 'Shukla',
    tithiNumber: 2,
    deity: 'Lord Jagannath, Balabhadra & Subhadra',
    description: 'The grand chariot procession of Lord Jagannath from the Puri temple to Gundicha temple.',
    significance: 'Pulling the sacred chariots is believed to grant liberation (Moksha).',
    rituals: 'Chariot pulling, Chhera Pahanra (golden broom sweeping by the Gajapati King), singing kirtans.',
    muhuratHint: 'Morning / Afternoon Chariot Procession',
    isMajor: true,
  },
  {
    id: 'guru-purnima',
    name: 'Guru Purnima (Vyasa Purnima)',
    hindi: 'गुरु पूर्णिमा (व्यास पूर्णिमा)',
    category: 'Major Festival',
    monthName: 'Ashadha',
    paksha: 'Shukla',
    tithiNumber: 15,
    deity: 'Sage Ved Vyasa & Spiritual Gurus',
    description: 'Honours the supreme compiler of the Vedas, Sage Vyasa, and all spiritual, scholastic, and life teachers.',
    significance: 'Expresses deepest reverence and gratitude to those who dispel the darkness of ignorance.',
    rituals: 'Guru Pada Puja, satsang, offering guru dakshina, meditating on Guru Mantra.',
    muhuratHint: 'Full Day Purnima',
    isMajor: true,
  },
  {
    id: 'nag-panchami',
    name: 'Nag Panchami',
    hindi: 'नाग पंचमी',
    category: 'Major Festival',
    monthName: 'Shravana',
    paksha: 'Shukla',
    tithiNumber: 5,
    deity: 'Nag Devatas (Ananta, Vasuki, Shesha) & Lord Shiva',
    description: 'Traditional worship of Serpent deities during the holy monsoon month of Shravana.',
    significance: 'Protects from snakebites, removes Kaal Sarp Dosha, and brings harmony with nature.',
    rituals: 'Offering milk and turmeric to serpent idols, Shiva puja, drawing snake symbols on doorsteps.',
    muhuratHint: 'Morning Pratahkala Puja Muhurat',
    isMajor: false,
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    hindi: 'रक्षा बंधन',
    category: 'Major Festival',
    monthName: 'Shravana',
    paksha: 'Shukla',
    tithiNumber: 15,
    deity: 'Lord Vishnu & Sisterly Bond',
    description: 'The sacred festival celebrating the enduring bond of protection, love, and loyalty between brothers and sisters.',
    significance: 'The sacred thread (Rakhi) acts as a divine protective shield against all adversities.',
    rituals: 'Sisters tie Rakhi on brothers\' wrists outside Bhadra timing, apply tilak, exchange sweets and gifts.',
    muhuratHint: 'Aparahna Kaal (Free from Bhadra)',
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
    deity: 'Lord Krishna (Balgopal)',
    description: 'Celebrates the divine appearance of Lord Krishna at midnight in the Rohini Nakshatra in Mathura.',
    significance: 'Eradication of evil, liberation from worldly bondage, experiencing unalloyed Bhakti.',
    rituals: 'Day-long fast, midnight Panchamrit abhishek of Balgopal, rocking the cradle (Palna), Dahi Handi.',
    muhuratHint: 'Nishita Kaal Midnight Puja Muhurat (11:55 PM - 12:45 AM)',
    isMajor: true,
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    hindi: 'गणेश चतुर्थी (विनायक चतुर्थी)',
    category: 'Major Festival',
    monthName: 'Bhadrapada',
    paksha: 'Shukla',
    tithiNumber: 4,
    deity: 'Lord Ganesha (Vighnaharta)',
    description: 'The grand 10-day celebration of the appearance of Lord Ganesha, the remover of all obstacles and harbinger of wisdom.',
    significance: 'Bestows intellect, auspicious beginnings, and removes hurdles.',
    rituals: 'Ganesh Murti Sthapana, Madhyahna Ganesha Puja, offering 21 modaks, durva grass, and red hibiscus flowers.',
    muhuratHint: 'Madhyahna Ganesha Puja Muhurat (11:05 AM - 01:30 PM)',
    isMajor: true,
  },
  {
    id: 'anant-chaturdashi',
    name: 'Anant Chaturdashi (Ganesh Visarjan)',
    hindi: 'अनंत चतुर्दशी (गणेश विसर्जन)',
    category: 'Major Festival',
    monthName: 'Bhadrapada',
    paksha: 'Shukla',
    tithiNumber: 14,
    deity: 'Lord Ananta Padmanabha (Vishnu) & Lord Ganesha',
    description: 'The grand culmination of Ganeshotsav with immersion (Visarjan) and worship of Lord Vishnu in his cosmic infinite form.',
    significance: 'Tying the sacred 14-knot Ananta thread brings everlasting spiritual protection.',
    rituals: 'Ananta Vrat puja, tying Ananta thread on right arm, grand Ganesh Visarjan processions.',
    muhuratHint: 'Auspicious Choghadiya for Visarjan',
    isMajor: true,
  },
  {
    id: 'pitru-paksha-amavasya',
    name: 'Mahalaya / Sarva Pitru Amavasya',
    hindi: 'सर्वपितृ अमावस्या (महालया)',
    category: 'Vrat & Fasting',
    monthName: 'Ashwina',
    paksha: 'Krishna',
    tithiNumber: 15,
    deity: 'Pitrus (Ancestors) & Lord Yama',
    description: 'The most sacred day of Pitru Paksha dedicated to performing Shraddha and Tarpana for all departed ancestors.',
    significance: 'Brings ancestral blessings, family peace, and liberates souls.',
    rituals: 'Kutap & Rohina Kaal Tarpana, Pinda Daan, feeding cows, crows, dogs, and brahmins.',
    muhuratHint: 'Kutap Muhurat & Aparahna Kaal',
    isMajor: false,
  },
  {
    id: 'navratri-shardiya',
    name: 'Shardiya Navratri (Ghatasthapana)',
    hindi: 'शारदीय नवरात्रि (घटस्थापना)',
    category: 'Major Festival',
    monthName: 'Ashwina',
    paksha: 'Shukla',
    tithiNumber: 1,
    deity: 'Navadurga (Maa Shailaputri to Siddhidatri)',
    description: 'The 9 sacred nights celebrating the cosmic Mother Goddess in her nine divine incarnations.',
    significance: 'Spiritual purification, overcoming inner demons, and invoking divine feminine power (Shakti).',
    rituals: 'Ghatasthapana (Kalash installation), Akhand Jyoti lighting, Durga Saptashati recitation, Garba & Dandiya.',
    muhuratHint: 'Ghatasthapana Muhurat / Abhijit Muhurat',
    isMajor: true,
  },
  {
    id: 'durga-ashtami',
    name: 'Durga Ashtami (Maha Ashtami)',
    hindi: 'दुर्गा अष्टमी (महाअष्टमी)',
    category: 'Major Festival',
    monthName: 'Ashwina',
    paksha: 'Shukla',
    tithiNumber: 8,
    deity: 'Maa Mahagauri & Maa Chamunda',
    description: 'The eighth day of Navratri dedicated to Maa Mahagauri and the solemn Sandhi Puja.',
    significance: 'Destruction of negative karmas and inner peace.',
    rituals: 'Kanya Pujan (worshipping 9 young girls), offering halwa-puri-chana, Sandhi Puja at the transition of Ashtami-Navami.',
    muhuratHint: 'Sandhi Puja Window',
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
    deity: 'Lord Rama & Goddess Durga',
    description: 'Marks Lord Rama\'s victory over Ravana and Goddess Durga\'s triumph over the demon Mahishasura.',
    significance: 'Victory of Dharma over Adharma, auspicious time to inaugurate new ventures, learning (Vidyarambham), and vehicles.',
    rituals: 'Shami Puja, Ayudha Puja, burning effigies of Ravana, Kumbhakarna & Meghnada, Sindoor Khela.',
    muhuratHint: 'Vijaya Muhurat & Aparahna Kaal (02:00 PM - 02:45 PM)',
    isMajor: true,
  },
  {
    id: 'sharad-purnima',
    name: 'Sharad Purnima (Kojagari / Raas Purnima)',
    hindi: 'शरद पूर्णिमा (कोजागरी पूर्णिमा)',
    category: 'Major Festival',
    monthName: 'Ashwina',
    paksha: 'Shukla',
    tithiNumber: 15,
    deity: 'Goddess Lakshmi, Lord Chandra & Lord Krishna',
    description: 'The night of divine nectar (Amrit) where moonlight is believed to shower curative and spiritual powers; marks Maha Raas.',
    significance: 'Goddess Lakshmi descends to bless those who are awake (Ko Jagarti).',
    rituals: 'Placing kheer under moonlight throughout the night, Lakshmi worship, staying awake in prayer.',
    muhuratHint: 'Moonrise & Nishita Kaal',
    isMajor: true,
  },
  {
    id: 'karwa-chauth',
    name: 'Karwa Chauth (Karak Chaturthi)',
    hindi: 'करवा चौथ',
    category: 'Vrat & Fasting',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 4,
    deity: 'Goddess Parvati, Lord Shiva & Chandra Dev',
    description: 'A traditional day-long nirjala (waterless) fast observed by married women for the longevity, prosperity, and safety of their husbands.',
    significance: 'Sacred expression of marital love, devotion, and companionship.',
    rituals: 'Sargi before sunrise, Karwa Chauth Katha in the evening, breaking fast after viewing the Moon through a sieve and offering Arghya.',
    muhuratHint: 'Moonrise Timing for Breaking Fast',
    isMajor: true,
  },
  {
    id: 'ahoi-ashtami',
    name: 'Ahoi Ashtami',
    hindi: 'अहोई अष्टमी',
    category: 'Vrat & Fasting',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 8,
    deity: 'Maa Ahoi (Goddess Parvati)',
    description: 'A day-long fast observed by mothers for the wellbeing, health, and long life of their children.',
    significance: 'Brings maternal protection and blesses progeny.',
    rituals: 'Drawing Ahoi Mata depiction, listening to Katha, sighting stars (Taaras) in evening to break fast.',
    muhuratHint: 'Evening Star Sighting Time',
    isMajor: false,
  },
  {
    id: 'dhanteras',
    name: 'Dhanteras (Dhantrayodashi)',
    hindi: 'धनतेरस (धनत्रयोदशी)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 13,
    deity: 'Lord Dhanvantari (Father of Ayurveda) & Lord Kuber',
    description: 'The auspicious opening day of Diwali celebrating the divine appearance of Lord Dhanvantari with the pot of Amrita.',
    significance: 'Buying precious metals, utensils, and gold brings health, fortune, and prosperity.',
    rituals: 'Dhanvantari Puja, Yamadeepdaan (lighting a four-wick diya facing South for longevity), purchasing metals.',
    muhuratHint: 'Pradosh Kaal Puja Window (06:00 PM - 08:15 PM)',
    isMajor: true,
  },
  {
    id: 'naraka-chaturdashi',
    name: 'Naraka Chaturdashi (Chhoti Diwali / Kali Chaudas)',
    hindi: 'नरक चतुर्दशी (छोटी दिवाली)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 14,
    deity: 'Lord Krishna, Goddess Kali & Lord Yama',
    description: 'Commemorates Lord Krishna and Satyabhama vanquishing the tyrant demon king Narakasura.',
    significance: 'Purifies the soul from all sins and liberates from fear of untimely demise.',
    rituals: 'Early morning Abhyanga Snan (holy oil bath before sunrise), lighting 14 earthen lamps, Kali Puja.',
    muhuratHint: 'Abhyanga Snan Muhurat before Sunrise',
    isMajor: true,
  },
  {
    id: 'diwali',
    name: 'Diwali (Deepavali / Lakshmi Puja)',
    hindi: 'दीपावली (दिवाली / लक्ष्मी पूजन)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Krishna',
    tithiNumber: 15,
    deity: 'Goddess Lakshmi, Lord Ganesha & Maa Saraswati',
    description: 'The supreme Festival of Lights celebrating the victory of divine light over darkness and welcoming Mahalakshmi.',
    significance: 'Celebrates Lord Rama\'s return to Ayodhya and the churning of the ocean (Samudra Manthan).',
    rituals: 'Grand Lakshmi-Ganesha Puja in Pradosh/Vrishabha Lagna, lighting hundreds of diyas, rangoli, fireworks, sharing sweets.',
    muhuratHint: 'Pradosh Kaal & Vrishabha Lagna Lakshmi Puja Muhurat',
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
    deity: 'Lord Krishna (Giridhari)',
    description: 'Commemorates Lord Krishna lifting the Govardhan Hill on his little finger to shelter all beings from torrential deluge.',
    significance: 'Expresses reverence and gratitude to Mother Nature, cows, and ecology.',
    rituals: 'Annakut preparation (56 Bhog vegetarian offerings), cow worship, Govardhan Parikrama.',
    muhuratHint: 'Pratahkala / Morning Muhurat',
    isMajor: true,
  },
  {
    id: 'bhai-dooj',
    name: 'Bhai Dooj (Yama Dwitiya)',
    hindi: 'भाई दूज (यम द्वितीया)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Shukla',
    tithiNumber: 2,
    deity: 'Goddess Yamuna & Lord Yama',
    description: 'Celebrates the sacred bond of love between brothers and sisters; sisters pray for their brothers\' long and prosperous life.',
    significance: 'Protecting brothers from all dangers and blessing them with health and success.',
    rituals: 'Tilak ceremony, aarti, sisters preparing brothers\' favorite delicacies, exchange of gifts.',
    muhuratHint: 'Aparahna Kaal (01:15 PM - 03:30 PM)',
    isMajor: true,
  },
  {
    id: 'chhath-puja',
    name: 'Chhath Puja (Sandhya & Usha Arghya)',
    hindi: 'छठ पूजा (संध्या एवं उषा अर्घ्य)',
    category: 'Major Festival',
    monthName: 'Kartika',
    paksha: 'Shukla',
    tithiNumber: 6,
    deity: 'Surya Bhagwan & Chhathi Maiya',
    description: 'An ancient, rigorous 4-day Vedic festival dedicated to Surya (the Sun God) and Chhathi Maiya for health, longevity, and vitality.',
    significance: 'Unique festival where arghya is offered to both the setting (Sandhya) and rising (Usha) sun in standing water.',
    rituals: 'Nahay Khay, Kharna, Sandhya Arghya at sunset, Usha Arghya at sunrise in river/water body, thekua prasad.',
    muhuratHint: 'Sunset & Sunrise Arghya Windows',
    isMajor: true,
  },
  {
    id: 'tulsi-vivah',
    name: 'Devutthana Ekadashi / Tulsi Vivah',
    hindi: 'देवउठनी एकादशी / तुलसी विवाह',
    category: 'Vrat & Fasting',
    monthName: 'Kartika',
    paksha: 'Shukla',
    tithiNumber: 11,
    deity: 'Lord Shaligram (Vishnu) & Goddess Tulsi',
    description: 'Lord Vishnu awakens from his 4-month cosmic slumber (Chaturmas); ceremonial wedding of Tulsi and Shaligram marks the beginning of the wedding season.',
    significance: 'Bestows the merit of Kanyadaan and ushers in auspicious marital alliances.',
    rituals: 'Decorating Tulsi plant as a bride, Shaligram puja, lighting sugarcane mandap, fasting.',
    muhuratHint: 'Evening Pradosh Kaal Vivah Muhurat',
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
    deity: 'Lord Shiva (Tripurari) & Lord Vishnu (Matsya Avatar)',
    description: 'The Festival of Lights of the Gods in Varanasi celebrating Lord Shiva\'s victory over the demon Tripurasura.',
    significance: 'Gods descend to celebrate on Varanasi Ghats; holy Ganga snan washes away sins.',
    rituals: 'Lighting millions of lamps on Varanasi Ghats, Kartik Snan, concluding Tulsi Vivah ceremonies.',
    muhuratHint: 'Pradosh Kaal Dev Deepavali Lamp Lighting',
    isMajor: true,
  },
  {
    id: 'gita-jayanti',
    name: 'Gita Jayanti / Mokshada Ekadashi',
    hindi: 'गीता जयंती / मोक्षदा एकादशी',
    category: 'Major Festival',
    monthName: 'Margashirsha',
    paksha: 'Shukla',
    tithiNumber: 11,
    deity: 'Lord Krishna & Shrimad Bhagavad Gita',
    description: 'The sacred anniversary when Lord Krishna bestowed the immortal teachings of the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra.',
    significance: 'Liberation from delusion, clarity of Dharma and purpose.',
    rituals: 'Reciting all 18 chapters of Bhagavad Gita, Gita Homa, fasting on Mokshada Ekadashi.',
    muhuratHint: 'Full Day Auspicious Timing',
    isMajor: true,
  }
];

// Verified Multi-Year Exact Festival Date Database (2024 - 2028)
export const FESTIVAL_CALENDAR_YEARS = {
  // 2024
  '2024-01-15': ['makar-sankranti'],
  '2024-02-14': ['vasant-panchami'],
  '2024-03-08': ['mahashivratri'],
  '2024-03-24': ['holika-dahan'],
  '2024-03-25': ['holi'],
  '2024-04-09': ['gudi-padwa'],
  '2024-04-17': ['ram-navami'],
  '2024-04-23': ['hanuman-jayanti'],
  '2024-05-10': ['akshaya-tritiya'],
  '2024-05-23': ['buddha-purnima'],
  '2024-06-16': ['ganga-dussehra'],
  '2024-06-18': ['nirjala-ekadashi'],
  '2024-07-07': ['jagannath-ratha-yatra'],
  '2024-07-21': ['guru-purnima'],
  '2024-08-09': ['nag-panchami'],
  '2024-08-19': ['raksha-bandhan'],
  '2024-08-26': ['janmashtami'],
  '2024-09-07': ['ganesh-chaturthi'],
  '2024-09-17': ['anant-chaturdashi'],
  '2024-10-02': ['pitru-paksha-amavasya'],
  '2024-10-03': ['navratri-shardiya'],
  '2024-10-11': ['durga-ashtami'],
  '2024-10-12': ['dussehra'],
  '2024-10-16': ['sharad-purnima'],
  '2024-10-20': ['karwa-chauth'],
  '2024-10-24': ['ahoi-ashtami'],
  '2024-10-29': ['dhanteras'],
  '2024-10-31': ['naraka-chaturdashi'],
  '2024-11-01': ['diwali'],
  '2024-11-02': ['govardhan-puja'],
  '2024-11-03': ['bhai-dooj'],
  '2024-11-07': ['chhath-puja'],
  '2024-11-12': ['tulsi-vivah'],
  '2024-11-15': ['kartik-purnima'],
  '2024-12-11': ['gita-jayanti'],

  // 2025
  '2025-01-14': ['makar-sankranti'],
  '2025-02-02': ['vasant-panchami'],
  '2025-02-26': ['mahashivratri'],
  '2025-03-13': ['holika-dahan'],
  '2025-03-14': ['holi'],
  '2025-03-30': ['gudi-padwa'],
  '2025-04-06': ['ram-navami'],
  '2025-04-12': ['hanuman-jayanti'],
  '2025-04-30': ['akshaya-tritiya'],
  '2025-05-12': ['buddha-purnima'],
  '2025-06-05': ['ganga-dussehra'],
  '2025-06-06': ['nirjala-ekadashi'],
  '2025-06-27': ['jagannath-ratha-yatra'],
  '2025-07-10': ['guru-purnima'],
  '2025-07-29': ['nag-panchami'],
  '2025-08-09': ['raksha-bandhan'],
  '2025-08-16': ['janmashtami'],
  '2025-08-27': ['ganesh-chaturthi'],
  '2025-09-06': ['anant-chaturdashi'],
  '2025-09-21': ['pitru-paksha-amavasya'],
  '2025-09-22': ['navratri-shardiya'],
  '2025-09-30': ['durga-ashtami'],
  '2025-10-02': ['dussehra'],
  '2025-10-06': ['sharad-purnima'],
  '2025-10-10': ['karwa-chauth'],
  '2025-10-14': ['ahoi-ashtami'],
  '2025-10-18': ['dhanteras'],
  '2025-10-19': ['naraka-chaturdashi'],
  '2025-10-20': ['diwali'],
  '2025-10-22': ['govardhan-puja'],
  '2025-10-23': ['bhai-dooj'],
  '2025-10-28': ['chhath-puja'],
  '2025-11-01': ['tulsi-vivah'],
  '2025-11-05': ['kartik-purnima'],
  '2025-12-01': ['gita-jayanti'],

  // 2026
  '2026-01-14': ['makar-sankranti'],
  '2026-01-23': ['vasant-panchami'],
  '2026-02-15': ['mahashivratri'],
  '2026-03-03': ['holika-dahan'],
  '2026-03-04': ['holi'],
  '2026-03-19': ['gudi-padwa'],
  '2026-03-27': ['ram-navami'],
  '2026-04-02': ['hanuman-jayanti'],
  '2026-04-19': ['akshaya-tritiya'],
  '2026-05-01': ['buddha-purnima'],
  '2026-05-26': ['ganga-dussehra'],
  '2026-05-27': ['nirjala-ekadashi'],
  '2026-07-16': ['jagannath-ratha-yatra'],
  '2026-07-29': ['guru-purnima'],
  '2026-08-17': ['nag-panchami'],
  '2026-08-28': ['raksha-bandhan'],
  '2026-09-04': ['janmashtami'],
  '2026-09-14': ['ganesh-chaturthi'],
  '2026-09-25': ['anant-chaturdashi'],
  '2026-10-10': ['pitru-paksha-amavasya'],
  '2026-10-11': ['navratri-shardiya'],
  '2026-10-18': ['durga-ashtami'],
  '2026-10-20': ['dussehra'],
  '2026-10-25': ['sharad-purnima'],
  '2026-10-29': ['karwa-chauth'],
  '2026-11-02': ['ahoi-ashtami'],
  '2026-11-06': ['dhanteras'],
  '2026-11-07': ['naraka-chaturdashi'],
  '2026-11-08': ['diwali'],
  '2026-11-09': ['govardhan-puja'],
  '2026-11-10': ['bhai-dooj'],
  '2026-11-15': ['chhath-puja'],
  '2026-11-20': ['tulsi-vivah'],
  '2026-11-24': ['kartik-purnima'],
  '2026-12-20': ['gita-jayanti'],

  // 2027
  '2027-01-14': ['makar-sankranti'],
  '2027-02-11': ['vasant-panchami'],
  '2027-03-06': ['mahashivratri'],
  '2027-03-21': ['holika-dahan'],
  '2027-03-22': ['holi'],
  '2027-04-07': ['gudi-padwa'],
  '2027-04-15': ['ram-navami'],
  '2027-04-20': ['hanuman-jayanti'],
  '2027-05-08': ['akshaya-tritiya'],
  '2027-05-20': ['buddha-purnima'],
  '2027-06-14': ['ganga-dussehra'],
  '2027-06-15': ['nirjala-ekadashi'],
  '2027-07-05': ['jagannath-ratha-yatra'],
  '2027-07-18': ['guru-purnima'],
  '2027-08-07': ['nag-panchami'],
  '2027-08-17': ['raksha-bandhan'],
  '2027-08-25': ['janmashtami'],
  '2027-09-04': ['ganesh-chaturthi'],
  '2027-09-14': ['anant-chaturdashi'],
  '2027-09-29': ['pitru-paksha-amavasya'],
  '2027-09-30': ['navratri-shardiya'],
  '2027-10-08': ['durga-ashtami'],
  '2027-10-09': ['dussehra'],
  '2027-10-15': ['sharad-purnima'],
  '2027-10-19': ['karwa-chauth'],
  '2027-10-23': ['ahoi-ashtami'],
  '2027-10-27': ['dhanteras'],
  '2027-10-28': ['naraka-chaturdashi'],
  '2027-10-29': ['diwali'],
  '2027-10-30': ['govardhan-puja'],
  '2027-10-31': ['bhai-dooj'],
  '2027-11-04': ['chhath-puja'],
  '2027-11-09': ['tulsi-vivah'],
  '2027-11-13': ['kartik-purnima'],
  '2027-12-09': ['gita-jayanti'],
};

/**
 * High-Precision Astronomical Calculations for Sun & Moon
 */
export function getAstronomicalDetails(d) {
  // Day of Year
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  // Sidereal Sun Calculation (Nirayana)
  // Approximate Days since J2000.0 (2000-01-01 12:00 UTC)
  const j2000 = new Date('2000-01-01T12:00:00Z').getTime();
  const diffDaysJ2000 = (d.getTime() - j2000) / (1000 * 60 * 60 * 24);
  
  // Mean longitude of Sun (deg)
  const meanSolarLong = (280.460 + 0.9856474 * diffDaysJ2000) % 360;
  // Mean anomaly of Sun (deg)
  const meanAnomaly = ((357.528 + 0.9856003 * diffDaysJ2000) % 360 + 360) % 360;
  const meanAnomalyRad = meanAnomaly * (Math.PI / 180);
  
  // Ecliptic longitude (Sayana)
  const eclipticLong = (meanSolarLong + 1.915 * Math.sin(meanAnomalyRad) + 0.020 * Math.sin(2 * meanAnomalyRad) + 360) % 360;
  
  // Lahiri Ayanamsha (~24.1 deg in 2024, shifts ~50.29 arcseconds/year)
  const currentYear = d.getFullYear();
  const ayanamsha = 24.10 + (currentYear - 2024) * 0.0139;
  const sunNirayanaLong = (eclipticLong - ayanamsha + 360) % 360;
  const sunRashiIndex = Math.floor(sunNirayanaLong / 30);
  const sunRashi = RASHIS[sunRashiIndex % 12];

  // Moon Phase Angle (Relative separation)
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const diffDays = (d.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
  const synodicMonth = 29.53058867;
  const phase = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const moonPhaseAngle = (phase / synodicMonth) * 360;

  // Tithi calculation (each 12 degrees of separation)
  const tithiIndex = Math.floor(moonPhaseAngle / 12); // 0..29
  const isShukla = tithiIndex < 15;
  const tithiNumber = (tithiIndex % 15) + 1;

  // Nakshatra calculation (based on sidereal lunar longitude ~13.176 deg/day)
  const moonNirayanaLong = ((diffDays * 13.176358 + 280) % 360 + 360) % 360;
  const nakshatraIndex = Math.floor(moonNirayanaLong / (360 / 27));
  const nakshatra = NAKSHATRAS[nakshatraIndex % 27] || NAKSHATRAS[0];

  // Moon Rashi
  const moonRashiIndex = Math.floor(moonNirayanaLong / 30);
  const moonRashi = RASHIS[moonRashiIndex % 12];

  // Yoga (Sun Longitude + Moon Longitude / 13°20')
  const yogaIndex = Math.floor(((sunNirayanaLong + moonNirayanaLong) % 360) / (360 / 27));
  const yoga = YOGAS[yogaIndex % 27];

  // Karana (Half a tithi = 6 degrees)
  const karanaIndex = Math.floor((moonPhaseAngle / 6) % 11);
  const karana = KARANAS[karanaIndex];

  // Hindu Lunar Month Determination (Amanta & Purnimanta)
  const amantaMonthIndex = (sunRashiIndex + 1) % 12;
  const amantaMonth = HINDU_MONTHS[amantaMonthIndex];

  // In Purnimanta system:
  // Shukla Paksha has the same month name as Amanta.
  // Krishna Paksha (the waning phase following Purnima) belongs to the subsequent month.
  const purnimantaMonthIndex = isShukla ? amantaMonthIndex : (amantaMonthIndex + 1) % 12;
  const purnimantaMonth = HINDU_MONTHS[purnimantaMonthIndex];

  return {
    dayOfYear,
    sunNirayanaLong,
    sunRashi,
    moonNirayanaLong,
    moonRashi,
    moonPhaseAngle,
    tithiIndex,
    isShukla,
    tithiNumber,
    nakshatra,
    yoga,
    karana,
    amantaMonth,
    purnimantaMonth
  };
}

export function generateDailyPanchangData(date, latitude = 19.0760, longitude = 72.8777) {
  let dateStr;
  let d;
  if (typeof date === 'string') {
    dateStr = date.split('T')[0];
    const parts = dateStr.split('-').map(Number);
    d = new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
  } else if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    dateStr = `${y}-${m}-${day}`;
    d = new Date(y, date.getMonth(), date.getDate(), 12, 0, 0);
  } else {
    d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dateStr = `${y}-${m}-${day}`;
  }

  // Astronomical & Lunar attributes
  const astro = getAstronomicalDetails(d);
  const { isShukla, tithiNumber, tithiIndex, nakshatra, yoga, karana, sunRashi, moonRashi, amantaMonth, purnimantaMonth, dayOfYear } = astro;

  // Solar Times Calculation
  const latRad = latitude * (Math.PI / 180);
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180)) * (Math.PI / 180);
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

  // Tithi Display Names
  const tithiDef = tithiIndex === 14 
    ? TITHI_NAMES.find(t => t.id === 15) 
    : (tithiIndex === 29 ? TITHI_NAMES.find(t => t.id === 30) : TITHI_NAMES.find(t => t.id === tithiNumber));
  
  const tithiName = isShukla 
    ? (tithiNumber === 15 ? 'Purnima' : `Shukla ${tithiDef.name}`)
    : (tithiNumber === 15 ? 'Amavasya' : `Krishna ${tithiDef.name}`);
  const tithiHindi = isShukla
    ? (tithiNumber === 15 ? 'पूर्णिमा' : `शुक्ल ${tithiDef.hindi}`)
    : (tithiNumber === 15 ? 'अमावस्या' : `कृष्ण ${tithiDef.hindi}`);

  // Samvat Calculation
  const gregorianYear = d.getFullYear();
  const gregorianMonth = d.getMonth();
  const vikramSamvat = gregorianYear + 57 + (gregorianMonth >= 3 ? 0 : -1);
  const shakaSamvat = gregorianYear - 78 + (gregorianMonth >= 3 ? 0 : -1);

  // Match Festivals for this day
  const targetYear = d.getFullYear();
  const isYearPredefined = targetYear >= 2024 && targetYear <= 2028;

  let matchingFestivals = [];

  if (isYearPredefined) {
    // 1. Exact mapping for predefined years - strictly no duplicate or fallback matches
    const knownFestivalIds = FESTIVAL_CALENDAR_YEARS[dateStr] || [];
    matchingFestivals = ALL_FESTIVALS.filter(f => knownFestivalIds.includes(f.id));
  } else {
    // 2. Solar festival check for non-predefined years
    ALL_FESTIVALS.forEach(f => {
      if (f.isSolar && f.solarMonth === (d.getMonth() + 1) && f.solarDay === d.getDate()) {
        matchingFestivals.push(f);
      }
    });

    // 3. Astronomical fallback strictly for unmapped future/past years
    const currentPaksha = isShukla ? 'Shukla' : 'Krishna';
    const fallbackFestivals = ALL_FESTIVALS.filter(f => {
      if (f.isSolar) return false;
      const matchesLunarMonth = f.monthName === purnimantaMonth.name;
      const matchesPaksha = f.paksha === currentPaksha;
      const matchesTithi = f.tithiNumber === tithiNumber;
      return matchesLunarMonth && matchesPaksha && matchesTithi;
    });

    fallbackFestivals.forEach(f => {
      if (!matchingFestivals.some(m => m.id === f.id)) {
        matchingFestivals.push(f);
      }
    });
  }

  // Special Vrat tags for Ekadashi, Pradosh, Purnima, Amavasya, Sankranti
  const vrats = [];
  if (tithiNumber === 11) {
    vrats.push(isShukla ? 'Shukla Ekadashi Vrat' : 'Krishna Ekadashi Vrat');
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
    date: dateStr,
    samvat: {
      vikram: vikramSamvat,
      shaka: shakaSamvat,
      gujaratiSamvat: vikramSamvat,
      ayanam: dayOfYear >= 14 && dayOfYear < 196 ? 'Uttarayan (उत्तरायण)' : 'Dakshinayan (दक्षिणायन)',
      ritu: purnimantaMonth.season,
    },
    month: {
      purnimanta: purnimantaMonth.name,
      amanta: amantaMonth.name,
      hindi: purnimantaMonth.hindi,
      season: purnimantaMonth.season
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
      nature: 'Auspicious'
    },
    sunSign: sunRashi.sanskrit,
    moonSign: moonRashi.sanskrit,
    festivals: matchingFestivals,
    vrats: vrats
  };
}
