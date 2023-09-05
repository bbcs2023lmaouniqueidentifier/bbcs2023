'use client';

import { createContext, ReactNode, useMemo } from 'react';
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
  const breakpoints = {
    mobile: useMediaQuery('(min-width: 600px)'),
    tablet: useMediaQuery('(max-width: 1000px)'),
    desktop: useMediaQuery('(min-width: 1000px)'),
  };

  const theming = {
    darkMode: useMediaQuery('(prefers-color-scheme: dark)'),
  };

  const value = useMemo(() => ({ breakpoints, theming }), [breakpoints]);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export { MediaQueryContext, MediaQueryProvider };
