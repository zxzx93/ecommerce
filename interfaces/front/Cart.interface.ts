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
