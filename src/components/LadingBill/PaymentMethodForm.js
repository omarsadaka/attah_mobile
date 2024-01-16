import React from 'react';
import I18n from 'i18next';
import { LoadingPicker } from '..';
import { AppButton, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { ShipmentRepo } from '../../repo';
import TitleSection from './TitleSection';

const shipmentRepo = new ShipmentRepo();

const PaymentMethodForm = ({
  injectFormProps,
  setFieldValue,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <AppView flex stretch center>
      <AppView
        flex
        stretch
        backgroundColor={colors.white}
        borderRadius={15}
        padding={5}
        marginHorizontal={5}
        marginVertical={3}>
        <TitleSection
          name="paymentMethod"
          screen="ShippingPrices"
          iconName="local-shipping"
          iconType="MaterialIcons"
          noEdit
        />

        <LoadingPicker
          provider={shipmentRepo.getPaymentMethod}
          marginVertical={3}
          showImage
          isSearch={false}
          title={`${I18n.t('choose')} ${I18n.t('paymentMethod')}`}
          label="name"
          {...{setFieldValue}}
          {...injectFormProps('payment_method')}
          value="id"
        />
      </AppView>

      <AppButton
        marginVertical={10}
        marginHorizontal={5}
        onPress={handleSubmit}
        processing={isSubmitting}
        disabled={isSubmitting}
        stretch
        linearGradient
        title={I18n.t('confirmAndFollow')}
      />
    </AppView>
  );
};

export default PaymentMethodForm;
