import moment from 'moment';
import * as types from '../actions/types';

const initialState = {
  senderData: null,
  receiverData: null,
  shipmentData: null,
  company: null,
  deliveryDate: moment().locale('en').format('YYYY-MM-DD'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SENDER_DATA:
      return {...state, senderData: action.payload};

    case types.ADD_RECEIVER_DATA:
      return {...state, receiverData: action.payload};

    case types.ADD_SHIPMENT_DATA:
      return {...state, shipmentData: action.payload};

    case types.ADD_COMPANY_DATA:
      return {...state, company: action.payload};

    case types.ADD_DELIVERY_DATE:
      return {...state, deliveryDate: action.payload};
    default:
      return state;
  }
};
