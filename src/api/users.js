import axios from 'axios';
import store from '../store/store';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
import {BASE_URL} from './utils/urls';
export default class Users {
  getProfileData = async userId => {
    if (userId) {
      console.log('res.data userId ', userId);
      try {
        const res = await axios.get(`users/${userId}`);
        return res.data;
      } catch (error) {
        console.log('users  error getProfileData', error);
        console.log('users  error getProfileData', error.response);

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
    }
  };

  updateProfileData = async data => {
    try {
      const res = await axios.post(
        `users/${store.getState().auth.userData?.user?.id}`,
        data,
      );
      console.log(res, 'update profile res');
      return res.data;
    } catch (error) {
      console.log('users  error updateProfileData', error.response);
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
  updateBank = async data => {
    try {
      const res = await axios.patch(
        `users/${store.getState().auth.userData?.user?.id}/bank-data`,
        data,
      );
      console.log(res, 'update profile res bank-data');
      return res;
    } catch (error) {
      console.log('users  error updateBank', error.response);
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

  getHobbies = async () => {
    try {
      const res = await axios.get('hobbies');
      return res.data;
    } catch (error) {
      console.log('users  error getHobbies', error.response);
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

  updateHobbies = async data => {
    try {
      const res = await axios.patch(
        `users/${store.getState().auth.userData?.user?.id}/hobbies`,
        data,
      );
      console.log(res, 'update profile res');
      return res.data;
    } catch (error) {
      console.log('users  error updateHobbies', error.response);
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

  updateCar = async data => {
    try {
      const res = await axios.post(
        `users/${store.getState().auth.userData?.user?.id}/car-data`,
        data,
      );
      console.log(res, 'update profile res');
      return res.data;
    } catch (error) {
      console.log('users  error updateCar', error.response);
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

  changeLang = async data => {
    try {
      const res = await axios.post(
        `users/${store.getState().auth.userData?.user?.id}/change-locale`,
        data,
      );
      console.log(res, 'changeLang res');
      return res.data;
    } catch (error) {
      console.log('changeLang  error', error.response);
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

  followUser = async data => {
    try {
      const res = await axios.post(
        `users/${store.getState().auth.userData?.user?.id}/toggle-follow`,
        data,
      );
      console.log(res, 'followUser res');
      return res.data;
    } catch (error) {
      console.log('followUser  error', error.response);
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
  updateInterests = async data => {
    try {
      const res = await axios.patch(
        `users/${store.getState().auth.userData?.user?.id}/favourites`,
        data,
      );
      console.log(res, 'update interests res');
      return res.data;
    } catch (error) {
      console.log('users  error updateInterests', error.response);
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

  getInterests = async userId => {
    try {
      const res = await axios.get(`users/${userId}/favourites`);
      console.log('res.data getInterests ', res.data);
      return res.data;
    } catch (error) {
      // console.log('properties  error', error.response);
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

  getProperties = async userId => {
    try {
      const res = await axios.get(`properties`);
      // console.log("res.data ", res.data)
      return res.data;
    } catch (error) {
      // console.log('properties  error', error.response);
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

  getOrders = async status => {
    try {
      const res = await axios.get(
        `${BASE_URL}orders?type=stores&status=${status}`,
      );
      return res.data.orders.data;
    } catch (error) {
      // console.log('properties  error', error.response);
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

  getOrderByID = async id => {
    try {
      const res = await axios.get(`${BASE_URL}orders/${id}`);
      return res.data;
    } catch (error) {
      // console.log('properties  error', error.response);
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

  rateOrder = async (id, data) => {
    try {
      const res = await axios.post(`${BASE_URL}store-ratings/${id}`, data);
      return res.data;
    } catch (error) {
      console.log('rateOrder error', error);
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

  cancelOrder = async id => {
    try {
      const res = await axios.post(`${BASE_URL}orders/cancel/${id}`);
      return res.data;
    } catch (error) {
      console.log('cancelOrder error', error);
      if (error.response.data) {
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
