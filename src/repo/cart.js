import i18next from 'i18next';
import CartApi from '../api/cart';
import { showError, showSuccess } from '../common';
export default class Cart {
  constructor() {
    this.cartApi = new CartApi();
  }

  addCart = async values => {
    let success = {};
    try {
      const res = await this.cartApi.addCart(values);
      console.log('res ', res);
      if (res) {
        success = res;
        showSuccess(i18next.t('add-cart-success'));
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  deleteCart = async id => {
    let success = false;
    try {
      const res = await this.cartApi.deleteCart(id);
      console.log('delete cart', res);
      success = true;
      showSuccess(i18next.t('delete-cart-success'));
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  updateCart = async (id, data) => {
    let success = false;
    try {
      const res = await this.cartApi.updateCart(id, data);
      console.log('delete cart', res);
      success = true;
      showSuccess(i18next.t('update-cart-success'));
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getCartList = async () => {
    let success = [];
    try {
      const res = await this.cartApi.getCartList();
      if (res) {
        success = res;
      }
    } catch (error) {
      success = [];
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getbBrandList = async () => {
    let success = [];
    try {
      const res = await this.cartApi.getbBrandList();
      console.log(' brands, ', res);
      success = res.data;
    } catch (error) {
      success = [];
      showError(error.msg);
    } finally {
      return success;
    }
  };
}
