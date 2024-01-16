import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
import {BASE_URL} from './utils/urls';
export default class Address {
  addAddress = async data => {
    try {
      const res = await axios.post(`${BASE_URL}profile/user-addresses`, data);
      return res.data;
    } catch (error) {
      console.log('error.response  add address', error.response.data);
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

  deleteAddress = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}profile/user-addresses/${id}`);
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
  updateAddress = async (data, id) => {
    try {
      const res = await axios.put(
        `${BASE_URL}profile/user-addresses/${id}`,
        data,
        (headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      );
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

  getAddress = async id => {
    try {
      const res = await axios.get(`${BASE_URL}profile/user-addresses/${id}`);
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

  getOtoShippingComp = async data => {
    try {
      const res = await axios.post(`${BASE_URL}oto-shipping-companies`, data);
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
  setAddressDefault = async (id, value) => {
    try {
      const res = await axios.put(
        `${BASE_URL}profile/user-addresses/${id}?is_primary=${value}`,
      );

      return res.data;
    } catch (error) {
      console.log('error.response ', error.response);
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

  getDefaultAddress = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}profile/user-addresses?is_primary=true`,
      );
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
}
