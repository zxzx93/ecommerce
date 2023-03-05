import Links from './Links';

import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
      </div>
    </footer>
  );
}

export default Footer;
