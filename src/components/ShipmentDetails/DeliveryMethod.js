import React from 'react';
import { AppIcon, AppImage, AppInput, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const DeliveryMethod = ({ data }) => {
    const { collection_place } = data;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppText size={8} marginVertical={3}>{`${I18n.t('deliveryMethod')}`}</AppText>
            <AppText color={colors.graytext} >{`${I18n.t(collection_place === 'home' ? 'homeDelivery' : 'branchDelivery1')}`}</AppText>
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
