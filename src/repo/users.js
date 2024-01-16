import i18next from 'i18next';
import {UsersApi} from '../api';
import {AppNavigation, showError, showSuccess} from '../common';
import {AppendImgValue, dataToFormData} from './utils/dataFormation';
import {getLangFromStorage} from '../actions';
export default class Users {
  constructor() {
    this.usersApi = new UsersApi();
  }

  getProfileData = async userId => {
    let data = true;
    try {
      data = await this.usersApi.getProfileData(userId);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateProfileData = async ({image, national_image, ...rest}) => {
    const formData = dataToFormData({...rest});
    AppendImgValue(formData, {name: 'image', value: image});
    AppendImgValue(formData, {name: 'national_image', value: national_image});
    let data = true;
    try {
      data = await this.usersApi.updateProfileData(formData);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
  getHobbies = async () => {
    let data = true;
    try {
      data = await this.usersApi.getHobbies();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateHobbies = async values => {
    let data = true;
    try {
      const formData = [];
      Object.keys(values).forEach(key => {
        formData.push({hobby_id: key, hobby_option_id: values[`${key}`]});
      });

      const res = await this.usersApi.updateHobbies({hobbies: formData});
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateBank = async values => {
    let data = true;
    try {
      const res = await this.usersApi.updateBank(values);
      console.log('dddv res ', res);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateCar = async ({image, ...rest}) => {
    let data = true;
    try {
      const formData = dataToFormData({...rest});
      AppendImgValue(formData, {name: 'image', value: image});
      const res = await this.usersApi.updateCar(formData);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
  changeLang = async data => {
    let success = true;
    try {
      const res = await this.usersApi.changeLang(dataToFormData(data));
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  followUser = async data => {
    let success = true;
    try {
      const res = await this.usersApi.followUser(dataToFormData(data));
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  updateInterests = async values => {
    let data = true;
    try {
      // const formData = dataToFormData(data);
      const res = await this.usersApi.updateInterests(values);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getInterests = async userId => {
    let data = true;
    try {
      data = await this.usersApi.getInterests(userId);
      // console.log("----------------------- ", data)
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getProperties = async () => {
    let data = true;
    try {
      data = await this.usersApi.getProperties();
      // console.log("----------------------- ", data)
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getOrders = async status => {
    let data = null;
    try {
      data = await this.usersApi.getOrders(status);
      console.log('getOrders', data);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getOrderByID = async id => {
    let data = null;
    try {
      const res = await this.usersApi.getOrderByID(id);
      console.log('getOrder by id', res);
      if (res) {
        data = res;
      }
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  rateOrder = async (id, data) => {
    let res = null;
    try {
      res = await this.usersApi.rateOrder(id, data);
      console.log('rateOrder', res);
      if (res) {
        showSuccess(i18next.t('order-rated'));
      }
    } catch (error) {
      console.log('rate error', error);
      showError(error.msg ? error.msg : i18next.t('ui-error'));
      res = false;
    } finally {
      return res;
    }
  };
  cancelOrder = async id => {
    const lang = await getLangFromStorage()();
    let success = false;
    try {
      const data = await this.usersApi.cancelOrder(id);
      console.log('cancelOrder', data);
      if (data) {
        showSuccess(i18next.t('order-canceled'));
        clearTimeout(timeout);
        let timeout = setTimeout(() => {
          if (lang.lang == 'ar') AppNavigation.navigateToHome(3);
          else AppNavigation.navigateToHomeAr(0);
        }, 1000);
        success = true;
      }
    } catch (error) {
      console.log('cancel error2', error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
