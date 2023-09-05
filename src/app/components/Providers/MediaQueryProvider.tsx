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
  },
});

const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
  const [theming, setTheming] = useState<{ darkMode: boolean }>({
    darkMode: false,
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
        useMediaQuery('(prefers-color-scheme: dark)').toString(),
      );
    const theming = {
      darkMode: localStorage.getItem('darkmode') === 'true',
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
