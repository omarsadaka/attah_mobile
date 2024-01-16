import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import TitleSection from './TitleSection';
import { useSelector } from 'react-redux';

const ShipmentDimensions = () => {
    const shipmentData = useSelector(state => state.shipment.shipmentData)

    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <TitleSection
                name='shipmentDimensions'
                screen='AddShipmentData'
                iconName='triangle-outline'
                iconSize={8}
            />
            {shipmentData?.length ?
                <>
                    <AppView flex stretch row spaceBetween>
                        <AppText color={colors.graytext} >{`${I18n.t('length')}`}</AppText>
                        <AppText translateNumbers>{`${shipmentData?.length} ${I18n.t(shipmentData?.height_value)}`}</AppText>
                    </AppView>
                    <AppView flex stretch row spaceBetween marginVertical={3}>
                        <AppText color={colors.graytext} >{`${I18n.t('width')}`}</AppText>
                        <AppText translateNumbers>{`${shipmentData?.width} ${I18n.t(shipmentData?.height_value)}`}</AppText>
                    </AppView>
                    <AppView flex stretch row spaceBetween>
                        <AppText color={colors.graytext} >{`${I18n.t('height')}`}</AppText>
                        <AppText translateNumbers >{`${shipmentData?.height} ${I18n.t(shipmentData?.height_value)}`}</AppText>
                    </AppView>
                </>
                : null
            }
            <AppView flex stretch row spaceBetween marginVertical={3}>
                <AppText color={colors.graytext} >{`${I18n.t('weight')}`}</AppText>
                <AppText translateNumbers>{`${shipmentData?.weight} ${I18n.t(shipmentData?.weight_value)}`}</AppText>
            </AppView>
        </AppView>
    );
};

export default ShipmentDimensions;
