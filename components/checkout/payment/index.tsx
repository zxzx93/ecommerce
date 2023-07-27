import paymentMethods from '../../../data/paymentMethods';
import handleKeyDown from '../../../utils/helpers/keyboardHandlers';

import styles from './styles.module.scss';

interface PaymentProps {
  paymentProps: {
    paymentMethod?: 'paypal' | 'credit_card';
    setPaymentMethod: (id: 'paypal' | 'credit_card') => void;
  };
}

function Payment({
  paymentProps: { paymentMethod, setPaymentMethod },
}: PaymentProps) {
  return (
    <div className={styles.payment}>
      <div className={styles.header}>
        <h3>주문/결제</h3>
      </div>
      {paymentMethods.map(pm => (
        <div
          key={pm.id}
          className={styles.payment__item}
          style={{ background: `${paymentMethod === pm.id ? '#f5f5f5' : ''}` }}
          aria-checked={paymentMethod === pm.id}
          onClick={() => setPaymentMethod(pm.id)}
          onKeyDown={e => handleKeyDown(e, () => setPaymentMethod(pm.id))}
          role='radio'
          tabIndex={0}
        >
          <input
            type='radio'
            name='payment'
            checked={paymentMethod === pm.id}
            onChange={() => setPaymentMethod(pm.id)}
          />
          <img src={`../../../images/checkout/${pm.id}.webp`} alt={pm.name} />

          <div className={styles.payment__item_col}>
            <span>{pm.name}로 결제하기</span>
            <p>
              {pm.images.length > 0
                ? pm.images.map(img => (
                    <img
                      src={`../../../images/payment/${img}.webp`}
                      alt={img}
                      key={img}
                    />
                  ))
                : pm.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Payment;
