import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  MapPin, 
  Clock, 
  Sun, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { usePanchang } from '../hooks/usePanchang';
import { useLocationContext } from '../context/LocationContext';
import { 
  formatDateYMD, 
  formatDateDisplay, 
  formatDayOfWeek, 
  getTodayDateString, 
  getNextDay, 
  getPrevDay 
} from '../utils/dateUtils';
import { updatePageSeo } from '../utils/seoUtils';
import PanchangHeroCard from '../components/panchang/PanchangHeroCard';
import PanchangGrid from '../components/panchang/PanchangGrid';
import SunMoonCard from '../components/panchang/SunMoonCard';
import MuhuratSection from '../components/panchang/MuhuratSection';
import InauspiciousCard from '../components/panchang/InauspiciousCard';
import ChoghadiyaTable from '../components/panchang/ChoghadiyaTable';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorDisplay from '../components/common/ErrorDisplay';
import SectionHeader from '../components/common/SectionHeader';

export default function DailyPanchangPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateFromQuery = searchParams.get('date');
  
  const [currentDate, setCurrentDate] = useState(() => {
    return dateFromQuery || getTodayDateString();
  });

  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { data: panchang, loading, error, refetch } = usePanchang(currentDate);

  useEffect(() => {
    if (dateFromQuery && dateFromQuery !== currentDate) {
      setCurrentDate(dateFromQuery);
    }
  }, [dateFromQuery]);

  useEffect(() => {
    const formatted = formatDateDisplay(currentDate);
    updatePageSeo(
      `Daily Panchang for ${formatted}`,
      `Detailed Hindu Panchang for ${formatted} in ${selectedLocation.city}: Tithi, Nakshatra, Yoga, Karana, Choghadiya, and Shubh Muhurat.`
    );
  }, [currentDate, selectedLocation.city]);

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    setSearchParams({ date: newDate });
  };

  const handlePrev = () => {
    handleDateChange(getPrevDay(currentDate));
  };

  const handleNext = () => {
    handleDateChange(getNextDay(currentDate));
  };

  const handleToday = () => {
    handleDateChange(getTodayDateString());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Date Navigation & Picker Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
        
        {/* Title */}
        <div className="space-y-0.5">
          <span className="text-xs uppercase font-bold tracking-wider text-vedic-saffron-600 dark:text-vedic-saffron-400">
            Daily Astronomical Ephemeris
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
            <span>{formatDateDisplay(currentDate)}</span>
            <span className="text-sm font-sans font-normal text-stone-500">
              ({formatDayOfWeek(currentDate)})
            </span>
          </h1>
        </div>

        {/* Date Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={handleToday}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>

          {/* Date Picker Input */}
          <div className="relative">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500"
            />
          </div>

          {/* Prev / Next day buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Day</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
              title="Next Day"
            >
              <span className="hidden sm:inline">Next Day</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <LoadingSkeleton type="hero" />
      ) : error ? (
        <ErrorDisplay message={error} onRetry={refetch} />
      ) : panchang ? (
        <div className="space-y-12">
          
          {/* Hero Card for chosen date */}
          <PanchangHeroCard
            panchang={panchang}
            onOpenLocationModal={() => setIsSelectorOpen(true)}
          />

          {/* Section: Panchang 5 Limbs */}
          <section className="space-y-6">
            <SectionHeader
              title="Vedic Panchangam"
              hindiTitle="पञ्चाङ्ग विवरण"
              subtitle="Tithi, Nakshatra, Yoga, Karana, Samvat and Vrat for this date"
              icon={Clock}
            />
            <PanchangGrid panchang={panchang} />
          </section>

          {/* Section: Sun & Moon */}
          <section className="space-y-6">
            <SectionHeader
              title="Sun & Moon Timings"
              hindiTitle="सूर्य एवं चन्द्र दर्शन"
              subtitle={`Timings computed for latitude ${selectedLocation.latitude.toFixed(2)}°, longitude ${selectedLocation.longitude.toFixed(2)}°`}
              icon={Sun}
            />
            <SunMoonCard panchang={panchang} />
          </section>

          {/* Section: Shubh Muhurat */}
          <section className="space-y-6">
            <SectionHeader
              title="Auspicious Timings & Shubh Muhurat"
              hindiTitle="शुभ मुहूर्त"
              subtitle="Beneficial celestial windows for auspicious rituals, new business, and travel"
              icon={Sparkles}
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
