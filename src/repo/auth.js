import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { setUserData } from '../actions/auth';
import ApiAuth from '../api/auth';
import { AppNavigation, showError, showSuccess } from '../common';
import store from '../store/store';
import { dataToFormData } from './utils/dataFormation';

import i18next from 'i18next';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import * as authActions from '../actions/auth';
import {
  NOTIFCOUNT, SET_UNSEEN_COUNT
} from '../actions/types';
export default class Auth {
  constructor() {
    this.apiAuth = new ApiAuth();
  }

  signIn = async values => {
    console.log(values);
    let success = true;
    try {
      const userData = await this.apiAuth.signIn(values);
      console.log('userData', userData);
      showSuccess(userData.message);
      success = userData;
    } catch (error) {
      console.log('error login', error);
      if (error.hasOwnProperty('isActive')) {
        success = {
          status: false,
          isActive: error.isActive,
        };
      } else {
        success = false;
      }
      showError(error.msg);
    } finally {
      return success;
    }
  };

  checkUser = async data => {
    let success = null;
    try {
      const res = await this.apiAuth.checkUser(data);
      console.log('checkUser', res);
      if (res) {
        success = res.new_user;
      }
    } catch (error) {
      success = false;
      // showError(error.msg);
    } finally {
      return success;
    }
  };

