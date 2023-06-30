import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoIosHeartEmpty } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight, MdStorefront } from 'react-icons/md';
import { TbMinus, TbPlus } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem } from '../../../interfaces/Cart.interface';
import { RootState } from '../../../store';
import { updateCart } from '../../../store/cartSlice';
import numberWithCommas from '../../../utils/formatting/numberFormat';
import handleKeyDown from '../../../utils/helpers/keyboardHandlers';

import styles from './styles.module.scss';

interface ProductProps {
  product: CartItem;
  selectedItems: CartItem[];
  setSelectedItems: Dispatch<SetStateAction<CartItem[]>>;
}

function Product({ product, selectedItems, setSelectedItems }: ProductProps) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // 상품 선택한 경우 checkbox active
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check = selectedItems.find(p => p.uid === product.uid);
    setActive(!!check);
  }, [selectedItems, product.uid]);

  const updateQty = (type: 'minus' | 'plus') => {
    const updatedQty = type === 'plus' ? product.qty + 1 : product.qty - 1;
    const newCartItems = cartItems.map(p =>
      p.uid === product.uid ? { ...p, qty: updatedQty } : p
    );
    const newCartItems2 = selectedItems.map(p =>
      p.uid === product.uid ? { ...p, qty: updatedQty } : p
    );
    dispatch(updateCart(newCartItems));
    setSelectedItems(newCartItems2);
  };

  const removeProduct = (uid: CartItem['uid']) => {
    const newCartItems = cartItems.filter(p => p.uid !== uid);
    dispatch(updateCart(newCartItems));
  };

  const selectProduct = () => {
    if (active) {
      setSelectedItems(selectedItems.filter(p => p.uid !== product.uid));
    } else {
      setSelectedItems(prev => [...prev, product]);
    }
  };

  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur} />}
      <div className={styles.product__header}>
        <MdStorefront /> M74JJI Official Store
      </div>

      <div className={styles.product__image}>
        <input
          className={`${styles.checkbox} ${active ? styles.active : ''}`}
          onClick={() => selectProduct()}
          onKeyDown={e => handleKeyDown(e, () => selectProduct())}
          role='checkbox'
          aria-checked={active}
        />
        <img src={product.images[0].url} alt='상품 이미지' />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: '2' }}>
              <IoIosHeartEmpty />
            </div>
            <div
              style={{ zIndex: '2' }}
              onClick={() => removeProduct(product.uid)}
              onKeyDown={e =>
                handleKeyDown(e, () => removeProduct(product.uid))
              }
              role='button'
              tabIndex={0}
            >
              <AiOutlineDelete />
            </div>
          </div>

          <div className={styles.product__style}>
            <img src={product.color.image} alt='상품 컬러 이미지' />
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{numberWithCommas(product.price)}</span>}
            <MdOutlineKeyboardArrowRight />
          </div>

          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                {numberWithCommas(product.price * product.qty)}
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  {numberWithCommas(product.priceBefore)}
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>
            <div className={styles.product__priceQty_qty}>
              <button
                disabled={product.qty < 2}
                onClick={() => updateQty('minus')}
              >
                <TbMinus />
              </button>
              <span>{product.qty}</span>
              <button
                disabled={product.qty === product.quantity}
                onClick={() => updateQty('plus')}
              >
                <TbPlus />
              </button>
            </div>
          </div>

          <div className={styles.product__shipping}>
            {product.shipping
              ? `배송료 ${numberWithCommas(product.shipping)} `
              : '무료 배송'}
          </div>
          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              이 제품은 품절입니다. 관심상품에 추가하면 재입고 될 수 있습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
