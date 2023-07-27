const paymentMethods = [
  {
    name: '페이팔',
    id: 'paypal',
    description:
      '페이팔 계정이 없는 경우에도 신용카드나 은행 직불카드로 페이팔을 통해 결제할 수도 있습니다.',
    images: [],
  },
  {
    name: '신용 카드',
    id: 'credit_card',
    description: '',
    images: ['visa', 'mastercard'],
  },
] as const;

export default paymentMethods;
