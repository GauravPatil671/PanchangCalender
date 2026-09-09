import React, { useEffect, useState } from 'react';
import { X, Calendar as CalendarIcon, MapPin, Sparkles, Sun, Moon, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDailyPanchang } from '../../services/panchangApi';
import { useLocationContext } from '../../context/LocationContext';
import { formatDateDisplay, formatDayOfWeek } from '../../utils/dateUtils';
import LoadingSkeleton from '../common/LoadingSkeleton';

export default function DayDetailModal({ dateStr, isOpen, onClose }) {
  const { selectedLocation } = useLocationContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !dateStr) return;
    let isMounted = true;
    setLoading(true);

    getDailyPanchang(dateStr, selectedLocation.latitude, selectedLocation.longitude)
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [dateStr, isOpen, selectedLocation]);

  if (!isOpen || !dateStr) return null;

  // Parse as local time (not UTC) to avoid off-by-one in UTC+ timezones like IST
  const [dy, dm, dd] = (dateStr || '').split('-').map(Number);
  const dateObj = (dy && dm && dd) ? new Date(dy, dm - 1, dd) : new Date(dateStr);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[94vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="day-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-gradient-to-r from-vedic-saffron-50/50 to-amber-50/40 dark:from-stone-900 dark:to-stone-900">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-vedic-saffron-600 dark:text-vedic-saffron-400">
              Panchang Details
            </span>
            <h3 id="day-modal-title" className="text-base sm:text-2xl font-bold font-serif text-stone-900 dark:text-white">
              {formatDateDisplay(dateObj)}
            </h3>
            <p className="text-[10px] sm:text-xs text-stone-500">
              {formatDayOfWeek(dateObj)} • 📍 {selectedLocation.city}, {selectedLocation.state}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close day details"
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {loading ? (
            <LoadingSkeleton type="hero" />
          ) : data ? (
            <>
              {/* Festivals if any */}
              {data.festivals && data.festivals.length > 0 && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-vedic-saffron-500 to-amber-500 text-white space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    Festival / Celebration
                  </div>
                  <div className="text-lg font-bold font-serif">
                    {data.festivals.map(f => f.name).join(', ')}
                  </div>
                  <p className="text-xs opacity-90">
                    {data.festivals[0]?.description}
                  </p>
                </div>
              )}

              {/* Five Limbs Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">Tithi</span>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">{data.tithi.name}</div>
                  <div className="text-[11px] text-stone-500">{data.paksha}</div>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-vedic-saffron-700 dark:text-vedic-saffron-400">Nakshatra</span>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">{data.nakshatra.name}</div>
                  <div className="text-[11px] text-stone-500">Lord: {data.nakshatra.lord}</div>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-vedic-gold-700 dark:text-vedic-gold-400">Yoga</span>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">{data.yoga.name}</div>
                  <div className="text-[11px] text-stone-500">Auspicious</div>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">Karana</span>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">{data.karana.name}</div>
                  <div className="text-[11px] text-stone-500">Chara</div>
                </div>
              </div>

              {/* Sun & Moon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-vedic-sand/30 dark:bg-stone-800/40 p-4 rounded-2xl text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px]">Sunrise</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">{data.sunMoon.sunrise}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">Sunset</span>
                  <span className="font-bold text-orange-700 dark:text-orange-400 text-sm">{data.sunMoon.sunset}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">Moonrise</span>
                  <span className="font-bold text-indigo-700 dark:text-indigo-400 text-sm">{data.sunMoon.moonrise}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">Moonset</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400 text-sm">{data.sunMoon.moonset}</span>
                </div>
              </div>

              {/* Key Timings */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                  Auspicious & Inauspicious Timings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">✨ Abhijit Muhurat:</span>
                    <div className="font-bold text-stone-900 dark:text-white text-sm">{data.muhurat.abhijitMuhurat}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 space-y-1">
                    <span className="font-bold text-rose-800 dark:text-rose-300">⚠️ Rahu Kalam:</span>
                    <div className="font-bold text-stone-900 dark:text-white text-sm">{data.inauspicious.rahuKalam}</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center py-6 text-stone-500">Failed to load data.</p>
          )}
        </div>

        {/* Footer with full page view link */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex items-center justify-between">
          <Link
            to={`/daily?date=${dateStr}`}
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-semibold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline"
          >
            <span>Open Full Day Deep Dive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
