import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppButton, AppText, AppView, showError } from '../../../common';
import Navigation from '../../../common/Navigation';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
import { PickersRepo } from '../../../repo';
import ProductCard from './ProductCard';

let pickerApi = new PickersRepo();
const CartCard = ({item, refreshData, refreshData2}) => {

  console.log('item cart', item)
  return (
    <AppView
      flex
      stretch
      margin={5}
      borderColor={'#66002521'}
      borderWidth={1}
      borderRadius={10}>
      <AppText stretch row padding={2}>
        {item?.cart_data?.cart?.data.length} {i18next.t('product-in-order')}
      </AppText>
      {item?.cart_data?.cart?.data.map(item => {
        return (
          <>
          <ProductCard
            item={item}
            refreshData={qnty => refreshData(qnty)}
            refreshData2={() => refreshData2()}
          />
          <View style={{width:'100%', height:1, backgroundColor:'#66002521',marginVertical:4}}/>
          </>
        );
      })}
      <TouchableOpacity
      style={{alignSelf:'center'}}
        onPress={async () => {
          await AsyncStorage.setItem(
            'CatID',
            item.store.category_id.toString(),
          );
          Navigation.push({
            name: 'StoreDetails',
            passProps: {
              storeID: item.store.id,
              index: 2,
            },
          });
        }}>
        <AppText style={[{color: '#90D38C'}]}>{i18next.t('add-more')}</AppText>
      </TouchableOpacity>
      {/* <AppView
        stretch
        height={1}
        color={colors.grayText}
        borderBottomWidth={1}
      /> */}
      <AppView flex stretch row marginTop={5} padding={2}>
        <AppView stretch>
          <Image
            source={
              item?.store?.logo
                ? {uri: item?.store?.logo}
                : require('../../../assets/imgs/logo.png')
            }
            style={styles.image}
            resizeMode="contain"
          />
          {/* <Text style={[styles.text, {color: colors.error}]}>
            {item.cart_data.subtotal}
          </Text> */}
        </AppView>
        <AppView width={3}/>
        <AppView flex stretch row>
          <View style={{flex:1}}>
            <AppText style={styles.gray_text}>{i18next.t('store-name')}</AppText>
            <AppText style={styles.text}>{item?.store?.name}</AppText>
          </View>
          <View>
            <AppText style={styles.gray_text}>{i18next.t('sub-total')}</AppText>
            <AppText style={styles.text2}>{item?.cart_data?.subtotal} {i18next.t('sar')}</AppText>
          </View>
        
          {/* <Text
            style={[styles.text, {marginTop: Dimensions.DEVICE_HEIGHT * 0.03}]}>
            {'إجمالى'}
          </Text> */}
        </AppView>
      </AppView>
     
      <AppButton
        processing={false}
        stretch
        marginVertical={3}
        marginHorizontal={2}
        title={i18next.t('complete-order')}
        onPress={() => {
          console.log('item', item?.cart_data?.cart?.data)
          item?.cart_data?.cart?.data.forEach(el => {
            if(!el.item_quantity){
              showError(i18next.t('unAvailavle-product'));
            }else{
              Navigation.push({
                name: 'ShippingCompany',
                passProps: {
                  Items: item?.cart_data?.cart?.data,
                  storeID: item?.store?.id,             
               },
             });
            }
          });
        }}
      />
    </AppView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.92,
    // height: Dimensions.DEVICE_HEIGHT * 0.25,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.grayText,
    borderWidth: 1,
    marginVertical: 4,
    marginHorizontal: 1,
    paddingVertical: 4,
  },
  row: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.16,
    height: Dimensions.DEVICE_WIDTH * 0.16,
    borderRadius:10,
  },
  subText: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginVertical: 4,
  },
  text: {
    // width: '95%',
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 22,
    marginVertical: 4,
  },
  text2: {
    color: colors.primary,
    fontFamily: fonts.normal,
    fontSize: 20,
    marginVertical: 4,
  },
  gray_text: {
    // width: '95%',
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 18,
    marginVertical: 4,
  },
  qnty: {
    width: Dimensions.DEVICE_WIDTH * 0.2,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#66002521',
    borderRadius: 7,
  },
  sectionsContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.9,
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 50,
    transform: [{rotateY: '180deg'}],
  },
  label: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts.normal,
    textAlign: 'center',
    transform: [{rotateY: '180deg'}],
    marginTop: 2,
  },
  spinner: {
    width: Dimensions.DEVICE_WIDTH * 0.85,
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    marginTop: 3,
  },
});

export default CartCard;
