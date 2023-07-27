import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Router from 'next/router';
import { InferType, object, string } from 'yup';

import { TCart } from '../../../models/Cart';
import { TUser } from '../../../models/User';
import {
  fetchApplyCoupon,
  fetchPlaceOrder,
} from '../../../utils/fetchApi/fetchUser';
import { numberWithCommas } from '../../../utils/formatting/numberFormat';
import ShippingInput from '../../inputs/shippingInput/ShippingInput';

import styles from './styles.module.scss';

interface SummaryProps {
  user: TUser;
  cart: TCart;
  paymentMethod?: 'paypal' | 'credit_card';
  selectedAddressProps: {
    selectedAddress?: TUser['address'][number];
    setSelectedAddress?: (address: TUser['address'][number]) => void;
  };
  totalAfterDiscountProps: {
    totalAfterDiscount: number;
    setTotalAfterDiscount: (discount: number) => void;
  };
}

const SummarySchema = object({
  coupon: string().required('쿠폰을 입력해주세요.'),
});

type SummaryData = InferType<typeof SummarySchema>;

function Summary({
  // user,
  cart,
  paymentMethod,
  selectedAddressProps: { selectedAddress, setSelectedAddress },
  totalAfterDiscountProps: { totalAfterDiscount, setTotalAfterDiscount },
}: SummaryProps) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [orderError, setOrderError] = useState('');

  const SummaryMethod = useForm<SummaryData>({
    resolver: yupResolver(SummarySchema),
  });

  const { handleSubmit, reset, clearErrors } = SummaryMethod;

  const applyCouponHandler = async () => {
    const res = await fetchApplyCoupon(coupon);
    if (res.message) {
      setError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError('');
    }
  };

  const placeOrderHandler = async () => {
    const res = await fetchPlaceOrder({
      products: cart.products,
      shippingAddress: selectedAddress,
      paymentMethod,
      total: totalAfterDiscount !== 0 ? totalAfterDiscount : cart.cartTotal,
      // totalBeforeDiscount: cart.cartTotal,
      // couponApplied: coupon,
    });
    if (res.message) {
      setOrderError(res.message);
    } else {
      setOrderError('');
      Router.push(`/order/${res.orderId}`);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>주문 요약</h3>
      </div>

      <div className={styles.coupon}>
        <FormProvider {...SummaryMethod}>
          <form onSubmit={handleSubmit(applyCouponHandler)}>
            <ShippingInput
              name='coupon'
              placeholder='*쿠폰'
              onChange={e => setCoupon(e.target.value)}
            />
            <button type='submit'>쿠폰 적용</button>

            <div className={styles.infos}>
              <span>
                전체 금액 : <b>{numberWithCommas(cart.cartTotal ?? 0)}</b>
              </span>
              {discount > 0 && (
                <span className={styles.coupon_span}>
                  쿠폰 적용 : <b>-{discount}%</b>
                </span>
              )}
              {cart.cartTotal &&
                totalAfterDiscount < cart.cartTotal &&
                totalAfterDiscount !== 0 && (
                  <span>
                    새로운 가격 :<b>{numberWithCommas(totalAfterDiscount)}</b>
                  </span>
                )}
            </div>
          </form>
        </FormProvider>
      </div>

      <button
        className={styles.submit_btn}
        type='submit'
        onClick={() => placeOrderHandler()}
      >
        주문/결제
      </button>

      {orderError && <div className={styles.error}>{orderError}</div>}
    </div>
  );
}

export default Summary;
