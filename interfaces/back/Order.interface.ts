import { Document, ObjectId } from 'mongoose';
import { NextApiRequest } from 'next';

import { CreateOrder } from '../front/Order.interface';

import { IUser } from './User.interface';

export interface IProduct {
  _id: string;
  product: string;
  name: string;
  size: string;
  image: {
    public_url: string;
    url: string;
  };
  qty: number;
  color: {
    image: string;
    color: string;
  };
  price: number;
}

export type TOrderStatus =
  | 'NotProcessed'
  | 'Processing'
  | 'Dispatched'
  | 'Cancelled'
  | 'Completed';

export interface IShippingAddress {
  name: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
}

export interface IPaymentResult {
  id: string;
  email: string;
  status: string;
}

export interface IOrder extends Document {
  _id: string;
  user: IUser;
  products: IProduct[];
  shippingAddress: IShippingAddress;
  paymentResult: IPaymentResult;
  total: number;
  shppingPrice: number;
  taxPrice: number;
  isPaid: boolean;
  status: TOrderStatus;
  paidAt: Date;
  deliveredAt: Date;
  totalBeforeDiscount: number;
  couponApplied: string;
  paymentMethod: string;
}

export interface CreateOrderRequestData extends NextApiRequest {
  body: CreateOrder;
  user: string;
}

export interface StripePaymentRequestData extends NextApiRequest {
  body: {
    id: string;
    orderId: string;
    amount: number;
  };
}
