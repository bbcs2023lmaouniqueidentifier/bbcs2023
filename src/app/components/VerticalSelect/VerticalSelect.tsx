'use client';
import { Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { MBTI } from '../../types';
import {
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import './styles.css';

export interface VerticalSelectProps {
  icon: SvgIconComponent;
  label: string;
  mbti: keyof MBTI;
  checkedCallback: (mbti: keyof MBTI, checked: boolean) => void;
}

export const VerticalSelect = ({ props }: { props: VerticalSelectProps[] }) => {
  return (
    <FormGroup className='vertical-select'>
      {props.map((child, idx) => {
        return (
          <FormControl className='vertical-select-item' key={idx}>
            <child.icon className='vertical-select-item-icon' />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    child.checkedCallback(child.mbti, e.target.checked)
                  }
                />
              }
              label={<Typography color='primary'>{child.label}</Typography>}
              labelPlacement='end'
            />
          </FormControl>
        );
      })}
    </FormGroup>
  );
};

export default VerticalSelect;
