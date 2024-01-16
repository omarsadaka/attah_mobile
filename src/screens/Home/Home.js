import dynamicLinks from '@react-native-firebase/dynamic-links';
import i18next from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppNavigation, AppText, AppView } from '../../common';
import ScrollView from '../../common/ScrollView';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import HeaderMenu from '../../components/newComponents/HeaderMenu';
import AuthRepo from '../../repo/auth';
import Image2 from './assets/storeicon2.png';
import Card from './components/Card';
import DefaultSwiper from './components/DefaultSwiper';

const Home = props => {
  const userData = useSelector(state => state.auth.userData);
  const cart_count = useSelector(state => state.auth.cartCount);
  const notif_count = useSelector(state => state.auth.notifCount);
  console.log('🚀 ~ file: Home.js:23 ~ Home ~ notif_count:', notif_count);
  const refreshNotificationCount = useSelector(
    state => state.list.refreshNotificationCount,
  );

  console.log('userData', userData);
  const authRepo = new AuthRepo();
  const token = useSelector(state => state.auth.deviceToken);
  console.log('🚀 ~ file: Home.js:27 ~ Home ~ token:', token);
  const [ads, setAds] = useState([]);
  const [timeNow, setTimeNow] = useState('');
  const [number, setNumber] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleDynamicLink = link => {
    console.log('🚀 ~ file: Home.js:35 ~ handleDynamicLink ~ link:', link);
    // Handle dynamic link inside your own application
    if (link?.url.includes('https://www.atah.com.sa')) {
      const id = link.url.split('/')[3];
      console.log('🚀 ~ file: Home.js:39 ~ handleDynamicLink ~ id:', id);
      AppNavigation.push({
        name: 'StoreDetails',
        passProps: {
          storeID: id,
        },
      });
    }
  };

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log('🚀 ~ file: Home.js:54 ~ useEffect ~ link:', link);
        if (link?.url.includes('https://www.atah.com.sa')) {
          const id = link.url.split('/')[3];
          console.log('🚀 ~ file: Home.js:39 ~ handleDynamicLink ~ id:', id);
          AppNavigation.push({
            name: 'StoreDetails',
            passProps: {
              storeID: id,
            },
          });
        }
      });
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    fetchData();
    getAds();
  }, []);

  useEffect(() => {
    Navigation.events().registerComponentDidDisappearListener(
      ({componentName}) => {
        Navigation.mergeOptions('Notifications', {
          bottomTab: {
            badge: notif_count > 0 ? notif_count.toString() : '0',
          },
        });
      },
    );
    Navigation.events().registerComponentDidAppearListener(
      ({componentName}) => {
        if (userData) {
          Navigation.mergeOptions('Notifications', {
            bottomTab: {
              badge: notif_count > 0 ? notif_count.toString() : '0',
            },
          });
        }
      },
    );
    Navigation.mergeOptions('Notifications', {
      bottomTab: {
        badge: notif_count > 0 ? notif_count.toString() : '0',
      },
    });
  }, [notif_count, token]);

  useEffect(() => {
    Navigation.mergeOptions('Notifications', {
      bottomTab: {
        badge: notif_count > 0 ? notif_count.toString() : '0',
      },
    });
  }, [notif_count, token]);

  useEffect(() => {
    Navigation.mergeOptions('Bag', {
      bottomTab: {
        badge: cart_count > 0 ? cart_count.toString() : '0',
      },
    });
  }, [cart_count, token]);

  const fetchData = useCallback(async () => {
    await authRepo.getUserData();
    await authRepo.getCartCount();
    await authRepo.getNotifiCounter();
  }, []);

  const fetchNotificationCount = useCallback(async () => {
    await authRepo.getNotifiCounter();
  }, []);

  useEffect(() => {
    fetchNotificationCount();
  }, [refreshNotificationCount]);

  const getAds = async () => {
    let ads = await authRepo.getAds();
    console.log('got ads DATA ::: ', ads);
    setAds(ads);
    setRefreshing(false);
  };

  const formatAMPM = date => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    setTimeNow(strTime);
    // return strTime;
  };
  const renderEmpty = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <AppText title={i18next.t('app:no_ads')} style={styles.text} />
      </View>
    );
  };

  return (
    <AppView flex stretch borderBottomWidth={1}>
      <HeaderMenu
        backgroundColor={colors.gray}
        componentId={props.componentId}
      />
      <ScrollView>
        <View style={styles.textContainer}>
          {ads.length > 0 ? <DefaultSwiper images={ads} /> : renderEmpty()}
        </View>
        <View style={{}}>
          <AppList
            flex
            columns={3}
            idPathInData={'id'}
            rowRenderer={(data, index) => (
              <Card
                source={Image2}
                item={data}
                cardHeight={Dimensions.DEVICE_HEIGHT * 0.25}
                isEven={index % 2 == 0}
                index={index}
                lenght={number}
              />
            )}
            apiRequest={{
              url: `${BASE_URL}categories`,
              params: {
                // paginate: 6,
              },
              responseResolver: response => {
                setNumber(response.data.data.length);
                return {
                  data: response.data.data,
                  pageCount: response.data.meta.total,
                };
              },
              onError: error => {
                i18next.t('ui-error-happened');
              },
            }}
            noResultsLabel={i18next.t('No found data')}
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: Dimensions.DEVICE_HEIGHT * 0.02,
    paddingHorizontal: 10,
  },
  textRight: {
    textAlign: 'right',
  },
  categoryContainer: {
    width: Dimensions.DEVICE_WIDTH,
    alignItems: 'center',
    paddingHorizontal: Dimensions.DEVICE_WIDTH * 0.05,
  },
  rowChield: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    padding: 0,
    margin: 0,
    width: 185,
    height: 174,
    borderRadius: 15,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  text: {
    fontFamily: fonts.normal,
    color: colors.grayText,
    fontWeight: 'bold',
    fontSize: Dimensions.DEVICE_HEIGHT * 0.025,
    marginBottom: Dimensions.DEVICE_HEIGHT * 0.02,
    marginTop: Dimensions.DEVICE_HEIGHT * 0.02,
  },
});

export default Home;
