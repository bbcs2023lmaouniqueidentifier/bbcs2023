'use client';

import { createContext, ReactNode, useMemo, useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

const MediaQueryContext = createContext({
  breakpoints: {
    mobile: false,
    tablet: false,
    desktop: false,
  },
  theming: {
    darkMode: true,
    fontScale: 1,
  },
});

const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
  const [theming, setTheming] = useState<{
    darkMode: boolean;
    fontScale: number;
  }>({
    darkMode: false,
    fontScale: 1,
  });
  const breakpoints = {
    mobile: useMediaQuery('(min-width: 600px)'),
    tablet: useMediaQuery('(max-width: 1000px)'),
    desktop: useMediaQuery('(min-width: 1000px)'),
  };
  useEffect(() => {
    if (localStorage.getItem('darkmode') === null)
      localStorage.setItem(
        'darkmode',
        window.matchMedia('(prefers-color-scheme: dark)').matches.toString(),
      );
    if (localStorage.getItem('fontscale') === null)
      localStorage.setItem('fontscale', '1');
    const theming = {
      darkMode: localStorage.getItem('darkmode') === 'true',
      fontScale: Number(localStorage.getItem('fontscale')) || 1,
    };
    setTheming(theming);
  }, []);

  const value = useMemo(
    () => ({ breakpoints, theming }),
    [breakpoints, theming],
  );

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export { MediaQueryContext, MediaQueryProvider };
