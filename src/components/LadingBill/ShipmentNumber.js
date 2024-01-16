import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const ShipmentNumber = ({ index }) => {
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppView flex stretch row spaceBetween marginVertical={3}>
                <AppText >{`${I18n.t('shipmentNumber')}`}</AppText>
                <AppText >{`${'521525'}`}</AppText>
            </AppView>
            <AppView flex stretch row spaceBetween>
                <AppText >{`${'Shipment Police Number'}`}</AppText>
                <AppText >{`${'55254'}`}</AppText>
            </AppView>
        </AppView>
    );
};

export default ShipmentNumber;
