import React from 'react';
import axios from 'axios';
import {
  ApiActivationErrorException,
  ApiErrorException,
  ApiErrorTypes,
} from './utils/errors';
import I18n from 'i18next';
import DeviceInfo from 'react-native-device-info';
import {
  dataToFormData,
  objectToArray,
  AppendImgValue,
} from '../repo/utils/dataFormation';
import {BASE_URL} from '../api/utils/urls';
import * as authAction from '../actions/auth';
import {showSuccess, showError} from '../common';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Auth {
  signIn = async data => {
    try {
      const res = await axios.post(`${BASE_URL}auth/login`, data);
      console.log('reswwwwww', res.data);
      return res.data;
    } catch (error) {
      if (error.response) {
        if (error.response.data.statusCode === 408) {
          throw new ApiActivationErrorException(
            ApiErrorTypes.GENERAL_ERROR,
            error.response.data.error,
            false,
          );
        } else {
          throw new ApiErrorException(
            ApiErrorTypes.GENERAL_ERROR,
            error.response.data.error,
          );
        }
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  checkUser = async data => {
    try {
      const res = await axios.post(`${BASE_URL}auth/check-user`, data);
      return res.data;
    } catch (error) {
      console.log('error.response ', error.response.data);
      if (!error.response.data) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };

  deleteAccount = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}delete_account`);
      return res.data;
    } catch (error) {
      console.log('error.response ', error.response.data);
      if (!error.response.data) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };

  getUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}profile`);
      let data = res.data;
      return data;
    } catch (error) {
      // alert(error);
    }
  };

  getNotifCounter = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user-notifications/count`);
      return res.data;
    } catch (error) {
      console.log('getUnReadCounter  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getCartCount = async () => {
    try {
      const res = await axios.get(`${BASE_URL}cart`);
      return res.data;
    } catch (error) {
      console.log('error.response ', error.response.data);
      if (!error.response.data) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };

  updateUser = async data => {
    // const formData = new FormData();
    // formData.append('first_name', data.first_name);
    // formData.append('last_name', data.last_name);
    // formData.append('phone', data.phone);
    // formData.append('email', data.email);
    // formData.append('avatar', {
    //   uri: data.avatar,
    //   name: 'image.jpeg' + new Date().getTime(),
    //   type: 'image/jpeg',
    // });
    // console.log('formData', JSON.stringify(formData));
    const obj = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
    };
    const formData = dataToFormData({...obj});
    AppendImgValue(formData, {
      name: 'image.jpeg' + new Date().getTime(),
      value: data.avatar,
      field: 'avatar',
    });
    console.log('formData', JSON.stringify(formData));
    try {
      const res = await axios.post(
        `${BASE_URL}profile`,
        formData,
        // (headers = {
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        //   // 'Content-Type': 'multipart/form-data',
        //   'Content-Type': 'application/json',
        //   Accept: 'application/json',
        // }),
      );
      // console.log('update user', res.data);
      return res.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'update user error',
      );
      showError(error.response.data.error);
    }
  };

  // {
  //   path: 'user/avatar',
  //   file: res.uri,
  //   name: res.fileName,
  // }

  uploadImage = async data => {
    const formData = new FormData();
    formData.append('path', data.path);
    formData.append('image', {
      uri: `data.file`,
      name: data.name,
      type: 'image/jpeg',
    });

    console.log('body', JSON.stringify(body2));
    try {
      const res = await axios.post(
        `${BASE_URL}uploader`,
        formData,
        (headers = {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        }),
      );
      console.log('res.data check-uploader', res.data);
      return res.data;
    } catch (error) {
      console.log('error uploader ', error.response.data);
      if (error.response.data) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  logoutPrincipalUser = async data => {
    try {
      const res = await axios.post('logout', data);
      console.log('res log out ============================', res);

      return res.data;
    } catch (error) {
      if (error.response) {
        console.log('error log out ========================= ', error);

        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  register = async data => {
    try {
      const res = await axios.post('check-login', data);
      console.log('res.data check-login', res.data);
      return res.data;
    } catch (error) {
      console.log('error register ', error);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  registerData = async data => {
    try {
      const res = await axios.post('register', data);
      return res.data.data;
    } catch (error) {
      console.log(error.response, 'register-data error');
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
          // error.response.data.errors.email ? objectToArray(error.response.data.errors)[0][0] : error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  resetPassword = async data => {
    try {
      const res = await axios.post('reset-password', data);
      console.log(res, 'Reset pasword Ress');
      return res.data.data;
    } catch (error) {
      console.log(error.response, 'reset error');
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  changePassword = async data => {
    try {
      const res = await axios.post('change-password', data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error.response, 'change-password error');
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          // objectToArray(error.response.data.errors)[0][0],
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  forgetPassword = async data => {
    try {
      const res = await axios.post('forget-password', data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'forgetPassword error',
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  verifyCode = async data => {
    try {
      const res = await axios.post(`${BASE_URL}auth/verify-account`, data);
      console.log('auth api', res.data);
      return res.data;
    } catch (error) {
      console.log('VerifyCode error', error.response.data);
      if (error.response.data) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  verifyCodeUdatePhone = async data => {
    try {
      const res = await axios.post(`${BASE_URL}profile/verify-phone`, data);
      return res.data;
    } catch (error) {
      console.log('verifyCodeUdatePhone error', error.response.data);
      if (error.response.data) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  resendCode = async data => {
    try {
      const res = await axios.post(
        `${BASE_URL}auth/resend-verification-code`,
        data,
      );
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors.message,
        );
      }
    }
  };

  sendInvitation = async data => {
    console.log(data, 'sendInvitation');
    try {
      const res = await axios.post('invitations', data);
      console.log('------ -', res);
      return true;
    } catch (error) {
      console.log(
        'sendInvitation',
        error.response,
        JSON.parse(JSON.stringify(error)),
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  refreshToken = async () => {
    try {
      const res = await axios.post('refresh');
      console.log('------ -', res);
      return res.data;
    } catch (error) {
      console.log('refresh', error.response, JSON.parse(JSON.stringify(error)));
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getAds = async () => {
    try {
      const res = await axios.get(`${BASE_URL}slides?type=default`);
      return res.data;
    } catch (error) {
      console.log('error.response ', error.response.data);
      if (!error.response.data) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };
}
