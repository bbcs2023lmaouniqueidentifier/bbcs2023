'use client';
import Image from 'next/image';
import './page.css';
import ThemeWrapper from './ThemeWrapper';
import { Button, Typography } from '@mui/material';
import { useRef, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { MediaQueryContext } from './components/Providers/MediaQueryProvider';
import { useContext } from 'react';
import ImageScroller from './components/ImageScoller/ImageScroller';

export default function Home() {
  const { theming, breakpoints } = useContext(MediaQueryContext);
  const imageScrollerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const images = [
    '/volunteers/volunteer3.png',
    '/volunteers/volunteer4.png',
    '/volunteers/volunteer5.jpg',
    '/volunteers/volunteer6.jpg',
    '/volunteers/volunteer7.jpg',
  ];

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <ImageScroller
        images={images}
        ref={imageScrollerRef}
        learnMore={() =>
          aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <div className='about' ref={aboutRef}>
        <Typography className='about-title bold title' color='primary' noWrap>
          Our Mission
        </Typography>
        <Typography className='about-description description' color='primary'>
          The Samaritan Club aims to enable and encourage Singaporeans to
          actively volunteer. Based on your individual personality, we will
          recommend you volunteering opportunities that are best suited for your
          skills and interests. In doing so, we hope to build a charitable
          community where everyone truly enjoys their acts of service.
        </Typography>
      </div>
      <div className='about-start-heading'>
        <Typography
          className='about-title bold title about-start-title'
          color='primary'
          noWrap
        >
          Start Your Journey Today!
        </Typography>
        <Typography
          className='about-description description about-start-description'
          color='primary'
        >
          Prepare to do amazing things with us.
        </Typography>
      </div>

      <div className='about-start'>
        <div
          className={`about-start-section ${
            breakpoints.mobile ? null : 'no-background-image'
          }`}
        >
          <div className='about-start-section-inner'>
            <Typography className='about-start-title bold subtitle' noWrap>
              Find Your Match
            </Typography>
            <Typography className='about-start-description description'>
              We will match you with volunteering opportunities that are best
              suited for your skills and interests.
            </Typography>
            <Button
              className='common-button button about-start-button'
              variant='contained'
            >
              Find Opportunities
            </Button>
          </div>
        </div>
        <div
          className={`about-start-section ${
            breakpoints.mobile ? null : 'no-background-image'
          }`}
        >
          <div className='about-start-section-inner'>
            <Typography className='about-start-title bold subtitle ' noWrap>
              Track Your Progress
            </Typography>
            <Typography className='about-start-description description'>
              Track your volunteering hours and see how you have contributed to
              the community.
            </Typography>
            <Button
              className='common-button button about-start-button'
              variant='contained'
            >
              Track Progress
            </Button>
          </div>
        </div>
        <div
          className={`about-start-section ${
            breakpoints.mobile ? null : 'no-background-image'
          }`}
        >
          <div className='about-start-section-inner'>
            <Typography className='about-start-title bold subtitle' noWrap>
              Create Opportunities
            </Typography>
            <Typography className='about-start-description description'>
              Create your own volunteering opportunities and invite your friends
              to join you!
            </Typography>
            <Button
              className='common-button button about-start-button'
              variant='contained'
            >
              Create Opportunities
            </Button>
          </div>
        </div>
        <div
          className={`about-start-section ${
            breakpoints.mobile ? null : 'no-background-image'
          }`}
        >
          <div className='about-start-section-inner'>
            <Typography className='about-start-title bold subtitle' noWrap>
              Login
            </Typography>
            <Typography className='about-start-description description'>
              Login to your account to start your volunteering journey!
            </Typography>
            <Button
              className='common-button button about-start-button'
              variant='contained'
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
