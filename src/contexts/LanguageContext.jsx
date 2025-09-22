import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'hebrew';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hebrew' ? 'english' : 'hebrew');
  };

  const isHebrew = language === 'hebrew';
  const isEnglish = language === 'english';

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      isHebrew,
      isEnglish
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
