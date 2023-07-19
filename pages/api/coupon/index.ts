import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import Coupon from '../../../models/Coupon';
import db from '../../../utils/helpers/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon, startDate, endDate, discount } = req.body;

    const existingCoupon = await Coupon.findOne({ coupon });
    if (existingCoupon) {
      return res.status(400).json({
        message: '이 쿠폰 이름은 이미 존재합니다. 다른 이름으로 시도하세요.',
      });
    }

    const newCoupon = new Coupon({ coupon, startDate, endDate, discount });
    await newCoupon.save();

    db.disconnectDb();
    return res.status(200).json({
      message: '쿠폰이 성공적으로 생성되었습니다',
      data: await Coupon.find(),
    });
  } catch (error) {
    db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
