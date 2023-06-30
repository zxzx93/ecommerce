import { useState } from 'react';
import { Rating } from '@mui/material';

import { Color, NewProduct, Size } from '../../../interfaces/Product.interface';
import { ImageFile } from '../../../interfaces/Review.interface';

import Select from './Select';
import UploadImage from './UploadImage';

import styles from './styles.module.scss';

interface AddReviewProps {
  product: NewProduct;
}

function AddReview({ product }: AddReviewProps) {
  const [selectedSize, setSelectedSize] = useState<Size>({
    _id: '',
    size: '',
    qty: 0,
    price: 0,
  });
  const [selectedStyle, setSelectedStyle] = useState<Color>({
    color: '',
    image: '',
  });
  const [selectedfit, setSelectedFit] = useState<string>();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<number | null>();
  const [imageFile, setImageFile] = useState<ImageFile[]>([]);

  const fits = ['작아요', '딱 맞아요', '커요'];

  return (
    <div className={styles.reviews__add}>
      <div className={styles.reviews__add_wrap}>
        <div className={styles.flex}>
          색상 :
          <Select
            text='Style'
            property={selectedStyle}
            data={product.colors.filter(s => s !== selectedStyle)}
            handlechange={setSelectedStyle}
          />
          사이즈 :
          <Select
            text='Size'
            property={selectedSize}
            data={product.allSizes.filter(s => s.size !== selectedSize.size)}
            handlechange={setSelectedSize}
          />
          핏이 어떤가요? :
          <Select
            text='how does it fit'
            property={selectedfit}
            data={fits.filter(f => f !== selectedfit)}
            handlechange={setSelectedFit}
          />
        </div>

        <UploadImage imageFile={imageFile} setImageFile={setImageFile} />
        <textarea
          name='review'
          placeholder='후기를 작성해주세요.'
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <Rating
          name='half-rating-read'
          defaultValue={0}
          precision={0.5}
          style={{ color: '#ff4747' }}
          value={rating}
          onChange={(e, newRating) => setRating(newRating)}
        />
        <button className={styles.submit_btn}>리뷰 작성</button>
      </div>
    </div>
  );
}

export default AddReview;
