import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { AppView } from '../../../common';
import colors from '../../../common/defaults/colors';
import Dimensions from '../../../common/defaults/Dimensions';
import fonts from '../../../common/defaults/fonts';
import { LoadingView } from '../../../components';
import { StoreRepo } from '../../../repo';
let storeRepo = new StoreRepo();
const StoreContact = ({storeID,}) => {
  const [url, setUrl] = useState('');
  const [userToken, setUserToken] = useState('');
  const [loadingView, setLoadingView] = useState(true);
  useEffect(() => {
    createSession();
  }, [url]);
  const createSession = async () => {
    const token = await AsyncStorage.getItem('@access_token');
    setUserToken(token);
    const obj = {
      web: 1,
      friend_id: storeID,
      friend_type: 'Store',
    };
    const data = await storeRepo.createSession(obj);
    console.log('createSession', data);
    setUrl(data);
    setLoadingView(false);
  };

  const {width} = useWindowDimensions();

  console.log('url ', `${url}&token=${userToken}`);
  return (
    <AppView flex stretch>
      {loadingView ? (
        <LoadingView />
      ) : (
        <AutoHeightWebView
          source={{uri: `${url}&token=${userToken}`}}
          scalesPageToFit={true}
          scrollEnabled={false}
          viewportContent={'width=device-width, user-scalable=no'}
          style={{width: width}}
        />
      )}
    </AppView>
  );
};
export default StoreContact;
const styles = StyleSheet.create({
  cotainer: {
    width: '50%',
    height:
      Platform.OS === 'android'
        ? Dimensions.DEVICE_HEIGHT * 0.65
        : Dimensions.DEVICE_HEIGHT * 0.55,
    alignItems: 'center',
  },

  input: {
    width: Dimensions.DEVICE_WIDTH * 0.95,
    height: Dimensions.DEVICE_HEIGHT * 0.07,
    textAlignVertical: 'top',
    elevation: 3,
    backgroundColor: colors.white,
    shadowOpacity: 0.2,
    borderRadius: 8,
  },
  error: {
    alignSelf: 'flex-end',
    color: colors.error,
    fontFamily: fonts.normal,
    marginTop: 3,
  },
  web_view: {
    width: Dimensions.DEVICE_WIDTH * 0.9,
    height: Dimensions.DEVICE_HEIGHT * 0.6,
    marginTop: Dimensions.DEVICE_HEIGHT * 0.02,
  },
});
