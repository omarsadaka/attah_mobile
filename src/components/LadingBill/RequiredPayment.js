import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import TitleSection from './TitleSection';
import { useSelector } from 'react-redux';

const RequiredPayment = ({ }) => {
    const company = useSelector(state => state.shipment.company);
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3} row spaceBetween
        >
            <TitleSection
                name='requiredPayment'
                screen='AddReceiverData'
                iconName='wallet'
                iconType='Entypo'
                backgroundColor={colors.primary}
                iconSize={9}
                noEdit
            />
            <AppText marginVertical={3} color={colors.primary} >{`${company?.price} ${I18n.t('sar')}`}</AppText>
        </AppView>
    );
};

export default RequiredPayment;
