import { useEffect, useRef } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Image } from '../../interfaces/front/Product.interface';

import 'swiper/css';
import styles from './styles.module.scss';

interface ProductSwiperProps {
  images: Image[];
}

function ProductSwiper({ images }: ProductSwiperProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    swiperRef.current?.swiper.autoplay.stop();
  }, [swiperRef]);

  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => swiperRef.current.swiper.autoplay.start()}
      onMouseLeave={() => swiperRef.current.swiper.slideTo(0)}
    >
      <Swiper
        // className='mainSwiper'
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{
          delay: 500,
          stopOnLastSlide: false,
        }}
        speed={500}
        centeredSlides
      >
        {images.map(img => (
          <SwiperSlide>
            <img src={img.url} alt='슬라이드 이미지' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSwiper;
