import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
import {BASE_URL} from './utils/urls';
export default class SideMenu {
  createRating = async data => {
    try {
      const res = await axios.post('ratings', data);
      console.log(res, 'createRating trips');
      return res.data;
    } catch (error) {
      console.log(
        'createRating  error',
        error.response,
        JSON.parse(JSON.stringify(error)),
      );
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

  createReport = async data => {
    try {
      const res = await axios.post(`${BASE_URL}contact-us`, data);
      console.log(res, 'createReport');
      return res.data;
    } catch (error) {
      console.log(
        'createReport  error',
        error.response.data,
        JSON.parse(JSON.stringify(error)),
      );
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

  createReport2 = async data => {
    try {
      const res = await axios.post(`${BASE_URL}develop-messages`, data);
      console.log(res, 'createReport2');
      return res.data;
    } catch (error) {
      console.log(
        'createReport  error',
        error.response.data,
        JSON.parse(JSON.stringify(error)),
      );
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

  aboutApp = async () => {
    try {
      const res = await axios.get(`${BASE_URL}pages/about-us`);
      return res.data;
    } catch (error) {
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

  terms = async () => {
    try {
      const res = await axios.get(`${BASE_URL}pages/terms-conditions`);
      return res.data;
    } catch (error) {
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
  policy = async () => {
    try {
      const res = await axios.get(`${BASE_URL}pages/privacy-policy`);
      return res.data;
    } catch (error) {
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
