import { Typography } from '@mui/material';
import { OppDetails } from '../auth/createopp/page';
import { AccountDetails } from '../types';
import Image from 'next/image';
import './styles.css';

type OrganisationCardProps = Omit<
  OppDetails,
  keyof AccountDetails | 'opp_logo'
> & { opp_logo: string };

export const OrganisationCard = ({
  opp_logo,
  opp_name,
  opp_desc,
}: OrganisationCardProps) => {
  return (
    <div className='organisation-card'>
      <div className='organisation-card-image'>
        <Image
          src={opp_logo}
          alt='organisation-logo'
          width={0}
          height={0}
          unoptimized
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className='organisation-card-details'>
        <Typography
          className='organisation-card-title bold subtitle'
          color='primary'
          noWrap
        >
          {opp_name}
        </Typography>
        <Typography
          className='organisation-card-description description'
          color='primary'
        >
          {opp_desc}
        </Typography>
      </div>
    </div>
  );
};

export default OrganisationCard;
