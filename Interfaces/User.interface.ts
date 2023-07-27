import { NextApiRequest } from 'next';

import { TCart } from '../models/Cart';
import { TUser } from '../models/User';

export interface Address extends Document {
  // _id: string;
  name: string;
  phoneNumber: string;
  address1: string;
  address2?: string;
  active: boolean;
  city?: string;
  state?: string;
  zipCode: string;
  country?: string;
}

// export interface User extends TUser {
// _id: string;
// address: Address[];
// }

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

export interface CreateOrderRequestData extends NextApiRequest {
  body: {
    products: TCart['products'];
    shippingAddress: TUser['address'][number];
    paymentMethod: string;
    total: number;
    // totalBeforeDiscount: number;
    // couponApplied: string;
  };
  user: string;
}
