import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, Ban, AlertCircle } from 'lucide-react';

export default function InauspiciousCard({ panchang }) {
  if (!panchang || !panchang.inauspicious) return null;

  const { inauspicious } = panchang;

  const items = [
    {
      name: 'Rahu Kalam (राहु काल)',
      time: inauspicious.rahuKalam,
      icon: Ban,
      severity: 'Avoid New Undertakings',
      desc: 'Ruled by shadow planet Rahu. Avoid auspicious work, purchasing new assets, or starting new business.'
    },
    {
      name: 'Yamaganda (यमगण्ड)',
      time: inauspicious.yamaganda,
      icon: ShieldAlert,
      severity: 'Avoid Crucial Travels',
      desc: 'Ruled by Yama, the god of death and justice. Avoid starting long journeys or signing important deals.'
    },
    {
      name: 'Gulika Kalam (गुलिक काल)',
      time: inauspicious.gulikaKalam,
      icon: Clock,
      severity: 'Repeats Actions',
      desc: 'Ruled by Saturn\'s son Gulika. Deeds done in Gulika repeat again; avoid ominous or unwanted events.'
    },
    {
      name: 'Dur Muhurat (दुर्मुहूर्त)',
      time: inauspicious.durMuhurat,
      icon: AlertTriangle,
      severity: 'Inauspicious Period',
      desc: 'Unfavorable astrological alignment. Avoid major religious rituals and commencement of ventures.'
    },
    {
      name: 'Varjyam (वर्ज्यम्)',
      time: inauspicious.varjyam,
      icon: AlertCircle,
      severity: 'Restricted Window',
      desc: 'A harmful planetary period within the ruling Nakshatra. Fasting or neutral routine tasks are safe.'
    }
  ];

  return (
    <div className="vedic-card p-6 sm:p-7 border-l-4 border-l-rose-500 bg-gradient-to-br from-rose-500/5 via-white to-orange-500/5 dark:from-stone-900 dark:to-stone-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
              Inauspicious Timings (अशुभ मुहूर्त / काल)
            </h3>
            <p className="text-xs text-stone-500">
              Times to avoid starting new ventures, major purchases, or sacred samskaras
            </p>
          </div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 font-semibold self-start sm:self-auto">
          Caution Recommended
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50/90 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80 space-y-2 hover:border-rose-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  {it.name}
                </span>
              </div>
              <div className="text-base font-bold text-rose-700 dark:text-rose-400">
                {it.time}
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                {it.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
