import React, { Component, useCallback, useState } from 'react';
import { AppIcon, AppNavigation, AppText, AppView, TouchableView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import { useSelector } from 'react-redux';
import { AddressRepo } from '../../repo';
import LoadingAbsoluteView from '../LoadingAbsoluteView';
const addressRepo = new AddressRepo();

const AddressCard = (props) => {
    const data = props.data;
    const user = useSelector((state) => state.auth.userData?.user);
    const [loading, setLoading] = useState(false);

    const deleteAddress = useCallback(async (id) => {
        setLoading(true);
        const res = await addressRepo.deleteAddress(id);
        if (res) {
            props.removeItemFromList(id)
        }
        setLoading(false);
    }, []);

    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3} key={data.id}
        >
            {loading && <LoadingAbsoluteView />}
            <AppView flex stretch row >
                <AppView stretch >
                    <AppIcon name='location-on' type='MaterialIcons' size={13}
                        color={colors.secondary} />
                </AppView>
                <AppView flex stretch marginHorizontal={3}>
                    <AppText size={8}>{data.name}</AppText>
                    <AppText color={colors.graytext}>{user.name}</AppText>
                    <AppText color={colors.graytext}>{data.address_details}</AppText>
                    <AppText color={colors.graytext}>{data.phone}</AppText>
                </AppView>
                <AppView stretch  >
                    <AppIcon name='delete' type='MaterialCommunityIcons'
                        onPress={() => deleteAddress(data.id)}
                        size={13} color={colors.secondary1} />
                </AppView>
            </AppView>
            <AppView flex stretch row marginTop={5}
                spaceBetween paddingTop={5}
                borderTopWidth={1} borderColor={colors.graytext}>
                <AppView stretch borderRadius={20}
                    paddingHorizontal={5}
                    center paddingTop={1}
                    paddingBottom={2}
                    borderColor={colors.primary}
                    borderWidth={data.default && 1.5}>
                    {data.default &&
                        <AppText size={6} color={colors.primary}>{I18n.t('main')}</AppText>}
                </AppView>
                <TouchableView stretch row onPress={() => AppNavigation.push({ name: 'EditAddress', passProps: { data: data } })}>
                    <AppIcon name='edit' type='Feather' size={10} color={colors.black} />
                    <AppText marginHorizontal={3}>{I18n.t('edit')}</AppText>
                </TouchableView>
            </AppView>
        </AppView>
    );
};

export default AddressCard;
