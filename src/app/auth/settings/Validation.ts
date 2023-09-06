import * as Yup from 'yup';

export const ChangeEmailValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email provided')
    .required('Email is required'),
});

export const ChangePasswordValidation = Yup.object().shape({
  old_password: Yup.string()
    .matches(
      /[!@#$%^&*]/,
      'Old Password must contain a special character (!@#$%^&*)',
    )
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .min(8, 'Old Password must be at least 8 characters long')
    .max(30, 'Old Password cannot exceed 30 characters')
    .required('Old Password is required'),

  password: Yup.string()
    .matches(
      /[!@#$%^&*]/,
      'Password must contain a special character (!@#$%^&*)',
    )
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password cannot exceed 30 characters')
    .required('Password is required'),

  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Repeat password is required'),
});
