import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const RequiredPayment = ({ data }) => {
    const { shipment_price } = data;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3} row spaceBetween
        >
            <AppText size={8} marginVertical={3}>{`${I18n.t('WhatWasPaid')}`}</AppText>
            <AppText marginVertical={3} color={colors.primary} >{`${shipment_price} ${I18n.t('sar')}`}</AppText>
        </AppView>
    );
};

export default RequiredPayment;
