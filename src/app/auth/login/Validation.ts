import * as Yup from 'yup';

export const SignInValidation = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{4,20}$/,
      'Username should contain 4 to 20 alphanumeric characters',
    )
    .required('Username is required'),

  password: Yup.string().required('Password is required'),
});
