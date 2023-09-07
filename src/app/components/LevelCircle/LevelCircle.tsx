'use client';
import { forwardRef } from 'react';
import { User, testUser } from '../Providers/AuthProvider';
import './styles.css';
import { JSXProps } from '@/app/types';
import { CircularProgress, Typography } from '@mui/material';

export const LevelCircle = forwardRef<HTMLDivElement, User & JSXProps>(
  ({ hours, username, className, id }: User & JSXProps, ref) => {
    const level = Math.log2(hours);
    const fullnessBar = level % 1.0;
    const levelString = Math.floor(level).toString();

    return (
      <>
        <div
          className={`level-circle-container ${className}`}
          ref={ref}
          id={id}
        >
          <CircularProgress
            variant='determinate'
            value={fullnessBar * 100}
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
            className='level title'
            color='primary'
            variant='caption'
            component='div'
            align='center'
          >
            {username}
          </Typography>
        </div>
      </>
    );
  },
);
