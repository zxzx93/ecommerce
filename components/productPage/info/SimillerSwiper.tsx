import Link from 'next/link';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { simillarProducts } from '../../../data/products';

import 'swiper/css';

function SimillerSwiper() {
  return (
    <Swiper
      className='swiper simillerSwiper productsSwiper'
      slidesPerView={4}
      spaceBetween={1}
      slidesPerGroup={2}
      modules={[Navigation]}
      breakpoints={{
        640: {
          width: 640,
          slidesPerView: 4,
        },
      }}
      navigation
    >
      {simillarProducts.map(p => (
        <SwiperSlide>
          <Link href='#'>
            <img src={p} alt='' />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SimillerSwiper;
