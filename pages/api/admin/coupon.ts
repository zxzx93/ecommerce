import dayjs from 'dayjs';
import {
  CouponRequestData,
  CouponResponseData,
} from 'interfaces/back/Coupon.interface';
import auth from 'middleware/auth';
import Coupon from 'models/Coupon';
import nc from 'next-connect';
import db from 'utils/helpers/db';

const handler = nc();

const formatDate = (date: string) => {
  return dayjs(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
};

handler.post<CouponRequestData, CouponResponseData>(async (req, res) => {
  try {
    const { coupon, discount, startDate, endDate } = req.body;

    db.connectDb();
    const existingCoupon = await Coupon.findOne({ coupon });
    if (existingCoupon) {
      return res.status(400).json({
        message: '쿠폰이 이미 존재합니다. 다른 쿠폰을 사용해 보세요.',
      });
    }
    await Coupon.create({
      coupon,
      discount,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    const coupons = await Coupon.find({}).sort({ updatedAt: -1 });
    db.disconnectDb();
    return res.status(200).json({
      message: `${coupon} 쿠폰이 성공적으로 생성되었습니다.`,
      coupons,
    });
  } catch (error) {
    db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

handler.put<CouponRequestData, CouponResponseData>(async (req, res) => {
  try {
    const { id, coupon, discount, startDate, endDate } = req.body;

    db.connectDb();
    await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate,
      endDate,
    });
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    db.disconnectDb();
    return res.status(200).json({
      message: `${coupon} 쿠폰이 성공적으로 수정되었습니다.`,
      coupons,
    });
  } catch (error) {
    db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

handler.delete<CouponRequestData, CouponResponseData>(async (req, res) => {
  try {
    const { id, coupon } = req.body;

    await Coupon.findByIdAndRemove(id);

    let coupons;
    try {
      coupons = await Coupon.find({}).sort({ updatedAt: -1 });
    } catch (error) {
      throw new Error(`쿠폰을 가져오지 못했습니다: ${error.message}`);
    }

    return res.json({
      message: `${coupon} 쿠폰이 삭제되었습니다.`,
      coupons,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default auth(handler);
