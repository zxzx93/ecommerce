import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const couponSchema = new Schema(
  {
    coupon: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export type TCoupon = InferSchemaType<typeof couponSchema>;

const Coupon: Model<TCoupon> =
  mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);

export default Coupon;
