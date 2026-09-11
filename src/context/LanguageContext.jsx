import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '../i18n/locales/en';
import hi from '../i18n/locales/hi';

const LanguageContext = createContext();

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' }
];

const DICTIONARIES = {
  en,
  hi
};

const LANG_STORAGE_KEY = 'panchang_language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved && DICTIONARIES[saved]) {
        return saved;
      }
    } catch (e) {
      console.warn('Could not read language from localStorage:', e);
    }
    return 'en'; // Default to English
  });

  const setLanguage = useCallback((newLang) => {
    if (DICTIONARIES[newLang]) {
      setLanguageState(newLang);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, newLang);
      } catch (e) {
        console.warn('Could not save language to localStorage:', e);
      }
    }
  }, []);

  // Translation lookup helper with nested dotted keys and parameterized variable replacement
  const t = useCallback((keyPath, params = {}) => {
    if (!keyPath) return '';
    const keys = keyPath.split('.');
    
    // 1. Try selected language dictionary
    let value = DICTIONARIES[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    // 2. Fallback to English dictionary if not found in selected language
    if (value === undefined && language !== 'en') {
      let fallbackValue = DICTIONARIES.en;
      for (const k of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
          fallbackValue = fallbackValue[k];
        } else {
          fallbackValue = undefined;
          break;
        }
      }
      value = fallbackValue;
    }

    // 3. Fallback to key itself if missing completely
    if (value === undefined) {
      return keyPath;
    }

    // If string has {param} replacements, interpolate them
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return Object.entries(params).reduce((str, [paramKey, paramVal]) => {
        return str.replaceAll(`{${paramKey}}`, String(paramVal ?? ''));
      }, value);
    }

    return value;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
