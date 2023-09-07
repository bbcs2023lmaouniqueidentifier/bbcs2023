'use client';
import ThemeWrapper from '@/app/ThemeWrapper';
import { useContext, useEffect, useState } from 'react';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import {
  Typography,
  Slider,
  Badge,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AuthContext } from '@/app/components/Providers/AuthProvider';
import './styles.css';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import { useRouter, usePathname } from 'next/navigation';
import { AlertProps } from '@/app/components/AlertToast/AlertToast';
import { updateMBTI } from '@/app/api/auth';

export const Settings = () => {
  const { theming } = useContext(MediaQueryContext);
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  const [EI, setEI] = useState<'E' | 'I' | ''>('');
  const [SN, setSN] = useState<'S' | 'N' | ''>('');
  const [TF, setTF] = useState<'T' | 'F' | ''>('');
  const [JP, setJP] = useState<'J' | 'P' | ''>('');

  useEffect(() => {
    if (user && !Object.values(user.mbti).every((value) => value === false)) {
      setEI(user.mbti.E ? 'E' : 'I');
      setSN(user.mbti.S ? 'S' : 'N');
      setTF(user.mbti.T ? 'T' : 'F');
      setJP(user.mbti.J ? 'J' : 'P');
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      const alertContentRedirect: AlertProps = {
        severity: 'error',
        title: 'You have not logged in',
        description: 'Please log in to access this page.',
      };
      router.push(`/?alertContent=${JSON.stringify(alertContentRedirect)}`);
    }
  }, [isLoading, user]);

  const [fontScale, setFontScale] = useState<number>();
  const [darkMode, setDarkMode] = useState<boolean>();
  useEffect(() => {
    setDarkMode(theming.darkMode);
  }, [theming.darkMode]);

  useEffect(() => {
    setFontScale(theming.fontScale);
  }, [theming.fontScale]);

  const handleThemeChange = () => {
    localStorage.setItem('darkmode', (!theming.darkMode).toString());
    console.log('refreshing');
    window.location.reload();
  };

  const handleFontSizeChange = () => {
    localStorage.setItem('fontscale', fontScale?.toString() || '1');
    window.location.reload();
  };

  const handleMBTIChange = async () => {
    const newMBTI = {
      E: EI === 'E',
      I: EI === 'I',
      S: SN === 'S',
      N: SN === 'N',
      T: TF === 'T',
      F: TF === 'F',
      J: JP === 'J',
      P: JP === 'P',
    };
    const newUser = { ...user, mbti: newMBTI };
    localStorage.setItem('user', JSON.stringify(newUser));
    const parsedMBTI = Object.entries(newMBTI)
      .map(([key, value]) => (value ? key : ''))
      .join('');
    const res = await updateMBTI(user!.username, parsedMBTI);
    if (res === 200) {
      const alertContentRedirect: AlertProps = {
        severity: 'success',
        title: 'Change successful!',
        description: 'You have changed your MBTI.',
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
  };

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <div className='settings-container'>
        <div>
          <Typography className='title' color='primary'>
            Settings
          </Typography>
          <Typography className='subtitle less-important'>
            Update your settings here!
          </Typography>
        </div>

        <hr className='settings-divider' />
        <section className='appearance'>
          <Typography className='subtitle' color='primary'>
            Appearance
          </Typography>
          <Typography className='description less-important'>
            Change the appearance of the site!
          </Typography>
          <div className='appearance-container'>
            <div className='appearance-item'>
              <Typography
                className='appearance-item-title description bold'
                color='primary'
              >
                Theme
              </Typography>
              <div className='appearance-item-themechange-container'>
                {darkMode ? (
                  <>
                    <div
                      className='appearance-item-themechange light'
                      onClick={handleThemeChange}
                    />
                    <Badge badgeContent={<CheckCircleIcon color='secondary' />}>
                      <div className='appearance-item-themechange dark appearance-item-selected' />
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge badgeContent={<CheckCircleIcon color='secondary' />}>
                      <div className='appearance-item-themechange light appearance-item-selected' />
                    </Badge>

                    <div
                      className='appearance-item-themechange dark'
                      onClick={handleThemeChange}
                    />
                  </>
                )}
              </div>
            </div>

            <div className='appearance-item font-size'>
              <Typography
                className='appearance-item-title description bold'
                color='primary'
                sx={{ alignSelf: 'flex-start' }}
              >
                Font Size
              </Typography>
              <Slider
                aria-label='Adjust font size'
                value={fontScale || 1}
                valueLabelDisplay='auto'
                step={0.1}
                marks
                min={0.5}
                max={1.5}
                onChange={(e, v) => setFontScale(v as number)}
              />
              <div className='appearance-fontscale-preview'>
                <Typography
                  className='appearance-item-title description'
                  color='primary'
                  style={{
                    fontSize: `calc(${fontScale} * var(--raw-title-size))`,
                  }}
                >
                  I love titles!
                </Typography>
                <Typography
                  className='appearance-item-title description less-important'
                  style={{
                    fontSize: `calc(${fontScale} * var(--raw-subtitle-size))`,
                  }}
                >
                  A very interesting subtitle.
                </Typography>
                <Typography
                  className='appearance-item-title description'
                  color='primary'
                  style={{
                    fontSize: `calc(${fontScale} * var(--raw-description-size))`,
                  }}
                >
                  The most <span className='emphasis'>EPIC</span> description
                  you've ever seen.
                </Typography>
              </div>

              <Button
                variant='contained'
                color='primary'
                onClick={handleFontSizeChange}
                className='button common-button save-btn'
              >
                Save & Reload
              </Button>
            </div>
          </div>
        </section>

        <hr className='settings-divider' />
        <section className='account' id='account'>
          <div>
            <Typography className='subtitle' color='primary'>
              Account
            </Typography>
            <Typography className='description less-important'>
              Update your account details here!
            </Typography>
          </div>

          <div className='account-container'>
            <Typography className='description bold' color='primary'>
              Change Email
            </Typography>
            <ChangeEmail user={user} />
            <Typography className='description bold' color='primary'>
              Change Password
            </Typography>
            <ChangePassword user={user} />
            <Typography className='description bold' color='primary'>
              Update personality type
            </Typography>
            <div className='update-mbti' id='mbti'>
              <FormControl className='update-mbti-dropdown'>
                <InputLabel htmlFor='EI'>EI</InputLabel>
                <Select
                  value={EI}
                  onChange={(e) => setEI(e.target.value as 'E' | 'I' | '')}
                >
                  <MenuItem value='E'>E</MenuItem>
                  <MenuItem value='I'>I</MenuItem>
                </Select>
              </FormControl>
              <FormControl className='update-mbti-dropdown'>
                <InputLabel htmlFor='SN'>SN</InputLabel>
                <Select
                  value={SN}
                  onChange={(e) => setSN(e.target.value as 'S' | 'N' | '')}
                >
                  <MenuItem value='S'>S</MenuItem>
                  <MenuItem value='N'>N</MenuItem>
                </Select>
              </FormControl>
              <FormControl className='update-mbti-dropdown'>
                <InputLabel htmlFor='TF'>TF</InputLabel>
                <Select
                  value={TF}
                  onChange={(e) => setTF(e.target.value as 'T' | 'F' | '')}
                >
                  <MenuItem value='T'>T</MenuItem>
                  <MenuItem value='F'>F</MenuItem>
                </Select>
              </FormControl>
              <FormControl className='update-mbti-dropdown'>
                <InputLabel htmlFor='JP'>JP</InputLabel>
                <Select
                  value={JP}
                  onChange={(e) => setJP(e.target.value as 'J' | 'P' | '')}
                >
                  <MenuItem value='J'>J</MenuItem>
                  <MenuItem value='P'>P</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant='contained'
                color='primary'
                className='button common-button save-btn'
                onClick={handleMBTIChange}
              >
                Save
              </Button>
            </div>
          </div>
        </section>
      </div>
    </ThemeWrapper>
  );
};

Settings.displayName = 'Settings';
export default Settings;
