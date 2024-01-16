import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import React, { useEffect, useState,useCallback } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import { AppNavigation, AppText, AppView } from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import { Header, ScrollableContainer } from '../../components';

const PayWebView = props => {
  const {Url, orderID} = props;
  const lang = useSelector(state => state.lang);
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true)
    getToken();
  }, []);
  const getToken = async () => {
    const token = await AsyncStorage.getItem('@access_token');
    setAccessToken(token);
  };

  useEffect(() => {
    const backAction = async () => {
      // write code to handel navigation
      const token = await AsyncStorage.getItem('@access_token');
      checkPayment(token);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const checkPayment = token => {
    setLoading(true);
    fetch(`${BASE_URL}orders/${orderID}/check-payment`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('json1', json);
        if (json.is_paid) {
          if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(0);
          else AppNavigation.navigateToHome(3);
        } else {
          AppNavigation.pop();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
        AppNavigation.pop();
      });
  };

 

  const header = () => {
    return (
      <View
        style={{
          height: 50,
          width: '100%',
          alignItems: lang.lang ? 'flex-end' : 'flex-start',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            // if (lang.lang == 'en') AppNavigation.navigateToHome(3);
            // else AppNavigation.navigateToHomeAr(0);
            checkPayment(accessToken);
          }}>
          {loading ? (
            <ActivityIndicator
              size={'small'}
              color={colors.error}
              style={{marginHorizontal: 17}}
            />
          ) : (
            <Image
              style={[
                lang.lang == 'en' ? styles.en : null,
                {
                  width: 30,
                  height: 30,
                  marginHorizontal: 17,
                },
              ]}
              source={require('../../assets/imgs/IconLeft.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <>
      {/* <Header
        backgroundColor={colors.gray}
        componentId={props.componentId}
        isWebView={true}
        backHandler={() => {
          checkPayment(accessToken);
        }}
      /> */}
    <ScrollableContainer
    flex
    width={100}
    stretch
    title={i18next.t('pay-information')}
    center
    marginBottom={20}
    backHandler={() => {
      checkPayment(accessToken);
    }}
    >
      {/* <AppView marginHorizontal={10} marginTop={10}>
        <AppText size={16}>{i18next.t('pay-information')}</AppText>
      </AppView> */}
      {isloading?
       <View style={{width:'100%', alignItems:'center',marginTop:'8%'}}>
       <ActivityIndicator size={'large'} color={colors.error}/>
       <AppText color={colors.error} center size={14}>{i18next.t('wait-time')}</AppText>
     </View>
      :null}
      <AutoHeightWebView
        source={{uri: Url}}
        scalesPageToFit={true}
        scrollEnabled={false}
        viewportContent={'width=device-width, user-scalable=no'}
        onLoadEnd={()=> setIsLoading(false)}
      />
    </ScrollableContainer>
    </>
  );
};
const styles = StyleSheet.create({
  web_view: {
    width: Dimensions.DEVICE_WIDTH,
    height: Dimensions.DEVICE_HEIGHT,
    marginVertical: Dimensions.DEVICE_HEIGHT * 0.03,
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
});
export default PayWebView;
