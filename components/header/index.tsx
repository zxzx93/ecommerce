import Ad from './Ad';
import Main from './Main';
import Top from './Top';

import styles from './styles.module.scss';

export interface HeaderProps {
  country: { name: string; flag: string } | string;
}

function Header({ country }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </header>
  );
}

export default Header;
