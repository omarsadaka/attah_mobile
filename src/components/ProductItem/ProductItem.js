import i18next from 'i18next';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppNavigation, AppText, AppView, showError } from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { AuthRepo } from '../../repo';
import BagRepo from '../../repo/bag';
import FavouriteRepo from '../../repo/favourite';
let favouriteRepo = new FavouriteRepo();
const authRepo = new AuthRepo();

let bagRepo = new BagRepo();
const arr = [
  0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 38, 31, 32, 35, 36, 39, 40,
  43, 44, 47, 48, 51, 52, 55, 56, 59, 60, 63, 64, 67, 68, 71, 72, 75,
];
const ProductItem = ({
  cardHeight,
  isEven,
  item,
  source,
  index,
  isFav,
  refreshData,
  lenght,
  removeItemFromList,
}) => {
  const [loading_fav, setLoading_fav] = useState(false);
  const [loading_bag, setLoading_bag] = useState(false);
  const lang = useSelector(state => state.lang);

  const addToFav = async () => {
    if (!item.is_favourite) {
      setLoading_fav(true);
      const data = await favouriteRepo.addToFav({product_id: item.id});
      console.log('addToFav', data);
      setLoading_fav(false);
      refreshData();
    } else {
      showError(i18next.t('already-added-to-fav'));
    }
  };
  const deleteFromFav = async () => {
    setLoading_fav(true);
    const data = await favouriteRepo.deleteFromFav(item.id);
    console.log('deleteFromFav', data);
    setLoading_fav(false);
    refreshData();
    removeItemFromList(item.id);
  };

  const addToCart = async () => {
    if (item?.property?.property_type?.key == 'text') {
      showError(i18next.t('write-comment-first'));
      return;
    }
    setLoading_bag(true);
    const data = await bagRepo.addToBag({
      product_id: item.id,
      quantity: '1',
      device_id: '',
    });
    console.log('addToCart', data);
    await authRepo.getCartCount();
    const list = await bagRepo.getCartList();
    setLoading_bag(false);
  };
  console.log('item item ', item)
  return (
    <TouchableOpacity
      onPress={() => {
        AppNavigation.push({
          name: 'ProductDetails',
          passProps: {
            item: item,
          },
        });
      }}
      style={{
        flex: 0.5,
        // transform: lang.rtl ? [{scaleX: -1}] : [],
        width: Dimensions.DEVICE_WIDTH * 0.4,
        marginVertical: Dimensions.DEVICE_HEIGHT * 0.02,
        marginHorizontal: Dimensions.DEVICE_WIDTH * 0.035,
      }}>
      <ImageBackground
        style={[lang.lang=='ar'?styles.ar:styles.en,{
          width: '100%',
          height: arr.includes(index)
            ? cardHeight
            : index == 2 && lenght == index + 1
            ? cardHeight
            : cardHeight - Dimensions.DEVICE_HEIGHT * 0.07,
          marginTop:
            arr.includes(index) && index != 0
              ? -Dimensions.DEVICE_HEIGHT * 0.07
              : index == 2 && lenght == index + 1
              ? -Dimensions.DEVICE_HEIGHT * 0.07
              : 0,
          marginTop:
            !isEven && arr.includes(index)
              ? -Dimensions.DEVICE_HEIGHT * 0.07
              : index == 2 && lenght == index + 1
              ? -Dimensions.DEVICE_HEIGHT * 0.07
              : 0,
          // marginTop:
          //   index == 2 && lenght == index + 1
          //     ? -Dimensions.DEVICE_HEIGHT * 0.07
          //     : 0,
          borderRadius: 15,
          overflow: 'hidden',

        }]}
        source={item.image ? {uri: item.image} : source}
        resizeMode="stretch">
        <TouchableOpacity
          style={item.is_favourite ? styles.fav1 : styles.fav2}
          onPress={() => {
            if (item.is_favourite) deleteFromFav();
            else addToFav();
          }}>
          {loading_fav ? (
            <ActivityIndicator size={'small'} color={colors.error} />
          ) : (
            <Image
              source={
                isFav
                  ? require('../../assets/imgs/heart2.png')
                  : item.is_favourite
                  ? require('../../assets/imgs/heart2.png')
                  : require('../../assets/imgs/heart-w.png')
              }
              style={{with: 15, height: 15}}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        {item?.store?.status?
        <TouchableOpacity style={styles.bag} onPress={() => addToCart()}>
          {loading_bag ? (
            <ActivityIndicator size={'small'} color={colors.error} />
          ) : (
            <Image
              source={require('../../assets/imgs/bag.png')}
              style={{with: 20, height: 20}}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        :null}
      </ImageBackground>
      <AppView row center>
        <AppText
          style={[lang.lang=='ar'?{
            color: colors.black,
            fontSize: 18,
            fontFamily: fonts.normal,
            flex: 1,
            marginHorizontal: 3,
            transform: [{rotateY: '180deg'}],
            textAlign:'left'            
          }:{
            color: colors.black,
            fontSize: 18,
            fontFamily: fonts.normal,
            flex: 1,
            marginHorizontal: 3,
          }]}
          
          numberOfLines={2}>
          {item.name}
        </AppText>
        {/* <Text style={{color: 'red', fontSize: 16, fontFamily: fonts.normal}}>
          {item.price} {i18next.t('sar')}
        </Text> */}
        <AppView stretch>
          {item.price_after_discount ? (
            <AppText
              size={6.5}
              color={colors.grayText}
              marginVertical={1}
              
              style={[lang.lang=='ar'?{ 
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              transform: [{rotateY: '180deg'}],
              }:{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              }]}>
              {item?.price_pre_discount} {i18next.t('sar')}
            </AppText>
          ) : null}

          {item.price_after_discount ? (
            <AppText size={8} center color={colors.error1} style={[lang.lang=='ar'?styles.ar:null]}>
              {parseInt(item.price_after_discount)} {i18next.t('sar')}
            </AppText>
          ) : (
            <AppText size={8} center color={colors.error1} style={[lang.lang=='ar'?styles.ar:null]}>
              {parseInt(item.price)} {i18next.t('sar')}
            </AppText>
          )}
        </AppView>
      </AppView>
      <Text
        style={[lang.lang=='ar'?{
          color: colors.black,
          fontSize: 18,
          fontFamily: fonts.normal,
          flex: 1,
          transform: [{rotateY: '180deg'}],
        }:{
          color: colors.black,
          fontSize: 18,
          fontFamily: fonts.normal,
          flex: 1,
        }]}>
        {isFav
          ? item?.category?.name
          : // : item.is_favourite
          // ? item?.category?.name
          item.quantity != 0
          ? '' //`${i18next.t('available')} ${item.quantity} ${i18next.t('piece')}`
          : item.unspecified_quantity == 1
          ? i18next.t('unspecified_quantity')
          : i18next.t('no_quantity')}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  fav1: {
    width: Dimensions.DEVICE_HEIGHT * 0.04,
    height: Dimensions.DEVICE_HEIGHT * 0.04,
    borderRadius: (Dimensions.DEVICE_HEIGHT * 0.04) / 2,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  fav2: {
    width: Dimensions.DEVICE_HEIGHT * 0.04,
    height: Dimensions.DEVICE_HEIGHT * 0.04,
    borderRadius: (Dimensions.DEVICE_HEIGHT * 0.04) / 2,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  bag: {
    width: Dimensions.DEVICE_WIDTH * 0.13,
    height: Dimensions.DEVICE_HEIGHT * 0.05,
    backgroundColor: '#90D38C',
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  en: {
    transform: [{rotateY: '0deg'}],
  },
  ar: {
    transform: [{rotateY: '180deg'}],
  },
});
export default ProductItem;
