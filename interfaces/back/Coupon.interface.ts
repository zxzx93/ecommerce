import { Document } from 'mongoose';
import { NextApiRequest } from 'next';

export interface ICoupon extends Document {
  coupon: string;
  startDate: string;
  endDate: string;
  discount: number;
}

export interface CouponRequestData extends NextApiRequest {
  body: ICoupon;
}
