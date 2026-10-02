import React from 'react';
import { useLang } from '../context/LangContext';

export const LangToggle: React.FC = () => {
  const { lang, toggleLang } = useLang();

  return (
    <button
      className="lang-toggle-btn"
      onClick={toggleLang}
      title={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
      aria-label="Toggle language"
    >
      <span className="lang-flag">{lang === 'th' ? '🇹🇭' : '🇬🇧'}</span>
      <span>{lang === 'th' ? 'TH / EN' : 'EN / TH'}</span>
    </button>
  );
};
