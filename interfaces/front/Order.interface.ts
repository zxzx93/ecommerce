import { IProduct } from '../back/Cart.interface';

import { Address } from './User.interface';

export interface CreateOrder {
  products: IProduct[];
  shippingAddress?: Address;
  paymentMethod?: string;
  total?: number;
  totalBeforeDiscount?: number;
  couponApplied: string;
}

export interface StateType {
  loading: boolean;
  error: string | boolean;
  success: boolean;
}

export type ActionTypes =
  | { type: 'PAY_REQUEST' }
  | { type: 'PAY_SUCCESS'; payload: boolean }
  | { type: 'PAY_FAIL'; payload: string | boolean }
  | { type: 'PAY_RESET' };
