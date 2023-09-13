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

export interface MBTISelectProps {
  icon: SvgIconComponent;
  label: string;
  mbti: keyof MBTI;
  checked: boolean;
  checkedCallback: (mbti: keyof MBTI, checked: boolean) => void;
}

// if false, a grid is used
// if true, a column is used
type column = {
  isColumn: boolean;
};

export const MBTISelect = ({
  props,
  column,
}: {
  props: MBTISelectProps[];
  column?: column;
}) => {
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
    <div
      className='vertical-select-outer'
      style={column?.isColumn ? undefined : { width: '100% !important' }}
    >
      <div
        className='dropdown'
        style={
          column?.isColumn ? undefined : { alignSelf: 'center !important' }
        }
      >
        <Typography
          className='vertical-select-title bold description'
          color='primary'
          noWrap
        >
          Filter by MBTI
        </Typography>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? (
            <KeyboardArrowUpIcon className='vertical-select-icon' />
          ) : (
            <KeyboardArrowDownIcon className='vertical-select-icon' />
          )}
        </IconButton>
      </div>
      <Collapse in={open} className='vertical-select-container'>
        <div
          className={
            'vertical-select' + (column?.isColumn ? '' : ' not-column')
          }
        >
          {props.map((child, idx) => (
            <FormControl className='vertical-select-item' key={idx}>
              {breakpoints.mobile ? (
                <child.icon className='vertical-select-item-icon' />
              ) : null}
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={child.checked}
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

export default MBTISelect;
