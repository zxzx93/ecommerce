import { ICart } from '../../../interfaces/back/Cart.interface';
import { numberWithCommas } from '../../../utils/formatting/numberFormat';

import styles from './styles.module.scss';

interface ProductsProps {
  cart: ICart;
}

function products({ cart }: ProductsProps) {
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h3>장바구니</h3>
        <span>
          {cart.products.length === 1
            ? '1개 상품'
            : `${cart.products.length}개 상품`}
        </span>
      </div>

      <div className={styles.products__wrap}>
        {cart.products.map(product => {
          const productName =
            product.name?.length || 0 > 18
              ? `${product.name?.substring(0, 18)}...`
              : product.name;
          const productPrice = (product?.price ?? 0) * (product?.qty ?? 0);

          return (
            <div className={styles.product} key={product._id?.toString()}>
              <div className={styles.product__img}>
                <img src={product.image?.url} alt='' />
                <div className={styles.product__infos}>
                  <img src={product.color?.image} alt='' />
                  <span>{product.size}</span>
                  <span>x{product.qty}</span>
                </div>
              </div>
              <div className={styles.product__name}>{productName}</div>
              <div className={styles.product__price}>
                {numberWithCommas(productPrice)}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.products__total}>
        소계 : <b>{numberWithCommas(cart?.cartTotal || 0)}</b>
      </div>
    </div>
  );
}

export default products;
