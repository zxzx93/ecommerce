import { Rating } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';

import { NewProduct } from '../../../interfaces/front/Product.interface';

import AddReview from './AddReview';
import Table from './Table';

import styles from './styles.module.scss';

interface ReviewsProps {
  product: NewProduct;
}

function Reviews({ product }: ReviewsProps) {
  const { data: session } = useSession();

  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h3>고객 이용 후기 ({product.reviews?.length}+)</h3>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>평점</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name='half'
                defaultValue={product.rating}
                precision={0.5}
                style={{ color: '#ff4747' }}
                readOnly
              />
              {product.rating === 0 ? (
                '리뷰가 없습니다.'
              ) : (
                <>
                  {product.rating}
                  <p>/ 5</p>
                </>
              )}
            </div>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div className={styles.reviews__stats_reviews_review}>
                <Rating
                  defaultValue={5 - i}
                  precision={0.5}
                  style={{ color: '#ff4747' }}
                  readOnly
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar_inner}
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
                <span className={styles.percentage}>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
          <AddReview product={product} />
        ) : (
          <button className={styles.submit_btn} onClick={() => signIn()}>
            로그인 후 리뷰보기
          </button>
        )}

        <Table
          reviews={product.reviews}
          allSize={product.allSizes}
          colors={product.colors}
        />
      </div>
    </div>
  );
}

export default Reviews;
