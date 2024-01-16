import * as yup from 'yup';
import I18n from 'i18next';
const regexAcceptNumbersOnly = /^[0-9]*$/;
const regexAcceptOneSpace = /\S/
// /^\s?\S+(?: \S+)*\s?$/;

export const validateContactUs = (values) =>
  yup.object().shape({
    name: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
      .max(20, `${I18n.t('mustBeAtmost')} 20 ${I18n.t('char')}`),

    mobile: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('phone', I18n.t('validation-phone-error-unvalid'), () =>
        Number.isInteger(+values.mobile)
        && ((values.mobile).startsWith("05"))
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),

    email: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .email(I18n.t('invalid'))
      .min(10, `${I18n.t('mustBeAtleast')} 10 ${I18n.t('char')}`)
      .max(75, `${I18n.t('mustBeAtmost')} 75 ${I18n.t('char')}`),

    message: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('noSpaces')}`)
      .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
      .max(250, `${I18n.t('mustBe')} 250 ${I18n.t('numbers')}`),
  });
