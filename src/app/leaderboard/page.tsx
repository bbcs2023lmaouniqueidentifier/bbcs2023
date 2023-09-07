'use client';
import ThemeWrapper from '../ThemeWrapper';
import { useContext } from 'react';
import { MediaQueryContext } from '../components/Providers/MediaQueryProvider';
import { Typography } from '@mui/material';
import { LevelCircle } from '../components/LevelCircle/LevelCircle';
import { testUser } from '../components/Providers/AuthProvider';
import './styles.css';

export const Leaderboard = () => {
  const { theming } = useContext(MediaQueryContext);
  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <section className='leaderboard'>
        <LevelCircle {...testUser} className='level' />
      </section>
    </ThemeWrapper>
  );
};

Leaderboard.displayName = 'Leaderboard';
export default Leaderboard;
