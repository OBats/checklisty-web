import * as Yup from 'yup';

const minLength = 3;
const maxLength = 25;

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email, please input correct data')
    .required('Email is required'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only latin alphabetical characters.')
    .min(minLength, `Password should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Password should be between ${minLength}-${maxLength} characters`)
    .required('Password is required'),
  confirmPassword: Yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only latin alphabetical characters.')
    .min(minLength, `Password should be between ${minLength}-${maxLength} characters`)
    .max(maxLength, `Password should be between ${minLength}-${maxLength} characters`)
    .required('Confirming password is required'),
});
