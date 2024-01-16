import {PickersApi} from '../api';
import {showError} from '../common';
export default class Pickers {
  constructor() {
    this.pickersApi = new PickersApi();
  }

  getCountries = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getCountries();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getCountryById = async () => {
    let data = null;
    try {
      const data = await this.pickersApi.getCountryById();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return [data];
    }
  };

  getStates = async word => {
    let response = null;
    try {
      const res = await this.pickersApi.getStates(word);
      if (res) {
        response = res;
      }
    } catch (error) {
      showError(error.msg);
      response = false;
    } finally {
      return response;
    }
  };

  getCitites = async (selectedState, word) => {
    let response = null;
    try {
      const res = await this.pickersApi.getCitites(selectedState, word);
      console.log('getCitites', res);
      if (res) {
        response = res;
      }
    } catch (error) {
      response = false;
    } finally {
      return response;
    }
  };

  getShippingCitites = async id => {
    let response = null;
    try {
      const res = await this.pickersApi.getShippingCitites(id);
      if (res) {
        response = res;
      }
    } catch (error) {
      response = false;
    } finally {
      return response;
    }
  };

  getMyAddresses = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getMyAddresses();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getShipmentContentType = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getShipmentContentType();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
}
