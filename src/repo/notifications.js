import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { NOTIFCOUNT } from '../actions/types';
import { NotificationsApi } from '../api';
import { AppNavigation, showError } from '../common';
import store from '../store/store';

export default class Notifications {
  constructor() {
    this.notificationsApi = new NotificationsApi();
  }

  getUnReadNotif = async () => {
    let success = true;
    try {
      const res = await this.notificationsApi.getUnReadNotif();
      console.log(res, 'unreadCount');
      if (res) {
        success = res;
      }
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  getReadNotif = async () => {
    let success = true;
    try {
      const res = await this.notificationsApi.getReadNotif();
      console.log(res, 'readCount');
      if (res) {
        success = res;
      }
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
  getAllNotif = async () => {
    let success = true;
    try {
      const res = await this.notificationsApi.getAllNotif();
      console.log(res, 'getAllNotif');
      if (res) {
        const data = [];
        res.forEach(element => {
          if (!element.is_read) {
            data.push(element);
          }
        });
        success = data;
      }
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  makeNotifRead = async id => {
    let success = true;
    try {
      const res = await this.notificationsApi.makeNotifRead(id);
      console.log(res, 'makeNotifRead');
      if (res) {
        success = res;
      }
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  getUnReadCounter = async () => {
    let success = false;
    try {
      const res = await this.notificationsApi.getUnReadCounter();
      console.log(res.notifications_count, ' ------------- unreadCount');
      if (res) {
        await store.dispatch({
          type: NOTIFCOUNT,
          payload: res.notifications_count,
        });
        success = res.notifications_count;
      }
    } catch (error) {
      // showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      console.log('user has Permission');
      this.getToken();
      this.SubscribeNotifications();
    } else {
      console.log('user not has Permission');
      this.requestPermission();
    }
  };

  getToken = async () => {
    if (Platform.OS == 'ios') {
      let ReceivedfcmToken = await messaging().getToken();
      if (ReceivedfcmToken) {
        console.log('ReceivedfcmToken:' + ReceivedfcmToken);
        // await store.dispatch(storeDeviceToken(ReceivedfcmToken));
        await AsyncStorage.setItem('deviceToken', ReceivedfcmToken).then(
          value => {
            AsyncStorage.getItem('deviceToken').then(val => {
              if (!val) {
                AsyncStorage.setItem('deviceToken', ReceivedfcmToken);
              }
            });
          },
        );
      }
    } else {
      PushNotification.configure({
        onRegister: async value => {
          console.log('TOKEN:', value);
          console.log('device token ====== =====  ', value);
          // await store.dispatch(storeDeviceToken(value.token));
          await AsyncStorage.setItem('deviceToken', value.token).then(value => {
            AsyncStorage.getItem('deviceToken').then(val => {
              if (!val) {
                AsyncStorage.setItem('deviceToken', value.token);
              }
            });
          });
        },
      });
    }
  };

  requestPermission = async () => {
    try {
      await messaging().requestPermission();
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

  SubscribeNotifications = () => {
    try {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('messageListener1:' + JSON.stringify(remoteMessage));
        const {type, model_id, order_status} = remoteMessage.notification;
        if (type == 'order') {
          AppNavigation.push({
            name: 'OrderDetails',
            passProps: {
              item: {id: model_id},
              isFinished:
                order_status == 'canceled' || order_status == 'delivered'
                  ? true
                  : false,
            },
          });
        }
      });
    } catch (e) {
      console.log('onNotificationOpenedApp error', e);
    }
    try {
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          console.log('messageListener2:' + JSON.stringify(remoteMessage));
          // const {type, model_id, order_status} = remoteMessage.notification;
          // if (type == 'order') {
          //   AppNavigation.push({
          //     name: 'OrderDetails',
          //     passProps: {
          //       item: {id: model_id},
          //       isFinished:
          //         order_status == 'canceled' || order_status == 'delivered'
          //           ? true
          //           : false,
          //     },
          //   });
          // }
        });
    } catch (e) {}
    try {
      messaging().onMessage(async remoteMessage => {
        console.log('messageListener3:' + JSON.stringify(remoteMessage));
        const {title, body} = remoteMessage.notification;
        this.displayNotification(title, body);
      });
    } catch (e) {}
  };

  displayNotification = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Ok',
          onPress: () => {
            console.log('ok pressed');
          },
        },
      ],
      {cancelable: false},
    );
  };
}
