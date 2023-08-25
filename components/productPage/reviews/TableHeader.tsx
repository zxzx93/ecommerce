import { useState } from 'react';

import {
  Color,
  Reviews,
  Size,
} from '../../../interfaces/front/Product.interface';
import {
  OrderOptions,
  Rating,
} from '../../../interfaces/front/Review.interface';

import TableSelect from './TableSelect';

import styles from './styles.module.scss';

interface TableHeaderProps {
  reviews?: Reviews[];
  allSize: Size[];
  colors: Color[];
}

const ratings: Rating[] = [
  { text: '5 star', value: 5 },
  { text: '4 star', value: 4 },
  { text: '3 star', value: 3 },
  { text: '2 star', value: 2 },
  { text: '1 star', value: 1 },
];

const orderOptions: OrderOptions[] = [
  {
    text: '최신순',
    value: '최신순',
  },
  {
    text: '오래된순',
    value: '오래된순',
  },
];

function TableHeader({ reviews, allSize, colors }: TableHeaderProps) {
  const [rating, setRating] = useState<Rating>();
  const [size, setSize] = useState<Size>();
  const [style, setStyle] = useState<Color>();
  const [order, setOrder] = useState<OrderOptions>();

  return (
    <div className={styles.table__header}>
      평점 :
      <TableSelect
        text='Rating'
        property={rating}
        data={ratings.filter(x => x.value !== rating?.value)}
        handlechange={setRating}
      />
      사이즈 :
      <TableSelect
        text='Size'
        property={size}
        data={allSize.filter(x => x.size !== size?.size)}
        handlechange={setSize}
      />
      색상 :
      <TableSelect
        text='Style'
        property={style}
        data={colors.filter(x => x !== style)}
        handlechange={setStyle}
      />
      순서 :
      <TableSelect
        text='Order'
        property={order}
        data={orderOptions.filter(x => x.value !== order?.value)}
        handlechange={setOrder}
      />
    </div>
  );
}

export default TableHeader;
