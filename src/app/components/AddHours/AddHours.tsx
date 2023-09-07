'use client';
import { forwardRef, useState } from 'react';
import { User } from '../Providers/AuthProvider';
import './styles.css';
import { JSXProps } from '@/app/types';
import { Slider, Typography, Button } from '@mui/material';

export const AddHours = forwardRef<HTMLDivElement, User & JSXProps>(
  ({ className, id }: User & JSXProps, ref) => {
    const [hours, setHours] = useState(0);

    const handleClick = () => console.log(hours);

    return (
      <div className={className} id={id}>
        <div className='addhours'>
          <Typography className='description' color='primary'>
            Add hours
          </Typography>
          <Slider
            color='primary'
            defaultValue={0}
            step={0.5}
            marks
            min={0}
            max={8}
            valueLabelDisplay='auto'
            onChange={(e, v) => setHours(v as number)}
          />
          <Button className='common-button button' onClick={handleClick}>
            Save
          </Button>
        </div>
      </div>
    );
  },
);
