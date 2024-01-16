import { Formik } from 'formik';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { AppButton, AppNavigation, AppText, AppView } from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { ScrollableContainer } from '../../components';
import { SideMenuRepo } from '../../repo';
import { validateContactUs } from '../../validation/auth';
const sideMenuRepo = new SideMenuRepo();
const ContactUs = props => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  const lang = useSelector(state => state.lang);
  console.log('userData contact: ', userData);

  useEffect(() => {}, [loading]);

  const handleSubmit = async values => {
    setLoading(true);
    console.log('values', values);
    const data = await sideMenuRepo.createReport2(values);
    // setLoading(false);
    if (data) {
      clearTimeout(timeout);
      let timeout = setTimeout(() => {
        // setLoading(false);
        if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
        else AppNavigation.navigateToHome(0);
      }, 500);
    } else setLoading(false);
  };
  return (
    <ScrollableContainer
      center
      flex
      stretch
      // hideBack
      title={i18next.t('service-development')}
      backgroundColor={colors.gray}
      paddingHorizontal={5}>
      <AppView flex stretch paddingVertical={5}>
        {/* <AppText size={12} color={colors.black}>
          {i18next.t('service-development')}
        </AppText> */}
        <AppText size={7} color={colors.black}>
          {i18next.t('leave-message-to-us')}
        </AppText>
        <Image
          source={require('../../assets/imgs/contact.png')}
          style={{
            width: Dimensions.DEVICE_WIDTH * 0.6,
            height: Dimensions.DEVICE_HEIGHT * 0.35,
            alignSelf: 'center',
          }}
        />
        <Formik
          initialValues={{
            message: '',
            // name: userData?.userData?.first_name,
            // phone: userData?.userData?.phone,
            // email: userData?.userData?.email,
          }}
          validationSchema={validateContactUs}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <>
              <TextInput
                placeholder={i18next.t('message')}
                placeholderTextColor={colors.black}
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                multiline
                style={{
                  width: Dimensions.DEVICE_WIDTH * 0.9,
                  height: Dimensions.DEVICE_HEIGHT * 0.27,
                  textAlignVertical: 'top',
                  elevation: 3,
                  backgroundColor: colors.white,
                  shadowOpacity: 0.2,
                  borderRadius: 8,
                  fontFamily: fonts.normal,
                  textAlign: lang.lang == 'ar' ? 'right' : 'left',
                  paddingHorizontal: 5,
                }}
              />
              <AppText
                bold
                size={6}
                marginTop={5}
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

export default ContactUs;

const styles = StyleSheet.create({
  constainer: {
    height: 400,
  },
});
