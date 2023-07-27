import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const reviewSchema = new Schema({
  reviewBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  fit: {
    type: String,
  },
  images: [],
  likes: [],
});

const productSchema = new Schema(
  {
    reviews: [reviewSchema],
    name: {
      type: String,
      required: [true, '이름을 입력해주세요.'],
    },
    description: {
      type: String,
      required: true,
    },
    brand: { type: String },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    categories: {
      type: ObjectId,
      required: true,
      ref: 'Categories',
    },
    subCategories: [
      {
        type: ObjectId,
        ref: 'SubCategories',
      },
    ],
    details: [{ name: String, value: String }],
    questions: [{ question: String, answer: String }],
    refundpolicy: { type: String, default: '30일' },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true, default: 0 },
    subProducts: [
      {
        sku: String,
        images: [String],
        description_images: [String],
        color: {
          color: { type: String },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: Number,
            price: Number,
          },
        ],
        discount: {
          type: Number,
          default: 0,
        },
        // sold: {
        //   type: Number,
        //   default: 0,
        // },
      },
    ],
  },
  { timestamps: true }
);

type TProduct = InferSchemaType<typeof productSchema>;

const Product: Model<TProduct> =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
