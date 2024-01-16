import React, { useCallback, useState, useEffect } from 'react';
import I18n from 'i18next';
import {
  AppView,
  AppForm,
  AppButton,
  AppInput,
  AppNavigation,
  AppIcon,
  AppText,
  showError
} from '../../common';
import { validateForgetPassword } from '../../validation/auth';
import { AuthRepo } from "../../repo";
import colors from '../../common/defaults/colors';
import { MOBILE_LENGTH } from '../../common/utils/Constants';
import moment from 'moment';
import useCountDownTimeToBlockResend from '../../screens/verifyCode/useCountDownTimeToBlockResend';

const authRepo = new AuthRepo()
const ForgetPasswordForm = () => {
  const [blockResendAgain, setBlockResendAgain] = useState(null)

  const [disabled, setDisabled] = useState(false);
  const [resendAgain, setResendAgain] = useState(false);
  const blockTime = useCountDownTimeToBlockResend(resendAgain, blockResendAgain);

  const getTime = useCallback(async () => {
    const time = await authRepo.getTimeToActiveResendCode();
    console.log("ttttttttttttttttttttttt time  ", time)
    const timeNow = new moment();
    console.log("timeNow ", timeNow)
    if (time) {
      const diff = timeNow.diff(moment(time.time)) / 1000;
      var duration = moment.duration(timeNow.diff(moment(time.time)),'milliseconds')
      var duration = moment.duration(diff, 'milliseconds');
       console.log("diff ", duration);
      // setResendAgain(!resendAgain)
      // setBlockResendAgain(duration)
    }
  }, [])
  useEffect(() => {
    getTime();
  }, [])


  const renderContent = useCallback(({ injectFormProps, isSubmitting, handleSubmit }) => {
    return (
      <AppView stretch marginTop={20} flex>
        <AppInput
          phone
          {...injectFormProps('phone')}
          maxLength={MOBILE_LENGTH}
          placeholder={I18n.t('phone')}
          leftItems={
            <AppView width={10} stretch center backgroundColor={colors.secondary}
              margin={3} borderRadius={5}
            >
              <AppIcon borderRadius={5} size={9} padding={3} name="phone" type="Feather" flip />
            </AppView>
          }
        />

        <AppText marginHorizontal={2} size={6} >
          {blockTime}
        </AppText>
        <AppButton
          onPress={handleSubmit}
          marginVertical={15}
          linearGradient
          processing={isSubmitting}
          disabled={isSubmitting}
          title={I18n.t('Continue')}
          stretch />
      </AppView>
    );
  }, [blockTime]);

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    console.log("values ", values)
    const { phone } = values;
    const res = await authRepo.forgetPassword(values);
    console.log("res success ", res)
    if (res) {
      AppNavigation.push({
        name: 'verifyCode',
        passProps: {
          phone,
          testCode: res.data.code,
          onFinish: (code, testCode) => {
            console.log('code, testCode in forget pass ', code, testCode)
            return onFinish(code, { testCode: testCode, ...values });
          },
        },
      });
    }
    setSubmitting(false);
  }, []);

  const onFinish = useCallback(
    async (code, { testCode, phone }) => {
      let promise = new Promise(async function (resolve, reject) {
        // const res = await authRepo.verifyCode({
        //   code,
        //   ...({ phone }),
        // });
        // console.log(res, 'forget password');
        // if (res) {
        console.log("code in onFinish ", code, "test code ", testCode)
        if (code === testCode) {
          AppNavigation.push({
            name: 'ResetPassword',
            passProps: { ...{ phone }, ...{ code } },
          });
          resolve(true);
        } else {
          showError(I18n.t('incorrectCode'))
          reject(new Error('Whoops!'));
        }
      });
      return promise;
    },
    [],
  );

  return (
    <AppForm
      validationSchema={validateForgetPassword}
      schema={{
        phone: ''
      }}
      render={renderContent}
      {...{ onSubmit }}
    />
  );
};

export default ForgetPasswordForm;
