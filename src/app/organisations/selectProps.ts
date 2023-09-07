'use client';
import { MBTISelectProps } from '../components/MBTIselect/MBTISelect';
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
  checked: MBTI,
  checkedCallback: (mbti: keyof MBTI, checked: boolean) => void,
) => MBTISelectProps[];

export const selectProps: selectProps = (checked, checkedCallback) => [
  {
    icon: MicExternalOnIcon,
    label: 'Extroverted',
    mbti: 'E',
    checked: checked.E,
    checkedCallback: checkedCallback,
  },
  {
    icon: HeadsetMicIcon,
    label: 'Introverted',
    mbti: 'I',
    checked: checked.I,
    checkedCallback: checkedCallback,
  },
  {
    icon: PublicIcon,
    label: 'Sensing',
    mbti: 'S',
    checked: checked.S,
    checkedCallback: checkedCallback,
  },
  {
    icon: ListAltIcon,
    label: 'Intuition',
    mbti: 'N',
    checked: checked.N,
    checkedCallback: checkedCallback,
  },
  {
    icon: EmojiObjectsIcon,
    label: 'Thinking',
    mbti: 'T',
    checked: checked.T,
    checkedCallback: checkedCallback,
  },
  {
    icon: MoodIcon,
    label: 'Feeling',
    mbti: 'F',
    checked: checked.F,
    checkedCallback: checkedCallback,
  },
  {
    icon: EventNoteIcon,
    label: 'Judging',
    mbti: 'J',
    checked: checked.J,
    checkedCallback: checkedCallback,
  },
  {
    icon: FlightIcon,
    label: 'Perceiving',
    mbti: 'P',
    checked: checked.P,
    checkedCallback: checkedCallback,
  },
];
