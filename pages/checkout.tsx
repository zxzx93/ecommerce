import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Header from '../components/cart/header';
import Payment from '../components/checkout/payment';
import Products from '../components/checkout/products';
import Shipping from '../components/checkout/shipping';
import Summary from '../components/checkout/summary';
import paymentMethods from '../data/paymentMethods';
import Cart, { TCart } from '../models/Cart';
import User, { TUser } from '../models/User';
import db from '../utils/helpers/db';

import styles from '../styles/checkout.module.scss';

interface CheckoutProps {
  user: TUser;
  cart: TCart;
}

type PaymentMethod = (typeof paymentMethods)[number]['id'];

function Checkout({ user, cart }: CheckoutProps) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethod | undefined
  >();
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<
    TUser['address'][number] | undefined
  >();

  useEffect(() => {
    const check = addresses?.find(ad => ad.active === true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress(undefined);
    }
  }, [addresses]);

  return (
    <div>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping user={user} addressesProps={{ addresses, setAddresses }} />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment paymentProps={{ paymentMethod, setPaymentMethod }} />
          <Summary
            user={user}
            cart={cart}
            selectedAddressProps={{ selectedAddress, setSelectedAddress }}
            totalAfterDiscountProps={{
              totalAfterDiscount,
              setTotalAfterDiscount,
            }}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  db.connectDb();
  const session = await getSession(ctx);
  const user = await User.findById(session?.user.id);
  const cart = await Cart.findOne({ user: user?._id });
  db.disconnectDb();

  const userJSON = JSON.parse(JSON.stringify(user));
  const cartJSON = JSON.parse(JSON.stringify(cart));

  if (!cart) {
    return {
      redirect: {
        destination: '/cart',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: userJSON,
      cart: cartJSON,
    },
  };
};

export default Checkout;
