import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import pt from '../locales/pt.json';
import es from '../locales/es.json';
import en from '../locales/en.json';


const i18n = new I18n();
i18n.translations = { pt, es, en };
i18n.defaultLocale = 'en';
i18n.enableFallback = true;


interface LocalizationContextData {
  i18n: I18n;
  locale: string;
  setLocale: (locale: string) => void;
}

const LocalizationContext = createContext<LocalizationContextData>({} as LocalizationContextData);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
  const [locale, setLocale] = useState(deviceLocale);

 
  useEffect(() => {
    const loadLocale = async () => {
      const savedLocale = await AsyncStorage.getItem('user_locale');
      if (savedLocale) {
        setLocale(savedLocale);
      }
    };
    loadLocale();
  }, []);

 
  const changeLocale = async (newLocale: string) => {
    setLocale(newLocale);
    await AsyncStorage.setItem('user_locale', newLocale);
  };


  i18n.locale = locale;

  return (
    <LocalizationContext.Provider value={{ i18n, locale, setLocale: changeLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};


export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}