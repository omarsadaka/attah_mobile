import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {AppNavigation, AppView, AppIcon, AppText} from '../../../common';
import fonts from '../../../common/defaults/fonts';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import {Icon} from 'react-native-elements';
import i18next from 'i18next';
import CartRepo from '../../../repo/cart';
let cartRepo = new CartRepo();
const PaymentCard = ({item, onDelete}) => {
  const [active, setActive] = useState(item.is_primary);
  const toggleSwitch = value => {
    setActive(value);
    updateCartStatus(value);
  };

  const updateCartStatus = async value => {
    const data = await cartRepo.updateCart(item.id, {
      is_primary: value ? 1 : 0,
    });
  };

  const deleteCart = async () => {
    const data = await cartRepo.deleteCart(item.id);
    console.log('deleteCart', data);
  };

  return (
    <ImageBackground
      style={styles.cardContainer}
      resizeMode="stretch"
      source={require('../../../assets/imgs/visa_bg.png')}>
      <AppView row center marginTop={10} marginHorizontal={10}>
        <Image
          source={
            item.brand_logo
              ? {uri: item.brand_logo}
              : require('../../../assets/imgs/visa.png')
          }
          style={{width: 30, height: 30}}
          resizeMode="contain"
        />
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Switch
            trackColor={{false: 'gray', true: 'red'}}
            thumbColor={active ? 'red' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={active}
          />
        </View>
      </AppView>
      <Text style={styles.cardNumber}>{item.number}</Text>
      <AppView row center marginTop={5} marginHorizontal={10}>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text style={styles.title}>{i18next.t('card-owner')}</Text>
          <Text style={styles.text}>{item.holder_name}</Text>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text style={styles.title}>{i18next.t('card-expireDate')}</Text>
          <Text style={styles.text}>
            {item.expiry_year}
            {'/'} {item.expiry_month}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={styles.title}>{i18next.t('card-cvv')}</Text>
          <Text style={styles.text}>{'***'}</Text>
        </View>
      </AppView>
      <TouchableOpacity
        style={{width: '90%'}}
        onPress={() => onDelete(item.id, item.number)}>
        <Text
          style={{
            width: '98%',
            color: 'red',
            fontFamily: fonts.normal,
            fontSize: 20,
            textAlign: 'right',
            marginTop: 10,
          }}>
          {i18next.t('delete-card')}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.DEVICE_WIDTH,
    height: Dimensions.DEVICE_HEIGHT * 0.3,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: -10,
  },
  title: {
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 20,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.normal,
    fontSize: 20,
  },
  cardNumber: {
    width: '85%',
    color: colors.white,
    fontFamily: fonts.normal,
    fontSize: 20,
    textAlign: 'right',
    marginTop: 10,
  },
});

export default PaymentCard;
