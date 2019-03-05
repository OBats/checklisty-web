import * as Yup from 'yup';

const minUsernameLength = 1;
const maxUsernameLength = 50;
const minPasswordLength = 6;
const maxPasswordLength = 128;

export const SignupSchema = Yup.object().shape({
  username: Yup
    .string()
    .matches(/^\w*$/, 'Username must contains only Latin alphabetical characters, integers, and uderscores')
    .min(minUsernameLength, `Username should be between ${minUsernameLength}-${maxUsernameLength} characters`)
    .max(maxUsernameLength, `Username should be between ${minUsernameLength}-${maxUsernameLength} characters`)
    .required('Username is required'),
  email: Yup
    .string()
    .email('Invalid email, type your e-mail address in "someone@example.com" format.')
    .required('Email is required'),
  password: Yup
    .string()
    .matches(/^[\w[\]!#$%&'*+\-/=?^`{|}~|\s]*$/, 'Password must contain only Latin alphabetical letters, integers, and characters')
    .min(minPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .max(maxPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .required('Password is required'),
});

export const SigninSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email, type your e-mail address in "someone@example.com" format.')
    .required('Email is required'),
  password: Yup
    .string()
    .matches(/^[\w[\]!#$%&'*+\-/=?^`{|}~|\s]*$/, 'Password must contain only Latin alphabetical letters, integers, and characters')
    .min(minPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .max(maxPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .required('Password is required'),
});
