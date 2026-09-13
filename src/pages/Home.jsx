import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { usePanchang } from '../hooks/usePanchang';
import { updatePageSeo } from '../utils/seoUtils';
import TodaySummaryHero from '../components/panchang/TodaySummaryHero';
import PanchangEssentials from '../components/panchang/PanchangEssentials';
import TodayDecisionCards from '../components/panchang/TodayDecisionCards';
import TodayAccordions from '../components/panchang/TodayAccordions';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorDisplay from '../components/common/ErrorDisplay';
import FestivalDetailModal from '../components/festival/FestivalDetailModal';

export default function Home() {
  const { data: panchang, loading, error, refetch } = usePanchang(new Date());
  const [selectedFestival, setSelectedFestival] = useState(null);

  useEffect(() => {
    updatePageSeo(
      "Today's Panchang",
      'Daily Hindu Panchang with accurate Tithi, Nakshatra, Yoga, Karana, Auspicious Muhurats, Choghadiya, and Rahu Kalam.'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

      {loading ? (
        <div className="space-y-4">
          <LoadingSkeleton type="hero" />
          <LoadingSkeleton type="essentials" />
          <LoadingSkeleton type="cards" />
        </div>
      ) : error ? (
        <ErrorDisplay message={error} onRetry={refetch} />
      ) : (
        <div className="space-y-5 sm:space-y-6">

          {/* 1. Hero — date, status, location */}
          <TodaySummaryHero panchang={panchang} />

          {/* 2. Panchang Essentials — 5-limb flat strip */}
          <PanchangEssentials panchang={panchang} />

          {/* 3. Decision Cards — Best time / Avoid today */}
          <TodayDecisionCards panchang={panchang} />

          {/* 4. Explore by date action */}
          <div className="flex justify-center">
            <Link
              to="/daily"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-200 dark:border-vedic-nightBorder bg-white dark:bg-vedic-nightCard text-sm font-semibold text-stone-700 dark:text-stone-300 hover:border-vedic-gold-500 dark:hover:border-vedic-gold-600 hover:text-stone-900 dark:hover:text-stone-100 transition-colors shadow-card-sm"
            >
              <CalendarDays className="w-4 h-4 text-vedic-gold-600 dark:text-vedic-gold-400" aria-hidden="true" />
              Explore by date
            </Link>
          </div>

          {/* 5. Progressive accordions — detailed calculations */}
          <TodayAccordions
            panchang={panchang}
            onSelectFestival={(fest) => setSelectedFestival(fest)}
          />

        </div>
      )}

      {/* Festival Detail Modal */}
      <FestivalDetailModal
        festival={selectedFestival}
        isOpen={!!selectedFestival}
        onClose={() => setSelectedFestival(null)}
      />

    </div>
  );
}
