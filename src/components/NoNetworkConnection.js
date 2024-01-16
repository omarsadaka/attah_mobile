import React, {Component} from 'react';
import {AppImage, AppText, AppView} from '../common';
import I18n from 'i18next';
import {ImageContainer} from '.';
import {View, Text, Image, ImageBackground} from 'react-native';
import colors from '../common/defaults/colors';
import fonts from '../common/defaults/fonts';
import Dimensions from '../common/defaults/Dimensions';
const source = require('../assets/imgs/selectLangBg.png');
const source2 = require('../assets/imgs/home.png');
const logoWhite = require('../assets/imgs/logoWhite.png');
const homeImage = require('../assets/imgs/homeImage.png');

const NoNetworkConnection = () => {
  return (
    <View
      style={{
        width: '100%',
        height: Dimensions.DEVICE_HEIGHT * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Image
          source={source2}
          style={{
            width: Dimensions.DEVICE_WIDTH,
            height: Dimensions.DEVICE_HEIGHT * 0.4,
          }}
          resizeMode="contain"
        />
      </View> */}
      <Text
        style={{
          fontSize: 17,
          color: colors.error,
          fontFamily: fonts.normal,
          marginTop: Dimensions.DEVICE_HEIGHT * 0.02,
        }}>
        {I18n.t('noInternet')}
      </Text>
    </View>
    // <AppImage
    //   flex
    //   stretch
    //   center
    //   paddingHorizontal={5}
    //   // backgroundColor="red"
    //   {...{source2}}>
    //   {/* <AppImage
    //     source={logoWhite}
    //     width={50}
    //     height={20}
    //     resizeMode="contain"
    //   />
    //   <AppImage
    //     source={homeImage}
    //     width={60}
    //     height={45}
    //     resizeMode="contain"
    //   /> */}
    //   <AppText size={8} center color={colors.error}>
    //     {I18n.t('noInternet')}
    //   </AppText>
    // </AppImage>
  );
};

export default NoNetworkConnection;
