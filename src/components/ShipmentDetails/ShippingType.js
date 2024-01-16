import React from 'react';
import {AppIcon, AppNavigation, AppText, AppView} from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import {useSelector} from 'react-redux';

const ShippingType = ({data}) => {
  const {ship_type} = data;
  return (
    <AppView
      flex
      stretch
      backgroundColor={colors.white}
      borderRadius={15}
      padding={5}
      marginHorizontal={5}
      marginVertical={3}>
      <AppText size={8} marginVertical={3}>{`${I18n.t(
        'shippingType',
      )}`}</AppText>

      <AppText marginTop={3} color={colors.graytext}>{`${
        ship_type === 'fast'
          ? I18n.t('fastShipping')
          : I18n.t('economyShipping')
      }`}</AppText>
    </AppView>
  );
};

export default ShippingType;
