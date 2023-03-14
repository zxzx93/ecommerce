import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { IoKeyOutline } from 'react-icons/io5';
import { SiMinutemailer } from 'react-icons/si';
import { ErrorMessage } from '@hookform/error-message';

import styles from './styles.module.scss';

interface LoginData {
  loginEmail: string;
  loginPassword: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  conf_password: string;
}

interface InputProps {
  type: HTMLInputTypeAttribute;
  name:
    | 'loginEmail'
    | 'loginPassword'
    | 'name'
    | 'email'
    | 'password'
    | 'conf_password';
  icon: 'email' | 'password' | 'user';
  placeholder: string;
  errors?: FieldErrors<LoginData & RegisterData>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LoginInput({ name, icon, errors, ...props }: InputProps) {
  const { register } = useFormContext();

  const inputIcon =
    icon === 'user' ? (
      <BiUser />
    ) : icon === 'email' ? (
      <SiMinutemailer />
    ) : icon === 'password' ? (
      <IoKeyOutline />
    ) : null;

  return (
    <>
      <div className={styles.input}>
        <div>{inputIcon}</div>
        <label htmlFor={name}>{name}</label>
        <input {...register(name)} name={name} {...props} />
      </div>
      <div className={styles.error}>
        <ErrorMessage name={name} errors={errors} />
      </div>
    </>
  );
}

export default LoginInput;
