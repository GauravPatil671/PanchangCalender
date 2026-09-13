export default {
  // Navigation & Header
  nav: {
    todayPanchang: "Today's Panchang",
    dailyPanchang: 'Daily Panchang',
    calendar: 'Calendar',
    festivals: 'Festivals',
    muhurat: 'Muhurat & Choghadiya',
    simulation: 'Celestial 3D',
    about: 'About Panchang',
    location: 'Location',
    change: 'Change',
    changeCityTitle: 'Change city or location',
    theme: 'Theme Mode',
    dark: 'Dark',
    light: 'Light',
    switchToDark: 'Switch to Dark mode',
    switchToLight: 'Switch to Light mode',
    language: 'Language',
    menuOpen: 'Open navigation menu',
    menuClose: 'Close menu',
    skipToContent: 'Skip to main content'
  },

  // Today's Panchang Hero
  hero: {
    badge: "Today's Panchang",
    subBadge: 'दैनिक पञ्चाङ्गम्',
    samvatPrefix: 'VS',
    maas: 'Maas',
    ritu: 'Ritu',
    statusUntil: 'Today is {tithi} until {time}.',
    statusActive: 'Today is {sunriseTithi} until {time}; {currentTithi} is now active.',
    statusSimple: 'Today is {tithi} in {paksha}.'
  },

  // Decision Cards
  cards: {
    currentTithiTitle: 'Current Tithi & Nakshatra',
    activeNow: 'Active Now',
    nakshatraUntil: '{name} (until {time})',
    deityGuidance: 'Presided by deity {deity}; {nature} nature.',
    defaultTithiGuidance: 'Prevailing lunar day and celestial asterism for daily duties.',
    
    bestTimeTitle: 'Best Time Today',
    shubhMuhuratBadge: 'Shubh Muhurat',
    bestTimeGuidance: 'Most auspicious planetary window of the day for starting important deeds, meetings, and prayers.',
    
    avoidTitle: 'Avoid Today',
    ashubhKaalBadge: 'Ashubh Kaal',
    rahuKalamTitle: 'Rahu Kalam (राहु काल)',
    avoidGuidance: 'Inauspicious planetary span; avoid initiating new ventures, travel, or critical agreements.'
  },

  // Accordions Section
  accordions: {
    sectionTitle: "Explore Today's Details",
    sectionHindi: 'विस्तृत विवरण',
    sectionSubtitle: 'Tap any section below for in-depth Vedic calculations, tables, and planetary timings.',
    
    fiveLimbsTitle: 'Five Limbs of Panchang',
    fiveLimbsHindi: 'पञ्चाङ्ग के पाँच अंग',
    exploreDailyLink: 'Explore Daily Panchang Calendar',

    auspiciousTitle: 'All Auspicious Timings',
    auspiciousHindi: 'शुभ मुहूर्त',
    viewMuhuratHub: 'View Full Muhurat Directory',

    inauspiciousTitle: 'Inauspicious Timings',
    inauspiciousHindi: 'अशुभ काल',

    choghadiyaTitle: 'Day & Night Choghadiya',
    choghadiyaHindi: 'दिन एवं रात का चौघड़िया',
    choghadiyaSummary: '16 Planetary Time Slots (Amrit, Shubh, Labh, Char, Rog, Kaal, Udveg)',

    sunMoonTitle: 'Sun and Moon Timings',
    sunMoonHindi: 'सूर्य एवं चन्द्र गणना',

    festivalsTitle: 'Festivals and Vrats',
    festivalsHindi: 'पर्व एवं व्रत',
    eventsCount: '{count} event(s) observed today',
    majorFestivalsSummary: 'Major Hindu festivals and fasting observances',
    exploreFestivalsLink: 'Explore Complete Festival Directory'
  },

  // Daily Panchang Page
  daily: {
    ephemerisLabel: 'Daily Panchang Ephemeris',
    prev: 'Prev',
    next: 'Next',
    jumpTo: 'Jump to:',
    jumpLimbs: '5 Limbs (Tithi & Nakshatra)',
    jumpMuhurat: 'Shubh Muhurat',
    jumpRahu: 'Rahu Kalam & Inauspicious',
    limbsTitle: 'Vedic Panchangam Limbs',
    limbsHindi: 'पञ्चाङ्ग विवरण',
    limbsSubtitle: 'Detailed Tithi, Nakshatra, Yoga, Karana, Samvat and Vrat for {date}',
    auspiciousTitle: 'Auspicious Timings & Shubh Muhurat',
    auspiciousSubtitle: 'Beneficial celestial windows for auspicious rituals, new business, and travel',
    sunMoonSubtitle: 'Timings computed for latitude {lat}°, longitude {lng}°',
    essentialHighlights: 'Essential Daily Highlights',
    udayatithiBased: 'Udayatithi (Sunrise) Based',
    tithiAtSunrise: 'Tithi at Sunrise',
    rashiSuffix: 'Rashi',
    transitTitle: 'Astronomical Sun & Moon Transit for {city}',
    solarNoon: 'Solar Noon',
    sunMoonSign: 'Sun / Moon',
    todayFestivalTitle: "Today's Hindu Festival & Celebration",
    viewPujaVidhi: 'View Puja Vidhi',
    viewFullLink: 'View Full Daily Panchang'
  },

  // Calendar Page
  calendar: {
    badge: 'Vedic Monthly Almanac',
    title: 'Hindu Panchang Calendar',
    desc: 'Monthly lunar calendar featuring daily Tithis, Ekadashi fasts, Purnima, Amavasya, and major Hindu festivals.',
    filterView: 'Filter View:',
    filterAll: 'All Dates',
    filterFestivals: '✨ Major Festivals ({count})',
    filterEkadashi: '🌾 Ekadashi Vrats',
    filterPurnima: '🌕 Purnima & 🌑 Amavasya',
    monthFestivalsTitle: 'Festivals & Important Vrats in this Month ({count})',
    clickCardHint: 'Click any card to open day details',
    symbolsTitle: 'Calendar Symbols:',
    purnimaLabel: 'Purnima',
    purnimaDesc: '(Full Moon)',
    amavasyaLabel: 'Amavasya',
    amavasyaDesc: '(New Moon)',
    ekadashiLabel: 'Ekadashi',
    ekadashiDesc: '(Fasting)',
    festivalLabel: 'Festival',
    detailsTitle: 'Day Panchang Details',
    viewFullDayPanchang: 'Full Day Panchang'
  },

  // Festivals Page
  festivals: {
    badge: 'Sacred Hindu Vrats & Celebrations',
    title: 'Hindu Festival Calendar',
    desc: 'Explore upcoming Hindu festivals, fasting dates (vrat), significance, deities, and auspicious puja timings.',
    searchPlaceholder: 'Search festivals by name, deity (e.g. Diwali, Shiva, Krishna)...',
    typeFilter: 'Type:',
    monthFilter: 'Month:',
    allMonths: 'All Hindu Months',
    allCategories: 'All',
    majorFestival: 'Major Festival',
    vratFasting: 'Vrat & Fasting',
    solarFestival: 'Solar Festival',
    showingCount: 'Showing {count} festivals',
    resetFilters: 'Reset Filters',
    emptyTitle: 'No Festivals Found',
    emptyDesc: 'No festivals matched your current search filters. Try clearing the search query or selecting "All" categories.',
    rulingDeity: 'Ruling Deity:',
    viewRituals: 'View Rituals & Vidhi',
    dayPanchangBtn: 'Day Panchang',
    significanceTitle: 'Significance & Spiritual Meaning',
    ritualsTitle: 'Puja Rituals & Fasting Vidhi',
    muhuratHintTitle: 'Auspicious Puja Timings'
  },

  // Muhurat Page
  muhurat: {
    badge: 'Vedic Auspicious Timing',
    title: 'Shubh Muhurat & Choghadiya',
    desc: 'Find auspicious astrological windows for commencing new business ventures, Griha Pravesh, vehicle purchases, sacred rituals, and journeys.',
    selectedDate: 'Selected Date:',
    auspiciousTitle: 'Auspicious Muhurats',
    auspiciousSubtitle: 'Computed for {date} at {city}'
  },

  // Choghadiya Component
  choghadiya: {
    title: 'Choghadiya Muhurat (चौघड़िया)',
    subtitle: 'Ancient 8-part division of day and night for traveling, business commencement, and auspicious deeds',
    dayTab: 'Day (दिन)',
    nightTab: 'Night (रात)',
    qualityGuide: 'Quality Guide:',
    bestAuspicious: 'Amrit / Shubh / Labh (Best / Auspicious)',
    neutralTransit: 'Chal (Neutral / Good for Transit)',
    inauspiciousAvoid: 'Rog / Kaal / Udveg (Inauspicious / Avoid)',
    timingWindow: 'Timing Window',
    auspiciousBadge: 'Auspicious',
    neutralBadge: 'Neutral',
    inauspiciousBadge: 'Inauspicious'
  },

  // Celestial Simulation Page
  simulation: {
    badge: 'Real-Time 3D Celestial Model',
    title: 'Interactive 3D Celestial Simulation',
    subtitle: 'Observe the real-time orbital geometry of Earth, Moon, and Sun calculating the Tithi angle and lunar phase.',
    tithiAngleTab: 'Tithi & Angle',
    planetInfoTab: 'Planet Info',
    eclipseModeTab: 'Eclipse Mode',
    scaledNotice: '* Distances and sizes visually scaled for educational clarity',
    topView: 'Top',
    earthView: 'Earth View',
    isoView: '3D View',
    sunView: 'Sun View',
    speed1x: '1x',
    speedDay: '1 Day/s',
    speedMonth: '1 Mo/s'
  },

  // About Page
  about: {
    badge: 'Vedic Astronomical Heritage',
    title: 'Understanding the Hindu Panchang',
    intro: 'Panchang (Sanskrit: पञ्चाङ्गम्) literally translates to "Five Limbs". It is the timekeeping system of Vedic astronomy (Jyotisha) that harmonizes solar and lunar cycles.',
    fiveLimbsTitle: 'The Five Limbs of Panchang',
    fiveLimbsSubtitle: 'The five fundamental astronomical coordinates calculated for each day',
    tithiTitle: '1. Tithi (तिथि) — Lunar Day',
    tithiDesc: 'A Tithi is the time duration in which the longitudinal angle between the Sun and the Moon increases by 12 degrees. There are 30 Tithis in a lunar month: 15 in Shukla Paksha (waxing fortnight ending in Purnima) and 15 in Krishna Paksha (waning fortnight ending in Amavasya).',
    tithiHighlight: '✨ Signifies mental vitality, auspicious timings for fasting (vrat), and spiritual rituals.',
    varaTitle: '2. Vara (वार) — Solar Weekday',
    varaDesc: 'The 7 solar weekdays, each ruled by a specific cosmic deity and planetary energy (Ravivara = Sun, Somavara = Moon, Mangalavara = Mars, Budhavara = Mercury, Guruvara = Jupiter, Shukravara = Venus, Shanivara = Saturn).',
    varaHighlight: '✨ Bestows physical vitality, longevity (Ayushya), and bodily vigor.',
    nakshatraTitle: '3. Nakshatra (नक्षत्र) — Lunar Mansion',
    nakshatraDesc: "The 360° zodiac is divided into 27 Nakshatras (lunar asterisms) of 13°20' each, traversed by the Moon every ~27.3 days. Nakshatras from Ashwini to Revati govern innate temperament and karmic tendencies.",
    nakshatraHighlight: '✨ Eradicates ill karma and determines favorable periods for major life actions.',
    yogaTitle: '4. Yoga (योग) — Solilunar Sum',
    yogaDesc: "Calculated by adding the sidereal longitudes of the Sun and the Moon and dividing into 27 segments of 13°20' each. Certain Yogas (like Siddhi, Shubha, Amrita) are extremely auspicious, while others (like Vyatipata, Vaidhriti) require caution.",
    yogaHighlight: '✨ Protects against disease and promotes physical health and harmony.',
    karanaTitle: '5. Karana (करण) — Half Tithi',
    karanaDesc: 'A Karana is half of a Tithi (6 degrees of Sun-Moon separation). There are 11 Karanas in total: 7 movable (Chara: Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti/Bhadra) and 4 fixed (Sthira: Shakuni, Chatushpada, Naga, Kintughna).',
    karanaHighlight: '✨ Ensures success in actions, business contracts, voyages, and worldly tasks.',
    samvatTitle: 'Hindu Calendrical Eras (Samvat)',
    samvatSubtitle: 'The historical and astronomical epochs used across India',
    vikramTitle: 'Vikram Samvat (विक्रम संवत)',
    vikramDesc: 'Founded by the legendary Emperor Vikramaditya of Ujjain in 57 BCE to commemorate victory over Saka invaders. It is approximately 57 years ahead of the Gregorian calendar. The New Year starts on Chaitra Shukla Pratipada (in North/West India) or Kartika Shukla Pratipada (in Gujarat).',
    shakaTitle: 'Shaka Samvat (शक संवत)',
    shakaDesc: 'Established by King Shalivahana in 78 CE. It is approximately 78 years behind the Gregorian calendar and serves as the National Calendar of the Republic of India alongside astronomical almanacs across South India, Maharashtra, and Bengal.',
    locationTitle: 'Why Location Matters in Panchang Calculations',
    locationSubtitle: 'The role of local Sunrise (Suryodaya)',
    locationDesc1: 'In the Hindu Vedic tradition, a day begins precisely at the moment of local Sunrise (सूर्योदय), not at midnight. Therefore, all daily tithis, Choghadiya periods, Rahu Kalam, and auspicious Muhurats strictly depend on your geographical Latitude and Longitude.',
    locationDesc2: 'For instance, Sunrise occurs approximately 1 hour earlier in Kolkata than in Mumbai. Our application computes precise solar angles and local ephemeris coordinates for over 50 Indian cities and global coordinates to ensure 100% astronomical accuracy.'
  },

  // Location Selector Modal
  locationModal: {
    title: 'Select Location',
    subtitle: 'Calculations will adjust for local sunrise and coordinates',
    searchPlaceholder: 'Search city or state (e.g. Mumbai, Delhi, Varanasi)...',
    detectBtn: 'Detect Current Location',
    detecting: 'Locating...',
    allStates: 'All States / Regions',
    stateLabel: 'State:',
    popularTitle: 'Popular Indian & Global Cities',
    selectedBadge: 'Active',
    noCityFound: 'No cities matched your search query.'
  },

  // 404 Page
  notFound: {
    title: '404 - Page Not Found',
    desc: 'The auspicious celestial path you are looking for does not exist or has moved.',
    returnHome: "Return to Today's Panchang"
  },

  // Common & Footer
  common: {
    loading: 'Loading Vedic Panchang data...',
    errorTitle: 'Something went wrong',
    retry: 'Retry',
    refreshPage: 'Refresh Page',
    viewDetails: 'View Details',
    learnMore: 'Learn More',
    today: 'Today',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    moonrise: 'Moonrise',
    moonset: 'Moonset',
    ends: 'Ends',
    deity: 'Deity',
    nature: 'Nature',
    lord: 'Lord',
    zodiac: 'Zodiac',
    collapse: 'Collapse',
    showSection: 'Show Section',
    clear: 'Clear'
  },

  footer: {
    tagline: 'Authentic Vedic ephemeris, Hindu calendar, and astronomical calculations.',
    quickLinks: 'Quick Links',
    pages: 'Calendar Pages',
    aboutTitle: 'About Vedic Panchang',
    aboutText: 'The Panchang is the five-limbed Vedic calendar combining Tithi, Vara, Nakshatra, Yoga, and Karana to harmonize human action with celestial rhythms.',
    disclaimer: 'All calculations are computed using standard high-precision astronomical algorithms and classical Drik Ganita methods.'
  }
};
