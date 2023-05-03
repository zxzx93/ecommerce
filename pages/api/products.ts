import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import Product from '../../models/Product';
import db from '../../utils/helpers/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    await db.connectDb();
    const product = await Product.find().sort({ createdAt: -1 }).lean();
    if (!product) {
      return res
        .status(400)
        .json({ message: '상품이 존재하지 않습니다. 상품을 추가해주세요.' });
    }
    await db.disconnectDb();
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default handler;
