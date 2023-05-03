import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const reviewSchema = new Schema({
  reviewBy: { type: ObjectId, ref: 'User', required: true },
  reting: { type: Number, required: true, default: 0 },
  review: { type: String, required: true },
  fit: { type: String, required: true },
  style: { color: String, imgage: String },
  size: { type: String },
  images: [],
  likes: [],
});

const ProductSchema = new Schema(
  {
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
    category: {
      type: ObjectId,
      required: true,
      ref: 'Category',
    },
    subCategory: [
      {
        type: ObjectId,
        ref: 'subCategory',
      },
    ],
    details: [{ name: String, vlaue: String }],
    questions: [{ question: String, answer: String }],
    refundpolicy: { type: String, default: '30일' },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true, default: 0 },
    subProducts: [
      {
        sku: String,
        images: [],
        description_images: [],
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
    review: [reviewSchema],
  },
  { timestamps: true }
);

type TProduct = InferSchemaType<typeof ProductSchema>;

const product: Model<TProduct> =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default product;
