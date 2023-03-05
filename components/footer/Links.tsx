import Link from 'next/link';

import styles from './styles.module.scss';

interface FooterLinks {
  heading: string;
  links: {
    name: string;
    link: string;
  }[];
}

const links: FooterLinks[] = [
  {
    heading: 'SHOPPAY',
    links: [
      {
        name: '회사 소개',
        link: '',
      },
      {
        name: '문의하기',
        link: '',
      },
    ],
  },
  {
    heading: '도움말 & 지원',
    links: [
      {
        name: '배송 정보',
        link: '',
      },
      {
        name: '반품',
        link: '',
      },
      {
        name: '주문 방법',
        link: '',
      },
      {
        name: '추적 방법',
        link: '',
      },
      {
        name: '사이즈 가이드',
        link: '',
      },
    ],
  },
  {
    heading: '고객 서비스',
    links: [
      {
        name: '고객 서비스',
        link: '',
      },
      {
        name: '약관 및 조건',
        link: '',
      },
      {
        name: '소비자(거래)',
        link: '',
      },
      {
        name: '피드백 설문조사 참여하기',
        link: '',
      },
    ],
  },
];

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul>
          {i === 0 ? (
            <img src='../../../logo.png' alt='' />
          ) : (
            <b>{link.heading}</b>
          )}
          {link.links.map(l => (
            <li>
              <Link href={l.link}>{l.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
