import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import TitleSection from './TitleSection';
import { useSelector } from 'react-redux';

const SenderData = () => {
    const senderData = useSelector(state => state.shipment.senderData)
    console.log("senderData", senderData)
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <TitleSection
                name='senderData'
                screen='AddSenderData'
                statusBarColor={colors.primary}
                iconName='location-pin'
                iconType='SimpleLineIcons'
                backgroundColor={colors.secondary}
                iconSize={8}
            />

            <AppText color={colors.graytext}>{`${senderData?.sender_name}`}</AppText>
            <AppText color={colors.graytext} marginVertical={3}>{`${senderData?.sender_phone}`}</AppText>
            <AppText color={colors.graytext}>{`${senderData?.sender_address}`}</AppText>
            {senderData?.sender_address_url ?
                <AppText color={colors.graytext} type={'link'}>{`${senderData?.sender_address_url}`}</AppText>
                : null}
        </AppView>
    );
};

export default SenderData;
