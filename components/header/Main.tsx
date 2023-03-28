import { FaOpencart } from 'react-icons/fa';
import { RiSearch2Line } from 'react-icons/ri';
import Link from 'next/link';

import styles from './styles.module.scss';

function Main() {
  // const { cart } = useSelector(state => {
  //   state;
  // });

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href='/'>
          <div className={styles.logo}>
            <img src='../../../logo.png' alt='로고 이미지' />
          </div>
        </Link>
        <div className={styles.search}>
          <input type='text' placeholder='검색어를 입력하세요.' />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>

        <Link href='/cart'>
          <div className={styles.cart}>
            <FaOpencart />
            <span>{0}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Main;
