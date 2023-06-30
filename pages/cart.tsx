import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartHeader from '../components/cart/cartHeader';
import Checkout from '../components/cart/checkout';
import Empty from '../components/cart/empty';
import Header from '../components/cart/header';
import PaymentMethods from '../components/cart/paymentMethods';
import Product from '../components/cart/product';
import { CartItem } from '../interfaces/Cart.interface';
import { RootState } from '../store';
import { updateCart } from '../store/cartSlice';
import { fetchUpdateCart } from '../utils/fetchApi/fetchCart';

import styles from '../styles/cart.module.scss';

const cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // 카트에서 체크박스 선택한 아이템
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const update = async () => {
      const { data } = await fetchUpdateCart(cartItems);
      dispatch(updateCart(data));
    };
    if (cartItems.length > 0) update();
  }, []);

  useEffect(() => {
    setShippingFee(selectedItems.reduce((a, c) => a + c.shipping, 0));
    setSubTotal(selectedItems.reduce((a, c) => a + c.price * c.qty, 0));
    setTotal(
      selectedItems.reduce((a, c) => a + c.price * c.qty, 0) + shippingFee
    );
  }, [selectedItems, shippingFee]);

  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cartItems}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
            <div className={styles.cart__products}>
              {cartItems.map(product => (
                <Product
                  key={product.uid}
                  product={product}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              ))}
            </div>
            <Checkout
              selectedItems={selectedItems}
              shippingFee={shippingFee}
              subTotal={subTotal}
              total={total}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default cart;
