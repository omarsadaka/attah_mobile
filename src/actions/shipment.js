import {
  ADD_COMPANY_DATA,
  ADD_DELIVERY_DATE,
  ADD_RECEIVER_DATA,
  ADD_SENDER_DATA,
  ADD_SHIPMENT_DATA,
} from './types';

export const setSenderData = data => {
  return {type: ADD_SENDER_DATA, payload: data};
};

export const setReceiverData = data => {
  return {type: ADD_RECEIVER_DATA, payload: data};
};

export const setShipmentData = data => {
  return {type: ADD_SHIPMENT_DATA, payload: data};
};

export const setCompanytData = data => {
  return {type: ADD_COMPANY_DATA, payload: data};
};

export const setDeliveryDate = date => {
  return {type: ADD_DELIVERY_DATE, payload: date};
};
