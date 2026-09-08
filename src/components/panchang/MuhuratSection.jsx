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
      color: 'indigo',
      desc: 'The sacred creator window before dawn. Ideal for meditation, mantra japa, yoga, and deep study.'
    },
    {
      name: 'Abhijit Muhurat',
      hindi: 'अभिजीत मुहूर्त',
      time: muhurat.abhijitMuhurat,
      icon: Star,
      tag: 'Most Auspicious',
      color: 'emerald',
      desc: 'Midday victory window capable of nullifying all planetary doshas. Highly auspicious for starting all major deeds and journeys.'
    },
    {
      name: 'Vijaya Muhurat',
      hindi: 'विजय मुहूर्त',
      time: muhurat.vijayaMuhurat,
      icon: ShieldCheck,
      tag: 'Success & Victory',
      color: 'amber',
      desc: 'Afternoon window of triumph. Auspicious for legal matters, signing agreements, business ventures, and journeys.'
    },
    {
      name: 'Godhuli Muhurat',
      hindi: 'गोधूलि मुहूर्त',
      time: muhurat.godhuliMuhurat,
      icon: Sun,
      tag: 'Twilight Peace',
      color: 'orange',
      desc: 'The serene twilight when cows return home. Auspicious for evening sandhya, lighting lamps, and quiet prayers.'
    },
    {
      name: 'Nishita Muhurat',
      hindi: 'निशीथ मुहूर्त',
      time: muhurat.nishitaMuhurat,
      icon: Sparkles,
      tag: 'Midnight Sadhana',
      color: 'purple',
      desc: 'Midnight mystical window. Ideal for Shiva Puja, Kali Puja, Maha Shivratri, and Krishna Janmashtami worship.'
    },
    {
      name: 'Amrit Kalam',
      hindi: 'अमृत काल',
      time: muhurat.amritKalam,
      icon: Heart,
      tag: 'Nectar Window',
      color: 'rose',
      desc: 'Nectarous planetary alignment yielding prosperity, health recovery, and initiation into sacred mantras.'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {muhuratList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="vedic-card p-5 space-y-3 relative overflow-hidden hover:border-vedic-saffron-300 dark:hover:border-vedic-saffron-700 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white font-serif">
                      {item.name}
                    </h4>
                    <span className="text-xs text-stone-500">{item.hindi}</span>
                  </div>
                </div>
                <span className="vedic-badge bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  {item.tag}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {item.time}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
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
