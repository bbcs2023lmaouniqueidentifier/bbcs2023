'use client';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInValidation } from './Validation';
import { AccountDetails } from '@/app/types';
import { ThemeWrapper } from '@/app/ThemeWrapper';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import { AuthContext } from '@/app/components/Providers/AuthProvider';
import { useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AlertProps } from '@/app/components/AlertToast/AlertToast';
import './styles.css';
import { authorise } from '@/app/api/auth';

export const LoginPage = () => {
  const { theming, breakpoints } = useContext(MediaQueryContext);
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInValidation),
  });

  const handleLogin = async (
    form: Omit<AccountDetails, 'email' | 'repeat_password'>,
  ) => {
    const res = await login(form);

    if (res === 200) {
      const alertContentRedirect: AlertProps = {
        severity: 'success',
        title: 'Login successful!',
        description: 'Redirecting you to the home page...',
      };
      router.push(`/?alertContent=${JSON.stringify(alertContentRedirect)}`);
    } else {
      const alertContent: AlertProps = {
        severity: 'error',
        title: 'Login failed!',
        description: 'Please try again.',
      };
      router.replace(
        `${pathname}?alertContent=${JSON.stringify(alertContent)}`,
      );
    }
  };

  const textFieldStyles = {
    fieldset: {
      borderColor: 'var(--primary)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--secondary)!important', // works
    },
  };
  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <div className='login-container'>
        {breakpoints.mobile ? (
          <div className='login-image'>
            <Image
              src='/volunteers/volunteer4.png'
              alt='volunteer_img'
              width={0}
              height={0}
              style={{ height: '100%', width: 'auto' }}
              priority
              unoptimized
            />
          </div>
        ) : null}

        <section className='auth login'>
          <div className='auth-text'>
            <Typography className='title'>Sign In</Typography>
            <Typography className='subtitle less-important'>
              Let's continue volunteering!
            </Typography>
          </div>

          <form className='login-form' onSubmit={handleSubmit(handleLogin)}>
            <FormControl id='username' className='form-control'>
              <TextField
                sx={textFieldStyles}
                type='text'
                label='Username'
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                {...register('username')}
                required
              />
            </FormControl>

            <FormControl id='password' className='form-control'>
              <TextField
                sx={textFieldStyles}
                type='password'
                label='Password'
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password')}
                required
              />
            </FormControl>

            <Typography color='primary' className='description'>
              Not a member?{' '}
              <Link href='/auth/signup' className='emphasis'>
                Sign Up
              </Link>
            </Typography>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='submit-button button'
            >
              <Typography noWrap>Log In</Typography>
            </Button>
          </form>
        </section>
      </div>
    </ThemeWrapper>
  );
};

LoginPage.displayName = 'LoginPage';
export default LoginPage;
