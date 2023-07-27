import { NextApiRequest, NextApiResponse } from 'next';

import { Color, Image } from './Product.interface';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  priceBefore: number;
  quantity: number;
  shipping: number;
  size: string;
  slug: string;
  style: number;
  brand: string;
  color: Color;
  description: string;
  images: Image[];
  qty: number;
  discount: number;
  uid?: string;
  sku?: string;
  categories: string;
  subCategories: string;
}

export interface TempProduct {
  name: string;
  product: string;
  color: Color;
  image: Image | string;
  qty: number;
  size: string;
  price: number;
}

export interface CartItemState {
  cartItems: CartItem[];
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

export interface SaveCartResponse {
  message: string;
  data?: Omit<CartItem, 'qty'>;
}

export interface UpdateCartRequestData extends NextApiRequest {
  body: {
    products: CartItem[];
  };
}
