import React from 'react';

export function LoadingSkeleton({ type = 'card' }) {

  if (type === 'hero') {
    return (
      <div className="w-full bg-white dark:bg-vedic-nightCard rounded-xl border border-stone-200 dark:border-vedic-nightBorder p-5 sm:p-8 animate-pulse space-y-5 shadow-card-sm">
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 bg-stone-200 dark:bg-stone-800 rounded" />
          <div className="h-3 w-20 bg-stone-200 dark:bg-stone-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-9 w-64 bg-stone-200 dark:bg-stone-800 rounded-lg" />
          <div className="h-4 w-48 bg-stone-100 dark:bg-stone-800/60 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-stone-100 dark:bg-stone-800/60 rounded pl-4 border-l-4 border-stone-200 dark:border-stone-700" />
      </div>
    );
  }

  if (type === 'essentials') {
    return (
      <div className="bg-white dark:bg-vedic-nightCard rounded-xl border border-stone-200 dark:border-vedic-nightBorder animate-pulse overflow-hidden shadow-card-sm">
        <div className="flex divide-x divide-stone-100 dark:divide-vedic-nightBorder">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex-1 px-4 py-4 space-y-2">
              <div className="h-2 w-14 bg-stone-200 dark:bg-stone-800 rounded" />
              <div className="h-4 w-20 bg-stone-200 dark:bg-stone-800 rounded" />
              <div className="h-2 w-12 bg-stone-100 dark:bg-stone-800/60 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((n) => (
          <div key={n} className="bg-white dark:bg-vedic-nightCard rounded-xl border border-stone-200 dark:border-vedic-nightBorder p-5 space-y-4 shadow-card-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-24 bg-stone-200 dark:bg-stone-800 rounded" />
            </div>
            <div className="h-6 w-40 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-4 w-28 bg-stone-100 dark:bg-stone-800/60 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white dark:bg-vedic-nightCard rounded-xl p-5 border border-stone-200 dark:border-vedic-nightBorder space-y-3 shadow-card-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-20 bg-stone-200 dark:bg-stone-800 rounded" />
            </div>
            <div className="h-5 w-3/4 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-3 w-1/2 bg-stone-100 dark:bg-stone-800/60 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // Default
  return (
    <div className="h-40 w-full bg-white dark:bg-vedic-nightCard rounded-xl p-5 border border-stone-200 dark:border-vedic-nightBorder animate-pulse space-y-3 shadow-card-sm">
      <div className="h-4 w-36 bg-stone-200 dark:bg-stone-800 rounded" />
      <div className="h-3 w-full bg-stone-100 dark:bg-stone-800/60 rounded" />
      <div className="h-3 w-3/4 bg-stone-100 dark:bg-stone-800/60 rounded" />
    </div>
  );
}

export default LoadingSkeleton;
