import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { AppState, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { setTabIndex } from '../actions/auth';
import { refreshList } from '../actions/list';
import { AppNavigation } from '../common';
import store from '../store/store';

PushNotification.createChannel(
  {
    channelId: 'Atah_834485892691', // (required)
    channelName: 'Atah App', // (required)
    channelDescription: 'Atah App channel for notifications', // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 5, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);
export default class Notifications {
  notificationConfig = async () => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).

    let _notificationId = '';

    if (Platform.OS === 'ios') {
      const enabled = await messaging().hasPermission();
      if (enabled === 1) {
        console.log('enabled enabled ', enabled);
        // user has permissions
        await messaging().requestPermission();
        messaging().onMessage(async remoteMessage => {
          console.log('messageListener3:', remoteMessage);
          const {data, messageId} = remoteMessage;
          const {title, body} = remoteMessage.notification;
          console.log(
            '🚀 ~ file: Notifications.js ~ line 37 ~ Notifications ~ messaging ~ data',
            data,
          );
          console.log(
            '🚀 ~ file: Notifications.js ~ line 37 ~ Notifications ~ messaging ~ messageId',
            messageId,
          );
          let _notificationId1 = _notificationId;
          _notificationId = messageId;
          if (_notificationId1 !== messageId) {
            let notification11 = {
              ...remoteMessage,
              ...remoteMessage.notification,
              messageId: messageId,
              id: messageId,
              title: title,
              message: body,
              data: data,
              userInfo: data,
              playSound: true,
              picture: data.image,
              bigPictureUrl: data.image, // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
            };
            console.log(
              '🚀 ~ file: Notifications.js ~ line 47 ~ Notifications ~ messaging ~ notification11',
              notification11,
            );

            PushNotification.localNotification(notification11);
            console.log(
              '🚀 ~ file: Notifications.js ~ line 57 ~ Notifications ~ messaging ~ bigPictureUrl',
              data.image,
            );
          }
        });
      } else {
        try {
          setTimeout(async () => {
            await messaging().requestPermission();
          }, 5000);
        } catch (error) {}
      }
    }

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {
        let firebaseToken = await messaging().getToken();
        console.log('XXX', firebaseToken);
        console.log('TOKEN:', token);
        await AsyncStorage.setItem('deviceToken', firebaseToken).then(value => {
          AsyncStorage.getItem('deviceToken').then(val => {
            if (!val) {
              AsyncStorage.setItem('deviceToken', firebaseToken);
            }
          });
        });
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('PushNotification : onNotification ', notification);
        store.dispatch(refreshList('refreshNotificationCount'));
        // process the notification
        if (
          notification.foreground === true &&
          notification.userInteraction === true
        ) {
          // app in foreground mode
          console.log('🚀 Notifications ~ notificationConfig= ~ foreground');
          handleNotifications(notification);
        }
        if (
          notification.foreground === false &&
          notification.userInteraction === true
        ) {
          if (AppState.currentState === 'background') {
            // app in background mode
            console.log('🚀 Notifications ~ notificationConfig= ~ background');
            handleNotifications(notification);
          } else {
            console.log('🚀 Notifications ~ notificationConfig= ~ kill');
            // app in kill mode
            setTimeout(() => {
              handleNotifications(notification);
            }, 1000);
          }
        }
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };
}

const handleNotifications = async notification => {
  console.log('🚀 Notifications ~ handleNotifications ', notification);
  if (notification?.data.type === 'order') {
    AppNavigation.push({
      name: 'OrderDetails',
      passProps: {
        item: {id: notification.data.model_id},
        isFinished:
          notification.data.status == 'canceled' ||
          notification.data.status == 'delivered'
            ? true
            : false,
      },
    });
  } else if (notification?.data.type === 'chat') {
    store.dispatch(setTabIndex(0));
    AppNavigation.push({
      name: 'StoreDetails',
      passProps: {
        storeID: notification.data.store_id,
        isChat: true,
      },
    });
  }
};
