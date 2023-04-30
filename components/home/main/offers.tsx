import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';

import { offersAarray } from '../../../data/offers';

import 'swiper/css';
import styles from './styles.module.scss';

function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        className='offerSwiper'
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        loop
      >
        {offersAarray.map(offer => (
          <SwiperSlide>
            <Link href='/'>
              <img src={offer.image} alt='offer 이미지' />
              <span>{offer.price}원</span>
              <span>{offer.discount}%</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Offers;
