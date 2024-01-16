import { Formik } from 'formik';
import i18next from 'i18next';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import CountDown from 'react-native-countdown-component';
import { Navigation } from 'react-native-navigation';
import {
  AppButton,
  AppNavigation,
  AppText,
  showError,
  showSuccess
} from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import AppOtp from '../../components/newComponents/Otp';
import { AuthRepo } from '../../repo';

const authRepo = new AuthRepo();

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(4, `${i18next.t('mustBe')} 4 ${i18next.t('invalid')}`)
    .max(4, `${i18next.t('mustBe')} 4 ${i18next.t('invalid')}`)
    .required(i18next.t('validation-error-required')),
});

const VerifyPhone = props => {
  const {phone, code} = props;
  const lang = useSelector(state => state.lang);
  const [loading, setLoading] = useState(false);
  const [loading_resend, setLoading_resend] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   configDirection();
  // }, [isResend, setIsResend]);

  const handleSubmit = async code => {
    let data = {
      country_code: '966',
      code: code,
      phone: phone,
    };
    setLoading(true);
    const res = await authRepo.verifyCodeUdatePhone(data);
    console.log('data =>: ', data);
    console.log('From Verify Code screen omar:', res);
    if (res) {
      if (res.error) {
        setLoading(false);
      } else {
        setLoading(false);
        showSuccess(i18next.t('modifiedSuccessfully'));

        if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
        else AppNavigation.navigateToHome(0);
      }
    } else {
      setLoading(false);
    }
  };

  const configDirection = () => {
    if (lang.lang == 'en') {
      I18nManager.forceRTL(false);
    }
  };

  const resendCode = async () => {
    setLoading_resend(true);
    const res = await authRepo.resendCode({phone: phone});
    console.log('res resend code', res);
    setLoading_resend(false);
    setIsResend(false);
  };
  const header = () => {
    return (
      <View
        style={{
          height: 50,
          width: '100%',
          alignItems: 'flex-end', //I18nManager.isRTL ? 'flex-start' : 'flex-end',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            Navigation.pop(props.componentId);
          }}>
          <Image
            style={[
              lang.lang == 'en' ? styles.en : null,
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
    <>
      {/* <Header componentId={props.componentId} /> */}
      {header()}
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{code: ''}}
          validationSchema={validationSchema}
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
              <View style={styles.textContainer}>
                <AppText style={{textAlign: 'auto'}} size={14}>
                  {i18next.t('confirm-phone-number')}
                </AppText>
                <View>
                  <AppText
                    size={6}
                    style={[
                      styles.text,
                      {
                        textAlign: lang.lang == 'ar' ? 'right' : 'left',
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
              </View>
              <View style={[lang.lang == 'en' ? styles.en : null, styles.otp]}>
                <AppOtp
                  onCodeChanged={value => {
                    setFieldValue('code', value);
                  }}
                  pinCount={4}
                  codeInputFieldStyle={[
                    lang.lang == 'en' ? styles.en : null,
                    styles.notFocused,
                  ]}
                  codeInputHighlightStyle={[
                    lang.lang == 'en' ? styles.en : null,
                    styles.focusedInput,
                  ]}
                  onCodeFilled={handleChange('code')}
                  code={values.code}
                />
              </View>
              <AppText
                bold
                size={6}
                center
                marginTop={6}
                style={{
                  width: '100%',
                  textAlign: 'right', // alignSelf: lang.lang == 'en' ? 'flex-end' : 'flex-start',
                  fontFamily: fonts.normal,
                  color: colors.error,
                }}>
                {errors.code}
              </AppText>

              <View style={styles.btnContainer}>
                <AppButton
                  processing={loading}
                  title={i18next.t('confirm')}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

VerifyPhone.options = {
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

export default VerifyPhone;

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
    width: Dimensions.DEVICE_WIDTH * 0.2,
    height: Dimensions.DEVICE_WIDTH * 0.2,
    borderRadius: 15,
    borderWidth: 2,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: Dimensions.DEVICE_WIDTH * 0.02,
  },
  focusedInput: {
    borderColor: colors.primary,
    width: Dimensions.DEVICE_WIDTH * 0.2,
    height: Dimensions.DEVICE_WIDTH * 0.2,
    marginHorizontal: Dimensions.DEVICE_WIDTH * 0.02,
  },
  otp: {
    height: '20%',
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
