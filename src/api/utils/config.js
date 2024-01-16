import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NativeModules, Platform } from 'react-native';
import store from '../../store/store';
export default async () => {
  // Add a request interceptor
  const token = await AsyncStorage.getItem('@access_token');

  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;
  const startLang = deviceLanguage === 'en_US' ? 'en' : 'ar';
  axios.interceptors.request.use(
    async config => {
      console.log('configuration params interceptor III : ', store.getState().auth.deviceToken );
      return {
        ...config,
        headers: {
          ...config.headers,
          'Accept-Language': store.getState().lang.lang,
          Authorization: store.getState().auth.deviceToken
            ? `Bearer ${store.getState().auth.deviceToken}`
            : config.headers.Authorization,
        },
      };
    },

    error => {
      Promise.reject(error);
    },
  );
};
