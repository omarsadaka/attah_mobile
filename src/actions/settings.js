import {SET_SETTINGS} from './types';

export const setSettings = (userData) => {
  return {type: SET_SETTINGS, payload: userData};
};