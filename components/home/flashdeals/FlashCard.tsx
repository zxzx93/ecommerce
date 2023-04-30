import { MdFlashOn } from 'react-icons/md';
import Link from 'next/link';

import type { flashDealsArray } from '../../../data/offers';

import styles from './styles.module.scss';

interface FlashdDealsCardProps {
  product: (typeof flashDealsArray)[0];
}

function FlashCard({ product }: FlashdDealsCardProps) {
  const price = Number(product.price);
  const discount = Number(product.discount);

  const discountedPrice = price - price / discount;
  const originalPrice = price - (price - price / discount);

  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <Link href={product.link}>
          <img src={product.image} alt='' />
        </Link>
        {/* <div className={styles.flash}>
          <MdFlashOn />
          <span>-{product.discount}%</span>
        </div> */}
      </div>
      <div className={styles.card__price}>
        <span>₩ {discountedPrice.toFixed(0)}</span>
        <span>₩ {originalPrice.toFixed(0)}</span>
      </div>
      <div className={styles.card__bar}>
        <div className={styles.card__bar_inner} style={{ width: '75%' }} />
      </div>
      <div className={styles.card__percentage}>{product.sold}%</div>
    </div>
  );
}

export default FlashCard;
