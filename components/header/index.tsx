import type { CountryProps } from '../../Interfaces/Country.interface';

import Ad from './Ad';
import Main from './Main';
import Top from './Top';

import styles from './styles.module.scss';

function Header({ country }: CountryProps) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </header>
  );
}

export default Header;
