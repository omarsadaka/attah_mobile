import * as types from '../actions/types';

const initialState = {
  settings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SETTINGS:
      return {...state, settings: action.payload};
    default:
      return state;
  }
};
