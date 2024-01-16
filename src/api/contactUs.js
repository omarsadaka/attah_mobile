import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class ContactUs {
  send = async data => {
    try {
      const res = await axios.post('contact-us', data);
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.errors,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getSocial = async () => {
    try {
      const res = await axios.get(`social`);
      console.log(
        '🚀 ~ file: contactUs.js ~ line 27 ~ ContactUs ~ getSocial= ~ res',
        res.data,
      );
      return res.data.data;
    } catch (error) {
      console.log(error, 'auth error');

      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          'ui-error-happened',
        );
      }
    }
  };
}
