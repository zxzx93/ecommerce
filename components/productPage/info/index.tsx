import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BsHandbagFill, BsHeart } from 'react-icons/bs';
import { TbMinus, TbPlus } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CartItem } from '../../../interfaces/Cart.interface';
import { NewProduct } from '../../../interfaces/Product.interface';
import { RootState } from '../../../store';
import { addToCart, updateCart } from '../../../store/cartSlice';
import { numberWithCommas } from '../../../utils/formatting/numberFormat';

import Accordian from './Accordian';
import SimillerSwiper from './SimillerSwiper';

import styles from './styles.module.scss';

interface InfosProps {
  product: NewProduct;
  setActiveImg: Dispatch<SetStateAction<string>>;
}

function Infos({ product, setActiveImg }: InfosProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const { size, style } = router.query as {
    size?: string;
    style: string;
  };

  const [selectSize, setSelectSize] = useState(size); // 쿼리스트링으로 넘어오는 size가 없을때
  const [qty, setQty] = useState(1); // 수량
  const [error, setError] = useState('');

  useEffect(() => {
    setSelectSize('');
    setQty(1); // 스타일 바뀌면 수량 초기값으로 변경
  }, [style]);

  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [size]);

  const addToCartHandler = async () => {
    if (!size) {
      setError('사이즈를 선택해주세요');
      return;
    }
    const {
      data: { data },
    }: {
      data: { data: CartItem };
    } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${size}`
    );

    if (qty > data.quantity) {
      setError('선택한 수량은 재고보다 많습니다. 수량을 줄여주세요.');
      return;
    }
    if (data.quantity < 1) {
      setError('이 상품은 품절되었습니다.');
      return;
    }

    const uid = `${data._id}_${product.style}_${size}`;
    const exist = cartItems.find(p => p.uid === uid);
    // 이미 같은 uid를 가진 상품이 들어있을때 수량만 변경
    if (exist) {
      const newCartItems = cartItems.map(p => {
        if (p.uid === exist.uid) {
          return { ...p, qty };
        }
        return p;
      });
      dispatch(updateCart(newCartItems));
    } else {
      // 같은 uid 없을때 카트에 담음
      dispatch(addToCart({ ...data, qty, uid, size: data.size }));
    }
  };

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
            onClick={() => addToCartHandler()}
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
