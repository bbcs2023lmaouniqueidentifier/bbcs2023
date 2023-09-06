import * as Yup from 'yup';

const SOME_SIZE_LIMIT = 1048576000;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
export const AddOppValidation = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{4,20}$/,
      'Username should contain 4 to 20 alphanumeric characters',
    )
    .required('Username is required'),

  password: Yup.string().required('Password is required'),
  opp_name: Yup.string().required('Name of volunteer opportunity is required'),
  opp_desc: Yup.string().required('Description is required'),
  opp_logo: Yup.mixed<FileList>()
    .required('Logo is required')
    .test(
      'length',
      'Logo is required',
      (value) => value instanceof FileList && value.length === 1,
    )
    .test(
      'fileSize',
      'File too large',
      (value) =>
        value instanceof FileList &&
        value[0] &&
        value[0].size <= SOME_SIZE_LIMIT,
    )
    .test(
      'fileType',
      'Unsupported File Format',
      (value) =>
        value instanceof FileList &&
        value[0] &&
        SUPPORTED_FORMATS.includes(value[0].type),
    ),
});
