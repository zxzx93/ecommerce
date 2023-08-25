import { Document, ObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { CartItem } from '../front/Cart.interface';

export interface IProduct {
  _id: ObjectId;
  product: ObjectId;
  name: string;
  size: string;
  image: {
    url: string;
    public_url: string;
  };
  color: {
    color: string;
    image: string;
  };
  qty: number;
  price: number;
}

export interface ICart extends Document {
  products: IProduct[];
  cartTotal: number;
  totalAfterDiscount: number;
  user: ObjectId;
}

export interface AddProductRequestData extends Omit<NextApiRequest, 'query'> {
  query: {
    id: string;
    style: number;
    size: number;
  };
}

export interface AddProductResponseData extends NextApiResponse {
  message: string;
  data?: Omit<CartItem, 'qty'>;
}

export interface SaveCartRequestData extends NextApiRequest {
  body: {
    selectedItems: CartItem[];
  };
  user: string;
}

export interface UpdateCartRequestData extends NextApiRequest {
  body: {
    products: CartItem[];
  };
}
