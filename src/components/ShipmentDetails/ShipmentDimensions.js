import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const ShipmentDimensions = ({ data }) => {
    const { length, width, height, height_value, weight, weight_value } = data;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppText size={8} marginVertical={3} >{`${I18n.t('shipmentDimensions')}`}</AppText>
            {height_value ?
                <>
                    <AppView flex stretch row spaceBetween>
                        <AppText color={colors.graytext} >{`${I18n.t('length')}`}</AppText>
                        <AppText translateNumbers >{`${length} ${I18n.t(height_value)}`}</AppText>
                    </AppView>
                    <AppView flex stretch row spaceBetween marginVertical={3}>
                        <AppText color={colors.graytext} >{`${I18n.t('width')}`}</AppText>
                        <AppText translateNumbers >{`${width} ${I18n.t(height_value)}`}</AppText>
                    </AppView>
                    <AppView flex stretch row spaceBetween>
                        <AppText color={colors.graytext} >{`${I18n.t('height')}`}</AppText>
                        <AppText translateNumbers >{`${height} ${I18n.t(height_value)}`}</AppText>
                    </AppView>
                </>
                : null
            }
            <AppView flex stretch row spaceBetween marginVertical={3}>
                <AppText color={colors.graytext} >{`${I18n.t('weight')}`}</AppText>
                <AppText translateNumbers >{`${weight} ${I18n.t(weight_value)}`}</AppText>
            </AppView>
        </AppView>
    );
};

export default ShipmentDimensions;
