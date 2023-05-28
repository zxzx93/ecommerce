import { useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';

import { ProductImage } from '../../../interfaces/Product.interface';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import styles from './styles.module.scss';

interface MainSwiperProps {
  images: ProductImage[];
  activeImg: string;
}

function MainSwiper({ images, activeImg }: MainSwiperProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <InnerImageZoom
          src={activeImg || images[active].url}
          zoomScale={3}
          zoomType='hover'
        />
      </div>
      <div className={styles.swiper__list}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`${styles.swiper__list_item} ${
              i === active ? styles.active : ''
            }`}
            onMouseOver={() => setActive(i)}
            onFocus={() => {}}
          >
            <img src={img.url} alt='상품 디테일 이미지' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainSwiper;
