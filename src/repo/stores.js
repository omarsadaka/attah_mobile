import StoreApi from '../api/stores';
import {showError, showSuccess} from '../common';
import {refreshAddressList} from '../utils/List';
export default class Stores {
  constructor() {
    this.storeApi = new StoreApi();
  }

  getStore = async id => {
    let success = null;
    try {
      const res = await this.storeApi.getStore(id);
      if (res) {
        success = res;
      }
    } catch (error) {
      success = false;
    } finally {
      return success;
    }
  };

  getStoreCategory = async id => {
    let success = null;
    try {
      const res = await this.storeApi.getStoreCategory(id);
      console.log('res categories', res);
      if (res) {
        success = res;
      }
    } catch (error) {
      success = false;
    } finally {
      return success;
    }
  };

  getSubCategory = async id => {
    let success = null;
    try {
      const res = await this.storeApi.getSubCategory(id);
      console.log('res sub categories', res);
      if (res) {
        success = res;
      }
    } catch (error) {
      success = false;
    } finally {
      return success;
    }
  };

  getStoreProducts = async (storeID, catID) => {
    let response = [];
    try {
      const res = await this.storeApi.getStoreProducts(storeID, catID);
      console.log('res ', res);
      if (res) {
        response = res;
      }
    } catch (error) {
      response = [];
    } finally {
      return response;
    }
  };

  getProductByID = async id => {
    let response = null;
    try {
      const res = await this.storeApi.getProductByID(id);
      console.log('res ', res);
      if (res) {
        response = res;
      }
    } catch (error) {
      response = false;
    } finally {
      return response;
    }
  };

  createSession = async data => {
    var response = null;
    try {
      const res = await this.storeApi.createSession(data);
      console.log('res ', res);
      if (res) {
        response = res.url;
      }
    } catch (error) {
      response = false;
      showError(error.msg);
    } finally {
      return response;
    }
  };
}
