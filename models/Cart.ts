import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const cartSchema = new Schema(
  {
    products: [
      {
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
      ref: 'User',
    },
  },
  { timestamps: true }
);

type TCart = InferSchemaType<typeof cartSchema>;

const Cart: Model<TCart> =
  mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
