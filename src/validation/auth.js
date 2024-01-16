import i18next from 'i18next';
import * as yup from 'yup';
const regexAcceptOneSpace = /^\s?\S+(?: \S+)*\s?$/;
const regexNoSpaces = /^\S*$/;
const regexAcceptOneNumber = /^(?=.*\d)/;
const regexAcceptNumbersOnly = /^[0-9]*$/;
const resgexAcceptOneSpecialCharacter = /[^A-Za-z0-9]/; // /^(?=.*[@#$%^&+=]).*$/
const resgexAcceptOneUpperCase = /^(?=.*[A-Z])/;
const resgexAcceptOneLowerCase = /^(?=.*[a-z])/;

export const validateSignIn = values =>
  yup.object().shape({
    phone: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)
      // .test(
      //   'phone',
      //   i18next.t('must-start-with5'),
      //   () => Number.isInteger(+values.phone) && values.phone.startsWith('5'),
      // )
      .min(8, `${i18next.t('mustBe')} 8 ${i18next.t('numbers')}`)
      .max(8, `${i18next.t('mustBe')} 8 ${i18next.t('numbers')}`),

    checked: yup.boolean().oneOf([true], i18next.t('conditions-required')),
  });

export const validateVerifyCode = values =>
  yup.object().shape({
    code: yup
      .string()
      .min(4, `${i18next.t('mustBe')} 4 ${i18next.t('num')}`)
      .max(4, `${i18next.t('mustBe')} 4 ${i18next.t('num')}`)
      .required(i18next.t('validation-error-required')),
  });

export const validateUpdateProfile = () =>
  yup.object().shape({
    first_name: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(100, `${i18next.t('mustBeAtmost')} 100 ${i18next.t('char')}`),
    last_name: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(100, `${i18next.t('mustBeAtmost')} 100 ${i18next.t('char')}`),
    phone: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)

      .min(8, `${i18next.t('mustBe')} 8 ${i18next.t('numbers')}`)
      .max(8, `${i18next.t('mustBe')} 8 ${i18next.t('numbers')}`),

    email: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .email(i18next.t('invalid')),
  });

export const validateForgetPassword = values =>
  yup.object().shape({
    phone: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)
      .test(
        'phone',
        i18next.t('validation-phone-error-unvalid'),
        () => Number.isInteger(+values.phone) && values.phone.startsWith('05'),
      )
      .min(10, `${i18next.t('mustBe')} 9 ${i18next.t('numbers')}`)
      .max(10, `${i18next.t('mustBe')} 9 ${i18next.t('numbers')}`),
  });

export const validateForgotPassword = values =>
  yup.object().shape({
    phone: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)
      .test(
        'phone',
        i18next.t('validation-phone-error-unvalid'),
        () => Number.isInteger(+values.phone) && values.phone.startsWith('05'),
      )
      .min(10, `${i18next.t('mustBe')} 9 ${i18next.t('numbers')}`)
      .max(10, `${i18next.t('mustBe')} 9 ${i18next.t('numbers')}`),
  });

export const validatePhone = values =>
  yup.object().shape({
    phone: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)
      .test(
        'phone',
        i18next.t('validation-phone-error-unvalid'),
        () => Number.isInteger(+values.phone) && values.phone.startsWith('05'),
      )
      .min(9, `${i18next.t('mustBe')} 9 ${i18next.t('numbers')}`)
      .max(9, `${i18next.t('mustBe')} 9 ${i18next.t('numbers')}`),
  });

export const validateContactUs = () =>
  yup.object().shape({
    message: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(300, `${i18next.t('mustBeAtmost')} 100 ${i18next.t('char')}`),
  });

export const validateStoreContactUs = () =>
  yup.object().shape({
    name: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(100, `${i18next.t('mustBeAtmost')} 100 ${i18next.t('char')}`),
    phone: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)
      .min(8, `${i18next.t('mustBe')} 8 ${i18next.t('numbers')}`)
      .max(8, `${i18next.t('mustBe')} 8 ${i18next.t('numbers')}`),
    email: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .email(i18next.t('invalid')),
    message: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(300, `${i18next.t('mustBeAtmost')} 300 ${i18next.t('char')}`),
  });

