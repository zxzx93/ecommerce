import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import Header from '../../components/header';
import Infos from '../../components/productPage/info';
import MainSwiper from '../../components/productPage/mainSwiper';
import Reviews from '../../components/productPage/reviews';
import type {
  NewProduct,
  Product as IProduct,
} from '../../interfaces/Product.interface';
import Categories from '../../models/Categories';
import Product from '../../models/Product';
import SubCategories from '../../models/SubCategories';
import User from '../../models/User';
import db from '../../utils/helpers/db';

import styles from '../../styles/product.module.scss';

type Query = {
  slug: string;
  style: number;
} & ParsedUrlQuery;

interface ProductProps {
  product: NewProduct;
}

function ProductDetail({ product }: ProductProps) {
  const [activeImg, setActiveImg] = useState('');

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country='sss' />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            홈 / {product.categories?.name} /
            {/* {product.subCategories.map(sub => (
              <span>{sub.name}</span>
            ))} */}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos setActiveImg={setActiveImg} product={product} />
          </div>
          <Reviews product={product} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  ProductProps
> = async context => {
  const { slug, style } = context.query as Query;
  const size = (context.query.size as unknown as number) || 0;

  db.connectDb();
  const product: IProduct = await Product.findOne({ slug })
    .populate({ path: 'categories', model: Categories })
    .populate({ path: 'subCategories', model: SubCategories })
    .populate({ path: 'reviews.reviewBy', model: User })
    .lean();

  const subProduct = product?.subProducts[style];
  const prices = subProduct?.sizes.map(s => s.price);

  function calculatePercentage(num: number) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a + (review.rating === num || review.rating === num + 0.5 ? 1 : 0)
        );
      }, 0) *
        100) /
      product.reviews.length
    );
  }

  const newProduct: NewProduct = {
    ...product,
    style,
    images: subProduct?.images,
    sizes: subProduct?.sizes,
    discount: subProduct?.discount,
    sku: subProduct?.sku,
    colors: product?.subProducts.map(p => p.color),
    priceRange: subProduct?.discount
      ? [
          prices[0] - prices[0] * (subProduct.discount / 100),
          prices[prices.length - 1] -
            prices[prices.length - 1] * (subProduct.discount / 100),
        ]
      : [prices[0], prices[prices.length - 1]],
    price:
      subProduct?.discount > 0
        ? subProduct.sizes[size].price -
          subProduct.sizes[size].price * (subProduct.discount / 100)
        : subProduct.sizes[size].price,
    priceBefore: subProduct?.sizes[size].price,
    quantity: subProduct?.sizes[size].qty,
    ratings: [
      {
        percentage: calculatePercentage(5),
      },
      {
        percentage: calculatePercentage(4),
      },
      {
        percentage: calculatePercentage(3),
      },
      {
        percentage: calculatePercentage(2),
      },
      {
        percentage: calculatePercentage(1),
      },
    ],
    reviews: product?.reviews.reverse(),
    allSizes: product?.subProducts
      .map(p => p.sizes)
      .flat()
      // .sort((a, b) => a.size - b.size)
      .filter(
        (element, index, array) =>
          array.findIndex(el2 => el2.size === element.size) === index
      ),
  };

  const related = await Product.find({
    categories: product?.categories._id,
  }).lean();

  db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      related: JSON.parse(JSON.stringify(related)),
    },
  };
};
export default ProductDetail;
