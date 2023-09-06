'use client';
import Image from 'next/image';
import { useState, useEffect, forwardRef } from 'react';
import { JSXProps } from '@/app/types';
import './styles.css';
import { Typography, Button } from '@mui/material';

interface ImageScrollerProps extends JSXProps {
  images: string[];
  learnMore: () => void;
}

const ImageScroller = forwardRef<HTMLDivElement, ImageScrollerProps>(
  ({ className, id, images, learnMore }, ref) => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const nextSlide = () => {
      const nextSlide = (current: number) =>
        current === images.length - 1 ? 0 : current + 1;

      setCurrentImage((current) => nextSlide(current));
    };

    useEffect(() => {
      const interval = setInterval(nextSlide, 10000);
    }, []);
    return (
      <div className={`image-scroller ${className}`} id={id} ref={ref}>
        {images.map((image, index) => (
          <div
            className={`image-scroller-slide ${
              index === currentImage ? 'active' : ''
            }`}
            key={index}
          >
            <Image
              src={image}
              width={0}
              height={0}
              style={{ height: 'auto', width: '100%' }}
              alt={`volunteer-image ${index}`}
              className='image-scroller-image'
              unoptimized
            />
            <div className='image-scroller-text'>
              <Typography
                className='image-scroller-subtitle  less-important'
                noWrap
              >
                Welcome to
              </Typography>
              <Typography className='image-scroller-title  bold' noWrap>
                The Samaritan Club
              </Typography>
              <Button
                className='image-scroller-button button common-button'
                variant='contained'
                color='primary'
                onClick={learnMore}
              >
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

ImageScroller.displayName = 'ImageScroller';
export default ImageScroller;
