import * as yup from 'yup';
import I18n from 'i18next';

const regexAcceptOneSpace = /^\s?\S+(?: \S+)*\s?$/;
const regexAcceptNumbersOnly = /^[0-9]*$/;

export const validateUpdateUser = (values) =>
  yup.object().shape({
    name: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('invalid')}`)
      .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
      .max(100, `${I18n.t('mustBeAtmost')} 100 ${I18n.t('char')}`),

    email: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .email(I18n.t('invalid'))
      .min(10, `${I18n.t('mustBeAtleast')} 10 ${I18n.t('char')}`)
      .max(75, `${I18n.t('mustBeAtmost')} 75 ${I18n.t('char')}`),
    phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('phone', I18n.t('validation-phone-error-unvalid'), () =>
        Number.isInteger(+values.phone)
        && ((values.phone).startsWith("05"))
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numb')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numb')}`),
    id_number: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .min(7, `${I18n.t('mustBeAtleast')} 7 ${I18n.t('num')}`)
      .max(25, `${I18n.t('mustBeAtmost')} 25 ${I18n.t('numb')}`),
  });
