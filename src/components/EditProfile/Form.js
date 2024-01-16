import React from 'react';
import {
  AppInput,
  AppView,
  AppButton,
  ImagePicker,
  AppIcon,
} from '../../common';
import I18n from 'i18next';
import { MOBILE_LENGTH } from '../../common/utils/Constants';
import { useSelector } from 'react-redux';
import colors from '../../common/defaults/colors';


const Form = ({ injectFormProps, isSubmitting, handleSubmit }) => {
  const user = useSelector((state) => state.auth.userData?.user);
  console.log("user -------------- +++", user)
  return (
    <AppView centerX stretch >
      <AppView stretch marginVertical={15}>
        <ImagePicker
          equalSize={35}
          {...injectFormProps('image')}
          // size={20}
          borderWidth={1}
          borderColor={colors.graytext}
          resizeMode='contain'
          initialValue={user?.image}
          buttonToChangeImage
        />
      </AppView>
      <AppInput
        marginVertical={3}
        {...injectFormProps('name')}
        placeholder={I18n.t('name')}
      />

      <AppInput
        marginVertical={3}
        {...injectFormProps('email')}
        placeholder={I18n.t('email')}
        email
        multiline={true}
      />

      <AppInput
        phone
        marginTop={10}
        marginVertical={3}
        {...injectFormProps('phone')}
        maxLength={MOBILE_LENGTH}
        placeholder={I18n.t('phone')}
      />
      <AppInput
        marginVertical={3}
        {...injectFormProps('id_number')}
        placeholder={I18n.t('idNumber')}
        phone
      />

      <AppButton
        disabled={isSubmitting}
        processing={isSubmitting}
        onPress={handleSubmit}
        stretch
        marginVertical={10}
        linearGradient
        title={I18n.t('save')}
      />

    </AppView >
  );
};

export default Form;
