'use client';
import ThemeWrapper from '@/app/ThemeWrapper';
import { useContext, useEffect, useState } from 'react';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import { Button } from '@mui/material';
import { Typography, Slider, Badge, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { testUser } from '@/app/components/Providers/AuthProvider';

import './styles.css';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';

export const Settings = () => {
  const { theming } = useContext(MediaQueryContext);
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
        <section className='account'>
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
            <ChangeEmail user={testUser} />
            <Typography className='description bold' color='primary'>
              Change Password
            </Typography>
            <ChangePassword user={testUser} />
          </div>
        </section>
      </div>
    </ThemeWrapper>
  );
};

Settings.displayName = 'Settings';
export default Settings;
