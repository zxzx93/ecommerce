import { NextApiResponse } from 'next';
import nc from 'next-connect';

import {
  SaveCartRequestData,
  TempProduct,
} from '../../../interfaces/Cart.interface';
import Cart from '../../../models/Cart';
import Product from '../../../models/Product';
import User from '../../../models/User';
import db from '../../../utils/helpers/db';

const handler = nc<SaveCartRequestData, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { selectedItems, userId } = req.body;

    const user = await User.findById(userId);
    const existingCart = await Cart.findOne({ user: user?._id });
    if (existingCart) {
      await existingCart.remove();
    }

    const productsPromises = selectedItems.map(async item => {
      const dbProduct = await Product.findById(item._id).lean();
      if (!dbProduct) {
        throw new Error(`상품을 찾을 수 없습니다.: ${item._id}`);
      }
      const subProduct = dbProduct.subProducts[item.style];
      const tempProduct: TempProduct = {
        name: dbProduct.name || '',
        product: String(dbProduct._id),
        color: {
          color: item.color.color,
          image: item.color.image,
        },
        image: subProduct.images[0],
        qty: Number(item.qty),
        size: item.size,
        price: 0,
      };
      const price =
        subProduct.sizes.find(p => p.size === item.size)?.price ?? 0;
      tempProduct.price =
        subProduct.discount > 0
          ? price - price * (subProduct.discount / 100)
          : price;

      return tempProduct;
    });
    const products = await Promise.all(productsPromises);
    const cartTotal = products.reduce((a, c) => a + c.price * c.qty, 0);

    const newCart = await new Cart({
      products, // 카트에서 선택한 아이템들
      cartTotal,
      user: user?._id,
    }).save();
    db.disconnectDb();
    return res.status(200).json({
      message: '카트 생성 성공',
      data: newCart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
