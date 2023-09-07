import { Button, TextField, Typography } from '@mui/material';
import { emailChange } from '@/app/api/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEmailValidation } from './Validation';
import { AlertProps } from '@/app/components/AlertToast/AlertToast';
import { useRouter, usePathname } from 'next/navigation';
import './styles.css';
import { User } from '@/app/components/Providers/AuthProvider';

export const ChangeEmail = ({ user }: { user: User }) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangeEmailValidation),
  });

  const handleChangeEmail = (data: { newemail: string; password: string }) => {
    emailChange({ ...data, username: user.username }).then((res) => {
      if (res) {
        const alertContentRedirect: AlertProps = {
          severity: 'success',
          title: 'Change successful!',
          description: 'You have changed your email.',
        };
        router.push(
          `${pathname}?alertContent=${JSON.stringify(alertContentRedirect)}`,
        );
      } else {
        const alertContent: AlertProps = {
          severity: 'error',
          title: 'Change failed!',
          description: 'Please try again.',
        };
        router.replace(
          `${pathname}?alertContent=${JSON.stringify(alertContent)}`,
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(handleChangeEmail)}>
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
          error={Boolean(errors.newemail)}
          helperText={errors.newemail?.message}
          {...register('newemail')}
        />
        <Typography className='account-item-title description' color='primary'>
          Password
        </Typography>
        <TextField
          placeholder='Password'
          variant='outlined'
          className='account-item-input'
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />
        <Button
          variant='contained'
          color='primary'
          className='button common-button save-btn'
          type='submit'
        >
          Save
        </Button>
      </div>
    </form>
  );
};
