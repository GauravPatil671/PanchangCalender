import React from 'react';
import { Sparkles, Moon, Sun, Shield, Award, Compass, Heart } from 'lucide-react';

export default function PanchangGrid({ panchang }) {
  if (!panchang) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Tithi Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  Tithi (तिथि)
                </h3>
                <span className="text-xs text-stone-500">Lunar Day</span>
              </div>
            </div>
            <span className="vedic-badge bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {panchang.paksha}
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="text-2xl font-bold text-stone-900 dark:text-white">
              {panchang.tithi.name}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <p><strong className="text-stone-800 dark:text-stone-200">Presiding Deity:</strong> {panchang.tithi.deity}</p>
              <p><strong className="text-stone-800 dark:text-stone-200">Nature:</strong> {panchang.tithi.nature}</p>
              <p><strong className="text-stone-800 dark:text-stone-200">Ending Time:</strong> {panchang.tithi.endTime}</p>
            </div>
          </div>
        </div>

        {/* Nakshatra Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-vedic-saffron-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-vedic-saffron-100 dark:bg-vedic-saffron-950/60 text-vedic-saffron-700 dark:text-vedic-saffron-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  Nakshatra (नक्षत्र)
                </h3>
                <span className="text-xs text-stone-500">Lunar Mansion</span>
              </div>
            </div>
            <span className="vedic-badge bg-vedic-saffron-100 dark:bg-vedic-saffron-950 text-vedic-saffron-800 dark:text-vedic-saffron-300">
              Lord: {panchang.nakshatra.lord}
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="text-2xl font-bold text-stone-900 dark:text-white">
              {panchang.nakshatra.name}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <p><strong className="text-stone-800 dark:text-stone-200">Ruling Deity:</strong> {panchang.nakshatra.deity}</p>
              <p><strong className="text-stone-800 dark:text-stone-200">Zodiac Sign:</strong> {panchang.nakshatra.sign}</p>
              <p><strong className="text-stone-800 dark:text-stone-200">Ending Time:</strong> {panchang.nakshatra.endTime}</p>
            </div>
          </div>
        </div>

        {/* Yoga Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-vedic-gold-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-vedic-gold-100 dark:bg-vedic-gold-950/60 text-vedic-gold-700 dark:text-vedic-gold-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  Yoga (योग)
                </h3>
                <span className="text-xs text-stone-500">Solilunar Angle</span>
              </div>
            </div>
            <span className="vedic-badge bg-vedic-gold-100 dark:bg-vedic-gold-950 text-vedic-gold-800 dark:text-vedic-gold-300">
              27 Yogas
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="text-xl font-bold text-stone-900 dark:text-white">
              {panchang.yoga.name}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <p><strong className="text-stone-800 dark:text-stone-200">Influence:</strong> Auspicious for spiritual and general worldly deeds.</p>
              <p><strong className="text-stone-800 dark:text-stone-200">Result:</strong> Harmonious health & peace.</p>
            </div>
          </div>
        </div>

        {/* Karana Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  Karana (करण)
                </h3>
                <span className="text-xs text-stone-500">Half-Tithi Duration</span>
              </div>
            </div>
            <span className="vedic-badge bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Action Success
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="text-xl font-bold text-stone-900 dark:text-white">
              {panchang.karana.name}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <p><strong className="text-stone-800 dark:text-stone-200">Category:</strong> Movable (Chara) Karana</p>
              <p><strong className="text-stone-800 dark:text-stone-200">Ideal For:</strong> Starting voyages, commercial dealings, trade, and learning.</p>
            </div>
          </div>
        </div>

        {/* Vara & Samvat Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-indigo-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  Samvat & Era
                </h3>
                <span className="text-xs text-stone-500">Vedic Epoch</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
              <span className="font-semibold text-stone-800 dark:text-stone-200">Vikram Samvat:</span>
              <span className="font-bold text-stone-900 dark:text-white">{panchang.samvat.vikram}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
              <span className="font-semibold text-stone-800 dark:text-stone-200">Shaka Samvat:</span>
              <span className="font-bold text-stone-900 dark:text-white">{panchang.samvat.shaka}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold text-stone-800 dark:text-stone-200">Purnimanta Month:</span>
              <span className="font-bold text-stone-900 dark:text-white">{panchang.month.purnimanta}</span>
            </div>
          </div>
        </div>

        {/* Vrat & Fasting Today */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-rose-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  Vrat & Observance
                </h3>
                <span className="text-xs text-stone-500">Fasting Schedule</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
            {panchang.vrats && panchang.vrats.length > 0 ? (
              panchang.vrats.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>{v}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-500 dark:text-stone-400 py-3">
                No major obligatory fasting prescribed for this lunar day. Regular daily worship and Gayatri Japa recommended.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
