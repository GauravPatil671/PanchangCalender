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
  ShieldCheck,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { usePanchang } from '../hooks/usePanchang';
import { useLocationContext } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
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
  const { t, language } = useLanguage();
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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-10">
      
      {/* Date Navigation & Picker Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
        
        {/* Title */}
        <div className="space-y-0.5 sm:space-y-1">
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-vedic-saffron-600 dark:text-vedic-saffron-400">
            {t('daily.ephemerisLabel')}
          </span>
          <h1 className="text-lg sm:text-3xl font-bold font-serif text-stone-900 dark:text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span>{formatDateDisplay(currentDate)}</span>
            <span className="text-xs sm:text-sm font-sans font-normal text-stone-500">
              ({formatDayOfWeek(currentDate)})
            </span>
          </h1>
        </div>

        {/* Date Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          <button
            onClick={handleToday}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('common.today')}</span>
          </button>

          {/* Date Picker Input */}
          <div className="relative">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500 cursor-pointer max-w-[130px] sm:max-w-none"
            />
          </div>

          {/* Prev / Next day buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
              title={t('daily.prev')}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('daily.prev')}</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
              title={t('daily.next')}
            >
              <span className="hidden sm:inline">{t('daily.next')}</span>
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
          <div className="space-y-6">
            <PanchangHeroCard
              panchang={panchang}
              headingLevel="h2"
              onOpenLocationModal={() => setIsSelectorOpen(true)}
            />

            {/* Quick Jump Pills for Easy Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
              <span className="text-xs font-bold text-stone-500 uppercase mr-1 whitespace-nowrap">{t('daily.jumpTo')}</span>
              <button
                onClick={() => scrollToSection('daily-five-limbs')}
                className="px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t('daily.jumpLimbs')}</span>
              </button>
              <button
                onClick={() => scrollToSection('daily-shubh-muhurat')}
                className="px-3.5 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('daily.jumpMuhurat')}</span>
              </button>
              <button
                onClick={() => scrollToSection('daily-ashubh-kaal')}
                className="px-3.5 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900 text-rose-900 dark:text-rose-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t('daily.jumpRahu')}</span>
              </button>
              <button
                onClick={() => scrollToSection('daily-choghadiya')}
                className="px-3.5 py-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 text-indigo-900 dark:text-indigo-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t('accordions.choghadiyaTitle')}</span>
              </button>
              <button
                onClick={() => scrollToSection('daily-sun-moon')}
                className="px-3.5 py-1.5 rounded-full bg-orange-100 hover:bg-orange-200 dark:bg-orange-950/80 dark:hover:bg-orange-900 text-orange-900 dark:text-orange-200 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{t('accordions.sunMoonTitle')}</span>
              </button>
            </div>
          </div>

          {/* Section: Panchang 5 Limbs */}
          <section id="daily-five-limbs" className="space-y-6 scroll-mt-24">
            <SectionHeader
              title={t('daily.limbsTitle')}
              hindiTitle={language === 'hi' ? '' : t('daily.limbsHindi')}
              subtitle={t('daily.limbsSubtitle', { date: formatDateDisplay(currentDate) })}
              icon={Compass}
              badge={language === 'hi' ? '5 वैदिक अंग' : '5 Vedic Angas'}
            />
            <PanchangGrid panchang={panchang} />
          </section>

          {/* Section: Shubh Muhurat */}
          <section id="daily-shubh-muhurat" className="space-y-6 scroll-mt-24">
            <SectionHeader
              title={t('daily.auspiciousTitle')}
              hindiTitle={language === 'hi' ? '' : t('accordions.auspiciousHindi')}
              subtitle={t('daily.auspiciousSubtitle')}
              icon={ShieldCheck}
            />
            <MuhuratSection panchang={panchang} />
          </section>

          {/* Section: Inauspicious Timings */}
          <section id="daily-ashubh-kaal" className="space-y-6 scroll-mt-24">
            <InauspiciousCard panchang={panchang} />
          </section>

          {/* Section: Day & Night Choghadiya */}
          <section id="daily-choghadiya" className="space-y-6 scroll-mt-24">
            <ChoghadiyaTable choghadiya={panchang.choghadiya} />
          </section>

          {/* Section: Sun & Moon */}
          <section id="daily-sun-moon" className="space-y-6 scroll-mt-24">
            <SectionHeader
              title={t('accordions.sunMoonTitle')}
              hindiTitle={language === 'hi' ? '' : t('accordions.sunMoonHindi')}
              subtitle={t('daily.sunMoonSubtitle', { 
                lat: selectedLocation.latitude.toFixed(2), 
                lng: selectedLocation.longitude.toFixed(2) 
              })}
              icon={Sun}
            />
            <SunMoonCard panchang={panchang} />
          </section>

        </div>
      ) : null}

    </div>
  );
}
