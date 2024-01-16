import React from 'react';
import {AppIcon, AppNavigation, AppText, AppView} from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import TitleSection from './TitleSection';
import {useSelector} from 'react-redux';

const ShippingType = ({index}) => {
  const shipmentData = useSelector(state => state.shipment.shipmentData);
  console.log('ship_type ', shipmentData?.ship_type);
  return (
    <AppView
      flex
      stretch
      backgroundColor={colors.white}
      borderRadius={15}
      padding={5}
      marginHorizontal={5}
      marginVertical={3}>
      <TitleSection
        name="shippingType"
        screen="AddShipmentData"
        iconName="local-shipping"
        iconType="MaterialIcons"
        backgroundColor={colors.secondary}
        iconSize={8}
      />

      <AppText marginTop={3} color={colors.graytext}>{`${
        shipmentData?.ship_type === 'fast'
          ? I18n.t('fastShipping')
          : I18n.t('economyShipping')
      }`}</AppText>
    </AppView>
  );
};

export default ShippingType;
