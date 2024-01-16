import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const SenderData = ({ data }) => {
    const { name, phone, address, address_url } = data?.sender;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppText size={8} marginVertical={3} >{`${I18n.t('senderData')}`}</AppText>
            <AppText color={colors.graytext}>{`${name}`}</AppText>
            <AppText color={colors.graytext} marginVertical={3}>{`${phone}`}</AppText>
            <AppText color={colors.graytext}>{`${address.address_details}`}</AppText>
            {address_url ?
                <AppText color={colors.graytext} type={'link'}>{`${address_url}`}</AppText>
                : null}
        </AppView>
    );
};

export default SenderData;
