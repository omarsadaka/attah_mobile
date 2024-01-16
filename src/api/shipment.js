import axios from 'axios';
import {Platform} from 'react-native';
import {objectToArray} from '../repo/utils/dataFormation';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class Shipment {
  getShipmentDetails = async id => {
    try {
      const res = await axios.get(`shipment/${id}`);
      return res.data.data;
    } catch (error) {
      console.log('getShipmentDetails  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getShipmentDetailsAsHTML = async id => {
    console.log('html id getShipmentDetailsAsHTML ', id);
    try {
      const res = await axios.post(`policy`, {shipment_id: id});
      return res.data;
    } catch (error) {
      console.log('getShipmentDetails  error policy', error);
      console.log('getShipmentDetails  error policy', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  createShipment = async data => {
    try {
      const res = await axios.post('create-shipment', data);
      return res.data;
    } catch (error) {
      console.log('error create-shipment', error);
      console.log('error create-shipment', error.response);

      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getPaymentMethod = async () => {
    try {
      const res = await axios.get(`payment-methods?type=${Platform.OS}`);
      console.log('res getPaymentMethod', res.data.data.length);
      return res.data.data;
    } catch (error) {
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
}
