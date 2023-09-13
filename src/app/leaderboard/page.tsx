'use client';
import ThemeWrapper from '../ThemeWrapper';
import { useContext, useEffect, useState } from 'react';
import { MediaQueryContext } from '../components/Providers/MediaQueryProvider';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
} from '@mui/material';
import { AuthContext, User } from '../components/Providers/AuthProvider';
import { LevelCircle } from '../components/LevelCircle/LevelCircle';
import { AddHours } from '../components/AddHours/AddHours';
import { MBTI } from '@/app/types';
import { getUsers } from '../api/auth';

import './styles.css';

export const Leaderboard = () => {
  const { theming } = useContext(MediaQueryContext);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<
    { username: string; hours: number }[] | null
  >(null);
  if (!user) return null;
  const formula = (x: number) => {
    const commonDifference = 5;
    const level = Math.floor((x - 1) / commonDifference) + 1;
    return level;
  };

  const parseMBTI = (mbti: MBTI) => {
    if (Object.values(mbti).every((value) => value === false)) return '';

    return (
      (mbti.E ? 'E' : 'I') +
      (mbti.S ? 'S' : 'N') +
      (mbti.T ? 'T' : 'F') +
      (mbti.J ? 'J' : 'P')
    );
  };

  useEffect(() => {
    getUsers().then((res: { username: string; hours: number }[]) => {
      res.sort((a, b) => b.hours - a.hours);

      setUsers(res);
    });
  }, []);
  useEffect(() => console.log(users), [users]);

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <section className='leaderboard'>
        <div className='leaderboard-title'>
          <Typography className='bold title' color='primary' noWrap>
            Leaderboard
          </Typography>
          <Typography className='description' color='primary'>
            See who the most active volunteers are!
          </Typography>
        </div>
        <div className='leaderboard-content'>
          <div className='sidebar'>
            <LevelCircle {...user} className='level' />
            <AddHours {...user} className='add-hours' />
          </div>
          <div className='leaderboard-leaderboard'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell align='right'>Name</TableCell>
                    <TableCell align='right'>Level</TableCell>
                    <TableCell align='right'>Hours</TableCell>
                    <TableCell align='right'>MBTI</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell align='right'>{user.username}</TableCell>
                      <TableCell align='right'>
                        {formula(Number(user.hours))}
                      </TableCell>
                      <TableCell align='right'>{user.hours}</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </ThemeWrapper>
  );
};

Leaderboard.displayName = 'Leaderboard';
export default Leaderboard;
