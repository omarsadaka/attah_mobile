import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const ShipmentPrice = ({ data }) => {
    console.log("data ",data)
    const { content_price } = data;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3} row spaceBetween
        >
            <AppText size={8} marginVertical={3}>{`${I18n.t('shipmentValue')}`}</AppText>
            <AppText marginVertical={3} color={colors.primary} >{`${content_price} ${I18n.t('sar')}`}</AppText>
        </AppView>
    );
};

export default ShipmentPrice;
