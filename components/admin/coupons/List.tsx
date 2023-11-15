import { ICoupon } from 'interfaces/back/Coupon.interface';

import ListItem from './ListItem';

import styles from './styles.module.scss';

interface ListProps {
  coupons: ICoupon[];
  setCoupons: (newCoupons: ICoupon[]) => void;
}

function List({ coupons, setCoupons }: ListProps) {
  return (
    <div className={styles.list}>
      {coupons.map(coupon => (
        <ListItem key={coupon._id} coupon={coupon} setCoupons={setCoupons} />
      ))}
    </div>
  );
}

export default List;
