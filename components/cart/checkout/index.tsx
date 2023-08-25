import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import { CartItem } from '../../../interfaces/front/Cart.interface';
import { fetchSaveCart } from '../../../utils/fetchApi/fetchCart';
import { numberWithCommas } from '../../../utils/formatting/numberFormat';
import withRequestPrevention from '../../../utils/helpers/withRequestPrevention';

import styles from './styles.module.scss';

interface CheckoutProps {
  shippingFee: number;
  subTotal: number;
  total: number;
  selectedItems: CartItem[];
}

function Checkout({
  shippingFee,
  subTotal,
  total,
  selectedItems,
}: CheckoutProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const itemsLength = selectedItems.length;

  const saveCartToDBHandler = async () => {
    if (session) {
      const res = await fetchSaveCart(selectedItems);
      router.push('/checkout');
    } else {
      signIn();
    }
  };

  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>주문 요약</h2>
      <div className={styles.cart__checkout_line}>
        <span>금액</span>
        <span>{numberWithCommas(subTotal)}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>배송료</span>
        <span>{numberWithCommas(shippingFee)}</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>전체 금액</span>
        <span>{numberWithCommas(total)}</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={itemsLength === 0}
          style={{
            background: `${itemsLength === 0 ? '#eee' : ''}`,
            cursor: `${itemsLength === 0 ? 'not-allowed' : ''}`,
          }}
          onClick={withRequestPrevention(saveCartToDBHandler, {
            loadingDelay: 2000,
          })}
        >
          계속하기
        </button>
      </div>
    </div>
  );
}

export default Checkout;
