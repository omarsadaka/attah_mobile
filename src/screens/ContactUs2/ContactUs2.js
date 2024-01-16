import { Formik } from 'formik';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { AppButton, AppNavigation, AppText, AppView } from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { ScrollableContainer } from '../../components';
import AppInput from '../../components/newComponents/input';
import { SideMenuRepo } from '../../repo';
import { validateStoreContactUs } from '../../validation/auth';

const sideMenuRepo = new SideMenuRepo();
const ContactUs2 = props => {
  const keyboardVerticalOffset =
    Platform.OS == 'ios' ? Dimensions.DEVICE_HEIGHT * 0.28 : 0;
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  const lang = useSelector(state => state.lang);
  console.log('userData contact: ', userData);

  useEffect(() => {}, [loading]);

  const handleSubmit = values => {
    setLoading(true);
    values.phone = '5' + values.phone;
    console.log('values', values);
    const data = sideMenuRepo.createReport(values);
    // setLoading(false);
    if (data) {
      clearTimeout(timeout);
      let timeout = setTimeout(() => {
        // setLoading(false);
        if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
        else AppNavigation.navigateToHome(0);
      }, 500);
    }
  };
  return (
    <ScrollableContainer
      flex
      stretch
      backgroundColor={colors.gray}
      paddingHorizontal={5}
      title={i18next.t('contact-us')}
      >
      <AppView stretch paddingVertical={5}>
        {/* <AppText size={12} color={colors.black}>
          {i18next.t('contact-us')}
        </AppText> */}
        

        <Formik
          initialValues={{
            message: '',
            name: userData?.userData?.name?userData.userData.name:'',
            phone: userData?.userData?.form_phone?userData.userData.form_phone:'',
            email: userData?.userData?.email?userData.userData.email:'',
          }}
          validationSchema={validateStoreContactUs()}
          onSubmit={values => handleSubmit(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <>
              <AppView marginTop={10} stretch>
                <AppInput
                  title={i18next.t('name')}
                  placeholder={i18next.t('name')}
                  value={values.name}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  isEdit={true}
                />
              </AppView>
              <AppText bold size={6} style={styles.error}>
                {errors.name}
              </AppText>
              <AppView stretch>
                <AppInput
                  title={i18next.t('phone-number')}
                  placeholder={i18next.t('phone-number')}
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  onBlur={handleBlur('phone')}
                  keyboardType="numeric"
                  isPhone={true}
                  isUpdate={true}
                  isEdit={true}
                />
              </AppView>

              <AppText bold size={6} style={styles.error}>
                {errors.phone}
              </AppText>
              <AppView stretch>
                <AppInput
                  title={i18next.t('email')}
                  placeholder={i18next.t('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={handleBlur('email')}
                  isEdit={true}
                />
              </AppView>
              <AppText bold size={6} style={styles.error}>
                {errors.email}
              </AppText>

              <TextInput
                placeholder={i18next.t('message')}
                placeholderTextColor={colors.primary}
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                multiline
                style={{
                  width: Dimensions.DEVICE_WIDTH * 0.91,
                  height: Dimensions.DEVICE_HEIGHT * 0.27,
                  textAlignVertical: 'top',
                  elevation: 2,
                  backgroundColor: colors.white,
                  shadowOpacity: 0.1,
                  borderRadius: 8,
                  marginTop: 30,
                  borderColor: colors.black,
                  borderWidth: 1,
                  fontFamily: fonts.normal,
                  paddingHorizontal: 10,
                  textAlign: lang.lang == 'ar' ? 'right' : 'left',
                }}
              />
              <AppText
                bold
                marginTop={5}
                size={6}
                style={{
                  color: colors.error,
                  fontFamily: fonts.normal,
                }}>
                {errors.message}
              </AppText>
              <AppButton
                processing={loading}
                stretch
                marginVertical={10}
                title={i18next.t('send')}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </AppView>
    </ScrollableContainer>
  );
};

export default ContactUs2;

const styles = StyleSheet.create({
  constainer: {
    height: 400,
  },
  error: {
    color: colors.error,
    fontFamily: fonts.normal,
    marginTop: 3,
  },
});
