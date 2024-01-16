import React, { useState } from 'react';
import {
  AppInput,
  AppView,
  AppButton,
  AppIcon,
} from '../../common';
import I18n from 'i18next';
import { MOBILE_LENGTH } from '../../common/utils/Constants';
import colors from '../../common/defaults/colors';
import TermsAndConditionsBt from './TermsAndConditionsBt';

const Form = ({ injectFormProps, isSubmitting, setFieldValue, handleSubmit }) => {
  const [istermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <AppView centerX stretch marginTop={5}>
      <AppInput
        marginVertical={3}
        {...injectFormProps('name')}
        placeholder={I18n.t('name')}
        leftItems={
          <AppView width={10} stretch center backgroundColor={colors.primary}
            margin={3} borderRadius={5}
          >
            <AppIcon stretch borderRadius={5} size={8} name="person-outline" />
          </AppView>
        }
      />

      <AppInput
        marginVertical={3}
        {...injectFormProps('email')}
        placeholder={I18n.t('email')}
        email
        multiline={true}
        leftItems={
          <AppView width={10} stretch center backgroundColor={colors.primary1}
            margin={3} borderRadius={5}
          >
            <AppIcon stretch borderRadius={5} size={9} name="email-outline" type='MaterialCommunityIcons' />
          </AppView>
        }
      />

      <AppInput
        marginVertical={3}
        {...injectFormProps('new_password')}
        placeholder={I18n.t('password')}
        secure
        showSecureEye
        leftItems={
          <AppView width={10} stretch center backgroundColor={colors.secondary}
            margin={3} borderRadius={5}
          >
            <AppIcon stretch borderRadius={5} size={8} name="lock" type='SimpleLineIcons' />
          </AppView>
        }
      />
      <AppInput
        marginVertical={3}
        {...injectFormProps('new_password_confirmation')}
        placeholder={I18n.t('repeatPassword')}
        secure
        showSecureEye
        leftItems={
          <AppView width={10} stretch center backgroundColor={colors.secondary1}
            margin={3} borderRadius={5}
          >
            <AppIcon stretch borderRadius={5} size={8} name="lock" type='SimpleLineIcons' />
          </AppView>
        }
      />

      <TermsAndConditionsBt
        {...{ setFieldValue }}
        onAccept={(v) => {
          setIsTermsAccepted(v);
          setFieldValue('terms', v ? 1 : 0);
        }}
      />

      <AppButton
        marginVertical={10}
        onPress={handleSubmit}
        stretch
        linearGradient
        disabled={isSubmitting || !istermsAccepted}
        processing={isSubmitting}
        title={I18n.t('Continue')}
      />

    </AppView>
  );
};

export default Form;
