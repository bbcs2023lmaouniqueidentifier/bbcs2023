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

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <h1>Welcome to Next.js!</h1>
    </ThemeWrapper>
  );
}
