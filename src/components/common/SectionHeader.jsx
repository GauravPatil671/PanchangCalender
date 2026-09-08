import React from 'react';

export function SectionHeader({ title, subtitle, hindiTitle, icon: Icon, badge }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 mb-6 border-b border-stone-200/80 dark:border-stone-800">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-600 dark:text-vedic-saffron-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
            {title}
            {hindiTitle && (
              <span className="text-sm font-sans font-normal text-stone-500 dark:text-stone-400">
                ({hindiTitle})
              </span>
            )}
          </h2>
          {badge && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-vedic-gold-100 dark:bg-vedic-gold-950/60 text-vedic-gold-800 dark:text-vedic-gold-300 font-medium">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default SectionHeader;
