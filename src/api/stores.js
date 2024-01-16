import axios from 'axios';
import { ApiErrorException, ApiErrorTypes } from './utils/errors';
import { BASE_URL } from './utils/urls';
export default class Stores {
  getStore = async id => {
    try {
      const res = await axios.get(`${BASE_URL}stores/${id}`);
      let data = res.data;
      return data;
    } catch (error) {
      console.log('error.response  get store', error);
    }
  };

  getStoreCategory = async id => {
    try {
      const res = await axios.get(
        `${BASE_URL}categories?store=${id}&is_paginated=0`,
      );
      console.log('🚀 ~ file: stores.js:19 ~ Stores ~ res:', res);
      let data = res.data;
      return data;
    } catch (error) {
      console.log('error.response  get store', error);
    }
  };

  getSubCategory = async id => {
    try {
      const res = await axios.get(
        `${BASE_URL}sub-categories?category_id=${id}`,
      );
      let data = res.data.data;
      return data;
    } catch (error) {
      console.log('error.response  get store', error);
    }
  };

  getStoreProducts = async (storeID, catID) => {
    console.log("🚀 ~ file: stores.js:41 ~ Stores ~ getStoreProducts= ~ catID:", catID)
    try {
      let url = '';
      if (catID === 'all') {
        url = `${BASE_URL}products?type=stores&store=${storeID}`;
      } else {
        url = `${BASE_URL}products?type=stores&store=${storeID}&category_id=${catID}`;
      }
      console.log(
        '🚀 ~ file: stores.js:48 ~ Stores ~ getStoreProducts= ~ url:',
        url,
      );
      const res = await axios.get(url);
      let data = res.data.data;
      return data;
    } catch (error) {
      console.log('error.response  get store', error);
    }
  };

  getProductByID = async id => {
    try {
      const res = await axios.get(`${BASE_URL}products/${id}`);
      let data = res.data;
      return data;
    } catch (error) {
      console.log('error.response  get store', error);
    }
  };

  createSession = async data => {
    try {
      const res = await axios.post(`${BASE_URL}session/create`, data);
      let dataa = res.data;
      return dataa;
    } catch (error) {
      if (error.response.data.error) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error.message,
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
