'use client';
import ThemeWrapper from '../ThemeWrapper';
import MBTISelect from '../components/MBTIselect/MBTISelect';
import { selectProps } from './selectProps';
import { useContext } from 'react';
import { MediaQueryContext } from '../components/Providers/MediaQueryProvider';
import { TextField, Typography } from '@mui/material';
import { AuthContext } from '../components/Providers/AuthProvider';
import OrganisationCard from './OrganisationCard';
import './styles.css';

export const Organisations = () => {
  const { theming } = useContext(MediaQueryContext);
  const { user } = useContext(AuthContext);

  const temp = '/volunteers/volunteer3.png';
  const defaultMBTI = {
    E: true,
    I: true,
    S: true,
    N: true,
    T: true,
    F: true,
    J: true,
    P: true,
  };

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <section className='organisations'>
        <div className='sidebar'>
          <TextField
            label='Search'
            variant='outlined'
            className='sidebar-search'
          />
          <MBTISelect
            props={selectProps(user?.mbti || defaultMBTI, (mbti, checked) =>
              console.log(mbti, checked),
            )}
          />
        </div>
        <div>
          <Typography
            className='organisations-title bold title'
            color='primary'
            noWrap
          >
            Organisations
          </Typography>
          <Typography
            className='organisations-description description'
            color='primary'
          >
            Here are some organisations that you may be interested in!
          </Typography>
          <div className='organisations-list'>
            <OrganisationCard
              opp_name='Singapore Red Cross'
              opp_desc='The Singapore Red Cross is a homegrown humanitarian organisation dedicated to relieving human suffering, protecting lives and dignity and responding to emergencies since 1949. We are part of a world-wide, non-political, non-religious movement - the International Red Cross and Red Crescent Movement - comprising 190 National Societies, more than 17 million volunteers and 450,000 staff worldwide.'
              opp_logo={temp}
              opp_short_desc='hi'
            />
            <OrganisationCard
              opp_name='Singapore Red Cross'
              opp_desc='The Singapore Red Cross is a homegrown humanitarian organisation dedicated to relieving human suffering, protecting lives and dignity and responding to emergencies since 1949. We are part of a world-wide, non-political, non-religious movement - the International Red Cross and Red Crescent Movement - comprising 190 National Societies, more than 17 million volunteers and 450,000 staff worldwide.'
              opp_logo={temp}
              opp_short_desc='hi'
            />
            <OrganisationCard
              opp_name='Singapore Red Cross'
              opp_desc='The Singapore Red Cross is a homegrown humanitarian organisation dedicated to relieving human suffering, protecting lives and dignity and responding to emergencies since 1949. We are part of a world-wide, non-political, non-religious movement - the International Red Cross and Red Crescent Movement - comprising 190 National Societies, more than 17 million volunteers and 450,000 staff worldwide.'
              opp_logo={temp}
              opp_short_desc='hi'
            />
            <OrganisationCard
              opp_name='Singapore Red Cross'
              opp_desc='The Singapore Red Cross is a homegrown humanitarian organisation dedicated to relieving human suffering, protecting lives and dignity and responding to emergencies since 1949. We are part of a world-wide, non-political, non-religious movement - the International Red Cross and Red Crescent Movement - comprising 190 National Societies, more than 17 million volunteers and 450,000 staff worldwide.'
              opp_logo={temp}
              opp_short_desc='hi'
            />
          </div>
        </div>
      </section>
    </ThemeWrapper>
  );
};

Organisations.displayName = 'Organisations';
export default Organisations;
