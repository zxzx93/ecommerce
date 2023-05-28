import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { Color, Size } from '../../../interfaces/Product.interface';

import styles from './styles.module.scss';

interface SelectProps<T> {
  text: string;
  property: T | T[];
  data: T[];
  handlechange: (item: T) => void;
}

function SelectValue<T>({
  text,
  property,
  data,
  handlechange,
}: SelectProps<T>) {
  const [visible, setVisible] = useState(false);

  const isSize = (item: unknown): item is Size =>
    typeof item === 'object' && !!item && 'size' in item;

  const isColor = (item: unknown): item is Color =>
    typeof item === 'object' && !!item && 'color' in item;

  const isFit = (item: unknown): item is string =>
    typeof item === 'string' && !!item;

  const getDisplayValue = (p: SelectProps<T>['property']) => {
    if (isColor(p) && p.image) {
      return <img src={p.image} alt='색상이미지' />;
    }
    if (isSize(p)) {
      return p.size || 'Select Size';
    }
    if (isFit(p)) {
      return p;
    }
    if (!p) {
      return 'Select Fit';
    }
    return 'Select Style';
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

        {/* 색상, 사이즈 , 핏 드롭다운 리스트 */}
        <ul
          className={`${styles.select__header_menu} ${styles.dropdownList}${
            visible ? 'visible' : ''
          }`}
        >
          {data.map((item, i: number) => {
            const handleClick = () => handlechange(item);
            if (isSize(item)) {
              return (
                <li key={i} role='presentation' onClick={handleClick}>
                  <span>{item.size}</span>
                </li>
              );
            }
            if (isColor(item)) {
              return (
                <li key={i} role='presentation' onClick={handleClick}>
                  <span>
                    <img src={item.image} alt='색상이미지' />
                  </span>
                </li>
              );
            }
            if (isFit(item)) {
              return (
                <li key={i} role='presentation' onClick={handleClick}>
                  <span>{item}</span>
                </li>
              );
            }
            return 'unknownType';
          })}
        </ul>
      </div>
    </div>
  );
}

export default SelectValue;
