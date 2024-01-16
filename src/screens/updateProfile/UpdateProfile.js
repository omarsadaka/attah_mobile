import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import i18next from 'i18next';
import { useSelector } from 'react-redux';
import colors from '../../common/defaults/colors';
import ScrollableContainer from '../../components/ScrollableContainer';
import AppInput from '../../components/newComponents/input';
// import AppButton from '../../components/newComponents/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { BASE_URL } from '../../api/utils/urls';
import {
  AppButton,
  AppNavigation,
  AppText,
  AppView,
  ImagePicker,
  showError,
  showSuccess,
} from '../../common';
import Navigation from '../../common/Navigation';
import Dimensions from '../../common/defaults/Dimensions';
import fonts from '../../common/defaults/fonts';
import { AuthRepo } from '../../repo';
import { validateUpdateProfile } from '../../validation/auth';
const authRepo = new AuthRepo();

const UpdateProfile = props => {
  const userData = useSelector(state => state.auth);
  const lang = useSelector(state => state.lang);

  console.log('from update profile: ', userData);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [image, setImage] = useState('');
  const [isImageUpdate, setIsImageUpdate] = useState(false);
  const keyboardVerticalOffset =
    Platform.OS == 'ios' ? Dimensions.DEVICE_HEIGHT * 0.28 : 0;
  useEffect(() => {
    setImage(userData?.userData?.avatar);
    getToken();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@access_token');
    setAccessToken(token);
  };
  const handleSubmit = values => {
    // call the backend
    console.log('values', values);
    setLoading(true);
    const res = new authRepo.updateUser(values);
    console.log('updated data', res);
    if (res) {
      clearTimeout(timeout);
      let timeout = setTimeout(() => {
        setLoading(false);
        if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
        else AppNavigation.navigateToHome(0);
      }, 1000);
    }
    setLoading(false);
  };

  const update = data => {
    console.log('data', data);
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('phone', '5' + data.phone);
    formData.append('email', data.email);
    if (isImageUpdate) {
      formData.append('avatar', {
        uri: data.avatar,
        name: 'image/jpeg' + new Date().getTime(),
        type: 'image/jpeg',
      });
    }
    setLoading(true);
    fetch(`${BASE_URL}profile`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + accessToken,
        'Accept-Language': lang.lang,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(json => {
        console.log('json1', json);
        if (json.id) {
          showSuccess(i18next.t('modifiedSuccessfully'));
          clearTimeout(timeout);
          let timeout = setTimeout(() => {
            setLoading(false);
            if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
            else AppNavigation.navigateToHome(0);
          }, 1000);
        } else if (json.verification_code) {
          showSuccess(json.message);
          clearTimeout(timeout);
          let timeout = setTimeout(() => {
            setLoading(false);
            Navigation.push({
              name: 'VerifyPhone',
              passProps: {
                phone: json.new_phone,
                code: json.verification_code,
              },
            });
          }, 1000);
        } else if (json.error) {
          setLoading(false);
          showError(json.error);
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('error', error);
        showError(error.toString());
      });
  };

  return (
    <ScrollableContainer
      flex
      width={90}
      stretch
      title={i18next.t('profile')}
      center
      marginHorizontal={10}
      >
      <AppView height={5} />
      <Formik
        initialValues={{
          avatar: userData.userData
            ? userData.userData.avatar != null
              ? userData.userData.avatar
              : ''
            : '',
          first_name: userData.userData
            ? userData.userData.first_name != null
              ? userData.userData.first_name
              : ''
            : '',
          last_name: userData.userData
            ? userData.userData.last_name != null
              ? userData.userData.last_name
              : ''
            : '',
          phone: userData.userData ? userData.userData.form_phone : '',
          email: userData.userData
            ? userData.userData.email != null
              ? userData.userData.email
              : ''
            : '',
        }}
        validationSchema={validateUpdateProfile}
        onSubmit={values => update(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
        }) => (
          <AppView flex stretch>
            {userData.userData && (
              <AppView
                style={{
                  alignSelf:'center',
                }}>
                <ImagePicker
                  equalSize={25}
                  size={20}
                  borderWidth={1}
                  borderColor={colors.darkText}
                  initialValue={image}
                  onChange={res => {
                    console.log('res', res);
                    setImage(res.uri);
                    setFieldValue('avatar', res.uri);
                    setIsImageUpdate(true);
                  }}
                />
              </AppView>
            )}
            <AppView marginTop={10} stretch>
              <AppInput
                title={i18next.t('first-name')}
                value={values.first_name}
                onBlur={handleBlur('first_name')}
                onChangeText={handleChange('first_name')}
                isEdit={true}
              />
            </AppView>
            <AppText bold size={6} center style={styles.error}>
              {errors.first_name}
            </AppText>
            <AppView stretch>
              <AppInput
                title={i18next.t('last-name')}
                value={values.last_name}
                onBlur={handleBlur('last_name')}
                onChangeText={handleChange('last_name')}
                isEdit={true}
              />
            </AppView>
            <AppText bold size={6} center style={styles.error}>
              {errors.last_name}
            </AppText>
            <AppView stretch>
              <AppInput
                title={i18next.t('phone-number')}
                onChangeText={handleChange('phone')}
                value={values.phone}
                onBlur={handleBlur('phone')}
                keyboardType="numeric"
                isPhone={true}
                // isUpdate={false}
                isEdit={true}
              />
            </AppView>
            <AppText bold size={6} center style={styles.error}>
              {errors.phone}
            </AppText>
            <AppView stretch>
              <AppInput
                title={i18next.t('email')}
                onChangeText={handleChange('email')}
                value={values.email}
                onBlur={handleBlur('email')}
                isEdit={true}
              />
            </AppView>
            <AppText bold size={6} center style={styles.error}>
              {errors.email}
            </AppText>
            <AppButton
              processing={loading}
              stretch
              marginVertical={10}
              title={i18next.t('save')}
              onPress={handleSubmit}
            />
          </AppView>
        )}
      </Formik>
    </ScrollableContainer>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  contianer: {
    borderColor: 'red',
    borderWidth: 1,
  },

  marginTop: {
    marginTop: 19,
  },
  button: {
    marginTop: 140,
  },
  error: {
    alignSelf: 'flex-end',
    color: colors.error,
    fontFamily: fonts.normal,
    marginTop: 3,
  },
  text: {
    width: '100%',
    textAlign: 'right',
  },
});
