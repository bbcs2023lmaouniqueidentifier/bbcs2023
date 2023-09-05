'use client';
import ThemeWrapper from '@/app/ThemeWrapper';
import { useContext, useEffect, useState } from 'react';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import { Button } from '@mui/material';

export const Account = () => {
  const { theming } = useContext(MediaQueryContext);

  const handleThemeChange = () => {
    localStorage.setItem('darkmode', (!theming.darkMode).toString());
    console.log('refreshing');
    window.location.reload();
  };

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <div>
        <Button variant='contained' color='primary' onClick={handleThemeChange}>
          change theme
        </Button>
      </div>
    </ThemeWrapper>
  );
};

Account.displayName = 'Account';
export default Account;
