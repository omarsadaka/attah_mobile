import React from 'react';
import { AppImage, AppNavigation, AppText, AppView, TouchableView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const ShipmentCard = ({ index, data }) => {
    const { id } = data;
    return (
        <TouchableView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3} row
            key={id}
            onPress={() => AppNavigation.push({ name: 'ShipmentDetails', passProps: { id: id } })}
        >
            <AppImage source={{ uri: data?.company?.image }} circleRadius={15} resizeMode='stretch' />

            <AppView flex stretch marginHorizontal={5} >
                <AppView flex stretch row spaceBetween>
                    <AppText >{`${I18n.t('shipmentNumber')} : ${id}`}</AppText>
                    <AppText
                        size={6}
                        center
                        color={colors.secondary}>
                        {data?.company?.shipping_zone}</AppText>
                </AppView>
                <AppText size={8} marginVertical={3}>{data?.company?.name}</AppText>

            </AppView>

        </TouchableView>
    );
};

export default ShipmentCard;
