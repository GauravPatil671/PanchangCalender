import React, { useEffect, useState } from 'react';
import { usePanchang } from '../hooks/usePanchang';
import { updatePageSeo } from '../utils/seoUtils';
import TodaySummaryHero from '../components/panchang/TodaySummaryHero';
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
      'Today\'s Panchang',
      'Daily Hindu Panchang with accurate Tithi, Nakshatra, Yoga, Karana, Auspicious Muhurats, Choghadiya, and Rahu Kalam.'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* 1. Loading & Error States */}
      {loading ? (
        <LoadingSkeleton type="hero" />
      ) : error ? (
        <ErrorDisplay message={error} onRetry={refetch} />
      ) : (
        <>
          {/* 2. Daily Summary Hero (Above the fold) */}
          <TodaySummaryHero panchang={panchang} />

          {/* 3. Three Decision Cards (Above the fold / immediate scan) */}
          <TodayDecisionCards panchang={panchang} />

          {/* 4. One "Explore Today's Details" Accordions Section (Collapsed by default) */}
          <TodayAccordions 
            panchang={panchang} 
            onSelectFestival={(fest) => setSelectedFestival(fest)} 
          />
        </>
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
