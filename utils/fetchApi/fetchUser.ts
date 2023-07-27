import axios from 'axios';

import { Address } from '../../interfaces/User.interface';
import { TCart } from '../../models/Cart';
import { TUser } from '../../models/User';

// 주소록 저장
export const fetchSaveAddress = async (
  address: Pick<
    Address,
    'name' | 'address1' | 'address2' | 'zipCode' | 'phoneNumber'
  >
) => {
  try {
    const { data } = await axios.post('/api/user/saveAddress', {
      address,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// 기본배송지 변경
export const fetchChangeActiveAddress = async (id: string) => {
  try {
    const { data } = await axios.put('/api/user/manageAddress', {
      id,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// 주소 삭제
export const fetchDeleteAddress = async (id: string) => {
  try {
    const { data } = await axios.delete('/api/user/manageAddress', {
      data: { id },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// 쿠폰 적용
export const fetchApplyCoupon = async (coupon: string) => {
  try {
    const { data } = await axios.post('/api/user/applyCoupon', coupon);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

interface Order {
  products: TCart['products'];
  shippingAddress?: TUser['address'][number];
  paymentMethod?: string;
  total?: number;
}

// 주문/결제
export const fetchPlaceOrder = async (order: Order) => {
  try {
    const { data } = await axios.post('/api/order/create', order);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
