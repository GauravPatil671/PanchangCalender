import React, { useState } from 'react';
import {
  Moon, Sun, Shield, Award, Compass, Heart,
  ChevronDown, ChevronUp, CheckCircle2, Sparkles,
} from 'lucide-react';

export default function PanchangGrid({ panchang }) {
  const [showGuide, setShowGuide] = useState(false);

  if (!panchang) return null;

  return (
    <div className="space-y-5">

      {/* Collapsible beginner guide — inline link, not a banner */}
      <div>
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 underline underline-offset-2 transition-colors min-h-[32px]"
          aria-expanded={showGuide}
        >
          {showGuide
            ? <><ChevronUp className="w-3.5 h-3.5" aria-hidden="true" /> Hide guide</>
            : <><ChevronDown className="w-3.5 h-3.5" aria-hidden="true" /> What are the Five Limbs?</>
          }
        </button>

        {showGuide && (
          <div className="mt-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-vedic-nightBorder space-y-3 animate-in fade-in duration-150">
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              In Vedic tradition, every day is governed by five celestial coordinates (पञ्च-अंग) that align human activity with cosmic rhythms.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {[
                { n: '1', label: 'Tithi (तिथि)',     color: 'text-amber-700 dark:text-amber-400',            desc: 'Lunar phase day. Governs mental state and spiritual energy.' },
                { n: '2', label: 'Vara (वार)',        color: 'text-orange-700 dark:text-orange-400',          desc: 'Solar weekday. Governs physical vitality and longevity.' },
                { n: '3', label: 'Nakshatra (नक्षत्र)', color: 'text-vedic-saffron-700 dark:text-vedic-saffron-400', desc: 'Lunar constellation. Governs karmic tendencies.' },
                { n: '4', label: 'Yoga (योग)',        color: 'text-vedic-gold-700 dark:text-vedic-gold-400', desc: 'Sun-Moon angular sum. Governs health and harmony.' },
                { n: '5', label: 'Karana (करण)',      color: 'text-emerald-700 dark:text-emerald-400',       desc: 'Half-Tithi. Governs worldly success in commerce.' },
              ].map((item) => (
                <div key={item.n} className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-vedic-nightBorder space-y-1">
                  <p className={`text-[11px] font-bold ${item.color}`}>{item.n}. {item.label}</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 6 Detail Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* 1. Tithi */}
        <div className="vedic-card p-4 sm:p-5 space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <Moon className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                  1. Tithi
                  <span className="ml-1 text-stone-400 dark:text-stone-600 font-sans font-normal text-xs">तिथि</span>
                </h3>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">Lunar Day</span>
              </div>
            </div>
            <span className="vedic-badge bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px]">
              {panchang.paksha}
            </span>
          </div>

          <div className="flex-1 space-y-3 pt-2 border-t border-stone-100 dark:border-vedic-nightBorder">
            <div>
              <p className="panchang-value text-xl">{panchang.tithi.name}</p>
              <p className="text-sm font-devanagari text-vedic-gold-700 dark:text-vedic-gold-400 font-semibold">{panchang.tithi.hindi}</p>
            </div>
            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Ends at</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.tithi.endTime}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Deity</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.tithi.deity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Nature</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.tithi.nature}</dd>
              </div>
            </dl>
            {panchang.hasSunriseTithiEnded && panchang.currentTithi && !panchang.currentTithi.isSameAsSunrise && (
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-[11px]">
                <div className="flex items-center justify-between font-semibold text-amber-800 dark:text-amber-300">
                  <span>Current: {panchang.currentTithi.fullTithiName}</span>
                  <span>Ends {panchang.currentTithi.endsAt}</span>
                </div>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Tithi changed after sunrise.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. Nakshatra */}
        <div className="vedic-card p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-vedic-saffron-600 dark:text-vedic-saffron-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                  2. Nakshatra
                  <span className="ml-1 text-stone-400 dark:text-stone-600 font-sans font-normal text-xs">नक्षत्र</span>
                </h3>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">Lunar Mansion (13°20')</span>
              </div>
            </div>
            <span className="vedic-badge bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px]">
              Lord: {panchang.nakshatra.lord}
            </span>
          </div>
          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-vedic-nightBorder">
            <div>
              <p className="panchang-value text-xl">{panchang.nakshatra.name}</p>
              <p className="text-sm font-devanagari text-vedic-saffron-700 dark:text-vedic-saffron-400 font-semibold">{panchang.nakshatra.hindi}</p>
            </div>
            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Ends at</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.nakshatra.endTime}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Deity</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.nakshatra.deity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Zodiac</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.nakshatra.sign} ({panchang.moonSign})</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 3. Yoga */}
        <div className="vedic-card p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-vedic-gold-600 dark:text-vedic-gold-400 flex items-center justify-center flex-shrink-0">
                <Compass className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                  3. Yoga
                  <span className="ml-1 text-stone-400 dark:text-stone-600 font-sans font-normal text-xs">योग</span>
                </h3>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">Solilunar Sum Angle</span>
              </div>
            </div>
            <span className="vedic-badge bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px]">
              1 of 27
            </span>
          </div>
          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-vedic-nightBorder">
            <div>
              <p className="panchang-value text-xl">{panchang.yoga.name}</p>
              <p className="text-xs text-stone-400 dark:text-stone-500">Astrological Yoga</p>
            </div>
            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Influence</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">Harmonious & Peaceful</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Significance</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">Health & spiritual focus</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 4. Karana */}
        <div className="vedic-card p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                  4. Karana
                  <span className="ml-1 text-stone-400 dark:text-stone-600 font-sans font-normal text-xs">करण</span>
                </h3>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">Half-Tithi Duration</span>
              </div>
            </div>
            <span className="vedic-badge bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px]">
              Action
            </span>
          </div>
          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-vedic-nightBorder">
            <div>
              <p className="panchang-value text-xl">{panchang.karana.name}</p>
              <p className="text-xs text-stone-400 dark:text-stone-500">Movable (Chara) Karana</p>
            </div>
            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Type</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">Chara (Dynamic)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400 dark:text-stone-500">Good for</dt>
                <dd className="font-semibold text-stone-800 dark:text-stone-200">Travel, learning, trade</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 5. Vara & Samvat */}
        <div className="vedic-card p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                5. Vara & Samvat
                <span className="ml-1 text-stone-400 dark:text-stone-600 font-sans font-normal text-xs">वार · संवत</span>
              </h3>
              <span className="text-[10px] text-stone-400 dark:text-stone-500">Solar Day & Era</span>
            </div>
          </div>
          <dl className="space-y-1.5 text-xs pt-2 border-t border-stone-100 dark:border-vedic-nightBorder">
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-vedic-nightBorder">
              <dt className="text-stone-400 dark:text-stone-500">Vikram Samvat</dt>
              <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.samvat.vikram}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-vedic-nightBorder">
              <dt className="text-stone-400 dark:text-stone-500">Shaka Samvat</dt>
              <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.samvat.shaka}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-stone-400 dark:text-stone-500">Ayanam · Season</dt>
              <dd className="font-semibold text-stone-800 dark:text-stone-200">{panchang.samvat.ayanam} · {panchang.samvat.ritu}</dd>
            </div>
          </dl>
        </div>

        {/* 6. Vrat & Observances */}
        <div className="vedic-card p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                Vrat & Observance
                <span className="ml-1 text-stone-400 dark:text-stone-600 font-sans font-normal text-xs">व्रत</span>
              </h3>
              <span className="text-[10px] text-stone-400 dark:text-stone-500">Fasting Schedule</span>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-100 dark:border-vedic-nightBorder space-y-2">
            {panchang.vrats?.length > 0
              ? panchang.vrats.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-200/60 dark:border-rose-900/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 flex-shrink-0" aria-hidden="true" />
                    {v}
                  </div>
                ))
              : (
                  <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed">
                    No obligatory fasting today. Daily prayer and Surya Namaskar are recommended.
                  </p>
                )
            }
          </div>
        </div>

      </div>
    </div>
  );
}
