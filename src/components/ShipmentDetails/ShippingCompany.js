import React from 'react';
import { AppImage, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const ShippingCompany = ({ data }) => {
    const { name, address, image } = data?.company;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppText size={8} marginVertical={3}>{`${I18n.t('shippingCompany')}`}</AppText>

            <AppView flex stretch row>
                <AppImage source={{ uri: image }} circleRadius={12} resizeMode='stretch' />

                <AppView flex stretch marginHorizontal={5} >
                    <AppText marginVertical={3}>{name}</AppText>
                    <AppText size={6} color={colors.graytext}>{`${address}`}</AppText>
                </AppView>
            </AppView>
        </AppView>
    );
};

export default ShippingCompany;
