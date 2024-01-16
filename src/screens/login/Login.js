import { Formik } from 'formik';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { BackHandler, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import ScrollableContainer from '../../components/ScrollableContainer';

import { useSelector } from 'react-redux';
import { AppButton, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import AppCheckBox from '../../components/newComponents/CheckBox';
import AppInput from '../../components/newComponents/input';
import { AuthRepo } from '../../repo';
import store from '../../store/store';
import { validateSignIn } from '../../validation/auth';

const authRepo = new AuthRepo();

const Login = props => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const [userType, setUserType] = useState(false);
  const [check, setCheck] = useState(false);
  const [values, setValues] = useState({
    phone: '',
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const checkUser = async mobile => {
    const obj = {
      phone: mobile,
    };
    const num = await authRepo.checkUser(obj);
    console.log('value', num);
    setUserType(num == 0 ? true : false);
  };
  const handleSubmit = async values => {
    if (!userType && !check) {
      return;
    }
    values.phone = '5' + values.phone;
    console.log('values', values);
    setLoading(true);
    const res = await authRepo.signIn(values);
    if (res) {
      setLoading(false);
      AppNavigation.push({
        name: 'VerifyCode',
        passProps: {
          phone: values.phone,
        },
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <ImageBackground style={{flex:1,width:'100%'}} source={require('../../assets/imgs/77.png')}>
    <ScrollableContainer flex hideBack stretch marginHorizontal={10}>
      <Formik
        initialValues={{phone: ''}}
        validationSchema={validateSignIn(values)}
        onSubmit={values => handleSubmit({phone: values.phone})}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <AppView stretch flex>
            <AppView stretch flex marginVertical={5} marginTop={30}>
              <AppText size={14}>{i18next.t('sign-in')}</AppText>
              <AppText color={colors.grayText} size={6} marginTop={3}>
                {i18next.t('enter-your-number')}
              </AppText>
            </AppView>

            <AppInput
              placeholder={i18next.t('mobile')}
              iconName="screen-smartphone"
              isPhone={true}
              iconType="SimpleLineIcons"
              attrName="phone"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={() => checkUser('5' + values.phone)}
              keyboardType="numeric"
              onSubmit={() => {
                checkUser('5' + values.phone);
              }}
              isEdit={true}
            />
            <AppText
              bold
              size={6}
              center
              style={{
                alignSelf: rtl ? 'flex-end' : 'flex-start',
                color: colors.error,
                fontFamily: fonts.normal,
              }}>
              {errors.phone}
            </AppText>

            <AppView flex stretch row>
              <AppCheckBox
                onValueChange={nextValue => {
                  // setFieldValue('checked', nextValue);
                  setCheck(!check);
                }}
                onBlur={handleBlur('checked')}
                value={userType ? true : check}
                activeColor={colors.primary}
                inActiveColor={colors.darkGray}
              />
              <View style={{width: 5}} />

              <TouchableOpacity
                onPress={() =>
                  AppNavigation.push({
                    name: 'TermsAndConditions',
                  })
                }>
                <AppText
                  color={colors.darkText}
                  size={6}
                  style={{textDecorationLine: 'underline'}}>
                  {i18next.t('accept-conditions')}
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  AppNavigation.push({
                    name: 'UsagePolicy',
                  })
                }>
                <AppText
                  color={colors.darkText}
                  size={6}
                  style={{textDecorationLine: 'underline'}}>
                  {i18next.t('accept-policy')}
                </AppText>
              </TouchableOpacity>
            </AppView>

            <AppText
              size={6}
              style={{
                color: colors.error,
                fontFamily: fonts.normal,
              }}>
              {/* {errors.checked} */}
              {userType ? '' : check ? '' : i18next.t('conditions-required')}
            </AppText>
            <AppButton
              processing={loading}
              stretch
              marginVertical={10}
              title={i18next.t('send-code')}
              onPress={handleSubmit}
            />
          </AppView>
        )}
      </Formik>
    </ScrollableContainer>
    </ImageBackground>
  );
};

Login.options = {
  topBar: {
    elevation: 0,
    height: 90,
    backButton: {
      color: colors.primary,
      icon: require('../../assets/imgs/IconLeft.png'),
    },
    background: {
      component: {
        name: 'TopBarBg',
      },
    },
  },
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginHorizontal: 20,
    fontFamily: 'AraHamahHoms-Regular.ttf',
  },
  textContainer: {
    margin: 0,
    marginVertical: 50,
  },
  checkboxContainer: {
    height: 30,
    flex: 1,
    marginTop: 10,
    flexDirection: store.getState().lang.rtl ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 10,
  },
});

export default Login;