  deleteAccount = async () => {
    let success = null;
    try {
      const res = await this.apiAuth.deleteAccount();
      console.log('checkUser', res);
      if (res) {
        success = res;
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getUserData = async () => {
    const userData = await this.apiAuth.getUserData();
    console.log('userDatauserData ', userData);
    await store.dispatch(authActions.setUserData(userData));
    return userData;
  };

  getCartCount = async () => {
    let success = [];
    try {
      const res = await this.apiAuth.getCartCount();
      console.log("🚀 ~ file: auth.js:89 ~ Auth ~ getCartCount= ~ res:", res)
      if (res) {
        success = res;
        await store.dispatch(authActions.setCartCount(res.length));
      }
    } catch (error) {
      success = [];
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getNotifiCounter = async () => {
    let success = false;
    try {
      const res = await this.apiAuth.getNotifCounter();
      console.log('unreadCount', res);
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

  updateUser = async data => {
    let success = null;
    try {
      const userData = await this.apiAuth.updateUser(data);
      console.log('userData update', userData);
      if (userData.id) {
        success = userData;
        await store.dispatch(authActions.setUserData(userData));
        showSuccess(i18next.t('modifiedSuccessfully'));
      }
    } catch (error) {
      console.log('error update ', error);
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  uploadImage = async values => {
    let success = {};
    try {
      const res = await this.apiAuth.uploadImage(values);
      console.log('uploadImage ', res);
      success = res;
    } catch (error) {
      console.log('uploadImage error', error);
      success = {};
      showError(error.msg);
    } finally {
      return success;
    }
  };

  register = async values => {
    let success = true;
    try {
      const res = await this.apiAuth.register(dataToFormData(values));
      showSuccess(res.data.message);
      console.log('resresres  register //// register ', res.data);
      success = res.data.code;
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  registerData = async values => {
    let success = true;
    try {
      const userData = await this.apiAuth.registerData(
        dataToFormData({
          ...values,
          device_token: store.getState().auth.deviceToken,
        }),
      );
      console.log(userData, 'userData');
      success = userData;
      await this.setPrincipalUser(userData);
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  resetPassword = async values => {
    console.log('values resetPassword ', values);
    let success = true;
    try {
      const res = await this.apiAuth.resetPassword(dataToFormData(values));
      // console.log("res reset pass word ", res)
      showSuccess(i18next.t('passwordChangedSuccessfully'));
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  changePassword = async values => {
    let success = true;
    try {
      const res = await this.apiAuth.changePassword(dataToFormData(values));
      console.log(res, 'RESS');
      showSuccess(res.data);
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  forgetPassword = async values => {
    let res = null;
    try {
      res = await this.apiAuth.forgetPassword(dataToFormData(values));
      console.log(res, '---------forgot password');
      if (res?.statusCode === 205) {
        showError(res?.data?.message);
        AppNavigation.push({
          name: 'signUp',
          passProps: {phone: res?.data?.mobile},
        });
        res = false;
      }
    } catch (error) {
      console.log(error, '************************');
      if (error.msg.statusCode === 408) {
        AppNavigation.push({
          name: 'verifyCode',
          passProps: {
            phone: values.phone,
            testCode: '',
            onFinish: code => {
              return onFinish(code, values);
            },
          },
        });
      }
      showError(
        error.msg.errors.message ? error.msg.errors.message : error.msg.errors,
      );
    } finally {
      return res;
    }
  };

  verifyCode = async data => {
    let success = false;
    try {
      const res = await this.apiAuth.verifyCode(data);
      console.log('success res: ', res);
      // showSuccess(res.message);
      success = res;
    } catch (error) {
      console.log('error from auth repo: ', error);
      showError(error.msg);
    } finally {
      return success;
    }
  };

  verifyCodeUdatePhone = async data => {
    let success = true;
    try {
      const res = await this.apiAuth.verifyCodeUdatePhone(data);
      console.log(res, 'verifyCodeUudatePhone');
      success = res;
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  resendCode = async data => {
    let success = null;
    try {
      let res = await this.apiAuth.resendCode(data);
      console.log('success resendCode: ', res);
      showSuccess(res.message);
      success = res;
    } catch (error) {
      showError(error.msg);
    } finally {
      return success;
    }
  };

  setTimeToActiveResendCode = async time => {
    try {
      console.log('========================', {time: time});
      if (time === null) {
        console.log('null **************** time time null');
        await AsyncStorage.removeItem('@TimeToActiveResendCode');
      } else
        await AsyncStorage.setItem(
          '@TimeToActiveResendCode',
          JSON.stringify({time: time}),
        );
    } catch (error) {
      console.log(error);
    }
  };

  getTimeToActiveResendCode = async () => {
    try {
      const time = await AsyncStorage.getItem('@TimeToActiveResendCode');
      if (time !== null) {
        console.log('wwwwwwwwwwwwww ', time);
        return time;
      } else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  setPrincipalUser = async userData => {
    console.log('ssssssssssssssssss userData', userData);
    try {
      await store.dispatch(setUserData(userData));
      if (userData === null) {
        await AsyncStorage.removeItem('@UserData');
        if (Platform.OS === 'android' && systemVersion === '8.1') {
          AsyncStorage.clear();
        }
      } else await AsyncStorage.setItem('@UserData', JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };

  checkPrincipalUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('@UserData');
      const systemVersion = DeviceInfo.getSystemVersion();
      console.log('buildNumber ', systemVersion);
      if (Platform.OS === 'android' && systemVersion === '8.1') {
        console.log('userData ', userData);
        AsyncStorage.clear();
      }
      if (userData !== null) {
        const convertedUserData = JSON.parse(userData);
        // this.notificationRepo.updateToken();
        return convertedUserData;
      } else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // getPrincipalUserProfileData = async () => {
  //   const userData = await this.apiAuth.getPrincipalUserProfileData();
  //   // await this.setPrincipalUser(userData);
  //   // console.log('userDatauserData ', userData);
  //   // return userData;
  // };

  logoutPrincipalUser = async () => {
    let success = true;
    try {
      const res = await this.apiAuth.logoutPrincipalUser(
        dataToFormData({device_token: store.getState().auth.deviceToken}),
      );
      if (res.statusCode === 200 || res.statusCode === 411) {
        AppNavigation.navigateToAuth();
        PushNotification.cancelAllLocalNotifications();
        PushNotification.removeAllDeliveredNotifications();
        await this.setPrincipalUser(null);
        store.dispatch({type: SET_UNSEEN_COUNT, payload: 0});
        return success;
      }
    } catch (error) {
      showError(error.msg);
      console.log(
        '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        error,
      );
      return false;
    } finally {
      return success;
    }
  };

  sendInvitation = async values => {
    let success = true;
    try {
      const send = await this.apiAuth.sendInvitation(dataToFormData(values));
      console.log('------', send);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
  refreshToken = async () => {
    let success = true;
    try {
      const userData = await this.apiAuth.refreshToken();
      await this.setPrincipalUser(userData);
    } catch (error) {
      // showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  getAds = async () => {
    let success = [];
    try {
      const res = await this.apiAuth.getAds();
      console.log('res', res);
      if (res) {
        success = res;
      }
    } catch (error) {
      success = [];
      showError(error.msg);
    } finally {
      return success;
    }
  };
}
