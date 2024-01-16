import React from 'react';
import { AppIcon, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const PaymentMethod = ({ data }) => {
    const { payment_method } = data;
    console.log("payment_method ",payment_method);
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppText size={8} marginVertical={3}>{`${I18n.t('paymentMethod')}`}</AppText>

            <AppView flex stretch row >
                <AppIcon name='credit-card' type='FontAwesome' size={9} color={colors.graytext} />
                <AppText margin={3} color={colors.graytext}>{`${payment_method}`}</AppText>
            </AppView>
        </AppView>
    );
};

export default PaymentMethod;
