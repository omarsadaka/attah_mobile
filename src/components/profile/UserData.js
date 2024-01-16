import React, { Component } from 'react';
import { AppButton, AppImage, AppNavigation, AppText, AppView } from '../../common';
import I18n from 'i18next';
import colors from '../../common/defaults/colors';
import { useSelector } from 'react-redux';

const source = require('../../assets/imgs/logo1.png');

const UserData = () => {
    const user = useSelector((state) => state.auth.userData?.user);
    return (
        <AppView flex stretch center>
            <AppImage equalSize={45} resizeMode={'contain'} source={user?.image ? { uri: user?.image } : source} />
            <AppButton
                linearGradient
                flex width={50}
                marginVertical={10}
                onPress={() => AppNavigation.push({ name: 'EditProfile' })}
                title={I18n.t('editProfile')}
            />
            <AppView flex stretch backgroundColor={colors.white} borderRadius={10} padding={5}>
                <AppText color={colors.graytext} >{I18n.t('yourName')}</AppText>
                <AppText >{user?.name}</AppText>
                <AppText color={colors.graytext} marginTop={5}>{I18n.t('yourEmail')}</AppText>
                <AppText type={'email'} >{user?.email}</AppText>
                <AppText color={colors.graytext} marginTop={5}>{I18n.t('phone')}</AppText>
                <AppText type={'phoneNumber'}>{user?.phone}</AppText>
            </AppView>
        </AppView>
    );
};

export default UserData;
