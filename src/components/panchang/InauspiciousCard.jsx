import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, Ban, AlertCircle } from 'lucide-react';

export default function InauspiciousCard({ panchang }) {
  if (!panchang || !panchang.inauspicious) return null;

  const { inauspicious } = panchang;

  const items = [
    {
      name: 'Rahu Kalam',
      hindi: 'राहु काल',
      time: inauspicious.rahuKalam,
      icon: Ban,
      severity: 'Avoid New Undertakings',
      desc: 'Ruled by shadow planet Rahu. Avoid starting auspicious work, buying assets, or embarking on long journeys.'
    },
    {
      name: 'Yamaganda',
      hindi: 'यमगण्ड',
      time: inauspicious.yamaganda,
      icon: ShieldAlert,
      severity: 'Avoid Crucial Travels',
      desc: 'Ruled by Yama, the god of death and justice. Avoid commencing major new ventures or travel.'
    },
    {
      name: 'Gulika Kalam',
      hindi: 'गुलिक काल',
      time: inauspicious.gulikaKalam,
      icon: Clock,
      severity: 'Repeats Actions',
      desc: 'Ruled by Saturn\'s son Gulika. Deeds done in Gulika tend to repeat; avoid ominous or unwanted events.'
    },
    {
      name: 'Dur Muhurat',
      hindi: 'दुर्मुहूर्त',
      time: inauspicious.durMuhurat,
      icon: AlertTriangle,
      severity: 'Unfavorable Window',
      desc: 'Adverse astrological alignment. Avoid major religious rituals and commencement of ventures.'
    },
    {
      name: 'Varjyam',
      hindi: 'वर्ज्यम्',
      time: inauspicious.varjyam,
      icon: AlertCircle,
      severity: 'Restricted Window',
      desc: 'A harmful planetary period within the ruling Nakshatra. Routine tasks and prayers are safe.'
    }
  ];

  return (
    <div className="vedic-card p-6 sm:p-7 border-t-4 border-t-rose-500 bg-gradient-to-br from-rose-500/5 via-white to-orange-500/5 dark:from-stone-900 dark:to-stone-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200/80 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
              Inauspicious Timings (अशुभ मुहूर्त / काल)
            </h3>
            <p className="text-xs text-stone-500">
              Windows to avoid starting important deals, purchases, or ceremonies
            </p>
          </div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold self-start sm:self-auto">
          ⚠️ Caution Recommended
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-3 hover:border-rose-400 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Icon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  {it.name} <span className="text-xs text-stone-500 font-devanagari">({it.hindi})</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-semibold">
                  {it.severity}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 uppercase">Timing</span>
                <span className="text-base font-extrabold text-stone-900 dark:text-white">
                  {it.time}
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {it.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
