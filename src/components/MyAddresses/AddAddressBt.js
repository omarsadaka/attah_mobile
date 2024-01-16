import React, { Component } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { AppButton, AppIcon, AppNavigation, AppView } from '../../common';

const AddAddressBt = () => {
    const rtl = useSelector(state => state.lang.rtl);
    return (
        <AppView stretch
            style={{
                position: 'absolute',
                bottom: 20,
                right: rtl ? undefined : 20,
                left: rtl ? 20 : undefined,
                zIndex:10000
            }} >
            <AppButton stretch linearGradient circleRadius={15} touchableOpacity
                onPress={() => { AppNavigation.push('AddAddress') }}>
                <AppIcon name='plus' size={12} type={'Entypo'} circleRadius={15} marginTop={Platform.OS==="ios"?10:0} />
            </AppButton>
        </AppView>
    );
};

export default AddAddressBt;
