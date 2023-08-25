import mongoose, { Model, Schema } from 'mongoose';

import { IUser } from '../interfaces/back/User.interface';

const { ObjectId } = Schema.Types;

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    image: {
      type: String,
      default: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: '',
    },
    address: [
      {
        name: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        address1: {
          type: String,
          required: true,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        style: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model('User', userSchema);

export default User;
