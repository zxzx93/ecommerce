import { useState } from 'react';
import { BsSuitHeart } from 'react-icons/bs';
import { MdSecurity } from 'react-icons/md';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';

import UserMenu from './UserMenu';

import styles from './styles.module.scss';

function Top() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isVisibled, setIsVisibled] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img
              src='https://i.namu.wiki/s/43a07e65f573eb41fffe67ac0d1008fa73b5c7a04a004ff9004ddf0680524c5c5bd8a30c724fd7966bd7d3a2f60d0bd17c3cc159dd41f704f9b6dc188a21346d7fc0f6e8264bb177c273d72b05e7f1179242aff70fdd95d2f3d71e77d60073a7'
              alt='태극기'
            />
            <span>Korea / 원</span>
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
            {loggedIn ? (
              <div className={styles.flex}>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/4333/4333609.png'
                  alt='사용자 이미지'
                />
                <span>vicky</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              <div className={styles.flex}>
                <RiAccountPinCircleLine />
                <span>계정</span>
                <RiArrowDropDownFill />
              </div>
            )}

            {isVisibled && <UserMenu loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Top;
