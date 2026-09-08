import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  Sun, 
  Moon, 
  ArrowRight, 
  Compass, 
  ShieldCheck,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { usePanchang } from '../hooks/usePanchang';
import { useLocationContext } from '../context/LocationContext';
import { updatePageSeo } from '../utils/seoUtils';
import PanchangHeroCard from '../components/panchang/PanchangHeroCard';
import PanchangGrid from '../components/panchang/PanchangGrid';
import SunMoonCard from '../components/panchang/SunMoonCard';
import MuhuratSection from '../components/panchang/MuhuratSection';
import InauspiciousCard from '../components/panchang/InauspiciousCard';
import ChoghadiyaTable from '../components/panchang/ChoghadiyaTable';
import FestivalCard from '../components/festival/FestivalCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorDisplay from '../components/common/ErrorDisplay';
import SectionHeader from '../components/common/SectionHeader';
import FestivalDetailModal from '../components/festival/FestivalDetailModal';

export default function Home() {
  const { data: panchang, loading, error, refetch } = usePanchang(new Date());
  const { setIsSelectorOpen } = useLocationContext();
  const [selectedFestival, setSelectedFestival] = useState(null);

  useEffect(() => {
    updatePageSeo(
      'Today\'s Panchang',
      'Daily Hindu Panchang with accurate Tithi, Nakshatra, Yoga, Karana, Auspicious Muhurats, Choghadiya, and Rahu Kalam.'
    );
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
      
      {/* Hero Section */}
      {loading ? (
        <LoadingSkeleton type="hero" />
      ) : error ? (
        <ErrorDisplay message={error} onRetry={refetch} />
      ) : (
        <div className="space-y-6">
          <PanchangHeroCard
            panchang={panchang}
            onOpenLocationModal={() => setIsSelectorOpen(true)}
          />

          {/* Quick Jump Pills for Easy Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="text-xs font-bold text-stone-500 uppercase mr-1 whitespace-nowrap">Quick Jump:</span>
            <button
              onClick={() => scrollToSection('five-limbs')}
              className="px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>5 Limbs (Tithi & Nakshatra)</span>
            </button>
            <button
              onClick={() => scrollToSection('shubh-muhurat')}
              className="px-3.5 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Shubh Muhurat</span>
            </button>
            <button
              onClick={() => scrollToSection('ashubh-kaal')}
              className="px-3.5 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900 text-rose-900 dark:text-rose-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Rahu Kalam & Inauspicious</span>
            </button>
            <button
              onClick={() => scrollToSection('choghadiya')}
              className="px-3.5 py-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 text-indigo-900 dark:text-indigo-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Choghadiya</span>
            </button>
            <button
              onClick={() => scrollToSection('sun-moon')}
              className="px-3.5 py-1.5 rounded-full bg-orange-100 hover:bg-orange-200 dark:bg-orange-950/80 dark:hover:bg-orange-900 text-orange-900 dark:text-orange-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Sun & Moon</span>
            </button>
            <button
              onClick={() => scrollToSection('festivals')}
              className="px-3.5 py-1.5 rounded-full bg-vedic-saffron-100 hover:bg-vedic-saffron-200 dark:bg-vedic-saffron-950/80 dark:hover:bg-vedic-saffron-900 text-vedic-saffron-900 dark:text-vedic-saffron-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Festivals</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Panchang Details Grid */}
      {!loading && panchang && (
        <>
          {/* Section: Five Limbs (Pancha-Anga) */}
          <section id="five-limbs" className="space-y-6 scroll-mt-24">
            <SectionHeader
              title="The Five Limbs of Panchang"
              hindiTitle="पञ्चाङ्ग के पाँच अंग"
              subtitle="Tithi, Nakshatra, Yoga, Karana, and Samvat for the current lunar day"
              icon={Compass}
              badge="5 Vedic Angas"
            />
            <PanchangGrid panchang={panchang} />
          </section>

          {/* Section: Auspicious Muhurats */}
          <section id="shubh-muhurat" className="space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 mb-6 border-b border-stone-200/80 dark:border-stone-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
                    Auspicious Timings
                    <span className="text-sm font-sans font-normal text-stone-500 dark:text-stone-400">
                      (शुभ मुहूर्त)
                    </span>
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  Ideal planetary windows including Brahma, Abhijit, and Vijaya Muhurat
                </p>
              </div>
              <Link
                to="/muhurat"
                className="text-xs font-bold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline flex items-center gap-1"
              >
                <span>Full Muhurat Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <MuhuratSection panchang={panchang} />
          </section>

          {/* Section: Inauspicious Timings */}
          <section id="ashubh-kaal" className="space-y-6 scroll-mt-24">
            <InauspiciousCard panchang={panchang} />
          </section>

          {/* Section: Day & Night Choghadiya Table */}
          <section id="choghadiya" className="space-y-6 scroll-mt-24">
            <ChoghadiyaTable choghadiya={panchang.choghadiya} />
          </section>

          {/* Section: Sun & Moon Timings */}
          <section id="sun-moon" className="space-y-6 scroll-mt-24">
            <SectionHeader
              title="Sun & Moon Timings"
              hindiTitle="सूर्य एवं चन्द्र दर्शन"
              subtitle="Astronomical timings determined specifically for your selected location"
              icon={Sun}
            />
            <SunMoonCard panchang={panchang} />
          </section>

          {/* Section: Upcoming Major Festivals */}
          <section id="festivals" className="space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 mb-6 border-b border-stone-200/80 dark:border-stone-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-600 dark:text-vedic-saffron-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
                    Featured Hindu Festivals
                    <span className="text-sm font-sans font-normal text-stone-500 dark:text-stone-400">
                      (आगामी पर्व एवं त्योहार)
                    </span>
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  Significant festivals, celebrations, and fasting days
                </p>
              </div>
              <Link
                to="/festivals"
                className="text-xs font-bold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline flex items-center gap-1"
              >
                <span>View All Festivals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Render 3 Top Festivals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {panchang.festivals && panchang.festivals.length > 0 ? (
                panchang.festivals.slice(0, 3).map((f) => (
                  <FestivalCard
                    key={f.id}
                    festival={f}
                    onSelect={(fest) => setSelectedFestival(fest)}
                  />
                ))
              ) : (
                // Show sample major festivals
                [
                  {
                    id: 'diwali-preview',
                    name: 'Diwali (Deepavali)',
                    hindi: 'दीपावली',
                    category: 'Major Festival',
                    monthName: 'Kartika',
                    paksha: 'Krishna',
                    deity: 'Goddess Lakshmi & Lord Ganesha',
                    description: 'The Festival of Lights celebrating victory of light over darkness and prosperity for all homes.',
                    muhuratHint: 'Pradosh Kaal Lakshmi Puja'
                  },
                  {
                    id: 'ganesh-preview',
                    name: 'Ganesh Chaturthi',
                    hindi: 'गणेश चतुर्थी',
                    category: 'Major Festival',
                    monthName: 'Bhadrapada',
                    paksha: 'Shukla',
                    deity: 'Lord Ganesha',
                    description: 'Grand celebration of the birth of Lord Ganesha, the remover of all obstacles and giver of auspicious wisdom.',
                    muhuratHint: 'Madhyahna Ganesha Puja'
                  },
                  {
                    id: 'mahashivratri-preview',
                    name: 'Maha Shivratri',
                    hindi: 'महाशिवरात्रि',
                    category: 'Major Festival',
                    monthName: 'Phalguna',
                    paksha: 'Krishna',
                    deity: 'Lord Shiva',
                    description: 'The Great Night of Shiva dedicated to all-night meditation, Rudrabhishekam, and spiritual awakening.',
                    muhuratHint: 'Nishita Kaal Midnight Puja'
                  }
                ].map((f) => (
                  <FestivalCard
                    key={f.id}
                    festival={f}
                    onSelect={(fest) => setSelectedFestival(fest)}
                  />
                ))
              )}
            </div>
          </section>
        </>
      )}

      {/* Festival Modal */}
      <FestivalDetailModal
        festival={selectedFestival}
        isOpen={!!selectedFestival}
        onClose={() => setSelectedFestival(null)}
      />

    </div>
  );
}
