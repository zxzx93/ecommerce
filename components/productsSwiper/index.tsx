import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';

import type { womenSwiper } from '../../data/offers';

import 'swiper/css';
import styles from './styles.module.scss';

interface ProductsSwiperProps {
  header?: string;
  products: typeof womenSwiper;
}

function ProductsSwiper({ header, products }: ProductsSwiperProps) {
  return (
    <div className={styles.wrapper}>
      {header && <div className={styles.header}>{header}</div>}

      <Swiper
        className='productsSwiper'
        slidesPerView={1}
        spaceBetween={30}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          450: { slidesPerView: 2 },
          630: { slidesPerView: 3 },
          920: { slidesPerView: 4 },
          1240: { slidesPerView: 5 },
          1500: { slidesPerView: 6 },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation
        loop
      >
        {products.map(product => (
          <SwiperSlide>
            <div className={styles.product}>
              <div className={styles.product__image}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.product__infos}>
                <h3>
                  {product.name.length > 30
                    ? `${product.name.slice(0, 30)}...`
                    : product.name}
                </h3>
                {product.price && <span>₩ {product.price}</span>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductsSwiper;
