import { AiOutlineMessage } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/effect-cards';

import { userSwiperArray } from '../../../data/offers';

import 'swiper/css';
import styles from './styles.module.scss';

export default function User() {
  const { data: session } = useSession();

  return (
    <div className={styles.user}>
      <img
        src='../../../images/userHeader.jpg'
        alt=''
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <>
            <div className={styles.user__infos}>
              <img src={session.user?.image as string} alt='' />
              <h4>{session.user?.name}</h4>
            </div>

            <ul className={styles.user__links}>
              <li>
                <Link href='/profile'>
                  <IoSettingsOutline />
                </Link>
                <p>계정</p>
              </li>
              <li>
                <Link href='/'>
                  <HiOutlineClipboardList />
                </Link>
                <p>주문</p>
              </li>
              <li>
                <Link href='/'>
                  <AiOutlineMessage />
                </Link>
                <p>메세지</p>
              </li>
            </ul>
          </>
        ) : (
          <div className={styles.user__infos}>
            <img
              src='https://ae01.alicdn.com/kf/Hf768b4fa794e44bfb7cc86e4a528a035h.png'
              alt=''
            />
            <div className={styles.user__infos_btns}>
              <button onClick={() => signIn()}>회원가입</button>
              <button onClick={() => signIn()}>로그인</button>
            </div>
          </div>
        )}

        <div className={styles.user__swiper}>
          <Swiper
            className='userMenuSwiper'
            slidesPerView={3}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop
          >
            {userSwiperArray.map(item => (
              <SwiperSlide>
                <Link href='/'>
                  <img src={item.image} alt='' />
                  <span>{item.price}원</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
