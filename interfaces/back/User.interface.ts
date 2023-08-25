import { Document, ObjectId } from 'mongoose';
import { NextApiRequest } from 'next';

import { Address, Wishlist } from '../front/User.interface';

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
  emailVerified: boolean;
  defaultPaymentMethod: string;
  address: Address[];
  wishlist: Wishlist[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SaveAddressRequestData extends NextApiRequest {
  body: {
    address: Address[];
  };
  user: string;
}

export interface ManageAddressRequestData extends NextApiRequest {
  body: {
    id: string;
  };
  user: string;
}

export interface ApplyCouponRequestData extends NextApiRequest {
  body: {
    coupon: string;
  };
  user: string;
}
