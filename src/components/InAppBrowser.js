import React, { useEffect } from 'react';
import { Alert, Dimensions, Linking, Platform, StatusBar,View } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import colors from '../common/defaults/colors';
import Navigation from '../common/Navigation';
import { getLangFromStorage } from '../actions';
import { BASE_URL } from '../api/utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const openLink = async (url, orderID, animated = true) => {

  const checkPayment = token => {
    fetch(`${BASE_URL}orders/${orderID}/check-payment`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('json1', json);
        InAppBrowser.close();
        if (json.is_paid) {
          if (lang.lang == 'ar') Navigation.navigateToHomeAr(0);
          else Navigation.navigateToHome(3);
        } 
      })
      .catch(error => {
        console.log('error', error);
        InAppBrowser.close();
      });
  };
  const lang = await getLangFromStorage()();
  console.log('🚀 ~ file: InAppBrowser.js:11 ~ openLink ~ url', url);
  try {
    // InAppBrowser.close();
    const {width, height} = Dimensions.get('window');
    if (await InAppBrowser.isAvailable()) {
      // A delay to change the StatusBar when the browser is opened
      const delay = animated && Platform.OS === 'ios' ? 400 : 0;
      setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: colors.primary,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'custom',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        formSheetPreferredContentSize: {
          width: width - width / 6,
          height: height - height / 4,
        },
        // Android Properties
        showTitle: true,
        toolbarColor: colors.primary,
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        // headers: {
        //   'my-custom-header': ''
        // },
        hasBackButton: true,
        browserPackage: undefined,
        showInRecents: true,
        includeReferrer: true,
      });
      console.log('🚀 ~ file: InAppBrowser.js:57 ~ openLink ~ result', result);
      // A delay to show an alert when the browser is closed
      if(result.type=='cancel'){
        const token = await AsyncStorage.getItem('@access_token');
        checkPayment(token)
      }
      await sleep(800);
     
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    await sleep(50);
    const errorMessage = error.message || error;
    Alert.alert(errorMessage);
  } finally {
    // Restore the previous StatusBar of the App
    // StatusBar.setBarStyle(statusBarStyle);
  }
};
