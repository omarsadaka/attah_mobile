import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import moment from 'moment';

const CompanyDeliveryDate = ({ data }) => {
    const { delivery_date } = data;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppText size={8} marginVertical={3}>{`${I18n.t('companyDeliveryDate')}`}</AppText>
            <AppText marginVertical={3} color={colors.graytext} >{`${moment(delivery_date).format('DD MMM YYYY')}`}</AppText>
        </AppView>
    );
};

export default CompanyDeliveryDate;
