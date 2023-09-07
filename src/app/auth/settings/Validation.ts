import * as Yup from 'yup';

export const ChangeEmailValidation = Yup.object().shape({
  newemail: Yup.string()
    .email('Invalid email provided')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const ChangePasswordValidation = Yup.object().shape({
  password: Yup.string().required('Old Password is required'),

  newpassword: Yup.string()
    .matches(
      /[!@#$%^&*]/,
      'Password must contain a special character (!@#$%^&*)',
    )
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password cannot exceed 30 characters')
    .required('Password is required'),

  repeat_newpassword: Yup.string()
    .oneOf([Yup.ref('newpassword'), undefined], 'Passwords must match')
    .required('Repeat password is required'),
});
