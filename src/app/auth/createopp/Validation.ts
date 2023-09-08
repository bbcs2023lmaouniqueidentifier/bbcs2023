import * as Yup from 'yup';

const SOME_SIZE_LIMIT = 1048576000;
const SUPPORTED_FORMATS = ['image/png'];
export const AddOppValidation = Yup.object().shape({
  opp_name: Yup.string().required('Name of volunteer opportunity is required'),
  opp_short_desc: Yup.string()
    .required('Short description is required')
    .max(100, 'Short description cannot exceed 100 characters'),
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
