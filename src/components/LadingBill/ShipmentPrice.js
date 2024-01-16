import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import TitleSection from './TitleSection';
import { useSelector } from 'react-redux';

const ShipmentPrice = ({ }) => {
    const shipmentData = useSelector(state => state.shipment.shipmentData)

    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3} row spaceBetween
        >
            <TitleSection
                name='shipmentValue'
                screen='AddReceiverData'
                iconName='wallet'
                iconType='Entypo'
                backgroundColor={colors.primary}
                iconSize={9}
                noEdit
            />
            <AppText marginVertical={3} color={colors.primary} >{`${shipmentData?.content_price} ${I18n.t('sar')}`}</AppText>
        </AppView>
    );
};

export default ShipmentPrice;
