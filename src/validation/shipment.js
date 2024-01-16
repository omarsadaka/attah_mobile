import * as yup from 'yup';
import I18n from 'i18next';

const nameRegex = /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF0-9\s]*$|^[A-Za-z0-9\s]+$/;
// link exp
const linkRegex = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const regexAcceptNumbersOnly = /^[0-9]*$/;
// only number or decimal
// const regexAcceptNumbersAndDecimal = /^[1-9]\d*(\.\d+)?$/;

const regexAcceptNumbersAndDecimal = /^(|0|[1-9]\d{0,4})(\.\d{1,2})?$/;

// it mustn't accept ( **special characters / negative numbers / dash / spaces / letters / zero**)

export const senderDatavalidationSchema = values =>
  yup.object().shape({
    sender_name: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
      .max(100, `${I18n.t('mustBeAtmost')} 100 ${I18n.t('char')}`),

    sender_phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test(
        'phone',
        I18n.t('validation-phone-error-unvalid'),
        () =>
          Number.isInteger(+values.sender_phone) &&
          values.sender_phone.startsWith('05'),
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),

    sender_id_number: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .min(7, `${I18n.t('mustBeAtleast')} 7 ${I18n.t('numbers')}`)
      .max(25, `${I18n.t('mustBeAtmost')} 25 ${I18n.t('numbers')}`),

    // country_id: yup
    //   .string()
    //   .required(I18n.t('validation-error-required'))
    // ,
    // state_id: yup
    //   .string()
    //   .required(I18n.t('validation-error-required'))
    // ,
    // sender_city_id: yup
    //   .string()
    //   .required(I18n.t('validation-error-required')),

    sender_address_id: yup
      .string()
      .required(I18n.t('validation-error-required')),

    sender_address_url: values.sender_address_url
      ? yup
          .string()
          .required(I18n.t('validation-error-required'))
          .matches(linkRegex, `${I18n.t('addressLink')} ${I18n.t('invalid')}`)
          .max(300, `${I18n.t('mustBeAtmost')} 300 ${I18n.t('char')}`)
      : // .url(`${I18n.t('addressLink')} ${I18n.t('invalid')}`)
        null,
  });

export const receiverDatavalidationSchema = values =>
  yup.object().shape({
    receiver_name: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
      .max(100, `${I18n.t('mustBeAtmost')} 100 ${I18n.t('char')}`),

    receiver_phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test(
        'phone',
        I18n.t('validation-phone-error-unvalid'),
        () =>
          Number.isInteger(+values.receiver_phone) &&
          values.receiver_phone.startsWith('05'),
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),

    country_id: yup.string().required(I18n.t('validation-error-required')),
    state_id: yup.string().required(I18n.t('validation-error-required')),
    city_id: yup.string().required(I18n.t('validation-error-required')),

    receiver_address: yup
      .string()
      .required(I18n.t('validation-error-required')),

    receiver_address_url: values.receiver_address_url
      ? yup
          .string()
          .required(I18n.t('validation-error-required'))
          .matches(linkRegex, `${I18n.t('addressLink')} ${I18n.t('invalid')}`)
          .max(300, `${I18n.t('mustBeAtmost')} 300 ${I18n.t('char')}`)
      : // .url(`${I18n.t('addressLink')} ${I18n.t('invalid')}`)
        null,
    zip_code: values.country_id
      ? values.country_id === 27
        ? null
        : yup
            .string()
            .required(I18n.t('validation-error-required'))
            .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
            .min(1, `${I18n.t('mustBeAtleast')} 1 ${I18n.t('char')}`)
            .max(150, `${I18n.t('mustBeAtmost')} 150 ${I18n.t('char')}`)
      : null,
  });

export const shipmentDatavalidationSchema = values =>
  yup.object().shape({
    content_type_id: yup.string().required(I18n.t('validation-error-required')),
    new_content_type: values.newShipmentContent
      ? yup
          .string()
          .required(I18n.t('validation-error-required'))
          .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
          .max(20, `${I18n.t('mustBeAtmost')} 20 ${I18n.t('char')}`)
      : null,

    height: values.documentOnly
      ? null
      : yup
          .string()
          .required(I18n.t('validation-error-required'))
          .matches(regexAcceptNumbersAndDecimal, `${I18n.t('moreThan')}`)
          .test('height', `${I18n.t('greater')} 0`, () => {
            return values.height > 0;
          })
          .max(8, `${I18n.t('mustBeAtmost')} 8 ${I18n.t('num')}`),
    width: values.documentOnly
      ? null
      : yup
          .string()
          .required(I18n.t('validation-error-required'))
          .matches(regexAcceptNumbersAndDecimal, `${I18n.t('moreThan')}`)
          .test('width', `${I18n.t('greater')} 0`, () => {
            return values.width > 0;
          })
          .max(8, `${I18n.t('mustBeAtmost')} 8 ${I18n.t('num')}`),
    length: values.documentOnly
      ? null
      : yup
          .string()
          .required(I18n.t('validation-error-required'))
          .matches(regexAcceptNumbersAndDecimal, `${I18n.t('moreThan')}`)
          .test('length', `${I18n.t('greater')} 0`, () => {
            return values.length > 0;
          })
          .max(8, `${I18n.t('mustBeAtmost')} 8 ${I18n.t('num')}`),
    weight: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersAndDecimal, `${I18n.t('moreThan')}`)
      .test('weight', `${I18n.t('greater')} 0`, () => {
        return values.weight > 0;
      })
      .max(8, `${I18n.t('mustBeAtmost')} 8 ${I18n.t('num')}`),
    content_price: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('content_price', `${I18n.t('greaterOrEqual')} 1`, () => {
        return values.content_price >= 1;
      })
      .max(7, `${I18n.t('mustBeAtmost')} 7 ${I18n.t('num')}`),
  });

export const paymentMethodvalidationSchema = values =>
  yup.object().shape({
    payment_method: yup.string().required(I18n.t('validation-error-required')),
  });
