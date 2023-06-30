import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { CartItem } from '../../../interfaces/Cart.interface';
import compareArrays from '../../../utils/helpers/compareArrays';
import handleKeyDown from '../../../utils/helpers/keyboardHandlers';

import styles from './styles.module.scss';

interface CartHeaderProps {
  cartItems: CartItem[];
  selectedItems: CartItem[];
  setSelectedItems: Dispatch<SetStateAction<CartItem[]>>;
}

function CartHeader({
  cartItems,
  selectedItems,
  setSelectedItems,
}: CartHeaderProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check = compareArrays(cartItems, selectedItems);
    setActive(check);
  }, [selectedItems]);

  const handleSelect = () => {
    if (selectedItems.length !== cartItems.length) {
      setSelectedItems(cartItems);
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h2>상품 요약({cartItems.length})</h2>
      <div
        className={styles.flex}
        onClick={() => handleSelect()}
        onKeyDown={e => handleKeyDown(e, () => handleSelect())}
        role='button'
        tabIndex={0}
      >
        <div className={`${styles.checkbox} ${active ? styles.active : ''}`} />
        <span>전체 선택</span>
      </div>
    </div>
  );
}

export default CartHeader;
