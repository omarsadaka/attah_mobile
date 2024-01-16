import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
import {BASE_URL} from './utils/urls';
export default class Cart {
  addCart = async data => {
    try {
      const res = await axios.post(`${BASE_URL}profile/payment-cards`, data);
      return res.data;
    } catch (error) {
      console.log('error.response  add cart', error.response.data);
      if (!error.response) {
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

  deleteCart = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}profile/payment-cards/${id}`);
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
          error.response.data.error,
        );
      }
    }
  };

  updateCart = async (id, data) => {
    try {
      const res = await axios.put(
        `${BASE_URL}profile/payment-cards/${id}`,
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
          error.response.data.error,
        );
      }
    }
  };

  getCartList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}profile/payment-cards`);
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

  getbBrandList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}cards_brands`);
      return res.data;
    } catch (error) {
      console.log('error.response ', error.response.data);
      if (error.response) {
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
}
