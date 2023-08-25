import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { Color, Size } from '../../../interfaces/front/Product.interface';
import {
  OrderOptions,
  Rating,
} from '../../../interfaces/front/Review.interface';

import styles from './styles.module.scss';

interface TableSelectProps<T> {
  text: string;
  property: T | T[];
  data: T[];
  handlechange: (item: T) => void;
}

function TableSelect<T>({
  text,
  property,
  data,
  handlechange,
}: TableSelectProps<T>) {
  const [visible, setVisible] = useState(false);

  const isRating = (item: unknown): item is Rating =>
    typeof item === 'object' && !!item && 'text' in item;

  const isSize = (item: unknown): item is Size =>
    typeof item === 'object' && !!item && 'size' in item;

  const isColor = (item: unknown): item is Color =>
    typeof item === 'object' && !!item && 'color' in item;

  const isOrder = (item: unknown): item is OrderOptions =>
    typeof item === 'object' && !!item && 'value' in item;

  const getDisplayValue = (p: TableSelectProps<T>['property']) => {
    if (isRating(p)) {
      return p.text;
    }
    if (isSize(p) && p.size) {
      return p.size;
    }
    if (isSize(p) && !p.size) {
      return '전체';
    }
    if (isColor(p) && p.image) {
      return <img src={p.image} alt='상품 색상' />;
    }
    if (isColor(p) && !p.image) {
      return '전체';
    }
    if (isOrder(p)) {
      return p.value;
    }
    return `Select ${text}`;
  };
  return (
    <div className={styles.select}>
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
      >
        <span className={`${styles.flex} ${styles.select__header_wrap}`}>
          {getDisplayValue(property)}
          <IoIosArrowDown />
        </span>

        <ul
          className={`${styles.select__header_menu} ${styles.dropdownList}${
            visible ? 'visible' : ''
          }`}
        >
          {data.map((item, i: number) => {
            const handleClick = () => handlechange(item);
            if (isRating(item)) {
              return (
                <li key={i} role='presentation' onClick={handleClick}>
                  <span>{item.value}</span>
                </li>
              );
            }
            if (isSize(item)) {
              return (
                <li key={i} role='presentation' onClick={handleClick}>
                  <span>{item.size ? item.size : '전체'}</span>
                </li>
              );
            }
            if (isColor(item)) {
              return (
                <li key={i} role='presentation' onClick={handleClick}>
                  <span>
                    {item.image ? (
                      <img src={item.image} alt='상품 색상' />
                    ) : (
                      '전체'
                    )}
                  </span>
                </li>
              );
            }
            if (isOrder(item)) {
              return (
                <li key={i} role='presentation' onClick={handleClick}>
                  <span>{item.value}</span>
                </li>
              );
            }
            return '';
          })}
        </ul>
      </div>
    </div>
  );
}

export default TableSelect;
