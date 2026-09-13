import React from 'react';
import { Sparkles, Star, Sun, ShieldCheck, Heart, Moon, Clock } from 'lucide-react';

const MUHURATS = [
  {
    name:  'Brahma Muhurat',
    hindi: 'ब्रह्म मुहूर्त',
    key:   'brahmaMuhurat',
    icon:  Moon,
    tag:   'Spiritual',
    desc:  'Sacred window before dawn. Auspicious for meditation, mantra japa, yoga, and deep study.',
  },
  {
    name:  'Abhijit Muhurat',
    hindi: 'अभिजीत मुहूर्त',
    key:   'abhijitMuhurat',
    icon:  Star,
    tag:   'Most Auspicious',
    highlight: true,
    desc:  'Midday victory window. Nullifies planetary doshas. Ideal for major deeds, investments, and journeys.',
  },
  {
    name:  'Vijaya Muhurat',
    hindi: 'विजय मुहूर्त',
    key:   'vijayaMuhurat',
    icon:  ShieldCheck,
    tag:   'Victory',
    desc:  'Afternoon triumph window. Favours legal matters, contracts, trade deals, and travel.',
  },
  {
    name:  'Godhuli Muhurat',
    hindi: 'गोधूलि मुहूर्त',
    key:   'godhuliMuhurat',
    icon:  Sun,
    tag:   'Twilight',
    desc:  'Serene dusk window. Auspicious for evening sandhya, lighting diya lamps, and family peace.',
  },
  {
    name:  'Amrit Kalam',
    hindi: 'अमृत काल',
    key:   'amritKalam',
    icon:  Heart,
    tag:   'Nectar',
    desc:  'Nectarous alignment yielding prosperity, health recovery, and spiritual initiation.',
  },
  {
    name:  'Nishita Muhurat',
    hindi: 'निशीथ मुहूर्त',
    key:   'nishitaMuhurat',
    icon:  Sparkles,
    tag:   'Midnight',
    desc:  'Mystical midnight window. Ideal for Shiva Puja, Kali Puja, and silent meditation.',
  },
];

export default function MuhuratSection({ panchang }) {
  if (!panchang?.muhurat) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MUHURATS.map((item) => {
        const Icon = item.icon;
        const time = panchang.muhurat[item.key];

        return (
          <div
            key={item.key}
            className={`vedic-card p-4 sm:p-5 space-y-3 flex flex-col${item.highlight ? ' accent-auspicious' : ''}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif leading-tight">
                    {item.name}
                  </h4>
                  <span className="text-[11px] font-devanagari text-vedic-gold-700 dark:text-vedic-gold-400 font-semibold">
                    {item.hindi}
                  </span>
                </div>
              </div>
              <span className="vedic-badge bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px] flex-shrink-0">
                {item.tag}
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-vedic-nightBorder">
              <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 flex-shrink-0" aria-hidden="true" />
              <span className="panchang-value text-base">{time || '—'}</span>
            </div>

            {/* Description */}
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed flex-1">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
