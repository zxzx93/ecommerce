import { useState } from 'react';
import { BsSuitHeart } from 'react-icons/bs';
import { MdSecurity } from 'react-icons/md';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import type { CountryProps } from '../../Interfaces/Country.interface';

import UserMenu from './UserMenu';

import styles from './styles.module.scss';

function Top({ country }: CountryProps) {
  const { data: session } = useSession();

  const [isVisibled, setIsVisibled] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={`${country.flag}`} alt='국기' />
            <span>{country.name} / 원</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>고객 서비스</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href='/profile/wishlist'>
              <span>장바구니</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setIsVisibled(true)}
            onMouseLeave={() => setIsVisibled(false)}
            onFocus={() => {}}
          >
            {session ? (
              <div className={styles.flex}>
                <img src={session?.user?.image} alt='사용자 이미지' />
                <span>{session?.user?.name}</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              <div className={styles.flex}>
                <RiAccountPinCircleLine />
                <span>계정</span>
                <RiArrowDropDownFill />
              </div>
            )}

            {isVisibled && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Top;
