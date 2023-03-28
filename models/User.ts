import mongoose, { InferSchemaType, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '이름을 입력해주세요.'],
    },
    email: {
      type: String,
      required: [true, '이메일을 입력해주세요.'],
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
      default:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png',
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
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
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
          type: Schema.Types.ObjectId,
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
  }
);

type TUser = InferSchemaType<typeof UserSchema>;

const User =
  mongoose.models?.Users || mongoose.model<TUser>('Users', UserSchema);

export default User;
