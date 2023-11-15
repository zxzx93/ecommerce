import { Document, Schema, Types } from 'mongoose';

import { ICategories } from './Categories.interface';
import { ISubCategories } from './SubCategories.interface';
import { IUser } from './User.interface';

interface IStyle {
  color?: string;
  image?: string;
}

interface ISize {
  size: string;
  qty: number;
  price: number;
}

interface ISubProduct {
  sku?: string;
  images: string[];
  description_images: string[];
  color: IStyle;
  sizes: ISize[];
  discount: number;
}

interface IDetails {
  name: string;
  value: string;
}

interface IQuestion {
  question: string;
  answer: string;
}

export interface IReview {
  reviewBy: IUser;
  rating: number;
  review: string;
  size?: string;
  style: IStyle;
  fit?: string;
  images: any[];
  likes: any[];
}

export interface IProduct extends Document {
  reviews: IReview[];
  name: string;
  description: string;
  brand?: string;
  slug: string;
  categories: ICategories;
  subCategories: ISubCategories[];
  details: IDetails[];
  questions: IQuestion[];
  refundpolicy?: string;
  rating: number;
  numReviews: number;
  shipping: number;
  subProducts: ISubProduct[];
}
