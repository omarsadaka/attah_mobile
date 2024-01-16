import { ADD_MSG } from './types';

export const addMsg = (msg) => {
  return { type: ADD_MSG, payload: msg };
};
