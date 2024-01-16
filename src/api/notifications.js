import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
import {BASE_URL} from './utils/urls';
export default class Notifications {
  getUnReadNotif = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user-notifications?is_read=0`);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log('getUnReadNotif  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getReadNotif = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user-notifications?is_read=1`);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log('getReadNotif  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  getAllNotif = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user-notifications`);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log('getReadNotif  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  makeNotifRead = async id => {
    try {
      const res = await axios.put(`${BASE_URL}user-notifications/${id}`);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log('makeNotifRead  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getUnReadCounter = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user-notifications/count`);
      return res.data;
    } catch (error) {
      console.log('getUnReadCounter  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
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
