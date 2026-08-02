import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language } from '../types';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  const stored = localStorage.getItem('elp-language');
  if (stored === 'en' || stored === 'km') return stored;
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [languageState, setLanguageState] = useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    setLanguageState(prev => {
      const next = prev === 'en' ? 'km' : 'en';
      localStorage.setItem('elp-language', next);
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('elp-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language: languageState, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function useBilingualText() {
  const { language } = useLanguage();
  return (text: { en: string; km: string }) => text[language] || text.en;
}
