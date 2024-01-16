import FavouriteApi from '../api/favourite';
import {showError, showSuccess} from '../common';
import {dataToFormData} from './utils/dataFormation';
import {refreshFavList} from '../utils/List';
import i18next from 'i18next';
import {AppNavigation} from '../common';
export default class Favourite {
  constructor() {
    this.favouriteApi = new FavouriteApi();
  }

  addToFav = async values => {
    let success = false;
    try {
      const res = await this.favouriteApi.addToFav(values);
      // console.log('res ', res);
      if (res) {
        success = res;
        showSuccess(i18next.t('add-to-fav'));
      }
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  deleteFromFav = async id => {
    let success = false;
    try {
      const res = await this.favouriteApi.deleteFromFav(id);
      console.log('deleteFromFav', res);
      success = true;
      showSuccess(i18next.t('delete-from-fav'));
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getFavList = async () => {
    let success = [];
    try {
      const res = await this.favouriteApi.getFavList();
      success = res;
    } catch (error) {
      success = [];
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getOrderList = async status => {
    let success = [];
    try {
      const res = await this.favouriteApi.getOrderList(status);
      console.log('getOrderList', res);
      success = res;
    } catch (error) {
      success = [];
      showError(error.msg);
    } finally {
      return success;
    }
  };
}
