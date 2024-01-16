import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../api/utils/urls';
import { AppButton, AppList, AppText } from '../../common';
import colors from '../../common/defaults/colors';
import Dimensions from '../../common/defaults/Dimensions';
import Navigation from '../../common/Navigation';
import { ScrollableContainer } from '../../components';
import Header from '../../components/newComponents/Header';
import CartRepo from '../../repo/cart';
import PaymentCard from './component/PaymentCard';
let cartRepo = new CartRepo();
const Payment = props => {
  const [showDelete, setShowDelete] = useState(false);
  const [cartID, setCartID] = useState('');
  const [cartNum, setCartNum] = useState('');
  const [loading, setLoading] = useState(false);
  const [carts, setcarts] = useState([]);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {}, [reloading]);

  const loadData = async () => {
    let data = [];
    data = await cartRepo.getCartList();
    setcarts(data);
  };

  const deleteCart = async () => {
    const data = await cartRepo.deleteCart(cartID);
    console.log('deleteCart', data);
    if (data) loadData();
    setLoading(false);
    setShowDelete(false);
    setReloading(true);
  };

  const renderDeleteCart = () => {
    return (
      <View style={styles.deleteCartContainer}>
        <AppText size={9} marginHorizontal={3}>
          {i18next.t('delete-cart?')}
        </AppText>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: Dimensions.DEVICE_HEIGHT * 0.01,
          }}>
          <Image
            source={require('../../assets/imgs/visa.png')}
            style={styles.icon}
          />
          <AppText size={9} marginHorizontal={3} style={{flex: 1}}>
            {cartNum}
          </AppText>
        </View>
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
              setLoading(true);
              deleteCart();
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <Header backgroundColor={colors.gray} componentId={props.componentId} />
      <AppText
        size={13}
        marginHorizontal={3}
        marginTop={7}
        style={{textAlign: 'right'}}>
        {i18next.t('payment-options')}
      </AppText>
      <ScrollableContainer center hideBack backgroundColor={colors.white}>
        <View style={styles.listContainer}>
          <AppList
            flatlist
            flex
            columns={1}
            centerColumns
            refreshControl={reloading}
            idPathInData={'id'}
            rowRenderer={(data, index) => (
              <PaymentCard
                item={data}
                onDelete={(id, number) => {
                  setCartID(id);
                  setCartNum(number);
                  setShowDelete(true);
                }}
              />
            )}
            apiRequest={{
              url: `${BASE_URL}profile/payment-cards`,
              params: {
                // paginate: 10,
              },
              responseResolver: response => {
                return {
                  data: response.data,
                  // pageCount: response.data.pageCount,
                };
              },
              onError: error => {
                i18next.t('ui-error-happened');
              },
            }}
            noResultsLabel={i18next.t('No found data')}
          />
        </View>
      </ScrollableContainer>
      <TouchableOpacity
        style={styles.add}
        onPress={() =>
          Navigation.push({
            name: 'AddNewCart',
          })
        }>
        <Image
          source={require('../../assets/imgs/add.png')}
          style={{width: 80, height: 80}}
        />
      </TouchableOpacity>
      {showDelete ? renderDeleteCart() : null}
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  constainer: {
    height: 400,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  add: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 3,
    left: 5,
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
});
