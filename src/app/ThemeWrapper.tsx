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
import Navbar from './components/Navbar/Navbar';
import { AlertToast, AlertProps } from './components/AlertToast/AlertToast';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

type ThemeWrapperProps = {
  children: ReactNode;
  darkTheme: boolean;
};

export const ThemeWrapper = ({ children, darkTheme }: ThemeWrapperProps) => {
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(
    undefined,
  );
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { theming } = useContext(MediaQueryContext);
  const [isDark, setIsDark] = useState<boolean>(theming.darkMode);
  const theme = createTheme(isDark ? darkThemeOptions : lightThemeOptions);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    setIsDark(theming.darkMode);
  }, [theming.darkMode]);

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = 'rgb(15, 15, 15)';
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
        'rgb(15, 15, 15)',
      );
    } else {
      document.body.style.backgroundColor = 'rgb(255, 255, 255)';
      pageContainerRef.current?.style.setProperty('--primary', 'rgb(0,0,0)');
      pageContainerRef.current?.style.setProperty(
        '--secondary',
        'rgb(30,144,255)',
      );
      pageContainerRef.current?.style.setProperty(
        '--less-important',
        'rgb(56,56,56)',
      );
      pageContainerRef.current?.style.setProperty(
        '--background-color',
        'rgb(255, 255, 255)',
      );
    }
  }, [isDark]);

  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.style.setProperty(
        '--font-scale',
        theming.fontScale.toString(),
      );
    }
  }, [theming.fontScale]);

  useEffect(() => {
    if (navbarRef.current && childrenRef.current) {
      const navbarHeight = (navbarRef.current.childNodes[0] as HTMLElement)
        .clientHeight;
      childrenRef.current.style.setProperty('margin-top', `${navbarHeight}px`);
      childrenRef.current.style.setProperty(
        '--navbar-height',
        `${navbarHeight}px`,
      );
    }
  }, [navbarRef, childrenRef]);

  useEffect(() => {
    if (searchParams.get('alertContent')) {
      try {
        setAlertContent(JSON.parse(searchParams.get('alertContent') as string));
        setOpenAlert(true);
      } catch (e) {
        console.log(e);
      }
    }
  }, [searchParams]);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <div ref={pageContainerRef} className='page-container'>
          <Navbar ref={navbarRef} />
          <div ref={childrenRef}>{children}</div>
          <AlertToast
            openAlert={openAlert}
            onClose={() => {
              setOpenAlert(false);
              router.push(pathname);
            }}
            alertContent={alertContent}
          />
        </div>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
