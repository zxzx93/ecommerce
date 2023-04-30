import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { flashDealsArray } from '../../../data/offers';
import CountDown from '../countdown';

import FlashCard from './FlashCard';

import 'swiper/css';
import styles from './styles.module.scss';

function FlashDeals() {
  return (
    <div className={styles.flashdDeals}>
      <div className={styles.flashdDeals__header}>
        <h1>타임세일</h1>
        <CountDown date={new Date(2023, 10, 1)} />
      </div>

      <Swiper
        className='flashDealsSwiper'
        slidesPerView={1}
        spaceBetween={20}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          450: { slidesPerView: 2 },
          630: { slidesPerView: 3 },
          920: { slidesPerView: 4 },
          1240: { slidesPerView: 5 },
          1500: { slidesPerView: 6 },
        }}
        navigation
        loop
      >
        <div className={styles.flashdDeals__list}>
          {flashDealsArray.map((item, i) => (
            <SwiperSlide>
              <FlashCard key={i} product={item} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default FlashDeals;
