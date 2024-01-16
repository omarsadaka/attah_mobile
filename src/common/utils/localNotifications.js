import Snackbar from 'react-native-snackbar';
import I18n from 'i18next';

import {getTheme} from '../Theme';
import {getThemeColor} from './colors';
import {RNToasty} from 'react-native-toasty';
import fonts from '../defaults/fonts';
import {useSelector} from 'react-redux';

export const showInfo = message => {
  // Snackbar.show({
  //   text: message,
  //   duration: Snackbar.LENGTH_LONG,
  //   backgroundColor: getThemeColor(
  //     getTheme().localNotifications.info.backgroundColor,
  //   ),
  //   action: {
  //     text: I18n.t('ui-close'),
  //     textColor: getThemeColor(getTheme().localNotifications.info.closeColor),
  //   },
  // });
  RNToasty.Info({
    title: message,
    fontFamily: fonts.normal,
    position: 'bottom',
  });
};

export const showSuccess = message => {
  // Snackbar.show({
  //   text: message,
  //   duration: Snackbar.LENGTH_LONG,
  //   backgroundColor: getThemeColor(
  //     getTheme().localNotifications.success.backgroundColor,
  //   ),
  //   action: {
  //     text: I18n.t('ui-close'),
  //     textColor: getThemeColor(
  //       getTheme().localNotifications.success.closeColor,
  //     ),
  //   },
  // });
  RNToasty.Success({
    title: message,
    fontFamily: fonts.normal,
    position: 'bottom',
  });
};

export const showError = message => {
  // Snackbar.show({
  //   text: message,
  //   duration: Snackbar.LENGTH_LONG,
  //   backgroundColor: getThemeColor(
  //     getTheme().localNotifications.error.backgroundColor,
  //   ),
  //   action: {
  //     text: I18n.t('ui-close'),
  //     textColor: getThemeColor(getTheme().localNotifications.error.closeColor),
  //   },
  // });
  RNToasty.Error({
    title: message,
    fontFamily: fonts.normal,
    position: 'bottom',
  });
};
