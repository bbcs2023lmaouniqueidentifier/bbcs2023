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
  const { breakpoints, theming } = useContext(MediaQueryContext);

  const [isDark, setIsDark] = useState<boolean>(theming.darkMode);
  const router = useRouter();
  useEffect(() => {
    setIsDark(theming.darkMode);
  }, [theming.darkMode]);

  useEffect(() => setPopoverOpen(false), [breakpoints.mobile]);

  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(!popoverOpen);
  };

  const handleMobileNavigation = (href: string) => {
    setPopoverOpen(false);
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => element.scrollIntoView({ behavior: 'auto' }), 100);
    }
  };

  return (
    <div className={props.className} id={props.id} ref={ref}>
      <AppBar className='navbar' position='fixed'>
        <Toolbar className='navbar-inner'>
          <div className='navbar-logo' onClick={() => router.push('/  ')} />

          {breakpoints.mobile ? (
            <>
              <div className='navbar-links'>
                <a className='navbar-link description' href='#landing'>
                  About Us
                </a>
                <a className='navbar-link description' href='#skills'>
                  Organisations
                </a>
                <a className='navbar-link description' href='#projects'>
                  MBTI Quiz
                </a>
              </div>

              <Button
                className='button navbar-btn'
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
                    onClick={() => handleMobileNavigation('#landing')}
                  >
                    <Typography>About</Typography>
                  </Button>
                  <Button
                    className='navbar-mobile-dropdown-button'
                    onClick={() => handleMobileNavigation('#skills')}
                  >
                    <Typography>Organisations</Typography>
                  </Button>
                  <Button
                    className='navbar-mobile-dropdown-button'
                    onClick={() => handleMobileNavigation('#projects')}
                  >
                    <Typography>MBTI Quiz</Typography>
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