export const validateAddAddress = () =>
  yup.object().shape({
    name: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(300, `${i18next.t('mustBeAtmost')} 200 ${i18next.t('char')}`),
    title: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(300, `${i18next.t('mustBeAtmost')} 100 ${i18next.t('char')}`),
    location: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(300, `${i18next.t('mustBeAtmost')} 100 ${i18next.t('char')}`),
    // region_id: yup.string().required(i18next.t('validation-error-required')),
    // city_id: yup.string().required(i18next.t('validation-error-required')),
    // latitude: yup.string().required(i18next.t('validation-error-required')),
    // nearest_landmarks: yup
    //   .string()
    //   .required(i18next.t('validation-error-required'))
    //   .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
    //   .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
    //   .max(300, `${i18next.t('mustBeAtmost')} 300 ${i18next.t('char')}`),
    description: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(300, `${i18next.t('mustBeAtmost')} 300 ${i18next.t('char')}`),
  });

export const validateAddCart = () =>
  yup.object().shape({
    holder_name: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
      .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
      .max(200, `${i18next.t('mustBeAtmost')} 200 ${i18next.t('char')}`),
    number: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)
      .min(16, `${i18next.t('mustBeAtleast')} 16 ${i18next.t('char')}`)
      .max(16, `${i18next.t('mustBeAtmost')} 16 ${i18next.t('char')}`),
    brand_id: yup.string().required(i18next.t('validation-error-required')),
    en: yup.object().required(i18next.t('validation-error-required')),
    ar: yup.object().required(i18next.t('validation-error-required')),
    brand_logo: yup.string().required(i18next.t('validation-error-required')),
    expiry_month: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .min(2, `${i18next.t('mustBeAtleast')} 2 ${i18next.t('char')}`)
      .max(2, `${i18next.t('mustBeAtmost')} 2 ${i18next.t('char')}`),
    expiry_year: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .min(2, `${i18next.t('mustBeAtleast')} 2 ${i18next.t('char')}`)
      .max(2, `${i18next.t('mustBeAtmost')} 2 ${i18next.t('char')}`),
  });

