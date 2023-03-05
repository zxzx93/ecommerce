import Link from 'next/link';

import styles from './styles.module.scss';

interface LoggedIn {
  loggedIn: boolean;
}

function UserMenu({ loggedIn }: LoggedIn) {
  return (
    <div className={styles.menu}>
      <h4>환영합니다.</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            className={styles.menu__img}
            src='https://cdn-icons-png.flaticon.com/512/4333/4333609.png'
            alt='사용자 이미지'
          />
          <div className={styles.col}>
            {/* <span>welcome back</span> */}
            <h3>닉네임</h3>
            <span>로그아웃</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button type='button' className={styles.btn_primary}>
            회원가입
          </button>
          <button type='button' className={styles.btn_outlined}>
            로그인
          </button>
        </div>
      )}

      <ul>
        <li>
          <Link href='/profile'>계정</Link>
        </li>
        <li>
          <Link href='/profile/orders'>주문내역</Link>
        </li>
        <li>
          <Link href='/profile/messages'>메세지</Link>
        </li>
        <li>
          <Link href='/profile/address'>주소 관리</Link>
        </li>
        <li>
          <Link href='/profile/whishlist'>장바구니</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
