import * as yup from 'yup';
import I18n from 'i18next';

const regexAcceptOneSpace = /^\s?\S+(?: \S+)*\s?$/;
const nameRegexnumbers = /^(\d|\w)+$/;
const regexAcceptNumbersOnly = /^[0-9]*$/;

export const validateAddAddress = (values) => {
  return yup.object().shape({
    name: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('invalid')}`)
      .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
      .max(100, `${I18n.t('mustBeAtmost')} 100 ${I18n.t('char')}`)
    ,

    phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('phone', I18n.t('validation-phone-error-unvalid'), () =>
        Number.isInteger(+values.phone)
        && ((values.phone).startsWith("05"))
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),

    country_id: yup
      .string()
      .required(I18n.t('validation-error-required'))
    ,
    state_id: yup
      .string()
      .required(I18n.t('validation-error-required'))
    ,
    city_id: yup
      .string()
      .required(I18n.t('validation-error-required')),

    street: values.street ? yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('invalid')}`)
      .min(1, `${I18n.t('mustBeAtleast')} 1 ${I18n.t('char')}`)
      .max(150, `${I18n.t('mustBeAtmost')} 150 ${I18n.t('char')}`)
      : null,
    building_no: values.building_no ? yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('invalid')}`)
      .min(1, `${I18n.t('mustBeAtleast')} 1 ${I18n.t('char')}`)
      .max(150, `${I18n.t('mustBeAtmost')} 150 ${I18n.t('char')}`)
      : null,
    mark: values.mark ? yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('invalid')}`)
      .min(1, `${I18n.t('mustBeAtleast')} 1 ${I18n.t('char')}`)
      .max(150, `${I18n.t('mustBeAtmost')} 150 ${I18n.t('char')}`)
      : null,
    floor: values.floor ? yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('invalid')}`)
      .min(1, `${I18n.t('mustBeAtleast')} 1 ${I18n.t('char')}`)
      .max(150, `${I18n.t('mustBeAtmost')} 150 ${I18n.t('char')}`)
      : null,
    lat: values.enablePositioning ?
      yup
        .string()
        .required(I18n.t('validation-error-required'))
      : null,
    // lng: values.enablePositioning ?
    //   yup
    //     .string()
    //     .required(I18n.t('validation-error-required'))
    //   : null,

    // zip_code: values.country_id === 27 ? null : yup
    //   .string()
    //   .required(I18n.t('validation-error-required'))
    //   .matches(nameRegexnumbers, `${I18n.t('positiveNumber')}`)
    //   .min(1, `${I18n.t('mustBeAtleast')} 1 ${I18n.t('char')}`)
    //   .max(150, `${I18n.t('mustBeAtmost')} 150 ${I18n.t('char')}`),

  })
};
