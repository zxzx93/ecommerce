import mongoose, { Model, Schema } from 'mongoose';

import { ICoupon } from '../interfaces/back/coupon.interface';

const couponSchema = new Schema<ICoupon>(
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

const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);

export default Coupon;
