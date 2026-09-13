import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, Ban, AlertCircle } from 'lucide-react';

const ITEMS = [
  {
    name:  'Rahu Kalam',
    hindi: 'राहु काल',
    key:   'rahuKalam',
    icon:  Ban,
    severity: 'Avoid new undertakings',
    desc: 'Ruled by shadow planet Rahu. Avoid starting auspicious work, buying assets, or beginning long journeys.',
  },
  {
    name:  'Yamaganda',
    hindi: 'यमगण्ड',
    key:   'yamaganda',
    icon:  ShieldAlert,
    severity: 'Avoid crucial travels',
    desc: 'Ruled by Yama. Avoid commencing major ventures or travel.',
  },
  {
    name:  'Gulika Kalam',
    hindi: 'गुलिक काल',
    key:   'gulikaKalam',
    icon:  Clock,
    severity: 'Actions tend to repeat',
    desc: "Ruled by Saturn's son Gulika. Deeds done here tend to repeat; avoid ominous activities.",
  },
  {
    name:  'Dur Muhurat',
    hindi: 'दुर्मुहूर्त',
    key:   'durMuhurat',
    icon:  AlertTriangle,
    severity: 'Unfavorable window',
    desc: 'Adverse astrological alignment. Avoid major religious rituals and new commencements.',
  },
  {
    name:  'Varjyam',
    hindi: 'वर्ज्यम्',
    key:   'varjyam',
    icon:  AlertCircle,
    severity: 'Restricted period',
    desc: 'Harmful period within the ruling Nakshatra. Routine tasks and prayers remain safe.',
  },
];

export default function InauspiciousCard({ panchang }) {
  if (!panchang?.inauspicious) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
            Inauspicious Timings
            <span className="ml-1 text-stone-400 font-sans font-normal text-xs">अशुभ मुहूर्त</span>
          </h3>
          <p className="text-[10px] text-stone-400 dark:text-stone-500">
            Avoid starting important deeds, purchases, or ceremonies in these windows.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const time = panchang.inauspicious[item.key];
          return (
            <div
              key={item.key}
              className="vedic-card accent-inauspicious p-4 space-y-3"
            >
              {/* Name + time */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{item.name}</p>
                    <p className="text-[10px] font-devanagari text-stone-400 dark:text-stone-500">{item.hindi}</p>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" aria-hidden="true" />
                <span className="panchang-value text-sm">{time || '—'}</span>
              </div>

              {/* Severity tag */}
              <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                {item.severity}
              </p>

              {/* Description */}
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-vedic-nightBorder pt-2">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
