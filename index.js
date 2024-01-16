import messaging from '@react-native-firebase/messaging';
import { I18nManager, LogBox, Platform } from 'react-native';
import { initApp } from './src/App';

I18nManager.allowRTL(false);

LogBox.ignoreAllLogs(true);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
if (Platform.OS === 'ios') {
  messaging()
    .getIsHeadless()
    .then(isHeadless => {
      // console.log("===isHeadless====", isHeadless);
      // do sth with isHeadless
    })
    .catch(error => {
      // console.log("err getIsHeadless", error);
    });
}
initApp();
