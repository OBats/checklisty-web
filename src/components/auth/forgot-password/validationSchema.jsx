import * as Yup from 'yup';

const minPasswordLength = 6;
const maxPasswordLength = 128;

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email, type your e-mail address in "someone@example.com" format.')
    .required('Email is required'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup
    .string()
    .matches(/^[\w[\]!#$%&'*+\-/=?^`{|}~|\s]*$/, 'Password must contain only Latin alphabetical letters, integers, and characters')
    .min(minPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .max(maxPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .required('Password is required'),
  confirmPassword: Yup
    .string()
    .matches(/^[\w[\]!#$%&'*+\-/=?^`{|}~|\s]*$/, 'Password must contain only Latin alphabetical letters, integers, and characters')
    .min(minPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .max(maxPasswordLength, `Password should be between ${minPasswordLength}-${maxPasswordLength} characters`)
    .required('Confirming password is required'),
});
