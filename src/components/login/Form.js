import React from 'react';
import {
  AppText,
  AppInput,
  AppView,
  AppButton,
  AppNavigation,
  AppIcon,
} from '../../common';
import I18n from 'i18next';
import {MOBILE_LENGTH} from '../../common/utils/Constants';
import colors from '../../common/defaults/colors';
import store from '../../store/store';

const Form = ({injectFormProps, isSubmitting, handleSubmit}) => {
  return (
    <AppView centerX stretch marginTop={20}>
      <AppInput
        phone
        marginTop={10}
        marginVertical={3}
        {...injectFormProps('phone')}
        maxLength={MOBILE_LENGTH}
        placeholder={I18n.t('phone')}
        leftItems={
          <AppView
            width={10}
            stretch
            center
            backgroundColor={colors.secondary}
            margin={3}
            borderRadius={5}>
            <AppIcon
              borderRadius={5}
              size={8}
              padding={3}
              name="phone"
              type="Feather"
              flip
            />
          </AppView>
        }
      />

      <AppInput
        marginVertical={3}
        {...injectFormProps('password')}
        placeholder={I18n.t('password')}
        secure
        showSecureEye
        leftItems={
          <AppView
            width={10}
            stretch
            center
            backgroundColor={colors.secondary1}
            margin={3}
            borderRadius={5}>
            <AppIcon
              stretch
              borderRadius={5}
              size={8}
              name="lock"
              type="SimpleLineIcons"
            />
          </AppView>
        }
      />

      <AppButton
        disabled={isSubmitting}
        onPress={handleSubmit}
        stretch
        processing={isSubmitting}
        marginVertical={10}
        linearGradient
        title={I18n.t('enter')}
      />
      <AppText
        center
        marginVertical={5}
        onPress={() => AppNavigation.push('ForgotPassword')}>
        {I18n.t('forgetPassword')}
      </AppText>

      <AppText center>
        {I18n.t('noAccount')}
        <AppText
          color={colors.secondary}
          onPress={() => AppNavigation.push('register')}>
          {' '}
          {I18n.t('createNow')}
        </AppText>
      </AppText>
    </AppView>
  );
};

export default Form;
