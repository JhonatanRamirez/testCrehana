import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import es from './es.json';

type Locale = 'en' | 'es';

const translations: Record<Locale, any> = {
  en,
  es,
};

const fallback: Locale = 'en';

const detectLocale = (): Locale => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales) && locales.length > 0) {
    const code = locales[0].languageCode;
    if (code === 'es') return 'es';
    if (code === 'en') return 'en';
  }
  return fallback;
};

let currentLocale: Locale = detectLocale();

export const getLocale = () => currentLocale;

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

export const t = (key: string): string => {
  const dict = translations[currentLocale] || translations[fallback];

  const value = key.split('.').reduce<any>((acc, part) => {
    if (acc && acc[part] !== undefined) return acc[part];
    return undefined;
  }, dict);

  return typeof value === 'string' ? value : key;
};
