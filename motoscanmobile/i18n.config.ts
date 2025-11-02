import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';


import pt from './locales/pt.json';
import es from './locales/es.json';
import en from './locales/en.json'; 
const i18n = new I18n();


i18n.translations = {
  pt,
  es,
  en,
};


const userLanguage = Localization.getLocales()[0]?.languageCode || 'en';
i18n.locale = userLanguage;


i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default i18n;