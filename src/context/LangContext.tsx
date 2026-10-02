import React, { createContext, useContext, useState, useEffect } from 'react';
import thDict from '../data/i18n/th.json';
import enDict from '../data/i18n/en.json';
import { Language, LocalizedString } from '../types';

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (keyPath: string) => string;
  loc: (obj: LocalizedString | undefined) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('th');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('idv_lang') as Language;
      if (saved === 'th' || saved === 'en') {
        setLangState(saved);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('idv_lang', newLang);
    } catch {
      // Ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'th' ? 'en' : 'th');
  };

  const t = (keyPath: string): string => {
    const dict = lang === 'th' ? thDict : enDict;
    const parts = keyPath.split('.');
    let curr: any = dict;
    for (const p of parts) {
      if (curr && typeof curr === 'object' && p in curr) {
        curr = curr[p];
      } else {
        return keyPath;
      }
    }
    return typeof curr === 'string' ? curr : keyPath;
  };

  const loc = (obj: LocalizedString | undefined): string => {
    if (!obj) return '';
    return obj[lang] || obj.th || obj.en || '';
  };

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t, loc }}>
      {children}
    </LangContext.Provider>
  );
};

export function useLang(): LangContextType {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
