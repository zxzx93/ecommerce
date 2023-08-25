import mongoose, { Model, Schema } from 'mongoose';

import { IOrder } from '../interfaces/back/Order.interface';

const { ObjectId } = Schema.Types;

const orderSchema = new Schema<IOrder>(
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
          public_url: String,
          url: String,
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
      type: Number,
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
      default: 'NotProcessed',
      enum: [
        'NotProcessed',
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
    couponApplied: {
      type: String,
    },
    totalBeforeDiscount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
