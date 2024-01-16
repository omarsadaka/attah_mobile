import AsyncStorage from '@react-native-async-storage/async-storage';
import { default as I18n, default as i18next } from 'i18next';
import React, { useState } from 'react';
import {
  Image,
  Share,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../actions';
import {
  setCartCount,
  setDeviceToken,
  setNotifCount,
  setUserData,
} from '../../actions/auth';
import {
  AppButton,
  AppIcon,
  AppNavigation,
  AppSpinner,
  AppText,
  AppView,
  TouchableView,
} from '../../common';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { ScrollableContainer } from '../../components/';
import Item from '../../components/menu/Item';
import Button from '../../components/newComponents/Button';
import { AuthRepo } from '../../repo';
import store from '../../store/store';
const logo = require('../../assets/imgs/logo.png');
const authRepo = new AuthRepo();

const TopMenuItem = ({title, source}) => (
  <AppButton transparent>
    <AppView center>
      {/* <AppImage source={source} style={{width: 20, height: 20}} /> */}
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: colors.primaryDark,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={source}
          style={{
            width: 33,
            height: 33,
            tintColor: colors.white
          }}
        />
      </View>
      <AppText marginTop={2} size={6.5} center>
        {title}
      </AppText>
    </AppView>
  </AppButton>
);

const Menu = props => {
  const lang = useSelector(state => state.lang);
  const [loading, setLoading] = useState(false);
  const [visibleModalLogin, setVisibleModalLogin] = useState(false);
  const [changeLang, setChangeLang] = useState(false);
  const [visibleModalDeleteAcc, setVisibleModalDeleteAcc] = useState(false);
  const [selected, setSelected] = useState(1);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();

  const renderLogOutModel = () => {
    return (
      <Modal
        style={{flex: 1}}
        isVisible={visibleModalLogin}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <AppView stretch backgroundColor="#FFFFFF" borderRadius={8}>
          <AppText center size={8} marginTop={3}>
            {i18next.t('sign-out')}
          </AppText>
          <AppText size={8} marginHorizontal={5} marginTop={3}>
            {i18next.t('sign-out-text')}
          </AppText>
          <AppView stretch row center>
            <Button
              width={'44%'}
              title={i18next.t('sign-out')}
              onPress={async () => {
                setVisibleModalLogin(false);
                await AsyncStorage.removeItem('@access_token').then(() => {
                  dispatch(setUserData(null));
                  dispatch(setDeviceToken(null));
                  dispatch(setNotifCount(0));
                  dispatch(setCartCount(0));
                  AppNavigation.navigateToAuth();
                });
              }}
            />
            <AppView width={5} />
            <Button
              width={'35%'}
              title={i18next.t('cancel')}
              onPress={() => setVisibleModalLogin(false)}
            />
          </AppView>
        </AppView>
      </Modal>
    );
  };
  const renderDeleteAccountModel = () => {
    return (
      <Modal
        style={{flex: 1}}
        isVisible={visibleModalDeleteAcc}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <AppView stretch backgroundColor="#FFFFFF" borderRadius={8}>
          <AppText center size={8} marginTop={3}>
            {i18next.t('delete-account')}
          </AppText>
          <AppText size={8} marginHorizontal={5} marginTop={3}>
            {i18next.t('delete-account-confirm')}
          </AppText>
          <AppView stretch row center>
            <Button
              width={'44%'}
              title={i18next.t('delete-account')}
              onPress={async () => deleteAccount()}
            />
            <AppView width={5} />
            <Button
              width={'35%'}
              title={i18next.t('cancel')}
              onPress={() => setVisibleModalDeleteAcc(false)}
            />
          </AppView>
        </AppView>
      </Modal>
    );
  };

  const renderChangeLangModel = () => {
    return (
      <Modal
        style={{flex: 1}}
        isVisible={changeLang}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <AppView stretch backgroundColor="#FFFFFF" borderRadius={8}>
          <AppView stretch center>
            <Button
              width={'70%'}
              title={'English'}
              onPress={async () => {
                if (lang.lang != 'en') {
                  await setLang('en', false)(store.dispatch);
                  AppNavigation.closeMenu();
                  i18next.changeLanguage('en').then(() => {
                    AppNavigation.navigateToHome();
                  });
                  setChangeLang(false);
                } else {
                  setChangeLang(false);
                }
              }}
            />
            <Button
              width={'70%'}
              title={'العربية'}
              onPress={async () => {
                if (lang.lang != 'ar') {
                  await setLang('ar', true)(store.dispatch);
                  AppNavigation.closeMenu();
                  i18next.changeLanguage('ar').then(() => {
                    AppNavigation.navigateToHomeAr();
                  });
                  setChangeLang(false);
                } else {
                  setChangeLang(false);
                }
              }}
            />
          </AppView>
          <AppText
            size={12}
            color={colors.black}
            style={{position: 'absolute', top: 6, right: 7}}
            onPress={() => setChangeLang(false)}>
            {'X'}
          </AppText>
        </AppView>
      </Modal>
    );
  };

  const share = (url1, url2) => {
    if (Platform.OS === 'ios') {
      // ActionSheetIOS.showShareActionSheetWithOptions(
      //   {url: 'IOS: ' + url1 + `\n \n` + 'ANDROID: ' + url2},
      //   () => {},
      //   () => {},
      // );
      Share.share({
        message: 'IOS: ' + url1 + `\n \n` + 'ANDROID: ' + url2,
      });
    } else {
      Share.share({
        message: 'ANDROID: ' + url2 + `\n\n` + 'IOS: ' + url1,
      });
    }
  };

  const deleteAccount = async () => {
    const data = await authRepo.deleteAccount();
    console.log('deleteAccount', data);
    if (data) {
      dispatch(setUserData(null));
      direction(setDeviceToken(null));
      AppNavigation.navigateToAuth();
    }
  };
  return (
    <AppView flex stretch>
      {loading && (
        <AppView
          center
          style={{
            position: 'absolute',
            opacity: 0.9,
            zIndex: 10000,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          backgroundColor={colors.white}>
          <AppSpinner size={15} />
        </AppView>
      )}
      <ScrollableContainer header={false} backgroundColor={colors.red}>
        <TouchableOpacity
          onPress={() => AppNavigation.closeMenu()}
          style={{
            marginHorizontal: '5%',
            marginTop: '10%',
            // width: 30,
            // height: 30,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.black,
              fontFamily: fonts.bold,
            }}>
            X
          </Text>
        </TouchableOpacity>
        <AppView flex row stretch marginTop={7}>
          <TouchableOpacity
            onPress={() => {
              AppNavigation.closeMenu();
              Navigation.mergeOptions('bottomTabs', {
                bottomTabs: {
                  currentTabIndex: lang.lang == 'ar' ? 3 : 0,
                },
              });

              // if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
              // else AppNavigation.navigateToHome(0);
            }}
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
            }}>
            <TopMenuItem
              style={{marginVertical: 10}}
              title={I18n.t('the-main')}
              source={require('../../assets/imgs/bottomTabs/22.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(2);
              else AppNavigation.navigateToHome(1);
            }}
            style={{marginHorizontal: 15, marginVertical: 10}}>
            <TopMenuItem
              title={I18n.t('bag')}
              source={require('../../assets/imgs/bottomTabs/33.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(1);
              else AppNavigation.navigateToHome(2);
            }}
            style={{marginHorizontal: 15, marginVertical: 10}}>
            <TopMenuItem
              title={I18n.t('notifications')} // translate
              source={require('../../assets/imgs/bottomTabs/44.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(0);
              else AppNavigation.navigateToHome(3);
            }}
            style={{marginHorizontal: 15, marginVertical: 10}}>
            <TopMenuItem
              title={I18n.t('orders')}
              source={require('../../assets/imgs/bottomTabs/55.png')}
            />
          </TouchableOpacity>
        </AppView>
        <View style={{width: '100%', paddingHorizontal: '5%', marginTop: '5%'}}>
          <AppText marginHorizontal={4} size={9} paddingVertical={5}>
            {i18next.t('my-info')}
          </AppText>

          <Item
            source={require('../../assets/imgs/sideMenu/User0.png')}
            onPress={() => {
              Navigation.push(props.componentId, {
                component: {
                  name: 'UpdateProfile',
                },
              }); // rename it to profile
              // AppNavigation.closeMenu();
            }}
            title={I18n.t('profile')}
          />
          <Item
            source={require('../../assets/imgs/sideMenu/shipping_address.png')}
            onPress={() => {
              Navigation.push(props.componentId, {
                component: {
                  name: 'ShippingAddress',
                },
              });
            }}
            title={I18n.t('shipping-address')}
          />

          <Item
            source={require('../../assets/imgs/sideMenu/Fav0.png')}
            onPress={() => {
              Navigation.push(props.componentId, {
                component: {
                  name: 'Favourites',
                },
              });
            }}
            title={I18n.t('fav-list')}
          />

          {/* <Item
            source={require('../../assets/imgs/sideMenu/favorite.png')}
            onPress={() => {
              Navigation.push(props.componentId, {
                component: {
                  name: 'Favourites',
                },
              });
            }}
            title={I18n.t('whishlist')}
          /> */}
          <TouchableView
            flex
            stretch
            row
            spaceBetween
            // borderBottomWidth={.5}
            onPress={() => setShowHelpCenter(pre => !pre)}>
            <AppText marginHorizontal={4} size={9} paddingVertical={5}>
              {i18next.t('help-center')}
            </AppText>
            <AppIcon
              size={12}
              name={showHelpCenter ? 'chevron-up' : 'chevron-down'}
              type="Feather"
              color={colors.error}
            />
          </TouchableView>
          {showHelpCenter ? (
            <AppView flex stretch row marginTop={5}>
              <AppView width={5} />
              <AppView flex stretch>
                <Item
                  source={require('../../assets/imgs/sideMenu/Info0.png')}
                  onPress={() =>
                    AppNavigation.push({
                      name: 'AboutApp',
                    })
                  }
                  title={I18n.t('about-app')}
                />

                <Item
                  source={require('../../assets/imgs/sideMenu/Contact.png')}
                  onPress={() => {
                    AppNavigation.push({
                      name: 'ContactUs2',
                    });
                  }}
                  title={I18n.t('contact-us')}
                />
                <Item
                  source={require('../../assets/imgs/sideMenu/Service.png')}
                  onPress={() => {
                    AppNavigation.push({
                      name: 'ContactUs',
                    });
                  }}
                  title={I18n.t('service-development')}
                />

                <Item
                  source={require('../../assets/imgs/sideMenu/Commen-question.png')}
                  onPress={() =>
                    AppNavigation.push({
                      name: 'Faq',
                    })
                  }
                  title={I18n.t('support')} //support  contact-us
                />
                <Item
                  source={require('../../assets/imgs/sideMenu/Privancy-plocy.png')}
                  onPress={() =>
                    AppNavigation.push({
                      name: 'UsagePolicy',
                    })
                  }
                  title={I18n.t('usagePolicy')}
                />

                <Item
                  source={require('../../assets/imgs/sideMenu/Terms.png')}
                  onPress={() =>
                    AppNavigation.push({
                      name: 'TermsAndConditions',
                    })
                  }
                  title={I18n.t('terms-conditions')}
                />
              </AppView>
            </AppView>
          ) : null}

          <TouchableView
            flex
            stretch
            row
            spaceBetween
            // borderBottomWidth={.5}
            onPress={() => setShowSettings(pre => !pre)}>
            <AppText marginHorizontal={4} size={9} paddingVertical={5}>
              {i18next.t('settings')}
            </AppText>
            <AppIcon
              size={12}
              name={showSettings ? 'chevron-up' : 'chevron-down'}
              type="Feather"
              color={colors.error}
            />
          </TouchableView>
          {showSettings ? (
            <AppView flex stretch row marginTop={5}>
              <AppView width={5} />
              <AppView flex stretch>
                <Item
                  source={require('../../assets/imgs/sideMenu/Share0.png')}
                  onPress={() =>
                    share(
                      'https://apps.apple.com/us/app/atah-%D8%A3%D8%AA%D8%A7%D8%AD/id1665471740',
                      'https://play.google.com/store/apps/details?id=com.fudex.atah',
                    )
                  }
                  title={I18n.t('share-app')}
                />
                <Item
                  source={require('../../assets/imgs/sideMenu/Lan.png')}
                  onPress={async () => {
                    setChangeLang(true);
                  }}
                  title={I18n.t('language')}
                />

                <Item
                  source={require('../../assets/imgs/sideMenu/Delete.png')}
                  onPress={() => setVisibleModalDeleteAcc(true)}
                  title={I18n.t('delete-account')}
                />

                <Item
                  source={require('../../assets/imgs/sideMenu/LogOut.png')}
                  onPress={async () => {
                    setVisibleModalLogin(true);
                  }}
                  title={I18n.t('sign-out')}
                />
              </AppView>
            </AppView>
          ) : null}
        </View>
      </ScrollableContainer>
      {renderLogOutModel()}
      {renderChangeLangModel()}
      {renderDeleteAccountModel()}
    </AppView>
  );
};

export default Menu;
