import { Document } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ICoupon extends Document {
  _id: string;
  coupon: string;
  startDate: string;
  endDate: string;
  discount: number;
}

export interface CouponRequestData extends NextApiRequest {
  body: ICoupon;
}

// export interface CreateCouponRequestData extends NextApiRequest {
//   body: ICoupon;
// }
// export interface UpdateCouponRequestData extends NextApiRequest {
//   body: ICoupon;
// }

export interface CouponResponseData extends NextApiResponse {
  coupons: ICoupon[];
  message: string;
}
