export interface ProductImage {
  url: string;
  public_url: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: string;
  subCategories: [];
  details: {
    name: string;
    value: string;
    _id: string;
  }[];
  questions: [];
  shipping: number;
  subProducts: {
    images: ProductImage[];
    description_images: [];
    color: {
      color: string;
      image: string;
    };
    sizes: {
      size: 'S' | 'M' | 'L' | 'XL';
      qty: number;
      price: number;
      _id: string;
    }[];
    discount: number;
    _id: string;
  }[];
  numReviews: number;
  rating: number;
  refundPolicy: '30일';
  reviews: {
    reviewBy: string;
    rating: number;
    review: string;
    size: string;
    style: {
      color: string;
      image: string;
    };
    fit: string;
    images: {
      url: string;
      public_url: string;
    }[];
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
}
