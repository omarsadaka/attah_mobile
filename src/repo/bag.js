import BagApi from '../api/bag';
import {showError, showSuccess} from '../common';
import {dataToFormData} from './utils/dataFormation';
import {refreshFavList} from '../utils/List';
import i18next from 'i18next';
import {AppNavigation} from '../common';
import {getLangFromStorage} from '../actions';
import store from '../store/store';
import {CARTCOUNT} from '../actions/types';
export default class Bag {
  constructor() {
    this.bagApi = new BagApi();
  }

  addToBag = async values => {
    let success = null;
    try {
      const res = await this.bagApi.addToBag(values);
      console.log('res addToBag', res);
      if (res) {
        success = res;
        showSuccess(i18next.t('add-toCart-success'));
      }
    } catch (error) {
      console.log('res addToBag error', error);
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  deleteCart = async id => {
    let success = false;
    try {
      const res = await this.bagApi.deleteCart(id);
      if (res) {
        console.log('delete cart', res);
        success = true;
        showSuccess(i18next.t('product-delete-success'));
        await store.dispatch({
          type: CARTCOUNT,
          payload: res.length,
        });
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  updateCart = async (id, qty) => {
    let success = false;
    try {
      const res = await this.bagApi.updateCart(id, qty);
      if (res) {
        console.log('update cart', res);
        success = true;
        showSuccess(i18next.t('update-qnty-success'));
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getCartList = async () => {
    let success = null;
    try {
      const res = await this.bagApi.getCartList();
      console.log('getCartList ', res);
      if (res) {
        success = res.length;
        await store.dispatch({
          type: CARTCOUNT,
          payload: res.length,
        });
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getOrderSummary = async values => {
    let success = null;
    try {
      const res = await this.bagApi.getOrderSummary(values);
      console.log('res getOrderSummary', res.data);
      if (res.data) {
        success = res.data;
      }
    } catch (error) {
      console.log('err', error);
      success = error;
      // showError(error.msg);
      return success;
    } finally {
      return success;
    }
  };

  createOrder = async orderID => {
    let success = null;
    try {
      const res = await this.bagApi.createOrder(orderID);
      console.log('res createOrder', res);
      if (res) {
        success = res;
        // clearTimeout(timeout);
        // let timeout = setTimeout(() => {
        //   AppNavigation.push({
        //     name: 'PayWebView',
        //     passProps: {
        //       Url: res.payment_url,
        //       orderID: res.order_id,
        //     },
        //   });
        // }, 500);
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };
  checkCopon = async data => {
    let success = null;
    try {
      const res = await this.bagApi.checkCopon(data);
      console.log('res checkCopon', res);
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

  deleteCopon = async id => {
    let success = null;
    try {
      const res = await this.bagApi.deleteCopon(id);
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
}


