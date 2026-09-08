import React, { useEffect } from 'react';
import { 
  BookOpen, 
  Compass, 
  Sparkles, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Globe, 
  Award,
  Layers
} from 'lucide-react';
import { updatePageSeo } from '../utils/seoUtils';
import SectionHeader from '../components/common/SectionHeader';

export default function AboutPage() {
  useEffect(() => {
    updatePageSeo(
      'About Hindu Panchang',
      'Understanding the Vedic Panchang, 5 Angas (Tithi, Vara, Nakshatra, Yoga, Karana), Vikram Samvat, and astronomical calculations.'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-700 dark:text-vedic-saffron-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Vedic Astronomical Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-stone-900 dark:text-white tracking-tight">
          Understanding the Hindu Panchang
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Panchang (Sanskrit: पञ्चाङ्गम्) literally translates to <em>"Five Limbs"</em>. It is the timekeeping system of Vedic astronomy (Jyotisha) that harmonizes solar and lunar cycles.
        </p>
      </div>

      {/* The 5 Angas Breakdown */}
      <section className="space-y-6">
        <SectionHeader
          title="The Five Limbs of Panchang"
          hindiTitle="पञ्चाङ्ग के पाँच अंग"
          subtitle="The five fundamental astronomical coordinates calculated for each day"
          icon={Layers}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Tithi */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold font-serif text-lg">
              <Moon className="w-5 h-5" />
              <span>1. Tithi (तिथि) — Lunar Day</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              A Tithi is the time duration in which the longitudinal angle between the Sun and the Moon increases by <strong>12 degrees</strong>. There are 30 Tithis in a lunar month: 15 in Shukla Paksha (waxing fortnight ending in Purnima) and 15 in Krishna Paksha (waning fortnight ending in Amavasya).
            </p>
            <div className="text-xs text-amber-800 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl">
              ✨ Signifies mental vitality, auspicious timings for fasting (vrat), and spiritual rituals.
            </div>
          </div>

          {/* 2. Vara */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-vedic-saffron-500">
            <div className="flex items-center gap-2 text-vedic-saffron-700 dark:text-vedic-saffron-400 font-bold font-serif text-lg">
              <Sun className="w-5 h-5" />
              <span>2. Vara (वार) — Solar Weekday</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              The 7 solar weekdays, each ruled by a specific cosmic deity and planetary energy (Ravivara = Sun, Somavara = Moon, Mangalavara = Mars, Budhavara = Mercury, Guruvara = Jupiter, Shukravara = Venus, Shanivara = Saturn).
            </p>
            <div className="text-xs text-vedic-saffron-800 dark:text-vedic-saffron-300 font-medium bg-vedic-saffron-50 dark:bg-vedic-saffron-950/40 p-2.5 rounded-xl">
              ✨ Bestows physical vitality, longevity (Ayushya), and bodily vigor.
            </div>
          </div>

          {/* 3. Nakshatra */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-vedic-gold-500">
            <div className="flex items-center gap-2 text-vedic-gold-700 dark:text-vedic-gold-400 font-bold font-serif text-lg">
              <Sparkles className="w-5 h-5" />
              <span>3. Nakshatra (नक्षत्र) — Lunar Mansion</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              The 360° zodiac is divided into <strong>27 Nakshatras</strong> (lunar asterisms) of 13°20' each, traversed by the Moon every ~27.3 days. Nakshatras from Ashwini to Revati govern innate temperament and karmic tendencies.
            </p>
            <div className="text-xs text-vedic-gold-800 dark:text-vedic-gold-300 font-medium bg-vedic-gold-50 dark:bg-vedic-gold-950/40 p-2.5 rounded-xl">
              ✨ Eradicates ill karma and determines favorable periods for major life actions.
            </div>
          </div>

          {/* 4. Yoga */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold font-serif text-lg">
              <Compass className="w-5 h-5" />
              <span>4. Yoga (योग) — Solilunar Sum</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Calculated by adding the sidereal longitudes of the Sun and the Moon and dividing into 27 segments of 13°20' each. Certain Yogas (like Siddhi, Shubha, Amrita) are extremely auspicious, while others (like Vyatipata, Vaidhriti) require caution.
            </p>
            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl">
              ✨ Protects against disease and promotes physical health and harmony.
            </div>
          </div>

          {/* 5. Karana */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-purple-500 md:col-span-2">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold font-serif text-lg">
              <ShieldCheck className="w-5 h-5" />
              <span>5. Karana (करण) — Half Tithi</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              A Karana is half of a Tithi (6 degrees of Sun-Moon separation). There are 11 Karanas in total: 7 movable (Chara: Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti/Bhadra) and 4 fixed (Sthira: Shakuni, Chatushpada, Naga, Kintughna).
            </p>
            <div className="text-xs text-purple-800 dark:text-purple-300 font-medium bg-purple-50 dark:bg-purple-950/40 p-2.5 rounded-xl">
              ✨ Ensures success in actions, business contracts, voyages, and worldly tasks.
            </div>
          </div>

        </div>
      </section>

      {/* Samvat Systems */}
      <section className="space-y-6">
        <SectionHeader
          title="Hindu Calendrical Eras (Samvat)"
          hindiTitle="संवत प्रणाली"
          subtitle="The historical and astronomical epochs used across India"
          icon={Award}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="vedic-card p-6 space-y-3">
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
              Vikram Samvat (विक्रम संवत)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Founded by the legendary Emperor Vikramaditya of Ujjain in 57 BCE to commemorate victory over Saka invaders. It is approximately <strong>57 years ahead</strong> of the Gregorian calendar. The New Year starts on Chaitra Shukla Pratipada (in North/West India) or Kartika Shukla Pratipada (in Gujarat).
            </p>
          </div>

          <div className="vedic-card p-6 space-y-3">
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
              Shaka Samvat (शक संवत)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Established by King Shalivahana in 78 CE. It is approximately <strong>78 years behind</strong> the Gregorian calendar and serves as the National Calendar of the Republic of India alongside astronomical almanacs across South India, Maharashtra, and Bengal.
            </p>
          </div>
        </div>
      </section>

      {/* Why Location Matters */}
      <section className="vedic-card p-8 bg-gradient-to-br from-vedic-saffron-50/50 via-white to-amber-50/50 dark:from-stone-900 dark:to-stone-900 border border-vedic-saffron-200/80 dark:border-stone-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-vedic-saffron-100 dark:bg-vedic-saffron-950 text-vedic-saffron-600 dark:text-vedic-saffron-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white">
              Why Location Matters in Panchang Calculations
            </h3>
            <p className="text-xs text-stone-500">The role of local Sunrise (Suryodaya)</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          In the Hindu Vedic tradition, a day begins precisely at the moment of <strong>local Sunrise</strong> (सूर्योदय), not at midnight. Therefore, all daily tithis, Choghadiya periods, Rahu Kalam, and auspicious Muhurats strictly depend on your geographical Latitude and Longitude.
        </p>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          For instance, Sunrise occurs approximately 1 hour earlier in Kolkata than in Mumbai. Our application computes precise solar angles and local ephemeris coordinates for over 50 Indian cities and global coordinates to ensure 100% astronomical accuracy.
        </p>
      </section>

    </div>
  );
}
