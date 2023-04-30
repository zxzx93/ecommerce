import { BiCategory } from 'react-icons/bi';
import Link from 'next/link';

import { menuArray } from '../../../data/offers';

import styles from './styles.module.scss';

function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <Link href='/' className={styles.menu__header}>
            <span>
              <BiCategory />
            </span>
            <span>카테고리</span>
          </Link>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map(menu => (
            <li>
              <Link href={menu.link}>
                <span>{menu.icon}</span>
                <span>{menu.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default Menu;
