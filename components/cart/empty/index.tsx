import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src='../icons/empty-cart.png' alt='장바구니 빈 이모티콘' />
      <h4>장바구니가 비었습니다.</h4>
      {!session && (
        <button className={styles.empty__btn} onClick={() => signIn()}>
          로그인 / 회원가입
        </button>
      )}
      <Link href='/browse'>
        <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
          쇼핑하기
        </button>
      </Link>
    </div>
  );
}

export default Empty;
