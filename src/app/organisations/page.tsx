'use client';
import ThemeWrapper from '../ThemeWrapper';
import VerticalSelect from '../components/VerticalSelect/VerticalSelect';
import { selectProps } from './selectProps';
import { useContext } from 'react';
import { MediaQueryContext } from '../components/Providers/MediaQueryProvider';
import { TextField, Typography } from '@mui/material';
import OrganisationCard from './OrganisationCard';
import './styles.css';

export const Organisations = () => {
  const { theming } = useContext(MediaQueryContext);

  const temp = '/volunteers/volunteer3.png';

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <section className='organisations'>
        <div className='sidebar'>
          <TextField
            label='Search'
            variant='outlined'
            className='sidebar-search'
          />
          <VerticalSelect
            props={selectProps((mbti, checked) => console.log(mbti, checked))}
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
            />
            <OrganisationCard
              opp_name='Singapore Red Cross'
              opp_desc='The Singapore Red Cross is a homegrown humanitarian organisation dedicated to relieving human suffering, protecting lives and dignity and responding to emergencies since 1949. We are part of a world-wide, non-political, non-religious movement - the International Red Cross and Red Crescent Movement - comprising 190 National Societies, more than 17 million volunteers and 450,000 staff worldwide.'
              opp_logo={temp}
            />
            <OrganisationCard
              opp_name='Singapore Red Cross'
              opp_desc='The Singapore Red Cross is a homegrown humanitarian organisation dedicated to relieving human suffering, protecting lives and dignity and responding to emergencies since 1949. We are part of a world-wide, non-political, non-religious movement - the International Red Cross and Red Crescent Movement - comprising 190 National Societies, more than 17 million volunteers and 450,000 staff worldwide.'
              opp_logo={temp}
            />
            <OrganisationCard
              opp_name='Singapore Red Cross'
              opp_desc='The Singapore Red Cross is a homegrown humanitarian organisation dedicated to relieving human suffering, protecting lives and dignity and responding to emergencies since 1949. We are part of a world-wide, non-political, non-religious movement - the International Red Cross and Red Crescent Movement - comprising 190 National Societies, more than 17 million volunteers and 450,000 staff worldwide.'
              opp_logo={temp}
            />
          </div>
        </div>
      </section>
    </ThemeWrapper>
  );
};

Organisations.displayName = 'Organisations';
export default Organisations;
