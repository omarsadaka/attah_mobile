import axios from 'axios';
import i18next from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import {
  AppIcon,
  AppNavigation,
  AppTabs,
  AppText,
  AppView,
  TouchableView,
} from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { Header, LoadingView } from '../../components';
import { BagRepo, StoreRepo } from '../../repo';

import { setTabIndex } from '../../actions/auth';
import StoreContact from './components/StoreContact';
import StoreData from './components/StoreData';
import StoreProducts from './components/StoreProducts';
import StoresRates from './components/StoreRates';

const storeRepo = new StoreRepo();
let bagRepo = new BagRepo();
const StoreDetails = props => {
  const {storeID, isChat} = props;
  const cart_count = useSelector(state => state.auth.cartCount);
  const tabIndex = useSelector(state => state.auth.tabIndex);
  const lang = useSelector(state => state.lang);
  const [data, setData] = useState({});
  const [num, setNum] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getStoreData();
  }, []);

  const getStoreData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}stores/${storeID}`);
      let data = res.data;
      console.log('🚀 ~ file: StoreDetails.js:65 ~ getStoreData ~ res:', res);
      setData(data);
      setLoading(false);
      if (isChat) {
        console.log(
          '🚀 ~ file: StoreDetails.js:46 ~ useEffect ~ tabIndex:',
          tabIndex,
        );
        setTimeout(() => {
          dispatch(setTabIndex(3));
        }, 1500);
      }
    } catch (error) {
      console.log('error.response  get store', error);
      setLoading(false);
    }
  };

  const header = () => {
    return (
      <View
        style={{
          width: '100%',
          height: Dimensions.DEVICE_HEIGHT * 0.22,
          backgroundColor: '#9E0039',
          // borderBottomLeftRadius: 15,
          // borderBottomRightRadius: 15,
          paddingHorizontal: Dimensions.DEVICE_WIDTH * 0.02,
        }}>
        <AppView flex row stretch>
          <AppView flex stretch center>
            <AppText
              bold
              color={colors.white}
              size={8}
              style={{fontFamily: fonts.normal}}>
              {data.name}
            </AppText>
            <AppText
              color={colors.white}
              size={5}
              style={{fontFamily: fonts.normal}}
              numberOfLines={3}>
              {lang.lang=='ar'? data.ar?data.ar.description:'--'
              : 
              data.en?data.en.description:'--'
              }
            </AppText>

            <AppText
              bold
              color={colors.white}
              size={7}
              marginTop={2}
              style={{fontFamily: fonts.normal}}>
              {data?.category?.name}
            </AppText>
            <AppView row stretch marginTop={5}>
              <AppText
                bold
                color={colors.white}
                size={8}
                marginTop={2}
                style={{fontFamily: fonts.normal}}>
                {data.rate}
              </AppText>
              <AppView width={1.5}></AppView>
              {/* <Rating
                readonly
                ratingCount={5}
                imageSize={20}
                startingValue={data.rate}
                style={[lang.lang == 'en' ? styles.en : styles.ar, {}]}
                tintColor="#9E0039"
              /> */}
              <AirbnbRating
                showRating={false}
                isDisabled
                count={5}
                size={18}
                defaultRating={data.rate}
                ratingContainerStyle={[
                  lang.lang == 'en' ? styles.ar : styles.en,
                  {},
                ]}
                tintColor="#9E0039"
              />
            </AppView>
          </AppView>

          <AppView>
            <Image
              style={styles.imageContainer}
              // resizeMode="contain"
              source={
                data.logo
                  ? {uri: data.logo}
                  : require('../Home/assets/storeicon1.png')
              }></Image>
            <ImageBackground
              style={[
                lang.lang === 'en' ? styles.en : null,
                lang.lang === 'en'
                  ? styles.imageContainerEn
                  : styles.imageContainerAr,
                styles.imageContainer2,
              ]}
              resizeMode="contain"
              source={require('../../assets/imgs/rate_bg.png')}>
              <Text
                style={[
                  lang.lang == 'en' ? styles.en : null,
                  {
                    fontSize: Dimensions.DEVICE_WIDTH * 0.04,
                    marginTop: 3,
                    fontFamily: fonts.normal,
                    color: data.status || data.status == true
                    ? 'green'
                    : colors.primary,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  },
                ]}>
                {data.status || data.status == true
                  ? i18next.t('open')
                  : i18next.t('close')}
              </Text>
            </ImageBackground>
          </AppView>
        </AppView>
      </View>
    );
  };

  const renderTabs = useCallback(() => {
    return;
  }, [tabIndex]);

  return (
    <AppView flex stretch>
      <Header
        backgroundColor={colors.primary}
        backColor={colors.white}
        rightItems={
          <TouchableView
            onPress={() => {
              if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(2);
              else AppNavigation.navigateToHome(1);
            }}>
            <AppIcon
              name="shoppingcart"
              type="AntDesign"
              color={colors.white}
              size={15}
            />
            <Text style={styles.count_text}>{cart_count ?? '0'}</Text>
          </TouchableView>
        }
      />
      {loading ? (
        <LoadingView />
      ) : (
        <>
          {header()}
          <AppTabs showUnderLine tabIndex={tabIndex}>
            <StoreData item={data} label={i18next.t('sore-info')} storeID={storeID} tabID={tabIndex}/>
            <StoreProducts Item={data} label={i18next.t('sore-products')} tabID={tabIndex}/>
            <StoresRates storeID={data.id} label={i18next.t('sore-rates')} tabID={tabIndex}/>
            <StoreContact storeID={data.id} label={i18next.t('sore-contact')} tabID={tabIndex}/>
          </AppTabs>
        </>
      )}
    </AppView>
  );
};

export default StoreDetails;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    textAlign: 'center',
    fontFamily: fonts.normal,
    fontSize: Dimensions.DEVICE_WIDTH * 0.045,
    marginBottom: Dimensions.DEVICE_HEIGHT * 0.02,
  },
  spacer: {
    width: Dimensions.DEVICE_WIDTH / 5,
    height: 5,
    backgroundColor: colors.white,
    marginTop: Dimensions.DEVICE_HEIGHT * 0.01,
  },
  imageContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.3,
    height: Dimensions.DEVICE_WIDTH * 0.3,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 10,
  },
  imageContainer2: {
    width: Dimensions.DEVICE_WIDTH * 0.18,
    height: Dimensions.DEVICE_HEIGHT * 0.05,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  imageContainerAr: {
    left: -Dimensions.DEVICE_WIDTH * 0.025,
  },
  imageContainerEn: {
    right: -Dimensions.DEVICE_WIDTH * 0.025,
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
  ar: {
    transform: [{rotateY: '0deg'}],
  },
  count_text: {
    position: 'absolute',
    top: 0,
    right: -5,
    color: colors.white,
    backgroundColor: colors.blueC,
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    textAlign: 'center',
    fontSize: 12,
    overflow: 'hidden',
  },
});
