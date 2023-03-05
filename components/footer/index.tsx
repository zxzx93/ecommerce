import Copyright from './Copyright';
import Links from './Links';
import Newsletter from './Newsletter';
import Payment from './Payment';
import Socials from './Socials';

import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <Newsletter />
        <Payment />
        <Copyright />
      </div>
    </footer>
  );
}

export default Footer;
