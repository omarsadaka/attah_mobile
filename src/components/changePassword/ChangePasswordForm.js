import React, { useCallback, useEffect, useState } from 'react';
import I18n from 'i18next';
import {
  AppView,
  AppText,
  AppForm,
  AppButton,
  AppInput,
  AppNavigation,
  AppScrollView,
  AppSpinner,
} from '../../common';
import { validateChangePassword } from '../../validation/auth';
import { AuthRepo } from "../../repo";

const authRepo = new AuthRepo()
const ChangePasswordForm = () => {

  const renderContent = useCallback(({ injectFormProps, isSubmitting, handleSubmit }) => {

    return (

      <AppView stretch >
        <AppInput
          marginVertical={3}
          {...injectFormProps('old_password')}
          placeholder={I18n.t('oldPassword')}
          secure
          showSecureEye
        />
        <AppInput
          marginVertical={3}
          {...injectFormProps('new_password')}
          placeholder={I18n.t('newPassword')}
          secure
          showSecureEye
        />
        <AppInput
          marginVertical={3}
          {...injectFormProps('new_password_confirmation')}
          placeholder={I18n.t('repeatNewPassword')}
          secure
          showSecureEye
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
      </AppView>
    );
  }, []);

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    const res = await authRepo.changePassword(values);
    if (res) {
      AppNavigation.pop();
    }
    setSubmitting(false);
  }, []);

  return (
    <AppView centerX flex stretch>
      <AppForm
        validationSchema={validateChangePassword}
        schema={{
          old_password: '',
          new_password: '',
          new_password_confirmation: '',
        }}
        render={renderContent}
        {...{ onSubmit }}
      />
    </AppView>
  );
};

export default ChangePasswordForm;
