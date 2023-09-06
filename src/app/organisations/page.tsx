'use client';
import ThemeWrapper from '../ThemeWrapper';
import VerticalSelect, {
  VerticalSelectProps,
} from '../components/VerticalSelect/VerticalSelect';
import { selectProps } from './selectProps';
import { useContext } from 'react';
import { MediaQueryContext } from '../components/Providers/MediaQueryProvider';

export const Organisations = () => {
  const { theming } = useContext(MediaQueryContext);

  return (
    <ThemeWrapper darkTheme={theming.darkMode}>
      <div>
        <VerticalSelect
          props={selectProps((mbti, checked) => console.log(mbti, checked))}
        />
      </div>
    </ThemeWrapper>
  );
};

Organisations.displayName = 'Organisations';
export default Organisations;
