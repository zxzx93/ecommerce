import { MdPlayArrow } from 'react-icons/md';
import Link from 'next/link';

import styles from './styles.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href='/'>
            <img src='../../../logo.png' alt='로고' />
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link href='/browse'>
            쇼핑 계속하기
            <MdPlayArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
