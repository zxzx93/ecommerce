import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Router from 'next/router';
import withRequestPrevention from 'utils/helpers/withRequestPrevention';
import { InferType, object, string } from 'yup';

import { ICart } from '../../../interfaces/back/Cart.interface';
import { IUser } from '../../../interfaces/back/User.interface';
import { Address } from '../../../interfaces/front/User.interface';
import {
  fetchApplyCoupon,
  fetchPlaceOrder,
} from '../../../utils/fetchApi/fetchUser';
import { numberWithCommas } from '../../../utils/formatting/numberFormat';
import ShippingInput from '../../inputs/shippingInput/ShippingInput';

import styles from './styles.module.scss';

interface SummaryProps {
  user: IUser;
  cart: ICart;
  paymentMethod?: 'tosspay';
  selectedAddressProps: {
    selectedAddress?: Address;
    setSelectedAddress?: (address: Address) => void;
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
  selectedAddressProps: {
    selectedAddress,
    //  setSelectedAddress
  },
  totalAfterDiscountProps: { totalAfterDiscount, setTotalAfterDiscount },
}: SummaryProps) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderError, setOrderError] = useState('');

  const SummaryMethod = useForm<SummaryData>({
    resolver: yupResolver(SummarySchema),
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setError: setCoponFormError,
  } = SummaryMethod;

  const getCouponSubmitValue = getValues('coupon');

  const applyCouponHandler = async () => {
    const res = await fetchApplyCoupon(coupon);
    if (res.message) {
      setCoponFormError('coupon', { message: res.message });
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
    }
  };

  const placeOrderHandler = async () => {
    const res = await fetchPlaceOrder({
      products: cart.products,
      shippingAddress: selectedAddress,
      paymentMethod,
      total: totalAfterDiscount || cart.cartTotal,
      totalBeforeDiscount: cart?.cartTotal,
      couponApplied: coupon,
    });
    if (res.message) {
      setOrderError(res.message);
    } else {
      setOrderError('');
      if (res.orderId) {
        Router.push(`/order/${res.orderId}`);
      } else {
        // Handle the case where orderId is undefined or an unexpected value.
        // You may display an error message or implement an alternative flow.
      }
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>쿠폰</h3>
      </div>

      <div className={styles.coupon}>
        <FormProvider {...SummaryMethod}>
          <form
            onSubmit={withRequestPrevention(handleSubmit(applyCouponHandler), {
              loadingDelay: 2000,
            })}
          >
            <ShippingInput
              name='coupon'
              placeholder='*쿠폰'
              onChange={e => setCoupon(e.target.value)}
            />
            <button type='submit'>쿠폰 적용</button>

            <div className={styles.infos}>
              <span>
                결제할 금액 : <b>{numberWithCommas(cart.cartTotal ?? 0)}</b>
              </span>
              {/* {!errors?.coupon && getCouponSubmitValue && discount > 0 && (
                <span className={styles.coupon_span}>
                  쿠폰 적용 : <b>-{discount}%</b>
                </span>
              )} */}
              {!errors?.coupon &&
                getCouponSubmitValue &&
                discount > 0 &&
                cart.cartTotal &&
                totalAfterDiscount < cart.cartTotal &&
                totalAfterDiscount !== 0 && (
                  <>
                    <span className={styles.coupon_span}>
                      쿠폰 적용 : <b>-{discount}%</b>
                    </span>
                    <span>
                      새로운 가격 :{' '}
                      <b>{numberWithCommas(totalAfterDiscount)}</b>
                    </span>
                  </>
                )}
            </div>
          </form>
        </FormProvider>
      </div>

      <button
        className={styles.submit_btn}
        type='submit'
        onClick={withRequestPrevention(placeOrderHandler, {
          loadingDelay: 2000,
        })}
      >
        주문/결제
      </button>

      {orderError && <div className={styles.error}>{orderError}</div>}
    </div>
  );
}

export default Summary;
