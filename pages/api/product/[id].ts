import nc from 'next-connect';

import {
  AddProductRequestData,
  AddProductResponseData,
} from '../../../interfaces/back/Cart.interface';
import { Color, Image } from '../../../interfaces/front/Product.interface';
import Product from '../../../models/Product';
import db from '../../../utils/helpers/db';

const handler = nc<AddProductRequestData, AddProductResponseData>();

handler.get(async (req, res) => {
  const { id, style, size } = req.query;

  try {
    await db.connectDb();
    const product = await Product.findById(id).lean();
    const discount = product?.subProducts[style].discount as number;
    const priceBefore = product?.subProducts[style].sizes[size].price;
    const price =
      discount && priceBefore
        ? priceBefore - priceBefore * (discount / 100)
        : priceBefore;
    await db.disconnectDb();

    if (!product) {
      return res.status(400).json({ message: '상품을 찾을 수 없음' });
    }
    return res.status(200).json({
      message: 'Success',
      data: {
        _id: product?._id,
        style,
        discount,
        name: product?.name as string,
        description: product?.description,
        slug: product?.slug,
        sku: product?.subProducts[style].sku,
        brand: product?.brand as string,
        categories: product?.categories,
        subCategories: product?.subCategories,
        shipping: product?.shipping,
        images: product?.subProducts[style].images as unknown as Image[],
        color: product?.subProducts[style].color as Color,
        size: product?.subProducts[style].sizes[size].size as string,
        price: price as number,
        priceBefore: priceBefore as number,
        quantity: product?.subProducts[style].sizes[size].qty as number,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default handler;
