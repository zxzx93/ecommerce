import Link from 'next/link';
import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import styles from './styles.module.scss';

interface SessionProps {
  session: Session;
}
function UserMenu({ session }: SessionProps) {
  return (
    <div className={styles.menu}>
      <h4>환영합니다.</h4>
      {session ? (
        // Todo 타입에러남!
        <div className={styles.flex}>
          <img
            className={styles.menu__img}
            src={session.user?.image}
            alt='사용자 이미지'
          />
          <div className={styles.col}>
            <span>welcome back</span>
            <h3>{session.user?.name}</h3>
            <span
              onClick={() => signOut()}
              onKeyDown={() => signOut()}
              role='button'
              tabIndex={0}
            >
              로그아웃
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button type='button' className={styles.btn_primary}>
            회원가입
          </button>
          <button
            type='button'
            className={styles.btn_outlined}
            onClick={() => signIn()}
          >
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
