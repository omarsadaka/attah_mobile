import i18next from 'i18next';
import { getLangFromStorage } from '../actions';
import AddressApi from '../api/address';
import { AppNavigation, showError, showSuccess } from '../common';
import { refreshAddressList } from '../utils/List';
export default class Address {
  constructor() {
    this.addressApi = new AddressApi();
  }
  addAddress = async values => {
    const lang = await getLangFromStorage()();
    let success = false;
    try {
      const res = await this.addressApi.addAddress(values);
      // console.log('res ', res);
      if (res) {
        success = true;
        showSuccess(i18next.t('address-created'));
        // clearTimeout(timeout);
        // let timeout = setTimeout(() => {
        //   AppNavigation.push('ShippingAddress');
        //   if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
        //   else AppNavigation.navigateToHome(0);
        // }, 1000);
      }

      // refreshAddressList();
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  addAddress2 = async values => {
    let success = null;
    try {
      const res = await this.addressApi.addAddress(values);
      // console.log('res ', res);
      if (res.id) {
        success = res;
        // showSuccess(i18next.t('address-created'));
      }
      return success;
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  deleteAddress = async id => {
    let success = true;
    try {
      const res = await this.addressApi.deleteAddress(id);
      console.log('deleteAddress', res);
      success = res;
      showSuccess(i18next.t('address-deleted'));
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  updateAddress = async (data, id) => {
    const lang = await getLangFromStorage()();
    let success = false;
    try {
      const res = await this.addressApi.updateAddress(data, id);
      if (res) {
        console.log('updateAddress', res);
        showSuccess(i18next.t('address-update'));
        clearTimeout(timeout);
        let timeout = setTimeout(() => {
          // AppNavigation.pop()
          if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
          else AppNavigation.navigateToHome(0);
          // AppNavigation.push('ShippingAddress');
        }, 1000);
        success = true;
      }
    } catch (error) {
      console.log('updateAddress error', error);
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getAddress = async id => {
    let success = null;
    try {
      const res = await this.addressApi.getAddress(id);
      success = res;
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  setAddressDefault = async (id, value) => {
    let success = true;
    try {
      const res = await this.addressApi.setAddressDefault(id, value);
      if (res) {
        console.log('setAddressDefault', res);
        success = res;
        showSuccess(i18next.t('address-update'));
      }

      refreshAddressList();
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getDefaultAddress = async () => {
    let success = null;
    try {
      const res = await this.addressApi.getDefaultAddress();
      console.log('getDefaultAddress', res);
      if (res) {
        success = res;
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getOtoShippingComp = async data => {
    let success = null;
    try {
      const res = await this.addressApi.getOtoShippingComp(data);
      console.log('getOtoShippingComp', res);
      success = res;
    } catch (error) {
      console.log('🚀 ~ file: address.js:151 ~ Address ~ error', error);
      success = {error: error.msg, success: false};
      // showError(error);
      return {error: error.msg, success: false};
    } finally {
      return success;
    }
  };
}
