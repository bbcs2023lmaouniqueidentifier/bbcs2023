'use client';
import {
  Box,
  Button,
  FormControl,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpValidation } from './Validation';
import { AccountDetails } from '@/app/types';
import { ThemeWrapper } from '@/app/ThemeWrapper';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import { useContext, useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import './styles.css';

export const SignUpPage = () => {
  const { theming, breakpoints } = useContext(MediaQueryContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpValidation),
  });

  const handleRegister = async (form: AccountDetails) => {
    console.log(form);
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
      <div className='signup-container'>
        {breakpoints.mobile ? (
          <div className='signup-image'>
            <Image
              src='/volunteers/volunteer3.png'
              alt='volunteer_img'
              width={0}
              height={0}
              style={{ height: '100%', width: 'auto' }}
              priority
              unoptimized
            />
          </div>
        ) : null}

        <section className='auth signup'>
          <div className='auth-text'>
            <Typography className='title'>Sign Up</Typography>
            <Typography className='subtitle less-important'>
              Register to be a Certified Samaritan today!
            </Typography>
          </div>

          <form className='signup-form' onSubmit={handleSubmit(handleRegister)}>
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
            <FormControl id='email' className='form-control'>
              <TextField
                sx={textFieldStyles}
                type='email'
                label='Email'
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                {...register('email')}
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
            <FormControl id='repeat_password' className='form-control'>
              <TextField
                sx={textFieldStyles}
                type='password'
                label='Confirm Password'
                error={Boolean(errors.repeat_password)}
                helperText={errors.repeat_password?.message}
                {...register('repeat_password')}
                required
              />
            </FormControl>
            <Typography color='primary' className='description'>
              Already a member?{' '}
              <Link href='/auth/login' className='emphasis'>
                Log In
              </Link>
            </Typography>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='submit-button button'
            >
              <Typography noWrap>Sign Up</Typography>
            </Button>
          </form>
        </section>
      </div>
    </ThemeWrapper>
  );
};

SignUpPage.displayName = 'SignUpPage';
export default SignUpPage;
