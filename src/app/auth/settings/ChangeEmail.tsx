import { Button, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEmailValidation } from './Validation';
import './styles.css';
import { User } from '@/app/components/Providers/AuthProvider';

export const ChangeEmail = ({ user }: { user: User }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangeEmailValidation),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className='account-item'>
        <Typography className='account-item-title description' color='primary'>
          Current Email
        </Typography>
        <Typography className='account-item-description' color='primary'>
          {user.email}
        </Typography>
        <Typography className='account-item-title description' color='primary'>
          New Email
        </Typography>
        <TextField
          placeholder='New Email'
          variant='outlined'
          className='account-item-input'
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />
        <Button
          variant='contained'
          color='primary'
          className='save-btn'
          type='submit'
        >
          Save
        </Button>
      </div>
    </form>
  );
};
