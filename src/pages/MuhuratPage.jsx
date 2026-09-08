import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Sun, 
  Moon, 
  ShieldCheck, 
  AlertTriangle,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { usePanchang } from '../hooks/usePanchang';
import { useLocationContext } from '../context/LocationContext';
import { formatDateDisplay, getTodayDateString, formatDayOfWeek, getPrevDay, getNextDay } from '../utils/dateUtils';
import { updatePageSeo } from '../utils/seoUtils';
import MuhuratSection from '../components/panchang/MuhuratSection';
import InauspiciousCard from '../components/panchang/InauspiciousCard';
import ChoghadiyaTable from '../components/panchang/ChoghadiyaTable';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorDisplay from '../components/common/ErrorDisplay';
import SectionHeader from '../components/common/SectionHeader';

export default function MuhuratPage() {
  const [currentDate, setCurrentDate] = useState(getTodayDateString());
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { data: panchang, loading, error, refetch } = usePanchang(currentDate);

  useEffect(() => {
    updatePageSeo(
      'Shubh Muhurat & Choghadiya Timings',
      'Accurate Hindu Shubh Muhurat, Abhijit Muhurat, Brahma Muhurat, Day/Night Choghadiya, and Rahu Kalam timings.'
    );
  }, []);

  const handlePrev = () => {
    setCurrentDate(getPrevDay(currentDate));
  };

  const handleNext = () => {
    setCurrentDate(getNextDay(currentDate));
  };

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Vedic Auspicious Timing</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-white tracking-tight">
          Shubh Muhurat & Choghadiya
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Find auspicious astrological windows for commencing new business ventures, Griha Pravesh, vehicle purchases, sacred rituals, and journeys.
        </p>
      </div>

      {/* Date & Location Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
        
        {/* Date Selector */}
        <div className="space-y-0.5 sm:space-y-1">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
            Selected Date:
          </div>
          <div className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span>{formatDateDisplay(currentDate)}</span>
            <span className="text-xs sm:text-sm font-sans font-normal text-stone-500">
              ({formatDayOfWeek(currentDate)})
            </span>
          </div>
        </div>

        {/* Date and Location Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setCurrentDate(getTodayDateString())}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>

          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500 cursor-pointer max-w-[130px] sm:max-w-none"
          />

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 sm:p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 sm:p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Location Display */}
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-vedic-sand/60 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:border-vedic-saffron-400"
          >
            <MapPin className="w-3.5 h-3.5 text-vedic-saffron-600" />
            <span>📍 {selectedLocation.city}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton type="card" />
      ) : error ? (
        <ErrorDisplay message={error} onRetry={refetch} />
      ) : panchang ? (
        <div className="space-y-10">
          
          {/* Section: Auspicious Muhurats */}
          <section className="space-y-6">
            <SectionHeader
              title="Auspicious Muhurats"
              hindiTitle="शुभ मुहूर्त"
              subtitle={`Computed for ${formatDateDisplay(currentDate)} at ${selectedLocation.city}`}
              icon={ShieldCheck}
            />
            <MuhuratSection panchang={panchang} />
          </section>

          {/* Section: Inauspicious Timings */}
          <section className="space-y-6">
            <InauspiciousCard panchang={panchang} />
          </section>

          {/* Section: Day & Night Choghadiya */}
          <section className="space-y-6">
            <ChoghadiyaTable choghadiya={panchang.choghadiya} />
          </section>

        </div>
      ) : null}

    </div>
  );
}
