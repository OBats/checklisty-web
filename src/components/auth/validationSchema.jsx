import * as Yup from 'yup';

const minLength = 3;
const maxLength = 25;

export const SignupSchema = Yup.object().shape({
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
  password: Yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only latin alphabetical characters.')
    .min(minLength, `Password should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Password should be between ${minLength}-${maxLength} characters`)
    .required('Password is required'),
});

export const SigninSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email, please input correct data')
    .required('Email is required'),
  password: Yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only latin alphabetical characters.')
    .min(minLength, `Password should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Password should be between ${minLength}-${maxLength} characters`)
    .required('Password is required'),
});
