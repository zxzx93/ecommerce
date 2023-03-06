import Link from 'next/link';

import styles from './styles.module.scss';

function Newsletter() {
  return (
    <div className={styles.footer__newsletter}>
      <h4>뉴스레터 신청하기</h4>
      <div className={styles.footer__flex}>
        <input type='text' placeholder='이메일 주소를 입력해주세요.' />
        <button type='submit' className={styles.btn_primary}>
          구독 신청
        </button>
      </div>

      <p>
        구독 버튼을 클릭하면 당사의 <Link href='/'>개인정보 및 쿠키 정책</Link>
        에 동의하는 것입니다.
      </p>
    </div>
  );
}

export default Newsletter;
