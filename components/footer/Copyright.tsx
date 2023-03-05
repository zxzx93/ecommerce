import { IoLocationSharp } from 'react-icons/io5';
import Link from 'next/link';

import styles from './styles.module.scss';

function Copyright({ country }) {
  const data = [
    {
      name: '개인정보 보호 센터',
      link: '',
    },
    {
      name: '개인정보 및 쿠키 정책',
      link: '',
    },
    {
      name: '쿠키 관리',
      link: '',
    },
    {
      name: '이용 약관',
      link: '',
    },
    {
      name: '저작권 고지',
      link: '',
    },
  ];

  return (
    <div className={styles.footer__copyright}>
      <section>©2022 All Rights Resereved.</section>
      <section>
        <ul>
          {data.map(link => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            {/* <a> */}
            <IoLocationSharp />
            {/* {country.name} */}
            {/* </a> */}
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Copyright;
