import i18next from 'i18next';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText, AppView } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
import { AuthRepo, BagRepo } from '../../../repo';
let bagRepo = new BagRepo();
const authRepo = new AuthRepo();

const ProductCard = ({item, refreshData, refreshData2}) => {
  const [qnty, setQnty] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  return (
    <AppView flex stretch row marginVertical={1} paddingHorizontal={2}>
      <Image
        source={
          item.product.image
            ? {uri: item.product.image}
            : require('../../../assets/imgs/logo.png')
        }
        style={styles.image}
        // resizeMode="contain"
      />

      <AppView flex stretch marginHorizontal={2}>
        <AppText style={styles.text} numberOfLines={2}>
          {item?.product?.name}
        </AppText>
        {item?.extra_properties.map((item, index) => {
          return (
            <AppText size={6} flex stretch color={colors.grayText}>
              {`${'-'} ${
                item.option ? item.option.name : item.txt_property_value
              } ${
                item.option ? item.option.price?item.option.price:'0.0' : item.property.price?item.property.price:'0.0'
              } ${i18next.t('sar')}`}
            </AppText>
          );
        })}
      </AppView>

      <AppView stretch center>
        <Text style={[styles.text, {color: colors.error}]}>
          {item.total} {i18next.t('sar')}
        </Text>
        <View style={styles.qnty}>
          <TouchableOpacity
            onPress={async () => {
              const data = await bagRepo.updateCart(item.id, qnty + 1);
              if (data) {
                setQnty(qnty + 1);
                refreshData(qnty);
              }
            }}>
            <Text style={styles.text}>{'+'}</Text>
          </TouchableOpacity>
          <Text style={[styles.text, {flex: 1, textAlign: 'center'}]}>
            {qnty}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              if (qnty > 1) {
                const data = await bagRepo.updateCart(item.id, qnty - 1);
                if (data) {
                  setQnty(qnty - 1);
                  refreshData(qnty);
                }
              }
            }}>
            <Text style={styles.text}>{'-'}</Text>
          </TouchableOpacity>
        </View>
       {!item.item_quantity?
        <Text style={styles.unAvailable}>
          {i18next.t('not-available')}
      </Text>
       :null}
       
      </AppView>

      <TouchableOpacity
        style={{marginHorizontal: '2%'}}
        onPress={async () => {
          setLoading(true);
          const data = await bagRepo.deleteCart(item.id);
          await authRepo.getCartCount();
          setLoading(false);
          if (data) refreshData2();
        }}>
        {loading ? (
          <ActivityIndicator size={'small'} color={colors.error} />
        ) : (
          <Image
            source={require('../../../assets/imgs/trash.png')}
            style={{width: 25, height: 25}}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
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
    flexDirection: 'row',
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.18,
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
    marginVertical: 4,
  },
  gray_text: {
    width: '90%',
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 18,
    marginVertical: 4,
    textAlign: 'right',
  },
  qnty: {
    width: Dimensions.DEVICE_WIDTH * 0.17,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#66002521',
    borderRadius: 7,
  },
  unAvailable:{
    color: colors.error,
    fontFamily: fonts.normal,
    fontSize: 16,
    marginVertical: 4,
    marginTop:'30%'
  }
});

export default ProductCard;
