import StaticPagesApi from '../api/staticPages';
import {showError} from '../common';
import I18n from 'i18next';
import {ApiErrorTypes} from '../api/utils/errors';
export default class StaticPages {
  constructor() {
    this.staticPagesApi = new StaticPagesApi();
  }

  getStaticPage = async (pageName) => {
    let data = null;
    try {
      data = await this.staticPagesApi.getStaticPage(pageName);
    } catch (apiErrorException) {
      if (apiErrorException.type === ApiErrorTypes.CONNECTION_ERROR) {
        showError(I18n.t(apiErrorException.msg));
      } else {
        showError(apiErrorException.msg);
      }
    } finally {
      return data;
    }
  };
}
