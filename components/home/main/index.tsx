import MainSwiper from './swiper';

import styles from './styles.module.scss';

function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <MainSwiper />
      <div className={styles.offer}>offer</div>
      <div className={styles.user}>user</div>
    </div>
  );
}

export default Main;
