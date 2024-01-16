import ApiContactUs from '../api/contactUs';
import {showError, showSuccess} from '../common';
import {dataToFormData} from './utils/dataFormation';

export default class ContactUs {
  constructor() {
    this.apiContactUs = new ApiContactUs();
  }

  send = async values => {
    let success = true;
    try {
      const res = await this.apiContactUs.send(dataToFormData(values));
      showSuccess(res.data);
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };
  getSocial = async () => {
    const data = await this.apiContactUs.getSocial();
    const whatsApp = data.filter(item => {
      console.log(
        '🚀 ~ file: contactUs.js ~ line 25 ~ ContactUs ~ getSocial= ~ item',
        item,
      );

      return item.index === 'social_whatsapp';
    });
    console.log(
      '🚀 ~ file: contactUs.js ~ line 25 ~ ContactUs ~ getSocial= ~ whatsApp',
      whatsApp,
    );
    return whatsApp.length > 0 ? whatsApp[0] : null;
  };
}
