import { useEffect, useState } from 'react';
import Link from 'next/link';

import type { Product } from '../../interfaces/Product.interface';
import { numberWithCommas } from '../../utils/formatting/numberFormat';

import ProductSwiper from './ProductSwiper';

import styles from './styles.module.scss';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [colorList, setColorList] = useState(
    product.subProducts.map(p => p.color)
  );
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes.map(s => s.price).sort((a, b) => a - b)
  );

  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active]?.sizes.map(s => s.price).sort((a, b) => a - b)
    );
  }, [active, product]);

  return (
    <div className={styles.product}>
      <div className={styles.product__contianer}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <div>
            <ProductSwiper images={images} />
          </div>

          {product.subProducts[active]?.discount ? (
            <div className={styles.product__discount}>
              -{product.subProducts[active].discount}%
            </div>
          ) : (
            ''
          )}
          <div className={styles.product__infos}>
            <h1>
              {product.name.length > 45
                ? `${product.name.substring(0, 45)}...`
                : product.name}
            </h1>
            <span>
              {prices.length === 1
                ? numberWithCommas(prices[0])
                : `${numberWithCommas(prices[0])}~${numberWithCommas(
                    prices[prices.length - 1]
                  )}`}
            </span>
            <div className={styles.product__colors}>
              {colorList &&
                colorList.map((color, i) =>
                  color.image ? (
                    <img
                      className={i === active ? styles.active : ''}
                      src={color.image}
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                      onFocus={() => {}}
                      alt=''
                    />
                  ) : (
                    <span
                      style={{ backgroundColor: `${color.color}` }}
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                      onFocus={() => {}}
                    />
                  )
                )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
