import { useMediaQuery } from 'react-responsive';

import type {
  womenAccessories,
  womenDresses,
  womenShoes,
} from '../../../data/offers';

import styles from './styles.module.scss';

interface CategoryProps {
  header: string;
  products: typeof womenDresses | typeof womenShoes | typeof womenAccessories;
}

function Category({ header, products }: CategoryProps) {
  const isMedium = useMediaQuery({ query: '(max-width:1300px)' });
  const isMobile = useMediaQuery({ query: '(max-width:550px)' });

  return (
    <div className={styles.category}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <p>더보기</p>
      </div>
      <div className={styles.category__products}>
        {products.slice(0, isMobile ? 6 : isMedium ? 4 : 6).map(product => (
          <div className={styles.product}>
            <img src={product.image} alt='상품이미지' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
