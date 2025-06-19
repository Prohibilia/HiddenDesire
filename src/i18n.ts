import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationPT from './locales/pt/translation.json';

const resources = {
  it: {
    translation: translationIT
  },
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  pt: {
    translation: translationPT
  }
};

console.log('[I18N DEBUG] Lingua iniziale:', i18n.language);
console.log('[I18N DEBUG] Risorse caricate:', Object.keys(resources));
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    detection: { caches: [] },
    interpolation: {
      escapeValue: false
    },
    initImmediate: false,
    debug: true,
  }).then(() => {
    console.log('[I18N DEBUG] Lingua dopo init:', i18n.language);
    console.log('[I18N DEBUG] Bundle attivo:', i18n.getResourceBundle(i18n.language, 'translation'));
  });

export default i18n;