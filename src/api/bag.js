import axios from 'axios';
import i18next from 'i18next';
import { ApiErrorException, ApiErrorTypes } from './utils/errors';
import { BASE_URL } from './utils/urls';
export default class Bag {
  addToBag = async data => {
    try {
      const res = await axios.post(`${BASE_URL}cart`, data);
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
      const res = await axios.delete(`${BASE_URL}cart?id=${id}`);
      return res;
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

  updateCart = async (id, qty) => {
    try {
      const res = await axios.put(`${BASE_URL}cart?id=${id}&quantity=${qty}`);
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

  getOrderSummary = async data => {
    try {
      const res = await axios.post(`${BASE_URL}orders?type=stores`, data);
      console.log('🚀 ~ file: bag.js:88 ~ Bag ~ res', res);
      return res.data;
    } catch (error) {
      console.log('🚀 ~ file: bag.js:90 ~ Bag ~ error', error);
      console.log('error createOrder', error.response.data);
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else if (error.response.data.error) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          i18next.t('server-error'),
        );
      }
    }
  };

  createOrder = async orderID => {
    try {
      const res = await axios.get(
        `${BASE_URL}payment-session/${orderID}`,
        // data,
      );
      return res.data;
    } catch (error) {
      console.log('error createOrder', error.response.data);
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else if (error.response.data.error) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          i18next.t('server-error'),
        );
      }
    }
  };
  checkCopon = async data => {
    try {
      const res = await axios.post(`${BASE_URL}check-coupon`, data);
      return res.data;
    } catch (error) {
      console.log('error.response  checkCopon', error.response.data);
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
  deleteCopon = async id => {
    try {
      const res = await axios.post(`${BASE_URL}coupon-delete/${id}`);
      return res.data;
    } catch (error) {
      console.log('error.response  checkCopon', error.response.data);
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
}
