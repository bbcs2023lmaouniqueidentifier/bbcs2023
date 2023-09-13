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
import { selectProps } from '@/app/organisations/selectProps';
import MBTISelect from '@/app/components/MBTIselect/MBTISelect';
import { MBTI } from '@/app/types';
import { AddOppValidation } from './Validation';
import { ThemeWrapper } from '@/app/ThemeWrapper';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '@/app/components/Providers/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { AlertProps } from '@/app/components/AlertToast/AlertToast';
import { addOpps } from '@/app/api/opps';
import './styles.css';

export interface OppDetails {
  opp_logo: FileList;
  opp_name: string;
  opp_desc: string;
  opp_short_desc: string;
  opp_mbti: MBTI;
}

export const CreateOpp = () => {
  const { theming } = useContext(MediaQueryContext);
  const { user, isLoading } = useContext(AuthContext);
  if (!user) return null;
  const router = useRouter();
  const pathname = usePathname();
  const [fileURL, setFileURL] = useState<string | null>();

  useEffect(() => {
    if (!isLoading && !user) {
      const alertContentRedirect: AlertProps = {
        severity: 'error',
        title: 'You have not logged in',
        description: 'Please log in to access this page.',
      };
      router.push(
        `/auth/login?alertContent=${JSON.stringify(alertContentRedirect)}`,
      );
    }
  }, [isLoading, user]);

  //handle MBTI select (no hook forms)

  const [mbti, setMBTI] = useState<MBTI>({
    E: true,
    I: true,
    S: true,
    N: true,
    T: true,
    F: true,
    J: true,
    P: true,
  });
  const MBTIprops = selectProps(mbti, (v, checked) =>
    setMBTI({ ...mbti, [v]: checked } as MBTI),
  );

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

  const handleCreateOpp = async (form: Omit<OppDetails, 'opp_mbti'>) => {
    if (!user) return;
    // check if at least one opposing mbti traits are true
    const check = [
      mbti.E || mbti.I,
      mbti.S || mbti.N,
      mbti.T || mbti.F,
      mbti.J || mbti.P,
    ].every((v) => v);
    if (!check) {
      const alertContent: AlertProps = {
        severity: 'error',
        title: 'Add failed!',
        description: 'Please select at least one opposing MBTI trait.',
      };
      router.replace(
        `${pathname}?alertContent=${JSON.stringify(alertContent)}`,
      );
      return;
    }

    const res = await addOpps(user)({ ...form, opp_mbti: mbti });
    if (res) {
      const alertContentRedirect: AlertProps = {
        severity: 'success',
        title: 'Add successful!',
        description: 'You have submitted a new opportunity!',
      };
      router.push(
        `${pathname}?alertContent=${JSON.stringify(alertContentRedirect)}`,
      );
    } else {
      const alertContent: AlertProps = {
        severity: 'error',
        title: 'Add failed!',
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
                accept='image/png'
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
              error={Boolean(errors.opp_name)}
              helperText={errors.opp_name?.message}
              {...register('opp_name')}
              required
            />
          </FormControl>
          <FormControl id='opp_short_desc' className='form-control'>
            <TextField
              sx={textFieldStyles}
              type='text'
              label="Short summary (date/time/location/who you're helping)"
              error={Boolean(errors.opp_short_desc)}
              helperText={errors.opp_short_desc?.message}
              {...register('opp_short_desc')}
              required
            />
          </FormControl>
          <FormControl id='opp_desc' className='form-control'>
            <TextField
              sx={textFieldStyles}
              type='text'
              multiline
              rows={6}
              label='Description'
              error={Boolean(errors.opp_desc)}
              helperText={errors.opp_desc?.message}
              {...register('opp_desc')}
              required
            />
          </FormControl>

          <Typography className='description' color='primary'>
            Preferred personality types
          </Typography>
          <div style={{ width: '100%' }}>
            <MBTISelect props={MBTIprops} column={{ isColumn: false }} />
          </div>

          <Button
            variant='contained'
            color='primary'
            type='submit'
            className='submit-button common-button button'
          >
            <Typography noWrap>Let's go!</Typography>
          </Button>
        </div>
      </form>
    </ThemeWrapper>
  );
};

CreateOpp.displayName = 'LoginPage';
export default CreateOpp;
