import { Document } from 'mongoose';

import { ICategories } from './Categories.interface';
import { ISubCategories } from './SubCategories.interface';
import { IUser } from './User.interface';

// const { ObjectId } = Schema.Types;

export interface IReview {
  reviewBy: IUser;
  rating: number;
  review: string;
  size?: string;
  style: {
    color?: string;
    image?: string;
  };
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
  details: { name: string; value: string }[];
  questions: { question: string; answer: string }[];
  refundpolicy?: string;
  rating: number;
  numReviews: number;
  shipping: number;
  subProducts: {
    sku?: string;
    images: string[];
    description_images: string[];
    color: {
      color?: string;
      image?: string;
    };
    sizes: {
      size: string;
      qty: number;
      price: number;
    }[];
    discount: number;
  }[];
}
