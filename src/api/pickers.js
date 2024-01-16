import axios from 'axios';
import I18n from 'i18next';
import { ApiErrorException, ApiErrorTypes } from './utils/errors';
import { BASE_URL } from './utils/urls';
export default class Pickers {
  getCountries = async () => {
    try {
      const res = await axios.get('countries');
      console.log('res countries', res.data.data.length);
      return res.data.data;
    } catch (error) {
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

  getCountryById = async () => {
    try {
      const res = await axios.get('country/27');
      return res.data.data;
    } catch (error) {
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

  getStates = async word => {
    try {
      const res = await axios.get(
        `${BASE_URL}location/regions?county_id=1&public_search=${word}`,
      );
      // console.log('getStates', res.data);
      return res.data;
    } catch (error) {
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
  getCitites = async (selectedState, word) => {
    try {
      const res = await axios.get(
        `${BASE_URL}location/cities?state=${selectedState}&public_search=${word}`,
      );
      console.log("🚀 ~ file: pickers.js:71 ~ Pickers ~ getCitites= ~ res:", res)
      return res.data;
    } catch (error) {
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

  getShippingCitites = async id => {
    try {
      const res = await axios.get(
        `${BASE_URL}location/cities?country_code=SA&shipping_company=${id}`,
      );
      return res.data;
    } catch (error) {
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

  getMyAddresses = async () => {
    try {
      const res = await axios.get('addresses?list=1');
      return res.data.data;
    } catch (error) {
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

  getShipmentContentType = async () => {
    try {
      const res = await axios.get('content-type');
      return [
        ...res.data.data,
        {
          id: 'other',
          name: I18n.t('other'),
        },
      ];
    } catch (error) {
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
