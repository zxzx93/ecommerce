import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        name: String,
        size: {
          type: String,
        },
        image: {
          type: String,
        },
        qty: {
          type: Number,
        },
        color: {
          image: String,
          color: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    shippingAddress: {
      name: {
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
    },
    paymentResult: {
      id: String,
      email: String,
      status: String,
    },
    total: {
      typeL: Number,
      required: true,
    },
    shppingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Completed',
      ],
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

type TOrder = InferSchemaType<typeof orderSchema>;

const Order: Model<TOrder> =
  mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
