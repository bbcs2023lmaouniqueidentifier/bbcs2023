'use client';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Popover,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { forwardRef, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { MediaQueryContext } from '@/app/components/Providers/MediaQueryProvider';
import { JSXProps } from '@/app/types';
import './styles.css';

export const Navbar = forwardRef<HTMLDivElement, JSXProps>((props, ref) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const { breakpoints } = useContext(MediaQueryContext);

  const router = useRouter();

  useEffect(() => setPopoverOpen(false), [breakpoints.mobile]);

  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(!popoverOpen);
  };

  return (
    <div className={props.className} id={props.id} ref={ref}>
      <AppBar className='navbar' position='fixed'>
        <Toolbar className='navbar-inner'>
          <div className='navbar-logo' onClick={() => router.push('/')} />

          {breakpoints.mobile ? (
            <>
              <div className='navbar-links'>
                <a
                  className='navbar-link description'
                  onClick={() => router.push('/organisations')}
                >
                  Opportunities
                </a>
                <a
                  className='navbar-link description'
                  onClick={() => router.push('/leaderboard')}
                >
                  Leaderboard
                </a>
                <a
                  className='navbar-link description'
                  onClick={() => router.push('/auth/settings#account')}
                >
                  My MBTI
                </a>
              </div>

              <Button
                className='button common-button'
                variant='contained'
                onClick={() => router.push('/auth/login')}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={handlePopover} aria-label='menu'>
                <DensityMediumIcon />
              </IconButton>
              <Popover
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={() => setPopoverOpen(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Paper className='navbar-mobile-dropdown'>
                  <Button
                    className='navbar-mobile-dropdown-button'
                    onClick={() => router.push('/organisations')}
                  >
                    <Typography>Opportunities</Typography>
                  </Button>
                  <Button
                    className='navbar-mobile-dropdown-button'
                    onClick={() => router.push('/leaderboard')}
                  >
                    <Typography>Leaderboard</Typography>
                  </Button>
                  <Button
                    className='navbar-mobile-dropdown-button'
                    onClick={() => router.push('/auth/settings')}
                  >
                    <Typography>My MBTI</Typography>
                  </Button>
                  <Button
                    className='navbar-mobile-dropdown-button'
                    onClick={() => router.push('/auth/login')}
                  >
                    <Typography>Login</Typography>
                  </Button>
                </Paper>
              </Popover>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
