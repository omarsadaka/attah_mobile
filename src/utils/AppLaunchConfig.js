import { NativeModules, Platform } from 'react-native';
import { getLangFromStorage, initLang } from '../actions';
import configRestApi from '../api/utils/config';
import store from '../store/store';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { registerCustomIconType } from '../common';
import icoMoonConfig from '../common/utils/selection.json';
import Notifications from './Notifications';

import ar from '../common/defaults/ar.json';
import en from '../common/defaults/en.json';
import appAr from '../translation/appAr.json';
import appEn from '../translation/appEn.json';
import SplashScreen from 'react-native-splash-screen';

export default async () => {
  const lang = await getLangFromStorage()();
  console.log('🚀 ~ file: AppLaunchConfig.js:20 ~ lang:', lang);
  const resources = {
    ar: {
      translation: {...ar, ...appAr},
    },
    en: {
      translation: {...en, ...appEn},
    },
  };
  if (lang && lang != null) {
    i18next.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      resources: resources,
      lng: lang.lang,
      fallbackLng: 'ar',
      interpolation: {
        escapeValue: false,
      },
    });
    await initLang(lang.lang, lang.rtl)(store.dispatch);
  } else {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    const startLang = deviceLanguage === 'en_US' ? 'en' : 'ar';

    i18next.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      resources: resources,
      lng: startLang,
      fallbackLng: 'ar',
      interpolation: {
        escapeValue: false,
      },
    });
    await initLang(
      startLang,
      deviceLanguage === 'en_US' ? false : true,
    )(store.dispatch);
  }

  await registerCustomIconType('custom', icoMoonConfig);
  const notifications = new Notifications();

  await notifications.notificationConfig();

  configRestApi();
  SplashScreen.hide();
};
