import * as types from '../actions/types';

const initialState = {
  userData: null,
  error: null,
  deviceToken: null,
  phone: null,
  code: null,
  cartCount: null,
  notifCount: null,
  tabIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      console.log('from inside the auth reducer: ', action);
      return {...state, userData: action.payload};

    case types.SET_USER_PHONE:
      return {...state, phone: action.payload};

    case types.SET_USER_CODE:
      return {...state, code: action.payload};

    case types.ADD_DEVICE_TOKEN:
      return {...state, deviceToken: action.payload};

    case types.LOGOUT:
      return {...state, userData: null};

    case types.CARTCOUNT:
      console.log('🚀 ~ file: auth.js:40 ~ CARTCOUNT:', action.payload);
      return {...state, cartCount: action.payload};

    case types.NOTIFCOUNT:
      return {...state, notifCount: action.payload};

    case types.SET_TAB_INDEX:
      console.log('------------ action.payload ', action.payload);
      return {...state, tabIndex: action.payload};

    default:
      return state;
  }
};
