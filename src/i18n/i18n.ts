import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enJSON } from './en';
import { esJSON } from './es';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enJSON },
      es: { translation: esJSON },
    },
    detection: {
      order: ['localStorage', 'browser'],
      caches: ['localStorage'],
    },
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

export default i18n;
