import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { CreateOrderRequestData } from '../../../interfaces/back/Order.interface';
import auth from '../../../middleware/auth';
import Order from '../../../models/Order';
import User from '../../../models/User';
import db from '../../../utils/helpers/db';

const handler = nc<CreateOrderRequestData, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const userId = req.user;

    if (!shippingAddress) {
      return res.status(400).json({ message: '기본 배송지를 선택해 주세요.' });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: '결제 방식을 선택해 주세요.' });
    }

    const user = await User.findById(userId);
    const newOrder = await new Order({
      user: user?._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    return res.json({ orderId: newOrder._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default auth(handler);
