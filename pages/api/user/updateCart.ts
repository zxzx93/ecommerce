import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { UpdateCartRequestData } from '../../../interfaces/back/Cart.interface';
import Product from '../../../models/Product';
import db from '../../../utils/helpers/db';

const handler = nc<UpdateCartRequestData, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { products } = req.body;

    const promises = products.map(async p => {
      const dbproduct = await Product.findById(p._id).lean();
      const originalPrice =
        dbproduct?.subProducts[p.style].sizes.find(v => v.size === p.size)
          ?.price ?? 0;
      const quantity =
        dbproduct?.subProducts[p.style].sizes.find(v => v.size === p.size)
          ?.qty ?? 0;
      const discount = dbproduct?.subProducts[p.style].discount ?? 0;

      return {
        ...p,
        discount,
        quantity,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice * (discount / 100)
            : originalPrice,
        shippingFee: dbproduct?.shipping,
      };
    });
    const data = await Promise.all(promises);
    db.disconnectDb();
    return res.status(200).json({
      message: '카트 업데이트 성공',
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
