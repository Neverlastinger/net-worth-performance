import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import en from '~/labels/en';

const getLanguageCode = () => {
  if (Platform.OS === 'android') {
    return NativeModules.I18nManager.localeIdentifier.substr(0, 2);
  }

  return (
    // iOS 13 does not have "AppleLocale" - https://github.com/facebook/react-native/issues/26540
    NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
  ).substr(0, 2);
};

export const locale = getLanguageCode();

export const initLocalization = () => (
  new Promise((resolve) => {
    i18n
      .use(initReactI18next)
      .init({
        resources: { en },
        lng: locale,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        }
      }, (err, t) => {
        global.t = t;
        resolve();
      });
  })
);
