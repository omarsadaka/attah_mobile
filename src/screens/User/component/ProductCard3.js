import i18next from 'i18next';
import React from 'react';
import { Image, StyleSheet, Text,View } from 'react-native';
import { AppText, AppView } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
import { BagRepo } from '../../../repo';
import store from '../../../store/store';
let bagRepo = new BagRepo();
const ProductCard3 = ({item}) => {
  console.log('itemitemitem', item.property)
  return (
    <AppView
      row
      marginTop={4}
      >
      <Image
        source={
          item.product.image
            ? {uri: item.product.image}
            : require('../../../assets/imgs/logo.png')
        }
        style={styles.image}
      />

      <AppView marginHorizontal={2} style={{flex:1}}>
        <AppText style={styles.text}>{item.product.name}</AppText>
        {
        item?.property.map((item)=>{
          return(
            <AppView row>
               <AppText size={4.8}>
                 {item.option?item.option.name:item.txt_property_value}
               </AppText>
               <AppText size={5} marginHorizontal={5}>
                 {item.option?item.option.price: item.property.price} {i18next.t('sar')}
               </AppText>
            </AppView>
          )
        })
       }
       
        <AppText style={styles.subText}>
          {i18next.t('qnty-ordered')} {item.quantity}
        </AppText>
      </AppView>

      <Text style={[styles.subText, {color: colors.error,marginHorizontal: 3}]}>
        {item?.total} {i18next.t('sar')}
       </Text>

    </AppView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.95,
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
    flexDirection: store.getState().lang.rtl ? 'row-reverse' : 'row',
    marginVertical: 5,
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.15,
    height: Dimensions.DEVICE_WIDTH * 0.15,
    borderRadius: 10,
  },
  subText: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginVertical: 4,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 18,
  },
  orderDetails: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 20,
    marginTop:3,
    textDecorationLine: 'underline'
  },
  qnty_text: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 17,
  },
  gray_text: {
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 18,
  },
  qnty: {
    width: Dimensions.DEVICE_WIDTH * 0.2,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#66002521',
    borderRadius: 7,
  },
});

export default ProductCard3;
