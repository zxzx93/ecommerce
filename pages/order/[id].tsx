import { useReducer } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';
import mongoose from 'mongoose';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import orderReducer from 'utils/helpers/orderReducer';

import TossPaymentWidget from 'components/TossPaymentWidget';

import Footer from '../../components/footer';
import Header from '../../components/header';
import { IOrder } from '../../interfaces/back/Order.interface';
import Order from '../../models/Order';
import User from '../../models/User';
import { numberWithCommas } from '../../utils/formatting/numberFormat';

import styles from '../../styles/order.module.scss';

interface OrderProps {
  order: IOrder;
}

interface QueryParams extends ParsedUrlQuery {
  id: string;
  paymentKey?: string;
  orderId?: string;
  amount?: string;
  status?: string;
}

interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: '카드' | '가상계좌' | '계좌이체';
  status: string;
  paymentKey: string;
}

function order({ order: orderData }: OrderProps) {
  const [{ loading, error, success }, dispatch] = useReducer(orderReducer, {
    loading: false,
    error: false,
    success: false,
  });

  // const statusInfo = {
  //   NotProcessed: {
  //     message: '주문이 진행되지 않았습니다.',
  //     style: styles.not_processed,
  //   },
  //   Processing: {
  //     message: '주문이 처리중입니다.',
  //     style: styles.processing,
  //   },
  //   Dispatched: {
  //     message: '배송이 시작되었습니다.',
  //     style: styles.dispatched,
  //   },
  //   Cancelled: {
  //     message: '주문이 취소되었습니다.',
  //     style: styles.cancelled,
  //   },
  //   Completed: {
  //     message: '주문이 완료되었습니다.',
  //     style: styles.completed,
  //   },
  // };
  // const { style, message } = statusInfo[orderData.status];
  // console.log(orderData, 'orderData');

  return (
    <>
      <Header country='country' />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                홈 <IoIosArrowForward /> 주문 <IoIosArrowForward /> ID :{' '}
                {orderData._id}
              </div>
              <div className={styles.order__header_status}>
                결제 상태 :{' '}
                {orderData.isPaid ? (
                  <img src='../../../images/verified.png' alt='Paid' />
                ) : (
                  <img src='../../../images/unverified.png' alt='Paid' />
                )}
              </div>
              {/* //! 주문 상태 추가 시키기 */}
              <div className={styles.order__header_status}>
                {/* 주문 상태 : <span className={style}>{message}</span> */}
              </div>
            </div>

            <div className={styles.order__products}>
              {orderData.products.map(product => (
                <div key={product._id} className={styles.product}>
                  <div className={styles.product__img}>
                    <img src={product.image.url} alt={product.name} />
                  </div>
                  <div className={styles.product__infos}>
                    <h3 className={styles.product__infos_name}>
                      {product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </h3>
                    <div className={styles.product__infos_style}>
                      <img src={product.color.image} alt='' /> / {product.size}
                    </div>
                    <div className={styles.product__infos_priceQty}>
                      {numberWithCommas(product.price)} x {product.qty}개
                    </div>
                    <div className={styles.product__infos_total}>
                      {numberWithCommas(product.price * product.qty)}
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.order__products_total}>
                {orderData.couponApplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>소계</span>
                      <span>
                        {numberWithCommas(orderData.totalBeforeDiscount)}
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        쿠폰 적용 <em>({orderData.couponApplied})</em>{' '}
                      </span>
                      <span>
                        -
                        {numberWithCommas(
                          orderData.totalBeforeDiscount - orderData.total
                        )}
                      </span>
                    </div>

                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>결제 금액</span>
                      <b>{numberWithCommas(orderData.total)}</b>
                    </div>
                  </>
                ) : (
                  <div className={`${styles.order__products_total_sub}`}>
                    <span>결제 금액</span>
                    <b>{numberWithCommas(orderData.total)}</b>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h2>주문 정보</h2>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={orderData.user.image} alt='' />
                  <div>
                    <span>{orderData.user.name}</span>
                    <span>{orderData.user.email}</span>
                  </div>
                </div>
              </div>

              <div className={styles.order__address_shipping}>
                <h3>배송 주소</h3>
                <span>{orderData.shippingAddress.name}</span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>{orderData.shippingAddress.zipCode}</span>
              </div>
            </div>

            {!orderData.isPaid && (
              <div className={styles.order__payment}>
                <TossPaymentWidget
                  orderId={orderData._id}
                  total={orderData.total}
                  orderData={orderData}
                  dispatch={dispatch}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer country='country' />
    </>
  );
}

const getOrderDataById = async (id: QueryParams['orderId']) => {
  const orderData = await Order.findById(id)
    .populate({
      path: 'user',
      model: User,
    })
    .lean();
  return orderData;
};

const processPayment = async (
  paymentKey: QueryParams['paymentKey'],
  orderId: QueryParams['orderId'],
  amount: QueryParams['amount']
) => {
  const { data: payment } = await axios.post<Payment>(
    'https://api.tosspayments.com/v1/payments/confirm',
    {
      paymentKey,
      orderId,
      amount,
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.TOSS_PAYMENTS_SECRET_KEY}:`
        ).toString('base64')}`,
      },
    }
  );
  return payment;
};

const getUpdatedOrder = async (
  orderId: QueryParams['orderId'],
  payment: Payment
) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      isPaid: true,
      paidAt: new Date(payment.approvedAt),
      // status: 'Completed',
      paymentResult: {
        id: payment.paymentKey,
        status: payment.status,
      },
    },
    { new: true }
  );
  return updatedOrder;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { paymentKey, orderId, amount, status, id } =
    ctx.query as ParsedUrlQuery & QueryParams;

  const notFound = (conditional: boolean) => {
    if (conditional)
      return {
        notFound: true,
      };
    return null;
  };

  if (!status) {
    notFound(!mongoose.Types.ObjectId.isValid(id));

    const orderData = await getOrderDataById(id);
    notFound(!orderData);

    return {
      props: {
        order: JSON.parse(JSON.stringify(orderData)),
      },
    };
  }

  // 결제한 뒤 쿼리로 status가 있을때
  try {
    // 결제 승인
    const payment = await processPayment(paymentKey, orderId, amount);
    const updatedOrder = await getUpdatedOrder(orderId, payment);

    return {
      props: { order: JSON.parse(JSON.stringify(updatedOrder)) },
    };
  } catch (err) {
    const orderData = await getOrderDataById(id);

    return {
      props: { order: JSON.parse(JSON.stringify(orderData)) },
    };
  }
};

export default order;
