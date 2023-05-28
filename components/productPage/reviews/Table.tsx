import { useState } from 'react';
import { Pagination } from '@mui/material';

import { Color, Reviews, Size } from '../../../interfaces/Product.interface';

import usePagination from './Pagination';
import Review from './Review';
import TableHeader from './TableHeader';

import styles from './styles.module.scss';

interface TableProps {
  reviews: Reviews[];
  allSize: Size[];
  colors: Color[];
}

function Table({ reviews, allSize, colors }: TableProps) {
  const [page, setPage] = useState(1);

  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const DATA = usePagination(reviews, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    DATA.jump(p);
  };

  return (
    <div className={styles.table}>
      <TableHeader
        reviews={reviews}
        allSize={[
          {
            _id: '',
            size: '',
            qty: 0,
            price: 0,
          },
          ...allSize,
        ]}
        colors={[{ color: '', image: '' }, ...colors]}
      />

      <div className={styles.table__data}>
        {DATA.currentData().map((review: Reviews) => (
          <Review review={review} />
        ))}
      </div>

      <div className={styles.pagination}>
        <Pagination
          count={count}
          page={page}
          // variant='round'
          shape='rounded'
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Table;
