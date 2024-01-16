import React, {useCallback} from 'react';
import {AppForm, AppNavigation, AppView} from '../../common';
import {paymentMethodvalidationSchema} from '../../validation/shipment';
import {useSelector} from 'react-redux';
import PaymentMethodForm from './PaymentMethodForm';
import {ShipmentRepo} from '../../repo';
import colors from '../../common/defaults/colors';

const shipmentRepo = new ShipmentRepo();
const PaymentMethod = () => {
  const senderData = useSelector(state => state.shipment.senderData);
  const receiverData = useSelector(state => state.shipment.receiverData);
  const shipmentData = useSelector(state => state.shipment.shipmentData);
  const company = useSelector(state => state.shipment.company);
  const deliveryDate = useSelector(state => state.shipment.deliveryDate);

  const renderContent = useCallback(
    props => <PaymentMethodForm {...props} />,
    [],
  );

  const onSubmit = useCallback(async (values, {setSubmitting}) => {
    // console.log("values ", values)
    // console.log("senderData ", senderData)
    // console.log("receiverData ", receiverData)
    console.log('shipmentData ', shipmentData);
    // console.log("company ", company)
    console.log(deliveryDate, 'deliveryDate --- +++++++++++++++++++++++++++++');
    const res = await shipmentRepo.createShipment({
      delivery_date: deliveryDate,
      ...values,
      ...senderData,
      ...receiverData,
      ...shipmentData,
      ...company,
    });
    if (res)
      console.log(
        '🚀 ~ file: PaymentMethod.js ~ line 38 ~ onSubmit ~ res',
        res,
      );

    AppNavigation.push({
      name: 'onlinePayment',
      passProps: res,
    });
  
    setSubmitting(false);
  }, []);

  return (
    <AppView flex stretch>
      <AppForm
        validationSchema={paymentMethodvalidationSchema}
        schema={{
          payment_method: '',
        }}
        render={renderContent}
        {...{onSubmit}}
      />
    </AppView>
  );
};

export default PaymentMethod;
