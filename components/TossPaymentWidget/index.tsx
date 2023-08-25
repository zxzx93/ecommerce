import { useEffect, useRef } from 'react';
import { useAsync } from 'react-use';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { IOrder } from 'interfaces/back/Order.interface';

import styles from './styles.module.scss';

const clientKey = process.env.TOSS_PAYMENTS_CLIENT_KEY as string;
const customerKey = process.env.TOSS_PAYMENTS_SECRET_KEY as string;

export default function TossPaymentWidget({
  orderId,
  total,
  orderData,
  dispatch,
}: {
  orderId: string;
  total: number;
  orderData: IOrder;
  dispatch: any;
}) {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  const orderName =
    orderData.products.length > 1
      ? `${orderData.products[0].name} 외${orderData.products.length - 1}건`
      : orderData.products[0].name;

  const customerName = orderData.user.address.find(
    address => address.active === true
  );
  const customerEmail = orderData.user.email;

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제일때

    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: total }
    );

    // ------  이용약관 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement('#agreement');

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      total,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [total]);

  return (
    <main className={styles.toss}>
      <div id='payment-widget' />
      <div id='agreement' />
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            const currentUrl = new URL(window.location.href);
            const successUrl = new URL(currentUrl);
            const failUrl = new URL(currentUrl);

            // 쿼리 스트링에 상태를 추가
            successUrl.searchParams.set('status', 'success');
            failUrl.searchParams.set('status', 'fail');

            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            //! 여기 디스패치부분 확인해보기
            dispatch({ type: 'PAY_REQUEST' });
            const res = await paymentWidget?.requestPayment({
              orderId,
              orderName,
              customerEmail, // 필수 아님 :해당 이메일로 결제 내용을 통보
              customerName: customerName?.name,
              successUrl: successUrl.toString(),
              failUrl: failUrl.toString(),
            });
            // dispatch({ type: 'PAY_SUCCESS', payload: res });
            dispatch({ type: 'PAY_SUCCESS' });
          } catch (error) {
            // 에러 처리하기
            console.error(error);
            dispatch({ type: 'PAY_FAIL', payload: error });
          }
        }}
      >
        결제하기
      </button>
    </main>
  );
}
