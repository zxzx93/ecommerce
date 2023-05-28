import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BsHandbagFill, BsHeart } from 'react-icons/bs';
import { TbMinus, TbPlus } from 'react-icons/tb';
import Rating from '@mui/material/Rating';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NewProduct } from '../../../interfaces/Product.interface';
import numberWithCommas from '../../../utils/formatting/numberFormat';

import Accordian from './Accordian';
import SimillerSwiper from './SimillerSwiper';

import styles from './styles.module.scss';

interface InfosProps {
  product: NewProduct;
  setActiveImg: Dispatch<SetStateAction<string>>;
}

function Infos({ product, setActiveImg }: InfosProps) {
  const router = useRouter();
  const { size, style } = router.query as {
    size?: string;
    style: string;
  };

  const [selectSize, setSelectSize] = useState(size); // 쿼리스트링으로 넘어오는 size가 없을때
  const [qty, setQty] = useState(1); // 수량
  console.log(product, 'product');

  useEffect(() => {
    setSelectSize('');
    setQty(1); // 스타일 바뀌면 수량 초기값으로 변경
  }, [style]);

  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [size]);

  return (
    <div className={styles.infos}>
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>
        {/* <h2 className={styles.infos__sku}>{product.sku}</h2> */}
        <div className={styles.infos__rating}>
          {/* <Typography component='legend'>Controlled</Typography> */}
          <Rating
            name='rating'
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ color: '#ff4747' }}
          />
          {product.rating} / {product.numReviews} 리뷰
        </div>
        <div className={styles.infos__price}>
          {!size ? (
            <h2>
              {product.priceRange.map((p: number, i: number) => (
                <span>
                  {numberWithCommas(p)}
                  {i === 0 && '~'}
                </span>
              ))}
            </h2>
          ) : (
            <h2>{numberWithCommas(product.price)}</h2>
          )}
          {product.discount > 0 ? (
            <h3>
              {size && (
                <span className={styles.price_value}>
                  {numberWithCommas(product.priceBefore)}
                </span>
              )}
              <span>{product.discount}% 할인</span>
            </h3>
          ) : (
            ''
          )}
        </div>

        <div className={styles.infos__colors}>
          <p className={styles.title}>색상: </p>
          <div className={styles.infos__colors_wrap}>
            {product.colors?.map((color, i) => (
              <div
                className={String(i) === style ? styles.active_color : ''}
                onMouseOver={() =>
                  setActiveImg(product.subProducts[i].images[0].url)
                }
                onMouseLeave={() => setActiveImg('')}
                onFocus={() => {}}
              >
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <img src={color.image} alt='/' />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.infos__sizes}>
          <p className={styles.title}>크기: </p>
          <div className={styles.infos__sizes_wrap}>
            {product.sizes?.map((s, i) => (
              <Link href={`/product/${product.slug}?style=${style}&size=${i}`}>
                <div
                  className={`${styles.infos__sizes_size} ${
                    String(i) === router.query.size && styles.active_size
                  }`}
                  onClick={() => setSelectSize(s.size)}
                  onKeyDown={() => setSelectSize(s.size)}
                  role='button'
                  tabIndex={0}
                >
                  {s.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.infos__qty}>
          <p className={styles.title}>수량: </p>
          <div className={styles.infos__qty_wrap}>
            <button onClick={() => qty > 1 && setQty(pre => pre - 1)}>
              <TbMinus />
            </button>
            <span>{qty}</span>
            <button
              onClick={() => qty < product.quantity && setQty(pre => pre + 1)}
            >
              <TbPlus />
            </button>
            <div className={styles.infos__qty_shipping}>
              {size
                ? product.quantity
                : product.sizes.reduce((start, next) => start + next.qty, 0)}
              개 주문가능
            </div>
          </div>
        </div>

        <div className={styles.infos__actions}>
          <button
            style={{
              cursor: `${product.quantity < 1 ? 'not-allowed' : 'pointer'}`,
            }}
            disabled={product.quantity < 1}
          >
            <BsHandbagFill />
            <b>카트에 넣기</b>
          </button>
          <button disabled={product.quantity < 1}>
            <BsHeart />
            <b>위시리스트</b>
          </button>
        </div>

        <Accordian
          details={[{ desc: product.description }, ...product.details]}
        />
        <SimillerSwiper />
      </div>
    </div>
  );
}

export default Infos;
