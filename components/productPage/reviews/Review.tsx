import React from 'react';
import { Rating } from '@mui/material';
import dayjs from 'dayjs';

import { Reviews } from '../../../interfaces/front/Product.interface';

import styles from './styles.module.scss';

interface ReviewProps {
  review: Reviews;
}

function Review({ review }: ReviewProps) {
  const { name, image } = review.reviewBy;

  const formattedDate = dayjs(review.updatedAt).format('YYYY.MM.DD HH:mm');

  return (
    <div className={styles.review}>
      <div className={`${styles.flex} ${styles.review__user}`}>
        <div className={styles.review__user_info}>
          <h4>
            {name.slice(0, 1)}***{name.slice(name.length - 1, name.length)}
          </h4>
          <img src={image} alt='사용자 이미지' />
        </div>
        <div className={styles.review__user_orderInfo}>
          <Rating
            name='half-rating-read'
            value={review.rating}
            style={{ color: '#ff4747' }}
            readOnly
          />
          {/* <span>color:{review.style.color} </span> */}
          <div>
            <span>{review.review}</span> &nbsp;
            <span className={styles.review__date}>{formattedDate}</span>
          </div>

          <div className={styles.review__user_orderInfo_images}>
            {review.images.length > 0 &&
              review.images.map(img => <img src={img?.url} alt='' />)}
          </div>
        </div>
      </div>

      <div className={`${styles.flex} ${styles.review__feedback}`}>
        {/* <div className={styles.review__extra}> */}
        <p>도움이 되었나요?</p>
        <div className={styles.review__feedback_like}>
          {/* {review.likes && review.likes?.like} */}
          <span>네</span>
          <span>아니요</span>
        </div>
      </div>
    </div>
  );
}

export default Review;
