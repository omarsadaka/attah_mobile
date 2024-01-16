import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { AppIcon, AppText, TouchableView } from '../common';

import CountryCodePicker from 'react-native-country-picker-modal';
import { useSelector } from 'react-redux';
const CountryPicker = forwardRef((props, ref) => {
    const rtl = useSelector(state => state.lang.rtl)
    const [countryCode, setCountryCode] = useState(props.initialValue? props.initialValue: {
        code: 'SA',
        callingCode: '966',
    });
    useEffect(() => {
        ref.current = { getCountryCode };
    });
    const getCountryCode = useCallback(() => {
        return countryCode;
    }, [countryCode]);
    const [isVisible, setIsVisible] = useState(false);
    const showModal = useCallback(() => {
        setIsVisible(true);
    }, []);
    const hideModal = useCallback(() => {
        setIsVisible(false);
    }, []);
    const onSelect = useCallback((c) => {
        setCountryCode({
            code: c.cca2,
            callingCode:  c.callingCode[0],
        });
    }, []);
    return (
        <TouchableView
            touchableOpacity
            //   width={20}
            onPress={showModal}
            stretch
            borderBottomWidth={.8}
            borderColor="#C2C2C2"
            borderRadius={5}
            // elevation={5}
            center
            marginLeft={!rtl ? 0 : 5}
            marginRight={rtl ? 0 : 5}
            row
            flex
            spaceBetween
            paddingHorizontal={2}>

            <AppIcon name="sort-down" type="font-awesome" color="#000" />
            <CountryCodePicker
                flatListProps
                onClose={hideModal}
                visible={isVisible}
                withFlag
                countryCode={countryCode.code}              
                countryCodes={["SA"]}
                onSelect={onSelect}
                placeholder={`+ ${countryCode.callingCode}`}
                translation={!rtl? "urd":"common"}
            />
            <AppText bold size={6} color="#000">
                +{countryCode.callingCode}
            </AppText>
        </TouchableView>
    );
});

export default CountryPicker;