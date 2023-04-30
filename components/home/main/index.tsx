import Header from './header';
import Menu from './menu';
import Offers from './offers';
import MainSwiper from './swiper';
import User from './user';

import styles from './styles.module.scss';

function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}

export default Main;
