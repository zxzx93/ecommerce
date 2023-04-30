import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'swiper/css';

function MainSwiper() {
  return (
    <Swiper
      className='mainSwiper'
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      spaceBetween={30}
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
      {[...Array(2).keys()].map(i => (
        <SwiperSlide>
          <img
            src={`../../../images/swiper/${i + 1}.jpg`}
            alt='슬라이드 이미지'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainSwiper;
