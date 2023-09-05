'use client';
import Image from 'next/image';
import './page.css';
import ThemeWrapper from './ThemeWrapper';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { MediaQueryContext } from './components/Providers/MediaQueryProvider';
import { useContext } from 'react';

export default function Home() {
  const { theming } = useContext(MediaQueryContext);
  const [darkTheme, setDarkTheme] = useState<boolean>(theming.darkMode);

  useEffect(() => {
    setDarkTheme(theming.darkMode);
  }, [theming.darkMode]);

  return (
    <ThemeWrapper darkTheme={darkTheme}>
      <h1>Welcome to Next.js!</h1>
      <Button
        variant='contained'
        color='primary'
        onClick={() => setDarkTheme(!darkTheme)}
      >
        change theme
      </Button>
      <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
    </ThemeWrapper>
  );
}
