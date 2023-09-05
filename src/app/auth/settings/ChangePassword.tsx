import { Button, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordValidation } from './Validation';
import './styles.css';
import { User } from '@/app/components/Providers/AuthProvider';

export const ChangePassword = ({ user }: { user: User }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className='account-item'>
        <Typography className='account-item-title description' color='primary'>
          Current Password
        </Typography>
        <TextField
          placeholder='Password'
          variant='outlined'
          className='account-item-input'
          error={Boolean(errors.old_password)}
          helperText={errors.old_password?.message}
          {...register('old_password')}
        />
        <Typography className='account-item-title description' color='primary'>
          New Password
        </Typography>
        <TextField
          placeholder='Password'
          variant='outlined'
          className='account-item-input'
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />
        <Typography className='account-item-title description' color='primary'>
          Repeat New Password
        </Typography>
        <TextField
          placeholder='Repeat Password'
          variant='outlined'
          className='account-item-input'
          error={Boolean(errors.repeat_password)}
          helperText={errors.repeat_password?.message}
          {...register('repeat_password')}
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
