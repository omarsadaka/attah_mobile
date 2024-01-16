import * as types from '../actions/types';

const initialState = {
  msg: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MSG:
      return { ...state, msg: action.payload };

    default:
      return state;
  }
};
