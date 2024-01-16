import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
import {BASE_URL} from './utils/urls';
export default class Favourite {
  addToFav = async data => {
    try {
      const res = await axios.post(`${BASE_URL}favourites`, data);
      return res.data;
    } catch (error) {
      console.log('error.response  add to fav', error.response.data);
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

  deleteFromFav = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}favourites?product_id=${id}`);
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

  getFavList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}favourites`);
      // console.log('getAddress data', res.data);
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
  getOrderList = async status => {
    try {
      const res = await axios.get(
        `${BASE_URL}orders?type=stores&status=${status}`,
      );
      return res.data.orders.data;
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
}
