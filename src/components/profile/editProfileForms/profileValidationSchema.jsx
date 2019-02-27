import * as Yup from 'yup';

const minLength = 6;
const maxLength = 25;

export const NameEmailSchema = Yup.object().shape({
  username: Yup
    .string()
    .matches(/^[a-zA-Z0-9_]*$/, 'Username must contains only latin alphabetical characters, underscore.')
    .min(minLength, `Username should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Username should be between ${minLength}-${maxLength} characters`)
    .required('Username is required'),
  email: Yup
    .string()
    .email('Invalid email, type your e-mail address in "someone@example.com" format.')
    .required('Email is required'),
});

export const PasswordResetSchema = Yup.object().shape({
  oldPassword: Yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only latin alphabetical characters.')
    .min(minLength, `Password should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Password should be between ${minLength}-${maxLength} characters`)
    .required('Old password is required'),
  newPassword: Yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only latin alphabetical characters.')
    .min(minLength, `Password should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Password should be between ${minLength}-${maxLength} characters`)
    .required('New password is required'),
  repeatNewPassword: Yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only latin alphabetical characters.')
    .min(minLength, `Password should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Password should be between ${minLength}-${maxLength} characters`)
    .required('New password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match!'),
});
