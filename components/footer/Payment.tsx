import styles from './styles.module.scss';

function Payment() {
  return (
    <div className={styles.footer__spayment}>
      <h4>사용가능 카드</h4>
      <div className={styles.footer__flexwrap}>
        <img src='../../../images/payment/visa.webp' alt='비자' />
        <img src='../../../images/payment/mastercard.webp' alt='비자' />
        <img src='../../../images/payment/paypal.webp' alt='비자' />
      </div>
    </div>
  );
}

export default Payment;
