export interface Image {
  url: string;
  public_url: string;
}
export interface Categories {
  _id: string;
  name: string;
  slug: string;
}
export interface Details {
  name: string;
  value: string;
  _id: string;
}
export interface Questions {
  question: string;
  answer: string;
}
export interface Size {
  size: string;
  qty: number;
  price: number;
  _id: string;
}
export interface Color {
  color: string;
  image: string;
}
export interface SubProducts {
  sku: string;
  images: Image[];
  description_images: [];
  color: Color;
  sizes: Size[];
  discount: number;
  _id: string;
}
export interface Fits {
  fit: '작아요' | '딱 맞아요' | '커요';
}
export interface ReviewBy {
  reviewBy: {
    address: [];
    defaultPaymentMethod: string;
    email: string;
    emailVerified: false;
    image: string;
    name: string;
    password: string;
    role: string;
    wishlist: [];
  };
}

export interface Reviews {
  reviewBy: ReviewBy;
  rating: number;
  review: string;
  size: string;
  style: Color;
  fit: Fits;
  images: Image[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  slug: string;
  categories: Categories;
  subCategories: any;
  details: Details[];
  questions: Questions[];
  shipping: string;
  subProducts: SubProducts[];
  numReviews: number;
  rating: number;
  refundPolicy: '30일';
  reviews: Reviews[];
}

export interface NewProduct {
  _id: string;
  slug: string;
  name: string;
  style: string | number;
  numReviews: number;
  price: number;
  priceBefore: number;
  allSizes: Size[];
  brand: string;
  categories: Categories;
  colors: Color[];
  description: string;
  details: Details[];
  discount: number;
  images: Image[];
  priceRange: number[];
  quantity: number;
  rating: number;
  ratings: {
    percentage: number;
  }[];
  refundPolicy: '30일';
  reviews: Reviews[];
  shipping: string;
  sku: string;
  sizes: Size[];
  subCategories: [];
  subProducts: SubProducts[];
  // questions: [];
}
