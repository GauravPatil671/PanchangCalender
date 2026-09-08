import React from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Sun, 
  Moon, 
  Sparkles, 
  Compass, 
  ChevronRight,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDateDisplay, formatDayOfWeek } from '../../utils/dateUtils';
import { useLocationContext } from '../../context/LocationContext';

export default function PanchangHeroCard({ panchang, onOpenLocationModal }) {
  const { selectedLocation } = useLocationContext();

  if (!panchang) return null;

  const dateObj = new Date(panchang.date);
  const dayName = formatDayOfWeek(dateObj);
  const dateFormatted = formatDateDisplay(dateObj);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-vedic-saffron-50/50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 border border-vedic-saffron-200/80 dark:border-stone-800 shadow-xl shadow-vedic-saffron-500/5">
      
      {/* Decorative Traditional Accent Corner */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-vedic-saffron-500/10 via-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute top-4 right-6 text-7xl font-serif font-bold text-stone-900/5 dark:text-white/5 pointer-events-none select-none">
        ॐ
      </div>

      <div className="relative p-6 sm:p-8 lg:p-10 space-y-6">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/70 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-vedic-saffron-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                Today's Panchang
              </span>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                दैनिक पञ्चाङ्गम्
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-white tracking-tight">
              {dateFormatted}
            </h1>
            
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 flex items-center gap-2 mt-1">
              <span className="font-semibold text-vedic-saffron-700 dark:text-vedic-saffron-400">{dayName}</span>
              <span>•</span>
              <span>{panchang.paksha} ({panchang.pakshaHindi})</span>
              <span>•</span>
              <span className="font-medium text-stone-700 dark:text-stone-200">{panchang.month.purnimanta} Maas</span>
            </p>
          </div>

          {/* Location Badge & Quick Action */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={onOpenLocationModal}
              className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-vedic-saffron-400 dark:hover:border-vedic-saffron-500 shadow-sm transition-all text-xs sm:text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-vedic-saffron-600 dark:text-vedic-saffron-400 group-hover:scale-110 transition-transform" />
              <span>📍 {selectedLocation.city}, {selectedLocation.state}</span>
              <span className="text-xs text-vedic-saffron-600 dark:text-vedic-saffron-400 underline ml-1">Change</span>
            </button>
          </div>
        </div>

        {/* Samvat and Astronomical Era Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-100/70 dark:bg-stone-800/60 p-3.5 rounded-2xl text-xs">
          <div>
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Vikram Samvat</span>
            <span className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
              {panchang.samvat.vikram}
            </span>
          </div>
          <div>
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Shaka Samvat</span>
            <span className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
              {panchang.samvat.shaka}
            </span>
          </div>
          <div>
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Ayana</span>
            <span className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
              {panchang.samvat.ayanam}
            </span>
          </div>
          <div>
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Season (Ritu)</span>
            <span className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
              {panchang.samvat.ritu}
            </span>
          </div>
        </div>

        {/* The 5 Key Panchang Limbs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Tithi */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700/80 shadow-sm space-y-1 hover:border-amber-400 transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Tithi (तिथि)
            </span>
            <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              {panchang.tithi.name}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
              <span>{panchang.tithi.hindi}</span>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded">
                {panchang.tithi.deity}
              </span>
            </div>
          </div>

          {/* Nakshatra */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700/80 shadow-sm space-y-1 hover:border-vedic-saffron-400 transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-wider text-vedic-saffron-700 dark:text-vedic-saffron-400">
              Nakshatra (नक्षत्र)
            </span>
            <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              {panchang.nakshatra.name}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
              <span>{panchang.nakshatra.hindi}</span>
              <span className="text-[10px] text-stone-500">
                Lord: {panchang.nakshatra.lord}
              </span>
            </div>
          </div>

          {/* Yoga */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700/80 shadow-sm space-y-1 hover:border-vedic-gold-400 transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-wider text-vedic-gold-700 dark:text-vedic-gold-400">
              Yoga (योग)
            </span>
            <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              {panchang.yoga.name}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400">
              Auspicious alignment
            </div>
          </div>

          {/* Karana */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700/80 shadow-sm space-y-1 hover:border-emerald-400 transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Karana (करण)
            </span>
            <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              {panchang.karana.name}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400">
              Half-Tithi action
            </div>
          </div>

          {/* Sun & Moon Signs */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700/80 shadow-sm space-y-1 hover:border-purple-400 transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              Rashi (राशि)
            </span>
            <div className="text-sm font-semibold text-stone-900 dark:text-white flex items-center gap-1.5">
              <span>☀️ Sun:</span>
              <span>{panchang.sunSign}</span>
            </div>
            <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <span>🌙 Moon:</span>
              <span>{panchang.moonSign}</span>
            </div>
          </div>

        </div>

        {/* Quick Highlights Bar: Sunrise, Sunset, Rahu Kaal, Abhijit */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
            <Sun className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-amber-900 dark:text-amber-300 uppercase font-semibold">Sunrise</span>
              <div className="text-sm font-bold text-stone-900 dark:text-white">{panchang.sunMoon.sunrise}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-500/10 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/40">
            <Moon className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-orange-900 dark:text-orange-300 uppercase font-semibold">Sunset</span>
              <div className="text-sm font-bold text-stone-900 dark:text-white">{panchang.sunMoon.sunset}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-emerald-900 dark:text-emerald-300 uppercase font-semibold">Abhijit Muhurat</span>
              <div className="text-sm font-bold text-stone-900 dark:text-white">{panchang.muhurat.abhijitMuhurat}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
            <Clock className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-rose-900 dark:text-rose-300 uppercase font-semibold">Rahu Kalam</span>
              <div className="text-sm font-bold text-stone-900 dark:text-white">{panchang.inauspicious.rahuKalam}</div>
            </div>
          </div>
        </div>

        {/* Festival Alerts Banner if today is a festival */}
        {panchang.festivals && panchang.festivals.length > 0 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-vedic-saffron-500 to-amber-500 text-white shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 flex-shrink-0 animate-bounce" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  Today's Major Festival
                </div>
                <div className="text-base sm:text-lg font-bold font-serif">
                  {panchang.festivals.map(f => f.name).join(', ')}
                </div>
              </div>
            </div>
            <Link
              to="/festivals"
              className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
