'use client';
import { forwardRef, useState, useContext } from 'react';
import { User } from '../Providers/AuthProvider';
import { AuthContext } from '../Providers/AuthProvider';
import { addHours } from '@/app/api/auth';
import './styles.css';
import { JSXProps } from '@/app/types';
import { Slider, Typography, Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { AlertProps } from '@/app/components/AlertToast/AlertToast';

export const AddHours = forwardRef<HTMLDivElement, User & JSXProps>(
  ({ className, id }: User & JSXProps, ref) => {
    const [hours, setHours] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useContext(AuthContext);
    if (!user) return null;
    const handleClick = async () => {
      const newUser = { ...user, hours: user.hours + hours };
      localStorage.setItem('user', JSON.stringify(newUser));
      const res = await addHours(user.username, hours);
      if (res === 200) {
        const alertContentRedirect: AlertProps = {
          severity: 'success',
          title: 'Update successful!',
          description: 'You have updated your hours.',
        };
        router.push(
          `${pathname}?alertContent=${JSON.stringify(alertContentRedirect)}`,
        );
      } else {
        const alertContent: AlertProps = {
          severity: 'error',
          title: 'Update failed!',
          description: 'Please try again.',
        };
        router.replace(
          `${pathname}?alertContent=${JSON.stringify(alertContent)}`,
        );
      }
    };

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
