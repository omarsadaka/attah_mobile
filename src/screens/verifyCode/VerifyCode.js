import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../actions/auth';
import {
  AppButton,
  AppNavigation,
  AppText,
  AppView,
  showError,
} from '../../common';
import Navigation from '../../common/Navigation';
import ScrollView from '../../common/ScrollView';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { Header } from '../../components';
import AppOtp from '../../components/newComponents/Otp';
import { AuthRepo } from '../../repo';
import { validateVerifyCode } from '../../validation/auth';
const authRepo = new AuthRepo();

const VerifyCode = props => {
  const {phone} = props;
  const rtl = useSelector(state => state.lang.rtl);

  const [loading, setLoading] = useState(false);
  const lang = useSelector(state => state.lang);
  const [loading_resend, setLoading_resend] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [device_token, setDevice_token] = useState('');
  const [userType, setUserType] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
    checkUser();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('deviceToken');
    setDevice_token(token);
  };

  const checkUser = async () => {
    const obj = {
      phone: phone,
    };
    const num = await authRepo.checkUser(obj);
    console.log('value', num);
    setUserType(num == 0 ? true : false);
  };
  const handleSubmit = async code => {
    let data = {
      code: code,
      phone: props.phone,
      device_token: device_token,
      lang: lang.lang,
    };
    setLoading(true);
    const res = await authRepo.verifyCode(data);
    console.log('From Verify Code screen: ', res);
    if (!res) {
      setLoading(false);
    }
    if (res.access_token) {
      setLoading(false);
      await AsyncStorage.setItem('@access_token', res.access_token)
        .then(() => {
          dispatch(authActions.setUserData(res.user));
          dispatch(authActions.setDeviceToken(res.access_token));
          if (lang.lang == 'ar') AppNavigation.navigateToHomeAr();
          else AppNavigation.navigateToHome();
        })
        .catch(err => {
          setLoading(false);
          console.log({err});
        });
      console.log('after to home');
    } else {
      setLoading(false);
    }
  };
  console.log('device_token', device_token);

  const resendCode = async () => {
    setLoading_resend(true);
    const res = await authRepo.resendCode({phone: phone});
    console.log('res resend code', res);
    if (refresh) setRefresh(false);
    else setRefresh(true);
    setLoading_resend(false);
    setIsResend(false);
  };
  const header = () => {
    return (
      <View
        style={{
          height: 50,
          width: '100%',
          alignItems: rtl ? 'flex-start' : 'flex-end', //I18nManager.isRTL && lang.lang == 'ar' ? 'flex-start' : 'flex-end',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            Navigation.pop(props.componentId);
          }}>
          <Image
            style={[
              I18nManager.isRTL ? styles.en : null,
              {
                width: 30,
                height: 30,
                marginHorizontal: 17,
              },
            ]}
            source={require('../../assets/imgs/IconLeft.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ImageBackground style={{flex:1}} source={require('../../assets/imgs/77.png')}>
    <AppView flex stretch marginHorizontal={10}>
      <Header />
      <Formik
        initialValues={{code: ''}}
        validationSchema={validateVerifyCode()}
        onSubmit={values => handleSubmit(values.code)}>
        {({
          handleChange,
          errors,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <>
            <AppView>
              <AppText style={{textAlign: 'auto'}} size={14}>
                {i18next.t('confirm-phone-number')}
              </AppText>
              <View>
                <AppText
                  size={6}
                  style={[
                    styles.text,
                    {
                      textAlign: 'auto',
                    },
                  ]}>
                  {i18next.t('click-if-message-recieved')}
                  {`\n`}
                  {loading_resend ? (
                    <ActivityIndicator size={'small'} color={colors.error} />
                  ) : (
                    <AppText
                      size={6}
                      color={colors.purple}
                      onPress={() => {
                        if (isResend) resendCode();
                        else showError(i18next.t('wait-time'));
                      }}>
                      {i18next.t('resend-meanwhile')}
                    </AppText>
                  )}
                </AppText>
                {!loading_resend ? (
                  <CountDown
                    until={60}
                    onFinish={() => setIsResend(true)}
                    onPress={() => console.log('hello')}
                    size={14}
                    timeToShow={['M', 'S']}
                    timeLabels={{m: null, s: null}}
                    showSeparator
                    digitStyle={{backgroundColor: '#FFF'}}
                    digitTxtStyle={{color: colors.error}}
                  />
                ) : null}
              </View>
            </AppView>
            <AppView height={15} marginTop={3}>
              <AppOtp
                onCodeChanged={value => {
                  setFieldValue('code', value);
                }}
                pinCount={4}
                codeInputFieldStyle={[
                  lang.lang == 'en' ? styles.en : null,
                  styles.notFocused,
                  {color: 'black'},
                ]}
                codeInputHighlightStyle={[
                  lang.lang == 'en' ? styles.en : null,
                  styles.focusedInput,
                  {color: 'black'},
                ]}
                onCodeFilled={handleChange('code')}
                code={values.code}
              />
            </AppView>
            <AppView stretch>
              <AppText
                bold
                size={6}
                marginBottom={20}
                marginTop={2}
                style={{
                  width: '100%',
                  // textAlign: 'right',
                  fontFamily: fonts.normal,
                  color: colors.error,
                }}>
                {errors.code}
              </AppText>
              <AppButton
                stretch
                processing={loading}
                title={i18next.t('confirm')}
                onPress={handleSubmit}
                marginTop={-10}
              />
            </AppView>
          </>
        )}
      </Formik>
    </AppView>
    </ImageBackground>
  );
};

VerifyCode.options = {
  topBar: {
    translucent: true,
    barStyle: {
      left: 200,
    },
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

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.DEVICE_WIDTH,
    flex: 1,
    paddingHorizontal: 20,
  },
  textContainer: {
    width: '100%',
    alignSelf: 'flex-end',
    height: '15%',
    textAlign: 'right',
    marginTop: 20,
  },
  text: {color: colors.grayText, textAlign: 'right', alignItems: 'baseline'},
  notFocused: {
    borderColor: colors.purple,
    width: Dimensions.DEVICE_WIDTH * 0.15,
    height: Dimensions.DEVICE_WIDTH * 0.15,
    borderRadius: 15,
    borderWidth: 2,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: Dimensions.DEVICE_WIDTH * 0.02,
  },
  focusedInput: {
    borderColor: colors.primary,
    width: Dimensions.DEVICE_WIDTH * 0.15,
    height: Dimensions.DEVICE_WIDTH * 0.15,
    marginHorizontal: Dimensions.DEVICE_WIDTH * 0.02,
  },
  otp: {
    height: '30%',
    marginTop: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    height: '30%',
    marginTop: 20,
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
});
