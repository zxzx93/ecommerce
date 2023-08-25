import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { ApplyCouponRequestData } from '../../../interfaces/back/User.interface';
import auth from '../../../middleware/auth';
import Cart from '../../../models/Cart';
import Coupon from '../../../models/Coupon';
import db from '../../../utils/helpers/db';

const handler = nc<ApplyCouponRequestData, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon } = req.body;
    const userId = req.user;

    const checkCoupon = await Coupon.findOne({ coupon });
    if (!checkCoupon) {
      return res.status(400).json({ message: '올바른 쿠폰을 입력해주세요.' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({ message: '장바구니가 비어 있습니다.' });
    }
    const cartTotal = cart.cartTotal ?? 0;
    const totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;
    await Cart.findOneAndUpdate({ user: userId }, { totalAfterDiscount });

    db.disconnectDb();
    return res.json({
      discount: checkCoupon.discount, // 할인 %
      totalAfterDiscount, // 할인 가격
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default auth(handler);
