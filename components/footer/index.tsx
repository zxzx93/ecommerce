import Copyright from './Copyright';
import Links from './Links';
import Newsletter from './Newsletter';
import Payment from './Payment';
import Socials from './Socials';

import styles from './styles.module.scss';

export interface FooterProps {
  country: { name: string; flag: string } | string;
}

function Footer({ country }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <Newsletter />
        <Payment />
        <Copyright country={{ name: 'KOREA', flag: 'KOREA' }} />
      </div>
    </footer>
  );
}

export default Footer;
