import {SideMenuApi} from '../api';
import {showError, showSuccess} from '../common';
import {dataToFormData} from './utils/dataFormation';
export default class SideMenu {
  constructor() {
    this.sideMenuApi = new SideMenuApi();
  }

  createRating = async data => {
    let success = true;
    try {
      const formData = new FormData();
      data.forEach((element, index) => {
        Object.keys(element).forEach(key =>
          formData.append(`ratings[${index}][${key}]`, element[`${key}`]),
        );
      });
      console.log(formData);
      const res = await this.sideMenuApi.createRating(formData);
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  createReport = async data => {
    let success = null;
    try {
      const res = await this.sideMenuApi.createReport(data);
      if (res) {
        success = res;
        showSuccess(res);
      }
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  createReport2 = async data => {
    let success = null;
    try {
      const res = await this.sideMenuApi.createReport2(data);
      if (res) {
        success = res;
        showSuccess(res);
      }
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  aboutApp = async () => {
    let success = null;
    try {
      const res = await this.sideMenuApi.aboutApp();
      if (res) {
        success = res;
      }
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  terms = async () => {
    let success = null;
    try {
      const res = await this.sideMenuApi.terms();
      if (res) {
        success = res;
      }
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
  policy = async () => {
    let success = null;
    try {
      const res = await this.sideMenuApi.policy();
      if (res) {
        success = res;
      }
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
