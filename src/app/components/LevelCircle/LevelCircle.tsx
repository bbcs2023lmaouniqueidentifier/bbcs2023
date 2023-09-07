'use client';
import { forwardRef } from 'react';
import { User, testUser } from '../Providers/AuthProvider';
import './styles.css';
import { JSXProps } from '@/app/types';
import { CircularProgress, Typography } from '@mui/material';

export const LevelCircle = forwardRef<HTMLDivElement, User & JSXProps>(
  ({ hours, username, className, id }: User & JSXProps, ref) => {
    //AP to calc level
    const formula = (x: number) => {
      const commonDifference = 5;
      const level = Math.floor((x - 1) / commonDifference) + 1;
      const nextLevel = level + 1;
      const nextLevelStart = 1 + (nextLevel - 1) * commonDifference;
      const distanceToNextLevel = nextLevelStart - x;
      const percentageToNextLevel = distanceToNextLevel / commonDifference;

      return { level, percentageToNextLevel, distanceToNextLevel };
    };
    const { level, percentageToNextLevel, distanceToNextLevel } =
      formula(hours);

    const levelString = Math.floor(level).toString();

    return (
      <div>
        <div
          className={`level-circle-container ${className}`}
          ref={ref}
          id={id}
        >
          <CircularProgress
            variant='determinate'
            value={percentageToNextLevel * 100}
            className='level-circle'
            size={'100%'}
            color='secondary'
          />
          <div className='label'>
            <Typography
              className='level title'
              color='primary'
              variant='caption'
              component='div'
              align='center'
            >
              {levelString}
            </Typography>
          </div>
        </div>
        <div>
          <Typography
            className='level subtitle'
            color='primary'
            variant='caption'
            component='div'
            align='center'
          >
            {username}
          </Typography>
          <Typography
            className='level description'
            color='primary'
            variant='caption'
            component='div'
            align='center'
          >
            <span className='emphasis'>{hours}</span> hours of volunteering
          </Typography>
          <Typography
            className='level description'
            color='primary'
            variant='caption'
            component='div'
            align='center'
          >
            <span className='emphasis'>{distanceToNextLevel}</span> hours to
            next level
          </Typography>
        </div>
      </div>
    );
  },
);
