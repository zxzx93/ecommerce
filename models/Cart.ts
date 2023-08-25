import mongoose, { Model, Schema } from 'mongoose';

import { ICart } from '../interfaces/back/Cart.interface';

const { ObjectId } = Schema.Types;

const cartSchema = new Schema<ICart>(
  {
    products: [
      {
        _id: {
          type: ObjectId,
        },
        product: {
          type: ObjectId,
          ref: 'Products',
        },
        name: {
          type: String,
        },
        size: {
          type: String,
        },
        // style: {
        //   type: String,
        //   style: String,
        //   image: String,
        // },
        image: {
          url: String,
          public_url: String,
        },
        color: {
          color: String,
          image: String,
        },
        qty: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
      type: ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true }
);

const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
