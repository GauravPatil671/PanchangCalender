import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Sun, 
  Moon, 
  ShieldCheck, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { usePanchang } from '../hooks/usePanchang';
import { useLocationContext } from '../context/LocationContext';
import { formatDateDisplay, getTodayDateString, formatDayOfWeek } from '../utils/dateUtils';
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Vedic Auspicious Timing Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-white tracking-tight">
          Shubh Muhurat & Choghadiya
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Find the best astrological moments for starting new business ventures, marriage ceremonies, housewarming (Griha Pravesh), asset purchases, and travel.
        </p>
      </div>

      {/* Date & Location Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
        
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500"
          />
          <button
            onClick={() => setCurrentDate(getTodayDateString())}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
        </div>

        {/* Location Display */}
        <button
          onClick={() => setIsSelectorOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-vedic-sand/60 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-vedic-saffron-400"
        >
          <MapPin className="w-4 h-4 text-vedic-saffron-600" />
          <span>📍 {selectedLocation.city}, {selectedLocation.state} (Change)</span>
        </button>
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
