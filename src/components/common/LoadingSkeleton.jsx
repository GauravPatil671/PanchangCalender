import React from 'react';

export function LoadingSkeleton({ type = 'card' }) {
  if (type === 'hero') {
    return (
      <div className="w-full bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 animate-pulse space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-stone-200 dark:bg-stone-800 rounded-lg" />
            <div className="h-8 w-64 bg-stone-200 dark:bg-stone-800 rounded-lg" />
            <div className="h-4 w-48 bg-stone-200 dark:bg-stone-800 rounded-lg" />
          </div>
          <div className="h-10 w-40 bg-stone-200 dark:bg-stone-800 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-2 p-3 bg-stone-50 dark:bg-stone-800/40 rounded-2xl">
              <div className="h-3 w-16 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="h-6 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-36 bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="h-4 w-24 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-3 w-1/2 bg-stone-100 dark:bg-stone-800/60 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-48 w-full bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 animate-pulse space-y-4">
      <div className="h-5 w-40 bg-stone-200 dark:bg-stone-800 rounded" />
      <div className="h-4 w-full bg-stone-100 dark:bg-stone-800/60 rounded" />
      <div className="h-4 w-3/4 bg-stone-100 dark:bg-stone-800/60 rounded" />
    </div>
  );
}

export default LoadingSkeleton;
