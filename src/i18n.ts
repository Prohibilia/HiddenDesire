import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { InitOptions } from 'i18next';

import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationPT from './locales/pt/translation.json';

// Pulizia localStorage all'avvio per evitare conflitti con la detection
if (typeof window !== 'undefined') {
  localStorage.removeItem('i18nextLng');
  console.log('[I18N DEBUG] localStorage pulito');
}

const resources = {
  it: { translation: translationIT },
  en: { translation: translationEN },
  es: { translation: translationES },
  pt: { translation: translationPT }
};

// Log delle risorse disponibili prima dell'inizializzazione
console.log('[I18N DEBUG] Lingue disponibili:', Object.keys(resources));
console.log('[I18N DEBUG] Lingua browser:', navigator.language);

const i18nConfig: InitOptions = {
  resources,
  fallbackLng: 'es',
  supportedLngs: ['es', 'it', 'en', 'pt'],
  detection: {
    order: ['navigator'], // usa solo la lingua del browser
    caches: [], // disabilita completamente il caching
  },
  interpolation: { 
    escapeValue: false 
  },
  debug: true // abilita i log dettagliati di i18next
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig)
  .then(() => {
    // Log dopo l'inizializzazione
    console.log('[I18N DEBUG] Inizializzazione completata');
    console.log('[I18N DEBUG] Lingua attiva:', i18n.language);
    console.log('[I18N DEBUG] Bundle attivo:', i18n.getResourceBundle(i18n.language, 'translation'));
    
    // Verifica che la lingua sia supportata
    const detectedLang = i18n.language.split('-')[0];
    if (!['es', 'it', 'en', 'pt'].includes(detectedLang)) {
      console.log('[I18N DEBUG] Lingua non supportata, uso fallback:', i18n.options.fallbackLng);
      i18n.changeLanguage('es'); // Forziamo il fallback a 'es' se la lingua non è supportata
    }
  });

// Listener per cambiamenti di lingua
i18n.on('languageChanged', (lng) => {
  console.log('[I18N DEBUG] Lingua cambiata a:', lng);
  console.log('[I18N DEBUG] Nuovo bundle:', i18n.getResourceBundle(lng, 'translation'));
});

export default i18n;