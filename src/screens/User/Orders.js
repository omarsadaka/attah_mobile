import i18next, { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppText, AppView, TouchableView } from '../../common';
import colors from '../../common/defaults/colors';
import HeaderMenu from '../../components/newComponents/HeaderMenu';
import OrderCard from './component/OrderCard';

const Orders = props => {
  const rtl = useSelector(state => state.lang.rtl);
  const [orderType, setOrderType] = useState('current');
  const [loading, setLoading] = useState(false);



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : null}
      enabled
      style={{alignItems: 'center', width: '100%', height: '100%'}}>
      <AppView center flex borderBottomWidth={1}>
        <HeaderMenu
          backgroundColor={colors.gray}
          componentId={props.componentId}
          title={i18next.t('orders')}
        />
        {/* <AppText
          color={colors.black}
          marginTop={5}
          size={10}
          marginHorizontal={5}
          style={styles.textRight}>
          {i18next.t('orders')}
        </AppText> */}
        <TouchableView
          stretch
          width={95}
          height={6}
          row
          marginVertical={3}
          borderWidth={1}
          borderRadius={10}
          borderColor={'#66002521'}
          marginHorizontal={5}>
          <TouchableView
            flex
            stretch
            center
            onPress={() => {
              if(!loading){
                setLoading(true)
                setOrderType('current');
              }else{
                setLoading(false)
              }
            }}
            style={{overflow:'hidden',borderRadius: 8}}
            backgroundColor={orderType === 'current' && colors.primary}
            borderRadius={8}>
            <AppText
              size={7}
              center
              color={orderType === 'current' ? colors.white : colors.black}>
              {t('orders-current')}
            </AppText>
          </TouchableView>
          <TouchableView
            flex
            stretch
            center
            onPress={() => {
              if(!loading){
                setLoading(true)
                setOrderType('finished');
              }else{
                setLoading(false)
              }
             
            }}
            style={{overflow:'hidden',borderRadius:8}}
            backgroundColor={orderType === 'finished' && colors.primary}
            borderRadius={8}>
            <AppText
              size={7}
              center
              color={orderType === 'finished' ? colors.white : colors.black}>
              {t('orders-finished')}
            </AppText>
          </TouchableView>

        </TouchableView>

        <AppList
        flex
        mv={8}
        idPathInData={'id'}
        rowRenderer={(data, index) => (
          <OrderCard
            item={data}
            isFinished={orderType === 'finished'}
            tabType={orderType}
          />
        )}
        apiRequest={{
          url: `${BASE_URL}orders?type=stores`,
          params: {
            paginate: 10,
            status: orderType,
          },
          responseResolver: response => {
            setLoading(false)
            return {
              data: response.data.orders.data,
              // pageCount: response.data.meta.total,
            };
          },
          onError: error => {
            setLoading(false)
            i18next.t('ui-error-happened');
          },
        }}
        noResultsLabel={i18next.t('No found data')}
      />
      </AppView>
    </KeyboardAvoidingView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  defaultContainer: {
    flexDirection: 'row',
    width: '96%',
    backgroundColor: colors.white,
    marginHorizontal: 1,
    borderColor: colors.grayText,
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 12,
  },
  selected: {
    backgroundColor: colors.error,
    // borderRadius: 12,
  },
});
