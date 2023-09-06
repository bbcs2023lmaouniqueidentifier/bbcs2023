'use client';
import {
  InputLabel,
  Button,
  FormControl,
  TextField,
  Badge,
  Typography,
  FormHelperText,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddOppValidation } from './Validation';
import { AccountDetails } from '@/app/types';
import { ThemeWrapper } from '@/app/ThemeWrapper';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import { useContext, useRef, useState, useEffect } from 'react';
import './styles.css';

interface OppDetails extends Omit<AccountDetails, 'email' | 'repeat_password'> {
  opp_logo: FileList;
  opp_name: string;
  opp_desc: string;
}

export const LoginPage = () => {
  const { theming, breakpoints } = useContext(MediaQueryContext);
  const [fileURL, setFileURL] = useState<string | null>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddOppValidation),
  });

  const logo = watch('opp_logo');

  useEffect(() => {
    const imageURL =
      logo && logo.length > 0 ? URL.createObjectURL(logo[0]) : null;
    setFileURL(imageURL);
  }, [logo]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateOpp = async (form: OppDetails) => {
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
      <form className='login-form' onSubmit={handleSubmit(handleCreateOpp)}>
        <div className='opp-text'>
          <Typography className='subtitle' color='primary'>
            Grant an opportunity to volunteer!
          </Typography>
          <Typography className='description less-important'>
            Create a listing for your volunteer opportunity/organisation here!
          </Typography>
        </div>
        <div className='opp-form'>
          <Image
            src='/clipart/raisehand.png'
            width={0}
            height={0}
            alt='raisehand'
          />

          <FormControl id='opp_logo' className='form-control opp-logo'>
            <Badge badgeContent={<AddCircleIcon color='primary' />}>
              <InputLabel htmlFor='opp_logo' color='primary'>
                {fileURL ? null : 'Logo/Banner'}
              </InputLabel>
              <input
                {...register('opp_logo')}
                id='opp_logo'
                type='file'
                accept='image/jpeg,image/png,image/webp'
                className='opp-logo-input opp-logo-img'
                style={{ backgroundImage: `url(${fileURL})` }}
              />
            </Badge>
            <FormHelperText error={Boolean(errors.opp_logo)}>
              {errors.opp_logo?.message}
            </FormHelperText>
          </FormControl>
          <FormControl id='opp_name' className='form-control'>
            <TextField
              sx={textFieldStyles}
              type='text'
              label='Name of opportunity'
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              {...register('opp_name')}
              required
            />
          </FormControl>
          <FormControl id='description' className='form-control'>
            <TextField
              sx={textFieldStyles}
              type='text'
              multiline
              rows={6}
              label='Description (when, where, what)'
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              {...register('opp_desc')}
              required
            />
          </FormControl>
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

          <Button
            variant='contained'
            color='primary'
            type='submit'
            className='submit-button button'
          >
            <Typography noWrap>Let's go!</Typography>
          </Button>
        </div>
      </form>
    </ThemeWrapper>
  );
};

LoginPage.displayName = 'LoginPage';
export default LoginPage;