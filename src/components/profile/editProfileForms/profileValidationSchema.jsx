import * as Yup from 'yup';

const minLength = 6;
const maxLength = 128;

export const NameEmailSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(
      /^[a-zA-Z ]*$/,
      'Firstname must contains only Latin alphabetical characters',
    )
    .min(1, `Firstname should be between ${1}-${maxLength} characters`)
    .max(maxLength, `Firstname should be between ${1}-${maxLength} characters`),
  lastname: Yup.string()
    .matches(
      /^[a-zA-Z ]*$/,
      'Lastname must contains only Latin alphabetical characters',
    )
    .min(1, `Lastname should be between ${1}-${maxLength} characters`)
    .max(maxLength, `Lastname should be between ${1}-${maxLength} characters`),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9_]*$/,
      'Username must contains only latin alphabetical characters, underscore.',
    )
    .min(
      minLength - 5,
      `Username should be between ${minLength - 5}-${maxLength - 78} characters`,
    )
    .max(
      maxLength - 78,
      `Username should be between ${minLength - 5}-${maxLength - 78} characters`,
    ),
  email: Yup.string().email(
    'Invalid email, type your e-mail address in "someone@example.com" format.',
  ),
});

export const PasswordResetSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .matches(
      /^[\w[\]!#$%&'*+\-/=?^`{|}~|\s]*$/,
      'Old password must contain only latin alphabetical characters.',
    )
    .min(
      minLength,
      `Password should be between ${minLength}-${maxLength} characters`,
    )
    .max(
      maxLength,
      `Password should be between ${minLength}-${maxLength} characters`,
    )
    .required('Old password is required'),
  newPassword: Yup.string()
    .matches(
      /^[\w[\]!#$%&'*+\-/=?^`{|}~|\s]*$/,
      'New password must contain only latin alphabetical characters.',
    )
    .min(
      minLength,
      `Password should be between ${minLength}-${maxLength} characters`,
    )
    .max(
      maxLength,
      `Password should be between ${minLength}-${maxLength} characters`,
    )
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      'New password must be different to old!',
    )
    .required('New password is required'),
  repeatNewPassword: Yup.string()
    .matches(
      /^[\w[\]!#$%&'*+\-/=?^`{|}~|\s]*$/,
      'Repeat new password must contain only latin alphabetical characters.',
    )
    .min(
      minLength,
      `Password should be between ${minLength}-${maxLength} characters`,
    )
    .max(
      maxLength,
      `Password should be between ${minLength}-${maxLength} characters`,
    )
    .required('New password is required')
    .oneOf(
      [Yup.ref('newPassword'), null],
      'New and repeat new passwords must match!',
    ),
});
