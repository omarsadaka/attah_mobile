import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'i18next';

import 'moment/locale/ar';
import { SET_LANG } from './types';

import moment from 'moment';

export const setLang = (lang, rtl) => async dispatch => {
  console.log("🚀 ~ file: lang.js:10 ~ setLang ~ rtl:", rtl)
  console.log("🚀 ~ file: lang.js:10 ~ setLang ~ lang:", lang)
  moment.locale(lang);
  I18n.locale = lang;
  dispatch({type: SET_LANG, lang, rtl});
  await AsyncStorage.setItem('lang', JSON.stringify({lang, rtl}));
};

export const initLang = (lang, rtl) => async (dispatch, store) => {
  const l = await AsyncStorage.getItem('lang');
  if (l) {
    const d = JSON.parse(l);
    await setLang(d.lang, d.rtl)(dispatch, store);
  } else {
    await setLang(lang, rtl)(dispatch, store);
  }
};

export const getLangFromStorage = () => async (dispatch, store) => {
  const l = await AsyncStorage.getItem('lang');
  console.log("🚀 ~ file: lang.js:30 ~ getLangFromStorage ~ l:", l)
  if (l) {
    const d = JSON.parse(l);
    return d;
  } else {
    return null;
  }
};
