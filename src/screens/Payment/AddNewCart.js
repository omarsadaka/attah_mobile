import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollableContainer} from '../../components';
import {AppText, AppButton, AppNavigation} from '../../common';
import i18next from 'i18next';
import colors from '../../common/defaults/colors';
import {BASE_URL} from '../../api/utils/urls';
import Header from '../../components/newComponents/Header';
import {Formik} from 'formik';
import {validateAddCart} from '../../validation/auth';
import DefaultInput from '../../components/DefaultInput';
import Dimensions from '../../common/defaults/Dimensions';
import fonts from '../../common/defaults/fonts';
import {Icon} from 'react-native-elements';
import ModalPicker from '../../components/ModalPicker';
import CartRepo from '../../repo/cart';
import {useSelector} from 'react-redux';

let cartRepo = new CartRepo();
const AddNewCart = props => {
  const lang = useSelector(state => state.lang);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    var data = [];
    data = await cartRepo.getbBrandList();
    console.log('data brand', data);
    const arr = [];
    for (let index = 0; index < data.length; index++) {
      const obj = {
        id: data[index].PaymentMethodId,
        name: data[index].PaymentMethodAr,
        name_ar: data[index].PaymentMethodAr,
        name_en: data[index].PaymentMethodEn,
        logo: data[index].ImageUrl,
      };
      arr.push(obj);
    }
    setBrands(arr);
  };

  const handleSubmit = values => {
    console.log('data  values', values);
    setLoading(true);
    var data = {};
    data = cartRepo.addCart(values);
    console.log('data  cart', data);
    if (data) {
      clearTimeout(timeout);
      let timeout = setTimeout(() => {
        if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
        else AppNavigation.navigateToHome(0);
      }, 1000);
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <Header backgroundColor={colors.gray} componentId={props.componentId} />
      <ScrollableContainer
        center
        hideBack
        backgroundColor={colors.white}
        marginHorizontal={6}>
        <AppText size={13} marginHorizontal={4} mv={7}>
          {i18next.t('add-cart')}
        </AppText>
        <AppText size={6} marginHorizontal={4} mv={7}>
          {i18next.t('enter-cart-data')}
        </AppText>

        <Formik
          initialValues={{
            holder_name: '',
            number: '',
            brand_id: '',
            en: {},
            ar: {},
            brand_logo: '',
            expiry_month: '',
            expiry_year: '',
            is_primary: '1',
          }}
          validationSchema={validateAddCart()}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View style={{marginTop: 10, width: '100%'}}>
              <DefaultInput
                hint={i18next.t('cart-owner-name')}
                value={values.cart_owner}
                onChange={handleChange('holder_name')}
                isLeftIcon
                iconName={'map'}
              />
              <AppText bold size={6} center style={styles.error}>
                {errors.holder_name}
              </AppText>
              <DefaultInput
                hint={i18next.t('cart-number')}
                value={values.cart_number}
                onChange={handleChange('number')}
                isLeftIcon
                iconName={'map'}
                keyboardType="numeric"
              />
              <AppText bold size={6} center style={styles.error}>
                {errors.number}
              </AppText>

              <View style={styles.spinner}>
                <ModalPicker
                  hint={i18next.t('brand')}
                  style={{flex: 1}}
                  height={Dimensions.DEVICE_HEIGHT * 0.4}
                  data={brands}
                  hasBg={true}
                  defaultColor={colors.black}
                  onTouchEnd={() => {}}
                  onSelect={value => {
                    setFieldValue('ar', {brand: value.name_ar});
                    setFieldValue('en', {brand: value.name_en});
                    setFieldValue('brand_logo', value.logo);
                    setFieldValue('brand_id', value.id);
                  }}
                  showIcon={false}
                />
                <AppText bold size={6} center style={styles.error}>
                  {errors.brand_id}
                </AppText>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <DefaultInput
                    style={{flex: 1}}
                    hint={i18next.t('card-expireDate-yy')}
                    value={values.cvv}
                    onChange={handleChange('expiry_year')}
                    isLeftIcon
                    iconName={'map'}
                    keyboardType="numeric"
                  />
                  <AppText bold size={6} center style={styles.error}>
                    {errors.expiry_year}
                  </AppText>
                </View>
                <View style={{width: 10}} />
                <View style={{flex: 1}}>
                  <DefaultInput
                    style={{flex: 1}}
                    hint={i18next.t('card-expireDate-mm')}
                    value={values.expire_date}
                    onChange={handleChange('expiry_month')}
                    isLeftIcon
                    iconName={'map'}
                    keyboardType="numeric"
                  />
                  <AppText bold size={6} center style={styles.error}>
                    {errors.expiry_month}
                  </AppText>
                </View>
              </View>

              <AppButton
                processing={loading}
                stretch
                marginVertical={10}
                title={i18next.t('send')}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollableContainer>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: Dimensions.DEVICE_HEIGHT * 0.02,
    borderColor: colors.grayText,
    paddingHorizontal: Dimensions.DEVICE_WIDTH * 0.03,
    borderWidth: 0.5,
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.2,
  },
  error: {
    alignSelf: 'flex-end',
    color: colors.error,
    fontFamily: fonts.normal,
    marginTop: 3,
  },
  text: {
    flex: 1,
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    color: colors.black,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontFamily: fonts.normal,
  },
  spinner: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    marginBottom: 20,
  },
});
export default AddNewCart;
