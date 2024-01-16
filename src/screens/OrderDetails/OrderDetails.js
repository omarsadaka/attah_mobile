import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import {
  AppButton,
  AppNavigation,
  AppText,
  AppView,
  TouchableView,
  showError,
} from '../../common';
import Navigation from '../../common/Navigation';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import { LoadingView, ScrollableContainer } from '../../components';
import { UsersRepo } from '../../repo';
import ProductCard2 from '../User/component/ProductCard2';
let userRepo = new UsersRepo();
const OrderDetails = props => {
  const {item, isFinished, from} = props;
  const lang = useSelector(state => state.lang);
  const [loadingView, setLoadingView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [order, setOrder] = useState({});
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await userRepo.getOrderByID(item?.id);
    console.log('order by iddd', data);
    setOrder(data);
    setLoadingView(false);
  };

  useEffect(() => {
    const backAction = () => {
      // write code to handel navigation
      if (from == 'Notifications') {
        if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(1);
        else AppNavigation.navigateToHome(2);
      } else {
        Navigation.pop(props.componentId);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const header = () => {
    return (
      <AppView row srtetch marginHorizontal={7} marginTop={10}>
        <AppText center size={9} style={{flex: 1}}>
          {'#'}
          {order?.id}
        </AppText>
        <TouchableOpacity
          onPress={() => {
            if (from == 'Notifications') {
              if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(1);
              else AppNavigation.navigateToHome(2);
            } else {
              Navigation.pop(props.componentId);
            }
          }}>
          <Image
            source={require('../../assets/imgs/close.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </AppView>
    );
  };

  const renderCancelOrder = () => {
    return (
      <View style={styles.deleteCartContainer}>
        <AppText size={9} marginHorizontal={3}>
          {i18next.t('cancel-order?')}
        </AppText>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: Dimensions.DEVICE_HEIGHT * 0.02,
          }}>
          <AppButton
            processing={false}
            style={{flex: 2}}
            marginVertical={10}
            title={i18next.t('back')}
            onPress={() => setShowDelete(false)}
          />
          <View style={{width: 5}} />
          <AppButton
            processing={loading}
            style={{flex: 1}}
            marginVertical={10}
            title={i18next.t('confirm')}
            onPress={() => {
              cancelOrder();
            }}
          />
        </View>
      </View>
    );
  };

  const cancelOrder = async () => {
    setLoading(true);
    const data = await userRepo.cancelOrder(item?.id);
    console.log('data', data);
    if (!data) setLoading(false);
  };

  return (
    <AppView
      flex
      center
      backgroundColor={showDelete ? colors.grayC : colors.white}>
      {header()}
      {loadingView ? (
        <LoadingView />
      ) : (
        <ScrollableContainer hideBack paddingHorizontal={5} paddingBottom={20} marginTop={-23}>
          <AppText size={8} marginBottom={5} style={{flex: 1}}>
            {i18next.t('order-container')}
          </AppText>
          {order?.items?.map(item => {
            return (
              <ProductCard2
                item={item}
                total={order?.total}
                isOrderDetails={true}
              />
            );
          })}

          <AppView flex stretch row marginVertical={2} marginTop={5}>
            <AppText size={6.5} style={{flex: 1}}>
              {i18next.t('total-price')}
            </AppText>
            <AppText size={7} color={colors.error}>
              {`${order?.total} ${i18next.t('sar')}`}
            </AppText>
          </AppView> 

          <AppView flex stretch row >
            <AppText size={6.5} style={{flex: 1}}>
              {i18next.t('shipping-coast')}
            </AppText>
            <AppText size={7} color={colors.error}>
              {`${order?.delivery_charge} ${i18next.t('sar')}`}
            </AppText>
          </AppView>


          <AppView flex stretch row marginVertical={2}>
            <AppText size={6.5} style={{flex: 1}}>
              {i18next.t('tax-coast')}
            </AppText>
            <AppText size={7} color={colors.error}>
              {`${order?.order_added_tax} ${i18next.t('sar')}`}
            </AppText>
          </AppView>

         
          <AppView flex stretch row>
            <AppText size={6.5} style={{flex: 1}}>
              {i18next.t('discount-coast')}
            </AppText>
            <AppText size={7} color={colors.error}>
              {`${order?.promo_code_discount} ${i18next.t('sar')}`}
            </AppText>
          </AppView>

          

          <View style={styles.line} />
          <AppText size={7.2} style={{flex: 1}} color={colors.grayText}>
            {i18next.t('store-name')}
          </AppText>
          <AppView flex stretch row marginTop={2}>
            <Image
              source={
                order?.store?.logo
                  ? {uri: order?.store?.logo}
                  : require('../../assets/imgs/logo.png')
              }
              style={styles.image}
              resizeMode="cover"
            />
            <View style={{flex: 1, alignItems: 'center', marginHorizontal: 5}}>
              <AppText size={7} color={colors.black}>
                {order?.store?.name}
              </AppText>
              <AppText size={7}>{order?.store?.type}</AppText>
            </View>
          </AppView>
          <View style={styles.line} />
          <AppView flex stretch row >
            <AppText size={8} stretch color={colors.grayText}>
              {i18next.t('order-state')}
            </AppText>
            <AppView row marginHorizontal={2}>
              <AppText size={7} marginHorizontal={2} color={colors.black}>
                {order?.status?.name}
              </AppText>
              <View style={styles.dot} />
            </AppView>
          </AppView>
          <View style={styles.line} />
          <AppView flex stretch row>
            <AppText size={8} color={colors.grayText}>
              {i18next.t('order-date')}
            </AppText>
            <AppText
              size={7}
              color={colors.black}
              style={{marginHorizontal: 5}}>
              {order?.created_at}
            </AppText>
          </AppView>
          <View style={styles.line} />
          <AppView flex stretch row>
            <AppText size={8} color={colors.grayText}>
              {i18next.t('order-number')}
            </AppText>
            <AppText
              size={7}
              color={colors.black}
              style={{marginHorizontal: 5}}>
              {'#'}
              {order?.id}
            </AppText>
          </AppView>
          <View style={styles.line} />
          
          <AppView flex stretch row spaceBetween>
            <AppText size={7} color={colors.grayText}>
              {i18next.t('upload-bill')}
            </AppText>
            <TouchableView
              row
              center
              marginTop={3}
              onPress={() => {
                if (order.invoice) {
                  Linking.canOpenURL(order?.invoice).then(supported => {
                    if (supported) {
                      Linking.openURL(order?.invoice);
                    } else {
                      console.log(
                        "Don't know how to open URI: " + order?.invoice,
                      );
                      showError(i18next.t('cannt-open-invoice'));
                    }
                  });
                } else {
                  showError(i18next.t('no-invoice-to-show'));
                }
              }}>
              <Image
                source={require('../../assets/imgs/download.png')}
                style={{width: 13, height: 13}}
                resizeMode="contain"
              />
              <AppView width={2} />
              <AppText size={7} color={colors.error}>
                {i18next.t('upload-bill-pdf')}
              </AppText>
            </TouchableView>
          </AppView>

          {order?.status?.key == 'delivered' ? (
            <AppView flex stretch>

              {/* <AppView flex stretch row spaceBetween>
                <AppText size={7} color={colors.grayText}>
                  {i18next.t('upload-shipping-bill')}
                </AppText>
                <TouchableView
                  row
                  center
                  marginTop={3}
                  onPress={() => {
                    if (order.shipping_invoice?.printAWBURL) {
                      Linking.canOpenURL(
                        order.shipping_invoice?.printAWBURL,
                      ).then(supported => {
                        if (supported) {
                          Linking.openURL(order.shipping_invoice?.printAWBURL);
                        } else {
                          console.log(
                            "Don't know how to open URI: " +
                              order.shipping_invoice?.printAWBURL,
                          );
                          showError(i18next.t('cannt-open-invoice'));
                        }
                      });
                    } else {
                      showError(i18next.t('no-invoice-to-show'));
                    }
                  }}>
                  <Image
                    source={require('../../assets/imgs/download.png')}
                    style={{width: 13, height: 13}}
                    resizeMode="contain"
                  />
                  <AppView width={2} />
                  <AppText size={7} color={colors.error}>
                    {i18next.t('upload-bill-pdf')}
                  </AppText>
                </TouchableView>
              </AppView> */}
              
              <View style={styles.line} />
              <AppText size={7} style={{flex: 1}} color={colors.grayText}>
                {i18next.t('order-rate')}
              </AppText>
              <AirbnbRating
                isDisabled
                type="custom"
                count={5}
                size={20}
                showRating={false}
                defaultRating={order?.rate ? order.rate.rate : 0}
                tintColor={colors.white}
                selectedColor="#FF9F57"
                unSelectedColor="#B5B5B5"
                starImage={require('../../assets/imgs/star.png')}
                starContainerStyle={[lang.lang == 'en' ? styles.en : styles.ar]}
              />
              <AppText size={7} style={{flex: 1}} color={colors.title}>
                {order?.rate?.comment}
              </AppText>
            </AppView>
          ) : null}

          {/* {!isFinished ? (
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => setShowDelete(true)}>
              {loading ? (
                <ActivityIndicator size={'small'} color={colors.error} />
              ) : (
                <AppText size={7} color={colors.error} center>
                  {i18next.t('cancel-order')}
                </AppText>
              )}
            </TouchableOpacity>
          ) : null} */}
        </ScrollableContainer>
      )}
      {showDelete ? renderCancelOrder() : null}
    </AppView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#66002521',
    marginVertical: 15,
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.18,
    height: Dimensions.DEVICE_WIDTH * 0.16,
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#FF9953',
  },
  cancel: {
    width: '88%',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: colors.error,
    borderWidth: 1,
    marginTop: Dimensions.DEVICE_HEIGHT * 0.05,
    paddingVertical: 10,
  },
  deleteCartContainer: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.23,
    backgroundColor: colors.white,
    paddingHorizontal: Dimensions.DEVICE_WIDTH * 0.04,
    paddingVertical: Dimensions.DEVICE_HEIGHT * 0.02,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowColor: colors.black,
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
  ar: {
    transform: [{rotateY: '180deg'}],
  },
});
