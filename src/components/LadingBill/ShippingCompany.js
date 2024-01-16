import React from 'react';
import { AppIcon, AppImage, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import TitleSection from './TitleSection';
import { useSelector } from 'react-redux';
const source1 = require('../../assets/imgs/1.png');

const ShippingCompany = () => {
    const company = useSelector(state => state.shipment.company);
    console.log("🚀 ~ file: ShippingCompany.js ~ line 11 ~ ShippingCompany ~ company", company)
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <TitleSection
                name='shippingCompany'
                screen='ShippingPrices'
                iconName='local-shipping'
                iconType='MaterialIcons'
                backgroundColor={colors.secondary}
                iconSize={8}
            />

            <AppView flex stretch row>
                <AppImage source={{ uri: company?.company?.image }} circleRadius={15} resizeMode='stretch' />

                <AppView flex stretch marginHorizontal={5} >
                    <AppText size={8} marginVertical={3}>{company?.company?.name}</AppText>
                    <AppText color={colors.graytext}>{` ${company?.company?.address}`}</AppText>
                </AppView>
            </AppView>
        </AppView>
    );
};

export default ShippingCompany;
