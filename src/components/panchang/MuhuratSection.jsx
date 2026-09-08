import React from 'react';
import { Sparkles, Star, Sun, ShieldCheck, Heart, Moon } from 'lucide-react';

export default function MuhuratSection({ panchang }) {
  if (!panchang || !panchang.muhurat) return null;

  const { muhurat } = panchang;

  const muhuratList = [
    {
      name: 'Brahma Muhurat',
      hindi: 'ब्रह्म मुहूर्त',
      time: muhurat.brahmaMuhurat,
      icon: Moon,
      tag: 'Spiritual / Meditation',
      badgeClass: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300',
      desc: 'The sacred creator window before dawn. Highly auspicious for meditation, mantra japa, yoga, and deep study.'
    },
    {
      name: 'Abhijit Muhurat',
      hindi: 'अभिजीत मुहूर्त',
      time: muhurat.abhijitMuhurat,
      icon: Star,
      tag: 'Most Auspicious',
      badgeClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold',
      desc: 'Midday victory window capable of nullifying planetary doshas. Highly auspicious for starting major deeds, investments, and journeys.'
    },
    {
      name: 'Vijaya Muhurat',
      hindi: 'विजय मुहूर्त',
      time: muhurat.vijayaMuhurat,
      icon: ShieldCheck,
      tag: 'Victory & Success',
      badgeClass: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
      desc: 'Afternoon window of triumph. Auspicious for legal matters, signing contracts, trade deals, and journeys.'
    },
    {
      name: 'Godhuli Muhurat',
      hindi: 'गोधूलि मुहूर्त',
      time: muhurat.godhuliMuhurat,
      icon: Sun,
      tag: 'Twilight Prayers',
      badgeClass: 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300',
      desc: 'The serene twilight when cows return home. Auspicious for evening sandhya, lighting diya lamps, and family peace.'
    },
    {
      name: 'Amrit Kalam',
      hindi: 'अमृत काल',
      time: muhurat.amritKalam,
      icon: Heart,
      tag: 'Nectar Window',
      badgeClass: 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300',
      desc: 'Nectarous planetary alignment yielding prosperity, health recovery, and spiritual initiation.'
    },
    {
      name: 'Nishita Muhurat',
      hindi: 'निशीथ मुहूर्त',
      time: muhurat.nishitaMuhurat,
      icon: Sparkles,
      tag: 'Midnight Sadhana',
      badgeClass: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300',
      desc: 'Midnight mystical window. Ideal for Shiva Puja, Kali Puja, Maha Shivratri, and silent meditation.'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {muhuratList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="vedic-card p-6 space-y-3.5 relative overflow-hidden border-t-4 border-t-emerald-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                      {item.name}
                    </h4>
                    <span className="text-xs font-devanagari text-emerald-700 dark:text-emerald-400 font-semibold">{item.hindi}</span>
                  </div>
                </div>
                <span className={`vedic-badge text-[11px] ${item.badgeClass}`}>
                  {item.tag}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase">Timing</span>
                  <span className="text-base font-extrabold text-stone-900 dark:text-white">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
