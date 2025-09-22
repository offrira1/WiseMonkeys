import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const LanguageToggle = ({ className = "" }) => {
  const { language, toggleLanguage, isHebrew } = useLanguage();
  const t = translations[language].common;

  return (
    <div className={`language-toggle ${className}`}>
      <button
        onClick={() => toggleLanguage()}
        className={`lang-btn ${isHebrew ? 'hebrew' : 'english'}`}
        title={t.language}
      >
        <span className="current-lang">
          {isHebrew ? 'עברית' : 'English'}
        </span>
        <span className="lang-icon">🌐</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