export const validateCvv = () =>
  yup.object().shape({
    cvv: yup
      .string()
      .required(i18next.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${i18next.t('integerNumbers')}`)
      .min(3, `${i18next.t('mustBe')} 3 ${i18next.t('numbers')}`)
      .max(3, `${i18next.t('mustBe')} 3 ${i18next.t('numbers')}`),
  });
// export const validateEmail = (values) =>
//   yup.object().shape({
//     email: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .email(`${i18next.t('email')} ${i18next.t('invalid')}`),
//   });

// export const validateSignUp = (values) =>
//   yup.object().shape({
//     name: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexAcceptOneSpace, `${i18next.t('invalid')}`)
//       .min(3, `${i18next.t('mustBeAtleast')} 3 ${i18next.t('char')}`)
//       .max(100, `${i18next.t('mustBeAtmost')} 100 ${i18next.t('char')}`),

//     email: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .email(i18next.t('invalid'))
//       .min(10, `${i18next.t('mustBeAtleast')} 10 ${i18next.t('char')}`)
//       .max(75, `${i18next.t('mustBeAtmost')} 75 ${i18next.t('char')}`),
//     new_password: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexNoSpaces, `${i18next.t('noSpaces')}`)
//       .matches(regexAcceptOneNumber, `${i18next.t('containNumber')}`)
//       .matches(resgexAcceptOneSpecialCharacter, `${i18next.t('specialCharacter')}`)
//       .matches(resgexAcceptOneUpperCase, `${i18next.t('capitalLetter')}`)
//       .matches(resgexAcceptOneLowerCase, `${i18next.t('lowercaseLetter')}`)
//       .min(8, `${i18next.t('mustBeAtleast')} 8 ${i18next.t('char')}`),
//     new_password_confirmation: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexNoSpaces, `${i18next.t('noSpaces')}`)
//       .matches(regexAcceptOneNumber, `${i18next.t('containNumber')}`)
//       .matches(resgexAcceptOneSpecialCharacter, `${i18next.t('specialCharacter')}`)
//       .matches(resgexAcceptOneUpperCase, `${i18next.t('capitalLetter')}`)
//       .matches(resgexAcceptOneLowerCase, `${i18next.t('lowercaseLetter')}`)
//       .oneOf([values.new_password, ''], i18next.t('confirmPasswordInvalid'))
//       .min(8, `${i18next.t('mustBeAtleast')} 8 ${i18next.t('char')}`),
//   });

// export const validateResetPassword = (values) =>
//   yup.object().shape({
//     new_password: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexNoSpaces, `${i18next.t('noSpaces')}`)
//       .matches(regexAcceptOneNumber, `${i18next.t('containNumber')}`)
//       .matches(resgexAcceptOneSpecialCharacter, `${i18next.t('specialCharacter')}`)
//       .matches(resgexAcceptOneUpperCase, `${i18next.t('capitalLetter')}`)
//       .matches(resgexAcceptOneLowerCase, `${i18next.t('lowercaseLetter')}`)
//       .min(8, `${i18next.t('mustBeAtleast')} 8 ${i18next.t('char')}`),
//     new_password_confirmation: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexNoSpaces, `${i18next.t('noSpaces')}`)
//       .matches(regexAcceptOneNumber, `${i18next.t('containNumber')}`)
//       .matches(resgexAcceptOneSpecialCharacter, `${i18next.t('specialCharacter')}`)
//       .matches(resgexAcceptOneUpperCase, `${i18next.t('capitalLetter')}`)
//       .matches(resgexAcceptOneLowerCase, `${i18next.t('lowercaseLetter')}`)
//       .oneOf([values.new_password, ''], i18next.t('confirmPasswordInvalid'))
//       .min(8, `${i18next.t('mustBeAtleast')} 8 ${i18next.t('char')}`),
//   });

// export const validateChangePassword = (values) =>
//   yup.object().shape({
//     old_password: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexNoSpaces, `${i18next.t('noSpaces')}`)
//       .matches(regexAcceptOneNumber, `${i18next.t('containNumber')}`)
//       .matches(resgexAcceptOneSpecialCharacter, `${i18next.t('specialCharacter')}`)
//       .matches(resgexAcceptOneUpperCase, `${i18next.t('capitalLetter')}`)
//       .matches(resgexAcceptOneLowerCase, `${i18next.t('lowercaseLetter')}`)
//       .min(8, `${i18next.t('mustBeAtleast')} 8 ${i18next.t('char')}`),
//     new_password: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexNoSpaces, `${i18next.t('noSpaces')}`)
//       .matches(regexAcceptOneNumber, `${i18next.t('containNumber')}`)
//       .matches(resgexAcceptOneSpecialCharacter, `${i18next.t('specialCharacter')}`)
//       .matches(resgexAcceptOneUpperCase, `${i18next.t('capitalLetter')}`)
//       .matches(resgexAcceptOneLowerCase, `${i18next.t('lowercaseLetter')}`)
//       .min(8, `${i18next.t('mustBeAtleast')} 8 ${i18next.t('char')}`),
//     new_password_confirmation: yup
//       .string()
//       .required(i18next.t('validation-error-required'))
//       .matches(regexNoSpaces, `${i18next.t('noSpaces')}`)
//       .matches(regexAcceptOneNumber, `${i18next.t('containNumber')}`)
//       .matches(resgexAcceptOneSpecialCharacter, `${i18next.t('specialCharacter')}`)
//       .matches(resgexAcceptOneUpperCase, `${i18next.t('capitalLetter')}`)
//       .matches(resgexAcceptOneLowerCase, `${i18next.t('lowercaseLetter')}`)
//       .oneOf([values.new_password, ''], i18next.t('confirmPasswordInvalid'))
//       .min(8, `${i18next.t('mustBeAtleast')} 8 ${i18next.t('char')}`),
//   });
