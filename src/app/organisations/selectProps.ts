'use client';
import { VerticalSelectProps } from '../components/VerticalSelect/VerticalSelect';
import { MBTI } from '../types';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PublicIcon from '@mui/icons-material/Public';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MoodIcon from '@mui/icons-material/Mood';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FlightIcon from '@mui/icons-material/Flight';

type selectProps = (
  checkedCallback: (mbti: keyof MBTI, checked: boolean) => void,
) => VerticalSelectProps[];

export const selectProps: selectProps = (checkedCallback) => [
  {
    icon: MicExternalOnIcon,
    label: 'Extroverted',
    mbti: 'E',
    checkedCallback: checkedCallback,
  },
  {
    icon: HeadsetMicIcon,
    label: 'Introverted',
    mbti: 'I',
    checkedCallback: checkedCallback,
  },
  {
    icon: PublicIcon,
    label: 'Sensing',
    mbti: 'S',
    checkedCallback: checkedCallback,
  },
  {
    icon: ListAltIcon,
    label: 'Intuition',
    mbti: 'N',
    checkedCallback: checkedCallback,
  },
  {
    icon: EmojiObjectsIcon,
    label: 'Thinking',
    mbti: 'T',
    checkedCallback: checkedCallback,
  },
  {
    icon: MoodIcon,
    label: 'Feeling',
    mbti: 'F',
    checkedCallback: checkedCallback,
  },
  {
    icon: EventNoteIcon,
    label: 'Judging',
    mbti: 'J',
    checkedCallback: checkedCallback,
  },
  {
    icon: FlightIcon,
    label: 'Perceiving',
    mbti: 'P',
    checkedCallback: checkedCallback,
  },
];
