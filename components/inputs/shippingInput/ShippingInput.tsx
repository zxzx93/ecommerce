import { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import styles from './styles.module.scss';
import handleKeyDown from 'utils/helpers/keyboardHandlers';

interface InputProps {
  name:
    | 'name'
    | 'state'
    | 'phoneNumber'
    | 'zipCode'
    | 'address1'
    | 'address2'
    | 'coupon';
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ShippingInput({ name, placeholder, ...props }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [move, setMove] = useState(false); // 인풋 포커스 여부에 따라 라벨 글자 위로 이동함
  const handleFocus = () => {
    setMove(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setMove(false);
    }
  };

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.parentElement?.querySelector('input')?.focus();
  };

  return (
    <div
      className={`${styles.input} ${errors[name] && styles.error__shipping}`}
    >
      <div
        className={styles.input__wrapper}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input {...register(name)} name={name} autoComplete='off' {...props} />
        <span
          className={move ? styles.move : ''}
          onClick={handleClick}
          onKeyDown={e => handleKeyDown(e, () => handleClick)}
          role='none'
        >
          {placeholder}
        </span>
      </div>

      {errors[name] && (
        <div className={styles.error}>
          <ErrorMessage name={name} errors={errors} />
        </div>
      )}
    </div>
  );
}

export default ShippingInput;
