// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { I18nManager } from 'react-native';
// import ar from './src/common/defaults/ar.json';
// import en from './src/common/defaults/en.json';
// import appAr from './src/translation/appAr.json';
// import appEn from './src/translation/appEn.json';
// // the translations
// // (tip move them in a JSON file and import them,
// // or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

// I18nManager.forceRTL(false);
// I18nManager.allowRTL(false);
// const resources = {
//   ar: {
//     translation: {...ar, ...appAr},
//   },
//   en: {
//     translation: {...en, ...appEn},
//   },
// };
// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     compatibilityJSON: 'v3',
//     resources,
//     lng: I18nManager.isRTL ? 'en' : 'ar', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
//     // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
//     // if you're using a language detector, do not define the lng option

//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   });

// export default i18n;
