'use client';

import { SvgIconComponent } from '@mui/icons-material';
import { MBTI } from '../../types';
import { useContext, useState, useEffect } from 'react';
import { MediaQueryContext } from '../Providers/MediaQueryProvider';
import {
  Typography,
  FormControl,
  Collapse,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './styles.css';

export interface VerticalSelectProps {
  icon: SvgIconComponent;
  label: string;
  mbti: keyof MBTI;
  checkedCallback: (mbti: keyof MBTI, checked: boolean) => void;
}

export const VerticalSelect = ({ props }: { props: VerticalSelectProps[] }) => {
  const { breakpoints } = useContext(MediaQueryContext);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (breakpoints.mobile) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [breakpoints.mobile]);

  return (
    <div className='vertical-select-outer'>
      <div className='dropdown'>
        <Typography
          className='vertical-select-title bold description'
          color='primary'
          noWrap
        >
          Filter by MBTI
        </Typography>
        <IconButton>
          {open ? (
            <KeyboardArrowUpIcon
              className='vertical-select-icon'
              onClick={() => setOpen(!open)}
            />
          ) : (
            <KeyboardArrowDownIcon
              className='vertical-select-icon'
              onClick={() => setOpen(!open)}
            />
          )}
        </IconButton>
      </div>
      <Collapse in={open} className='vertical-select-container'>
        <div className='vertical-select'>
          {props.map((child, idx) => (
            <FormControl className='vertical-select-item' key={idx}>
              {breakpoints.mobile ? (
                <child.icon className='vertical-select-item-icon' />
              ) : null}
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onChange={(e) =>
                      child.checkedCallback(child.mbti, e.target.checked)
                    }
                  />
                }
                label={<Typography color='primary'>{child.label}</Typography>}
                labelPlacement={breakpoints.mobile ? 'end' : 'bottom'}
                className='vertical-select-item-label'
              />
            </FormControl>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default VerticalSelect;
