import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function SectionHeader({
  title,
  subtitle,
  hindiTitle,
  icon: Icon,
  badge,
  isCollapsible = false,
  isCollapsed = false,
  onToggleCollapse,
  controlsId
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-200/80 dark:border-stone-800">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-600 dark:text-vedic-saffron-400">
              <Icon className="w-5 h-5" aria-hidden="true" />
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

      {isCollapsible && onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          aria-expanded={!isCollapsed}
          aria-controls={controlsId}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all self-start sm:self-auto min-h-[36px]"
        >
          <span>{isCollapsed ? t('common.showSection') : t('common.collapse')}</span>
          {isCollapsed ? (
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
