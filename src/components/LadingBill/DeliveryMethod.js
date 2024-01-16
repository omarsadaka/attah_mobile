import React from 'react';
import { AppIcon, AppImage, AppInput, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import TitleSection from './TitleSection';
import { useSelector } from 'react-redux';

const DeliveryMethod = ({ }) => {
    const company = useSelector(state => state.shipment.company);
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <TitleSection
                name='deliveryMethod'
                screen='ShippingPrices'
                iconName='local-shipping'
                iconType='MaterialIcons'
                iconSize={9}
                backgroundColor={colors.secondary1}
            />

            <AppText marginTop={3} color={colors.graytext} >
                {`${company?.collection_place === 'home' ?
                    I18n.t('homeDelivery')
                    :
                    I18n.t('branchDelivery1')}`}
            </AppText>
            {/* <AppInput
                editable={false}
                placeholder={'عنوان الفرع'}
                size={7}
                marginVertical={5}
                translateNumbers={false}
                backgroundColor={colors.bg}
                leftItems={<AppIcon name='location-on' type='MaterialIcons' size={10} color={colors.secondary} />}
            /> */}

        </AppView>
    );
};

export default DeliveryMethod;
