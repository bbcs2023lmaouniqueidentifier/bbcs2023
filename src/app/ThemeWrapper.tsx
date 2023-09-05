'use client';
import React, {
  ReactNode,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { MediaQueryContext } from './components/Providers/MediaQueryProvider';
import { darkThemeOptions, lightThemeOptions } from './themes';

export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { theming } = useContext(MediaQueryContext);
  const [isDark, setIsDark] = useState<boolean>(theming.darkMode);
  const theme = createTheme(isDark ? darkThemeOptions : lightThemeOptions);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(theming.darkMode);
  }, [theming.darkMode]);

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = 'rgb(10, 25, 47)';
      pageContainerRef.current?.style.setProperty(
        '--primary',
        'rgb(255,255,255)',
      );
      pageContainerRef.current?.style.setProperty(
        '--secondary',
        'rgb(100, 255, 218)',
      );
      pageContainerRef.current?.style.setProperty(
        '--less-important',
        'lightgrey',
      );
      pageContainerRef.current?.style.setProperty(
        '--background-color',
        'rgb(10, 25, 47)',
      );
      pageContainerRef.current?.style.setProperty(
        '--sectional-color',
        '255, 255, 255',
      );
    } else {
      document.body.style.backgroundColor = 'rgb(255, 255, 255)';
      pageContainerRef.current?.style.setProperty('--primary', 'rgb(0,0,0)');
      pageContainerRef.current?.style.setProperty(
        '--secondary',
        'rgb(238, 103, 35)',
      );
      pageContainerRef.current?.style.setProperty(
        '--less-important',
        'rgb(56,56,56)',
      );
      pageContainerRef.current?.style.setProperty(
        '--background-color',
        'rgb(255, 255, 255)',
      );
      pageContainerRef.current?.style.setProperty(
        '--sectional-color',
        '128, 128, 128',
      );
    }
  }, [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <div ref={pageContainerRef}>{children}</div>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
