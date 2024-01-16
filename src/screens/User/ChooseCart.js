import i18next from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppButton, AppText, AppView, showError } from '../../common';
import Navigation from '../../common/Navigation';
import ScrollView from '../../common/ScrollView';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { LoadingView } from '../../components';
import { BagRepo } from '../../repo';
import ProductCard2 from '../User/component/ProductCard2';

let bagRepo = new BagRepo();
const ChooseCart = props => {
  const {storeID, addressID, price, id} = props;
  const [loading_pay, setLoading_pay] = useState(false);
  const [loading_view, setLoading_view] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [errorType, settErrorType] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    loadOrderSummary();
  }, []);

  const loadOrderSummary = useCallback(async () => {
    setLoading_view(true);
    const values = {
      user_address_id: addressID,
      store_id: storeID,
      deliveryOptionId: id.toString(),
      delivery_charge: price.toString(),
    };
    console.log('data  values', values);
    const data = await bagRepo.getOrderSummary(values);
    console.log('🚀 ~ file: ChooseCart.js:48 ~ loadOrderSummary ~ data', data);
    console.log('data', data);
    if (data.id) setOrderData(data);
    setLoading_view(false);
    if (data.msg) {
      if (data.msg?.needs_update) {
        showError(data.msg.message);
        setMessage(data.msg.message);
        settErrorType(data.msg.needs_update);
      } else {
        showError(data.msg);
        setMessage(data.msg);
      }
    }
  }, [storeID, addressID, price, id]);

  const handleSubmit2 = async () => {
    setLoading_pay(true);
    // console.log('values', values);
    console.log('orderData', orderData?.id);
    const data = await bagRepo.createOrder(orderData?.id);
    console.log('data  order', data);
    setLoading_pay(false);
  };

  return (
    <AppView flex stretch>
      {loading_view ? (
        <LoadingView />
      ) : (
        <>
          {/* <Header
            backgroundColor={colors.gray}
            componentId={props.componentId}
          /> */}
          <AppText size={13} marginHorizontal={4}>
            {i18next.t('orderSummary')}
          </AppText>
          {orderData?.id ? (
            <ScrollView flex stretch hideBack backgroundColor={colors.white}>
              <AppText size={7} marginHorizontal={5} marginTop={10}>
                {i18next.t('order-container')}
              </AppText>
              <AppView flex stretch margin={5}>
                {orderData?.items?.map(item => {
                  return (
                    <ProductCard2
                      item={item}
                      total={orderData.subtotal}
                      isOrderDetails={true}
                    />
                  );
                })}
                <View style={styles.line} />
                {/* <View style={[styles.row]}>
                  <AppText
                    size={7}
                    color={colors.grayText}
                    style={{marginTop: 5}}>
                    {orderData?.created_at}
                  </AppText>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('date')}
                  </AppText>
                </View>
                <View style={styles.line} /> */}
                <AppView row stretch spaceBetween>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('order-coast')}
                  </AppText>
                  <AppText
                    size={7}
                    color={colors.grayText}
                    style={{marginTop: 5}}>
                    {orderData?.subtotal} {i18next.t('sar')}
                  </AppText>
                </AppView>
                <View style={styles.line} />
                <AppView row stretch spaceBetween>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('shipping-coast')}
                  </AppText>
                  <AppText
                    size={7}
                    color={colors.grayText}
                    style={{marginTop: 5}}>
                    {orderData?.delivery_charge} {i18next.t('sar')}
                  </AppText>
                </AppView>
                <View style={styles.line} />
                <AppView row stretch spaceBetween>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('tax-coast')}
                  </AppText>
                  <AppText
                    size={7}
                    color={colors.grayText}
                    style={{marginTop: 5}}>
                    {orderData?.order_added_tax
                      ? orderData?.order_added_tax
                      : '0.0'}{' '}
                    {i18next.t('sar')}
                  </AppText>
                </AppView>
                <View style={styles.line} />
                <AppView row stretch spaceBetween>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('total-coast')}
                  </AppText>
                  <AppText
                    size={7}
                    color={colors.grayText}
                    style={{marginTop: 5}}>
                    {orderData?.total} {i18next.t('sar')}
                  </AppText>
                </AppView>
                <View style={styles.line} />
              </AppView>
              <AppButton
                processing={loading_pay}
                stretch
                marginTop={20}
                marginHorizontal={10}
                marginBottom={5}
                title={i18next.t('direct-pay')}
                onPress={() => {
                  // setIsVesible2(true)
                  handleSubmit2();
                }}
              />
            </ScrollView>
          ) : (
            <AppView flex stretch center>
              <AppText color={colors.error1} center marginBottom={20}>
                {message}
              </AppText>
              {errorType !== null ? (
                <AppButton
                  style={{width: '80%', alignSelf: 'center', marginTop: 5}}
                  processing={false}
                  stretch
                  marginBottom={5}
                  title={i18next.t('go-to-update')}
                  onPress={() => Navigation.push({name: 'UpdateProfile'})}
                />
              ) : null}
            </AppView>
          )}
          {/* {isVesible2 ? renderModel2() : null} */}
        </>
      )}
    </AppView>
  );
};

export default ChooseCart;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.56,
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  add: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 3,
    left: 5,
  },

  subText: {
    width: '90%',
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginVertical: 4,
  },

  cardContainer: {
    width: Dimensions.DEVICE_WIDTH,
    height: Dimensions.DEVICE_HEIGHT * 0.27,
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 20,
    transform: [{rotateY: '180deg'}],
  },
  text: {
    color: colors.white,
    fontFamily: fonts.normal,
    fontSize: 20,
    transform: [{rotateY: '180deg'}],
  },
  text2: {
    flex: 1,
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 20,
    marginHorizontal: 7,
  },
  cardNumber: {
    width: '90%',
    color: colors.white,
    fontFamily: fonts.normal,
    fontSize: 25,
    textAlign: 'right',
    transform: [{rotateY: '180deg'}],
  },
  spinner: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    marginBottom: 20,
  },
  error: {
    alignSelf: 'flex-end',
    color: colors.error,
    fontFamily: fonts.normal,
    marginTop: 3,
  },
  direct_pay: {
    height: Dimensions.DEVICE_HEIGHT * 0.6,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: -2,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {height: 0, width: 1},
    borderColor: colors.error,
    borderWidth: 1,
  },
  payCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
    backgroundColor: colors.grayC,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grayText,
    marginVertical: 15,
  },
  row: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
