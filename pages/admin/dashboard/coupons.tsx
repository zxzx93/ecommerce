import { useState } from 'react';
import { ICoupon } from 'interfaces/back/Coupon.interface';
import Coupon from 'models/Coupon';
import { GetServerSideProps } from 'next';
import db from 'utils/helpers/db';

import Create from 'components/admin/coupons/Create';
import List from 'components/admin/coupons/List';
import Layout from 'components/admin/layout';

interface CouponsProps {
  couponsData: ICoupon[];
}

function Coupons({ couponsData }: CouponsProps) {
  const [coupons, setCoupons] = useState(couponsData);

  return (
    <Layout>
      <Create setCoupons={setCoupons} />
      <List coupons={coupons} setCoupons={setCoupons} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  db.connectDb();

  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();

  db.disconnectDb();

  return {
    props: {
      couponsData: JSON.parse(JSON.stringify(coupons)),
    },
  };
};

export default Coupons;
