import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

// Importe todos os arquivos de tradução
import pt from './locales/pt.json';
import es from './locales/es.json';
import en from './locales/en.json'; // 1. Importe o inglês

const i18n = new I18n();

// Defina as traduções disponíveis
i18n.translations = {
  pt,
  es,
  en, // 2. Adicione o inglês
};

// Detecte o idioma do dispositivo
const userLanguage = Localization.getLocales()[0]?.languageCode || 'en';
i18n.locale = userLanguage;

// 3. Defina 'en' como o idioma padrão (fallback)
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default i18n;