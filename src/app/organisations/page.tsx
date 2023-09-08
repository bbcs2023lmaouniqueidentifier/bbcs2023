'use client';
import ThemeWrapper from '../ThemeWrapper';
import MBTISelect from '../components/MBTIselect/MBTISelect';
import { selectProps } from './selectProps';
import { useContext, useState, useEffect } from 'react';
import { MediaQueryContext } from '../components/Providers/MediaQueryProvider';
import { TextField, Typography } from '@mui/material';
import { AuthContext } from '../components/Providers/AuthProvider';
import OrganisationCard, { OrganisationCardProps } from './OrganisationCard';

import { getOpps } from '../api/opps';
import { MBTI } from '../types';

import './styles.css';

interface OppRequestDetails {
  OpportunityName: string;
  OpportunityCreator: string;
  OpportunityLogo: File;
  OpportunityDesc: string;
  OpportunityShortDesc: string;
  opp_mbti: Array<string>;
}

export const Organisations = () => {
  const { theming } = useContext(MediaQueryContext);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [orgs, setOrgs] = useState<OrganisationCardProps[]>([]);
  const [filteredMBTIOrgs, setFilteredMBTIOrgs] = useState<OrganisationCardProps[]>([]);
  const [filteredSearchOrgs, setFilteredSearchOrgs] = useState<OrganisationCardProps[]>([]);

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

  useEffect(() => {
    getOpps().then((res) => {
      const mapped: OrganisationCardProps[] = res.map(
        (opp: OppRequestDetails) => {
          const mbti = structuredClone(defaultMBTI);
          Object.keys(mbti).map((key) => (mbti[key as keyof MBTI] = false));
          const joined = opp.opp_mbti.join('')
          
          const uniques = [...new Set(joined.split(''))];
          uniques.forEach((key: string) => {
            mbti[key as keyof MBTI] = true;
          });

          return {
            opp_name: opp.OpportunityName,
            opp_desc: opp.OpportunityDesc,
            opp_short_desc: opp.OpportunityShortDesc,
            opp_mbti: mbti,
            opp_logo: URL.createObjectURL(opp.OpportunityLogo),
          };
        },
      );
      setOrgs(mapped);
      setFilteredMBTIOrgs(mapped);
      setFilteredSearchOrgs(mapped);
    });
  }, []);

  const handleMBTI = (mbti: string, checked: boolean) => {
    const res = orgs.filter((org) => {
      return org.opp_mbti[mbti as keyof MBTI] === checked;
    });
    setFilteredMBTIOrgs(res);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
    const res = orgs.filter((org) => {
      return org.opp_name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredSearchOrgs(res);
  }

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <section className='organisations'>
        <div className='sidebar'>
          <TextField
            label='Search'
            variant='outlined'
            className='sidebar-search'
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <MBTISelect
            props={selectProps(
              user?.mbti && Object.values(user?.mbti).every((v) => !v)
                ? defaultMBTI
                : user?.mbti
                ? user?.mbti
                : defaultMBTI,
              handleMBTI,
            )}
          />
        </div>
        <div className='organisations-content'>
          <Typography
            className='organisations-title bold title'
            color='primary'
            noWrap
          >
            Opportunities
          </Typography>
          <Typography
            className='organisations-description description'
            color='primary'
          >
            Here are some opportunities that you may be interested in!
          </Typography>
          <div className='organisations-list'>
            {filteredMBTIOrgs.filter(value => filteredSearchOrgs.includes(value)).map((org, idx) => {
              return <OrganisationCard {...org} key={idx} />;
            })}
          </div>
        </div>
      </section>
    </ThemeWrapper>
  );
};

Organisations.displayName = 'Organisations';
export default Organisations;
