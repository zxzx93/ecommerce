import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { CategoryData } from 'components/admin/categories/ListItem';

import styles from './styles.module.scss';

interface AdminInputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
  errors?: FieldErrors<CategoryData>;
  min?: number;
}

function AdminInput({ name, label, ...props }: AdminInputProps) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  return (
    <>
      <label
        htmlFor={name}
        className={`${styles.label} ${
          touchedFields && errors[name] ? styles.inputError : ''
        }`}
      >
        <span>{label}</span>
        <input {...register(name)} name={name} {...props} />
      </label>
      <div className={styles.inputError__msg}>
        <ErrorMessage name={name} errors={errors} />
      </div>
    </>
  );
}

export default AdminInput;
