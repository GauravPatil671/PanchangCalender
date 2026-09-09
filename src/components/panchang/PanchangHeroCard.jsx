import React from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Sun, 
  Moon, 
  Sparkles, 
  Compass, 
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDateDisplay, formatDayOfWeek } from '../../utils/dateUtils';
import { useLocationContext } from '../../context/LocationContext';

export default function PanchangHeroCard({ panchang, onOpenLocationModal, headingLevel = 'h1' }) {
  const { selectedLocation } = useLocationContext();

  if (!panchang) return null;

  // Parse date string as local time (not UTC) to avoid off-by-one day in UTC+ timezones like IST
  const [pyear, pmon, pday] = (panchang.date || '').split('-').map(Number);
  const dateObj = (pyear && pmon && pday) ? new Date(pyear, pmon - 1, pday) : new Date(panchang.date);
  const dayName = formatDayOfWeek(dateObj);
  const dateFormatted = formatDateDisplay(dateObj);
  const HeadingTag = headingLevel === 'h2' ? 'h2' : 'h1';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-orange-50/40 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 border border-stone-200 dark:border-stone-800 shadow-xl transition-all">
      
      {/* Decorative Accent Symbol */}
      <div className="absolute top-3 right-5 text-8xl font-serif font-bold text-stone-900/[0.03] dark:text-white/[0.04] pointer-events-none select-none" aria-hidden="true">
        ॐ
      </div>

      <div className="relative p-3.5 xs:p-5 sm:p-8 lg:p-10 space-y-4 sm:space-y-8">
        
        {/* Top Header: Date, Location & Hindu Maas Context */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-6 pb-4 sm:pb-6 border-b border-stone-200/90 dark:border-stone-800">
          
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-vedic-saffron-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                Daily Panchang
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                दैनिक पञ्चाङ्गम्
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                VS {panchang.samvat.vikram}
              </span>
            </div>
            
            <HeadingTag className="text-xl xs:text-2xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-white tracking-tight">
              {dateFormatted}
            </HeadingTag>
            
            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-base text-stone-700 dark:text-stone-300">
              <span className="font-bold text-vedic-saffron-700 dark:text-vedic-saffron-400">{dayName}</span>
              <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">•</span>
              <span className="font-medium">{panchang.month.purnimanta} Maas</span>
              <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">•</span>
              <span className="font-medium text-amber-800 dark:text-amber-300">{panchang.paksha} ({panchang.pakshaHindi})</span>
              <span className="text-stone-300 dark:text-stone-600 hidden xs:inline" aria-hidden="true">•</span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden xs:inline">{panchang.samvat.ritu} Ritu</span>
            </div>
          </div>

          {/* Location Selector Pill */}
          <div className="flex flex-col sm:flex-row items-start lg:items-end gap-2 self-start lg:self-auto w-full sm:w-auto">
            <button
              onClick={onOpenLocationModal}
              className="group flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-3 py-2 rounded-2xl bg-white dark:bg-stone-800/90 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-vedic-saffron-500 dark:hover:border-vedic-saffron-400 shadow-sm transition-all text-xs sm:text-sm font-semibold min-h-[44px]"
              title="Click to calculate for your city"
              aria-label={`Location: ${selectedLocation.city}, ${selectedLocation.state}. Click to change.`}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 flex items-center justify-center text-vedic-saffron-600 dark:text-vedic-saffron-400 group-hover:scale-110 transition-transform">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal leading-tight">Location</div>
                  <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white truncate max-w-[130px] xs:max-w-[180px]">
                    {selectedLocation.city}, {selectedLocation.state}
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-vedic-saffron-600 dark:text-vedic-saffron-400 underline ml-2 font-medium">
                Change
              </span>
            </button>
          </div>

        </div>

        {/* 4 Primary Daily Focus Cards (High Readability) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span className="font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Essential Daily Highlights (मुख्य पंचांग बिंदु)
            </span>
            <span>Udayatithi (Sunrise) Based</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Tithi Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-800 border-2 border-amber-200/80 dark:border-amber-900/50 shadow-sm hover:shadow-md transition-shadow space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    Tithi at Sunrise
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    {panchang.paksha}
                  </span>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white">
                    {panchang.tithi.name}
                  </div>
                  <div className="text-sm font-devanagari text-stone-600 dark:text-stone-300">
                    {panchang.tithi.hindi} <span className="text-xs text-stone-500 font-sans font-normal">(सूर्योदयकालीन)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-700 text-xs">
                <div className="text-stone-600 dark:text-stone-300 flex items-center justify-between">
                  <span>Ends: <strong>{panchang.tithi.endTime}</strong></span>
                  <span className="text-stone-500 text-[11px]">Deity: {panchang.tithi.deity}</span>
                </div>

                {/* If Current Tithi differs or current time is past sunrise Tithi, display live status */}
                {panchang.hasSunriseTithiEnded && panchang.currentTithi && !panchang.currentTithi.isSameAsSunrise && (
                  <div className="mt-1 pt-1.5 border-t border-dashed border-amber-300 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/40 p-2 rounded-xl text-[11px] text-amber-950 dark:text-amber-200">
                    <span className="font-semibold block text-amber-800 dark:text-amber-300">
                      ⚡ Current Tithi: {panchang.currentTithi.fullTithiName}
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 text-[10px]">
                      Ends: {panchang.currentTithi.endsAt}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Nakshatra Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-800 border-2 border-orange-200/80 dark:border-orange-900/50 shadow-sm hover:shadow-md transition-shadow space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-vedic-saffron-700 dark:text-vedic-saffron-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-vedic-saffron-600" aria-hidden="true" />
                    Nakshatra (नक्षत्र)
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                    {panchang.moonSign} Rashi
                  </span>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white">
                    {panchang.nakshatra.name}
                  </div>
                  <div className="text-sm font-devanagari text-stone-600 dark:text-stone-300">
                    {panchang.nakshatra.hindi}
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between">
                <span>Ends: <strong>{panchang.nakshatra.endTime}</strong></span>
                <span className="text-stone-500 text-[11px]">Lord: {panchang.nakshatra.lord}</span>
              </div>
            </div>

            {/* 3. Auspicious Abhijit Muhurat Card (Emerald) */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm hover:shadow-md transition-shadow space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Shubh Muhurat
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                  Abhijit
                </span>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-emerald-900 dark:text-emerald-300">
                  {panchang.muhurat.abhijitMuhurat}
                </div>
                <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  अभिजीत मुहूर्त (Most Auspicious)
                </div>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300">
                ✨ Best for all new ventures, travels & rituals
              </div>
            </div>

            {/* 4. Inauspicious Rahu Kalam Card (Rose / Caution) */}
            <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-800 shadow-sm hover:shadow-md transition-shadow space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  Inauspicious Kaal
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">
                  Avoid
                </span>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-rose-900 dark:text-rose-300">
                  {panchang.inauspicious.rahuKalam}
                </div>
                <div className="text-xs font-medium text-rose-700 dark:text-rose-400">
                  राहु काल (Rahu Kalam)
                </div>
              </div>
              <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300">
                ⚠️ Avoid starting new deeds or signing deals
              </div>
            </div>

          </div>
        </div>

        {/* Sun & Moon Transit Bar (Intuitive Celestial Progression) */}
        <div className="bg-white/80 dark:bg-stone-800/80 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-3 flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Astronomical Sun & Moon Transit for {selectedLocation.city}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/30">
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 block">
                🌅 Sunrise
              </span>
              <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                {panchang.sunMoon.sunrise}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/30">
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 block">
                ☀️ Solar Noon
              </span>
              <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                {panchang.sunMoon.solarNoon}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/30">
              <span className="text-[11px] font-semibold text-orange-800 dark:text-orange-300 block">
                🌇 Sunset
              </span>
              <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                {panchang.sunMoon.sunset}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/30">
              <span className="text-[11px] font-semibold text-indigo-800 dark:text-indigo-300 block">
                🌙 Moonrise
              </span>
              <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                {panchang.sunMoon.moonrise}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/30">
              <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300 block">
                🌑 Moonset
              </span>
              <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                {panchang.sunMoon.moonset}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-700/50 border border-stone-200 dark:border-stone-600">
              <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block">
                ☀️ Sun / 🌙 Moon
              </span>
              <span className="text-xs font-bold text-stone-900 dark:text-white block">
                {panchang.sunSign} / {panchang.moonSign}
              </span>
            </div>

          </div>
        </div>

        {/* Festival Alerts Banner if today has an active festival */}
        {panchang.festivals && panchang.festivals.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-vedic-saffron-600 via-amber-600 to-vedic-gold-600 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-100">
                  Today's Hindu Festival & Celebration
                </div>
                <div className="text-lg sm:text-xl font-bold font-serif">
                  {panchang.festivals.map(f => f.name).join(', ')}
                </div>
              </div>
            </div>
            <Link
              to="/festivals"
              className="px-4 py-2 rounded-xl bg-white text-stone-900 hover:bg-amber-50 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-sm self-stretch sm:self-auto justify-center"
            >
              <span>View Puja Vidhi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
