import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import HeaderMenu from '../../components/newComponents/HeaderMenu';
import { BagRepo } from '../../repo';
import store from '../../store/store';
import CartCard from './component/CartCard';
let bagRepo = new BagRepo();
const Bag = props => {
  const userData = store.getState().auth.userData;
  const cart_count = useSelector(state => state.auth.cartCount);
  const lang = useSelector(state => state.lang);
  const [dataCart, setDataCart] = useState([]);
  const [number, setNumber] = useState('');
  const [quatity, setQuantity] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (userData) {
      Navigation.mergeOptions('Bag', {
        bottomTab: {
          badge: cart_count > 0 ? cart_count.toString() : '0',
        },
      });
    }
  }, [cart_count, userData, quatity]);

  return (
    <>
      <HeaderMenu
        backgroundColor={colors.gray}
        componentId={props.componentId}
        title={i18next.t('cart')}
      />

      <AppView stretch marginHorizontal={5}>
        {/* <AppText size={12}>{i18next.t('cart')}</AppText> */}
        <AppView row>
          <AppText size={6.5}>
            {i18next.t('You-have')} {number} {i18next.t('order')}
          </AppText>
        </AppView>
      </AppView>

      <AppList
        flex
        refreshControl={isDelete}
        idPathInData={'id'}
        rowRenderer={(data, index) => (
          <CartCard
            item={data}
            onPress={() => setItemID(data.id)}
            refreshData={qnty => {
              setQuantity(qnty)
              setIsDelete(!isDelete)
            }}
            refreshData2={() => setIsDelete(!isDelete)}
          />
        )}
        apiRequest={{
          url: `${BASE_URL}cart`,
          params: {
            paginate: 10,
          },
          responseResolver: response => {
            setNumber(response.data.length);
            return {
              data: response.data,
              // pageCount: response.data.meta.current_page,
            };
          },
          onError: error => {
            i18next.t('ui-error-happened');
          },
        }}
        noResultsLabel={i18next.t('No found data')}
      />
    </>
  );
};

export default Bag;

const styles = StyleSheet.create({
  textContainer: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
