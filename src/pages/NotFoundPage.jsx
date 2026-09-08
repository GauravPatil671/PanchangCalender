import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-vedic-saffron-100 dark:bg-vedic-saffron-950 text-vedic-saffron-600 dark:text-vedic-saffron-400 flex items-center justify-center mx-auto shadow-sm">
        <Compass className="w-8 h-8 animate-spin-slow" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-serif text-stone-900 dark:text-white">
          404 - Page Not Found
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          The auspicious celestial path you are looking for does not exist or has moved.
        </p>
      </div>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-vedic-saffron-600 hover:bg-vedic-saffron-700 text-white font-semibold text-sm shadow-md shadow-vedic-saffron-500/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Today's Panchang</span>
        </Link>
      </div>
    </div>
  );
}
