import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Calendar, Search } from 'lucide-react';
import { useFestivals } from '../hooks/useFestivals';
import { updatePageSeo } from '../utils/seoUtils';
import FestivalCard from '../components/festival/FestivalCard';
import FestivalFilter from '../components/festival/FestivalFilter';
import FestivalDetailModal from '../components/festival/FestivalDetailModal';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorDisplay from '../components/common/ErrorDisplay';
import SectionHeader from '../components/common/SectionHeader';

export default function FestivalsPage() {
  const { festivals, loading, error } = useFestivals();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedFestival, setSelectedFestival] = useState(null);

  useEffect(() => {
    updatePageSeo(
      'Hindu Festivals Calendar',
      'Complete directory of Hindu Festivals, Vrats, and Fasting dates with accurate Tithis, significance, and puja rituals.'
    );
  }, []);

  const filteredFestivals = useMemo(() => {
    return festivals.filter((fest) => {
      const matchesSearch =
        fest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fest.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fest.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fest.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || fest.category === selectedCategory;

      const matchesMonth =
        selectedMonth === 'All' || fest.monthName.includes(selectedMonth);

      return matchesSearch && matchesCategory && matchesMonth;
    });
  }, [festivals, searchQuery, selectedCategory, selectedMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-700 dark:text-vedic-saffron-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sacred Hindu Vrats & Celebrations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-white tracking-tight">
          Hindu Festival Calendar
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Explore upcoming Hindu festivals, fasting dates (vrat), significance, deities, and auspicious puja timings.
        </p>
      </div>

      {/* Filter Component */}
      <FestivalFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      {/* Content */}
      {loading ? (
        <LoadingSkeleton type="grid" />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Showing <strong>{filteredFestivals.length}</strong> festivals</span>
            {(searchQuery || selectedCategory !== 'All' || selectedMonth !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedMonth('All');
                }}
                className="text-vedic-saffron-600 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredFestivals.length === 0 ? (
            <div className="vedic-card p-12 text-center text-stone-500 space-y-3">
              <Search className="w-10 h-10 mx-auto opacity-40 text-stone-400" />
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
                No Festivals Found
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                No festivals matched your current search filters. Try clearing the search query or selecting "All" categories.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFestivals.map((fest) => (
                <FestivalCard
                  key={fest.id}
                  festival={fest}
                  onSelect={(f) => setSelectedFestival(f)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      <FestivalDetailModal
        festival={selectedFestival}
        isOpen={!!selectedFestival}
        onClose={() => setSelectedFestival(null)}
      />

    </div>
  );
}
