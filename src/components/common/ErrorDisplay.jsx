import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="w-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-8 text-center space-y-4 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200 font-serif">
          Unable to Load Panchang Information
        </h3>
        <p className="text-sm text-rose-700 dark:text-rose-300/80 max-w-md mx-auto">
          {message || 'An error occurred while communicating with the astronomical data service.'}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorDisplay;
