import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocale, setLocale } from './index';

type I18nContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

const I18nContext = createContext<I18nContextType>({
  language: getLocale(),
  changeLanguage: () => {},
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(getLocale());

  useEffect(() => {
    setLocale(language);
  }, [language]);

  const changeLanguage = (lang: string) => {
    setLocale(lang);
    setLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
