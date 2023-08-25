import { ObjectId } from 'mongoose';

export interface Address {
  _id: string;
  name: string;
  phoneNumber: string;
  address1: string;
  address2?: string;
  zipCode: string;
  active: boolean;
  // city?: string;
  // state?: string;
  // country?: string;
}

export interface Wishlist {
  _id: string;
  product: ObjectId;
  style?: string;
}
