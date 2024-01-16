import {ShipmentApi} from '../api';
import {showError, showSuccess} from '../common';
import {dataToFormData} from './utils/dataFormation';
import I18n from 'i18next';
import {
  setCompanytData,
  setDeliveryDate,
  setReceiverData,
  setSenderData,
  setShipmentData,
} from '../actions/shipment';
import store from '../store/store';
import moment from 'moment';

export default class Pickers {
  constructor() {
    this.shipmentApi = new ShipmentApi();
  }

  getShipmentDetails = async id => {
    let data = true;
    try {
      data = await this.shipmentApi.getShipmentDetails(id);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getShipmentDetailsAsHTML = async id => {
    let data = true;
    console.log('iddd dd  d d ++++++++++++ getShipmentDetailsAsHTML ', id);
    try {
      data = await this.shipmentApi.getShipmentDetailsAsHTML(id);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  createShipment = async values => {
    console.log(
      'values -----------------  ***************** ',
      values.zip_code,
    );
    const data = {
      sender_name: values.sender_name,
      sender_phone: values.sender_phone,
      // sender_city_id: values.sender_city_id,
      sender_id_number: values.sender_id_number,
      sender_address_id: values.sender_address_id,
      sender_address_url: values.sender_address_url,

      receiver_name: values.receiver_name,
      receiver_phone: values.receiver_phone,
      city_id: values.city_id,
      receiver_address: values.receiver_address,
      receiver_address_url: values.receiver_address_url,
      zip_code: values.zip_code,

      // content_type_id: values.,
      new_content_type: values.new_content_type,
      width: values.width,
      length: values.length,
      height: values.height,
      height_value: !values.documentOnly ? values.height_value : '',
      weight: values.weight,
      weight_value: values.weight_value,
      content_price: values.content_price,
      ship_type: values.ship_type,

      collection_place: values.collection_place,
      insure: values.insure ? 1 : 0,
      company_id: values.company_id,
      payment_method: values.payment_method,
      delivery_date: values.delivery_date,
    };
    let success = true;
    try {
      const formData = dataToFormData(data);
      values.content_types.forEach((element, index) => {
        if (element.id !== 'other')
          formData.append(`content_type_id[${index}]`, element.id);
      });
      console.log('formData ====================================', formData);
      const res = await this.shipmentApi.createShipment(formData);
      // showSuccess(I18n.t('createdSuccessfully'));
      console.log(
        res,
        '============================================== createShipment',
      );
      success = res.data;
      // await store.dispatch(setSenderData(null));
      // await store.dispatch(setReceiverData(null));
      // await store.dispatch(setShipmentData(null));
      // await store.dispatch(setCompanytData(null));
      // await store.dispatch(
      //   setDeliveryDate(moment().locale('en').format('YYYY-MM-DD')),
      // );
    } catch (error) {
      console.log('errorerrorerror ', error);
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  getPaymentMethod = async () => {
    let data = true;
    try {
      data = await this.shipmentApi.getPaymentMethod();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
}
