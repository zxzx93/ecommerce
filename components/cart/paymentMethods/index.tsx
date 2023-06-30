import styles from './styles.module.scss';

function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>결제</h2>
      <div className={styles.image}>
        <img src='../../../images/payment/visa.webp' alt='' />
        <img src='../../../images/payment/mastercard.webp' alt='' />
        <img src='../../../images/payment/paypal.webp' alt='' />
      </div>
      <h2 className={styles.header}>구매 보장</h2>
      <div className={styles.protection}>
        <img src='../../../images/protection.png' alt='' />
        상품이 설명과 다르거나 배송되지 않은 경우 전액 환불 받으세요.
      </div>
    </div>
  );
}

export default PaymentMethods;
