import { Button, TextField, Typography } from '@mui/material';
import { passwordChange } from '@/app/api/auth';
import { AlertProps } from '@/app/components/AlertToast/AlertToast';
import { useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordValidation } from './Validation';
import './styles.css';
import { User } from '@/app/components/Providers/AuthProvider';

export const ChangePassword = ({ user }: { user: User }) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation),
  });

  const handleChangePw = (data: {
    old_password: string;
    password: string;
    newpassword: string;
  }) => {
    passwordChange({ ...data, username: user.username }).then((res) => {
      if (res) {
        const alertContentRedirect: AlertProps = {
          severity: 'success',
          title: 'Change successful!',
          description: 'You have changed your password.',
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
    <form onSubmit={handleSubmit(handleChangePw)}>
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
          error={Boolean(errors.newpassword)}
          helperText={errors.newpassword?.message}
          {...register('newpassword')}
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
