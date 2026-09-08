import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Shield, Award, Compass, Heart, Info, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function PanchangGrid({ panchang }) {
  const [showGuide, setShowGuide] = useState(false);

  if (!panchang) return null;

  return (
    <div className="space-y-6">
      
      {/* Quick Explainer Bar for Beginners */}
      <div className="bg-amber-500/10 dark:bg-stone-800/80 border border-amber-300/60 dark:border-amber-900/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white">
              Understanding the 5 Limbs (पंच-अंग)
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              In Vedic astrology, every day is governed by 5 celestial coordinates that harmonize solar and lunar energy.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowGuide(!showGuide)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-600 text-xs font-semibold hover:border-amber-400 self-start sm:self-auto transition-colors"
        >
          <span>{showGuide ? 'Hide Guide' : 'Read Quick Guide'}</span>
          {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Beginner Guide */}
      {showGuide && (
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-4 animate-in fade-in duration-200 text-xs text-stone-700 dark:text-stone-300">
          <h5 className="font-bold text-stone-900 dark:text-white text-sm font-serif">
            Why are these 5 coordinates calculated daily?
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400">1. Tithi (तिथि)</span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">Lunar phase day. Governs mental state, spiritual energy, and auspiciousness for fasts.</p>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="font-bold text-orange-700 dark:text-orange-400">2. Vara (वार)</span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">Solar weekday. Governs physical vitality, longevity (Ayushya), and bodily vigor.</p>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="font-bold text-vedic-saffron-700 dark:text-vedic-saffron-400">3. Nakshatra (नक्षत्र)</span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">Lunar constellation. Governs karmic tendencies, temperament, and auspicious actions.</p>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="font-bold text-vedic-gold-700 dark:text-vedic-gold-400">4. Yoga (योग)</span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">Sun-Moon angular sum. Governs overall health, harmony, and relationship balance.</p>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">5. Karana (करण)</span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">Half-Tithi division. Governs worldly success in contracts, journeys, and commerce.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main 5 Limbs Detailed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* 1. Tithi Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  1. Tithi (तिथि)
                </h3>
                <span className="text-xs text-stone-500">Lunar Day Angle</span>
              </div>
            </div>
            <span className="vedic-badge bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {panchang.paksha} Paksha
            </span>
          </div>

          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-white">
                {panchang.tithi.name}
              </div>
              <div className="text-sm font-devanagari text-amber-700 dark:text-amber-400 font-semibold">
                {panchang.tithi.hindi}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl">
              <div className="flex justify-between">
                <span className="text-stone-500">Ending Time:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.tithi.endTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Presiding Deity:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.tithi.deity}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Tithi Nature:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.tithi.nature}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Nakshatra Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-vedic-saffron-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-vedic-saffron-100 dark:bg-vedic-saffron-950/60 text-vedic-saffron-700 dark:text-vedic-saffron-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  2. Nakshatra (नक्षत्र)
                </h3>
                <span className="text-xs text-stone-500">Lunar Mansion (13°20')</span>
              </div>
            </div>
            <span className="vedic-badge bg-vedic-saffron-100 dark:bg-vedic-saffron-950 text-vedic-saffron-800 dark:text-vedic-saffron-300">
              Lord: {panchang.nakshatra.lord}
            </span>
          </div>

          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-white">
                {panchang.nakshatra.name}
              </div>
              <div className="text-sm font-devanagari text-vedic-saffron-700 dark:text-vedic-saffron-400 font-semibold">
                {panchang.nakshatra.hindi}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl">
              <div className="flex justify-between">
                <span className="text-stone-500">Ending Time:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.nakshatra.endTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Ruling Deity:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.nakshatra.deity}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Zodiac Sign:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.nakshatra.sign} ({panchang.moonSign})</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Yoga Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-vedic-gold-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-vedic-gold-100 dark:bg-vedic-gold-950/60 text-vedic-gold-700 dark:text-vedic-gold-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  3. Yoga (योग)
                </h3>
                <span className="text-xs text-stone-500">Solilunar Sum Angle</span>
              </div>
            </div>
            <span className="vedic-badge bg-vedic-gold-100 dark:bg-vedic-gold-950 text-vedic-gold-800 dark:text-vedic-gold-300">
              Auspicious
            </span>
          </div>

          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-white">
                {panchang.yoga.name}
              </div>
              <div className="text-xs text-stone-500">
                One of 27 Sacred Astrological Yogas
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl">
              <div className="flex justify-between">
                <span className="text-stone-500">Vedic Influence:</span>
                <strong className="text-stone-900 dark:text-white">Harmonious & Peaceful</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Significance:</span>
                <span className="text-stone-800 dark:text-stone-200">Fosters health, spiritual focus & calm</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Karana Detail Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  4. Karana (करण)
                </h3>
                <span className="text-xs text-stone-500">Half-Tithi Duration</span>
              </div>
            </div>
            <span className="vedic-badge bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Action Success
            </span>
          </div>

          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-white">
                {panchang.karana.name}
              </div>
              <div className="text-xs text-stone-500">
                Movable (Chara) Karana
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl">
              <div className="flex justify-between">
                <span className="text-stone-500">Classification:</span>
                <strong className="text-stone-900 dark:text-white">Chara (Dynamic)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Recommended For:</span>
                <span className="text-stone-800 dark:text-stone-200">Travel, learning, commercial trade</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Vara & Samvat Card */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-indigo-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  5. Vara & Samvat (संवत)
                </h3>
                <span className="text-xs text-stone-500">Solar Day & Historical Era</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl">
              <div className="flex justify-between py-1 border-b border-stone-200/60 dark:border-stone-700/60">
                <span className="text-stone-500">Vikram Samvat:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.samvat.vikram}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60 dark:border-stone-700/60">
                <span className="text-stone-500">Shaka Samvat:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.samvat.shaka}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Ayanam & Season:</span>
                <strong className="text-stone-900 dark:text-white">{panchang.samvat.ayanam} • {panchang.samvat.ritu}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Vrat & Observances Today */}
        <div className="vedic-card p-6 space-y-4 relative overflow-hidden border-t-4 border-t-rose-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif">
                  Vrat & Observance (व्रत)
                </h3>
                <span className="text-xs text-stone-500">Daily Fasting Schedule</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
            {panchang.vrats && panchang.vrats.length > 0 ? (
              panchang.vrats.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 p-3 rounded-xl border border-rose-200/60 dark:border-rose-900/40">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                  <span>{v}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl">
                No obligatory major fasting for this lunar day. Regular daily prayer and Surya Namaskar recommended.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
