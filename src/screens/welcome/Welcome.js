import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import SplashScreen from 'react-native-splash-screen';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector } from 'react-redux';
import arrow from '../../assets/imgs/arrow.png';
import { AppNavigation, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
const Welcome = props => {
  const lang = useSelector(state => state.lang);
  const rtl = useSelector(state => state.lang.rtl);

  const [indx, setIndx] = useState(rtl ? 2 : 0);

  console.log('welcome props: ', props);
  const data = [
    {
      image: require('../../assets/imgs/startScreen1.png'),
      title: i18next.t('intro-message-title'),
      subTitle: i18next.t('intro-message-body'),
    },
    {
      image: require('../../assets/imgs/startScreen2.png'),
      title: i18next.t('intro-message-title'),
      subTitle: i18next.t('intro-message-body'),
    },
    {
      image: require('../../assets/imgs/startScreen3.png'),
      title: i18next.t('intro-message-title'),
      subTitle: i18next.t('intro-message-body'),
    },
  ];

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const navigateToLogin = async () => {
    await AsyncStorage.setItem('@showIntro', 'no');
    AppNavigation.push('Login');
  };

  return (
    <AppView flex stretch>
      <SwiperFlatList
        index={indx}
        autoplay
        autoplayDelay={5}
        autoplayLoop
        showPagination
        autoplayInvertDirection
        paginationDefaultColor={colors.grayText}
        paginationActiveColor={colors.error}
        paginationStyleItemActive={styles.active}
        paginationStyleItemInactive={styles.inActive}
        paginationStyle={{
          width: '25%',
          left: !rtl ? 10 : undefined,
          right: rtl ? 10 : undefined,
          marginBottom: '4%',
        }}
        data={data}
        onChangeIndex={({index, prevIndex}) => {
          setIndx(index);
        }}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.subTitle}</Text>
            </View>
          </View>
        )}
      />
      {/* {(indx === 0 && lang.lang === 'en') ||
      (indx === 0 && lang.lang === 'ar') ? ( */}
        <TouchableOpacity
          onPress={() => navigateToLogin()}
          style={[
            lang.lang === 'ar' ? styles.left : styles.right,
            {position: 'absolute', bottom: '2%'},
          ]}>
          <Image
            source={arrow}
            style={[lang.lang == 'en' ? styles.en : styles.ar]}
          />
        </TouchableOpacity>
      {/* ) : null} */}
      {/* <Swiper
        loop={false}
        autoplay={false}
        // showsButtons
        showsPagination={true}
        from={1}
        minDistanceForAction={0.1}
        controlsProps={{
          dotsTouchable: true,
        }}
        // index={lang.lang == 'en' ? 0 : 2}
        index={indx}
        // nextButton={
        //   <TouchableOpacity onPress={navigateToLogin}>
        //     <Image
        //       source={arrow}
        //       style={[lang.lang == 'en' ? styles.en : null]}
        //     />
        //   </TouchableOpacity>
        // }
        // prevButton={
        //   <View>
        //     <Text></Text>
        //   </View>
        // }
        buttonWrapperStyle={{
          width: Dimensions.get('screen').width,
          position: 'absolute',
          left: -(Dimensions.get('screen').width - 80),
          top: Dimensions.get('screen').height / 2.8,
        }}
        paginationStyle={{
          justifyContent: 'flex-end',
          marginHorizontal: 30,
        }}
        onIndexChanged={index => {
          setIndx(index);
        }}
        dot={
          <View style={{justifyContent: 'space-between'}}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 10,
                height: 4,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 58,
              }}
            />
          </View>
        }
        activeDot={
          <View
            style={{
              backgroundColor: colors.primary,
              width: 26,
              height: 4,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 58,
            }}
          />
        }>
        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
      </Swiper>
      <TouchableOpacity
        onPress={navigateToLogin}
        style={[
          lang.lang == 'en' ? styles.left : styles.left,
          {position: 'absolute', bottom: '8%'},
        ]}>
        <Image source={arrow} style={[lang.lang == 'en' ? styles.en : null]} />
      </TouchableOpacity> */}
    </AppView>
  );
};

Welcome.options = {
  topBar: {
    visible: false,
  },
  bottomTabs: {
    visible: false,
  },
};
const styles = StyleSheet.create({
  en: {
    transform: [{rotateY: '180deg'}],
  },
  ar: {
    transform: [{rotateY: '0deg'}],
  },
  right: {
    right: 10,
  },
  left: {
    left: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  imgContainer: {
    width: 250,
    height: 250,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  textContainer: {
    width: Dimensions.get('window').width * 0.9,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: colors.darkText,
    marginTop: 50,
    fontFamily:fonts.normal,
    marginVertical: 20,
  },
  body: {
    fontSize: 16,
    fontFamily:fonts.normal,
    color: colors.grayText,
  },
  arrow: {
    position: 'absolute',
    bottom: 58,
    left: 36,
  },
  inActive: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 10,
    height: 4,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    // marginBottom: 58,
  },
  active: {
    backgroundColor: colors.primary,
    width: 26,
    height: 4,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    // marginBottom: 58,
  },
});

export default Welcome;
