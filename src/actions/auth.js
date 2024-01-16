import {
  ADD_DEVICE_TOKEN,
  CARTCOUNT,
  LOGIN_SUCCESS,
  NOTIFCOUNT,
  SET_TAB_INDEX,
  SET_USER_CODE,
  SET_USER_PHONE,
} from './types';

export const setUserData = userData => {
  return {type: LOGIN_SUCCESS, payload: userData};
};

export const setCartCount = count => {
  console.log("🚀 ~ file: auth.js:15 ~ setCartCount ~ count:", count)
  return {type: CARTCOUNT, payload: count};
};

export const setNotifCount = count => {
  return {type: NOTIFCOUNT, payload: count};
};

export const setDeviceToken = token => {
  console.log('token setDeviceToken in action ', token);
  return {type: ADD_DEVICE_TOKEN, payload: token};
};

// SET AUTH ACTION CREATOR FOR NEW AUTHENTICATION
export const setUserPhone = data => {
  return {type: SET_USER_PHONE, payload: data};
};

export const setUserCode = data => {
  return {type: SET_USER_CODE, payload: data};
};

export const setTabIndex = index => {
  return {type: SET_TAB_INDEX, payload: index};
};