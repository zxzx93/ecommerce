import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import { InferType, object, string } from 'yup';

import CircleIconBtn from '../../components/button/CircleIconBtn';
import Footer from '../../components/footer';
import Header from '../../components/header';
import LoginInput from '../../components/inputs/loginInput/LoginInput';
import DotLoaderSpinner from '../../components/loader/dotLoader';

import styles from '../../styles/forgot.module.scss';

const emailSchema = object({
  email: string()
    .email('유효한 이메일 주소를 입력하세요.')
    .required('이메일을 입력하세요.'),
});
type EmailData = InferType<typeof emailSchema>;

function forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const LoginMethod = useForm<EmailData>({
    resolver: yupResolver(emailSchema),
  });
  const { handleSubmit } = LoginMethod;

  const forgotPwdHandler = async (data: EmailData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/forgot', data);
      setSuccess(res.data.message);
      setLoading(false);
    } catch (err) {
      setSuccess('');
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country='' />
      <div className={styles.forgot}>
        <div className={styles.forgot__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt />
          </div>
          <span>
            비밀번호를 잊으셨나요? <Link href='/'>Login instead</Link>
          </span>
        </div>

        <FormProvider {...LoginMethod}>
          <form onSubmit={handleSubmit(forgotPwdHandler)}>
            <LoginInput
              type='text'
              name='email'
              icon='email'
              placeholder='이메일'
              onChange={e => setEmail(e.target.value)}
            />

            <CircleIconBtn buttonType='submit' text='비밀번호 찾기' />

            <div className={styles.message}>
              {error && <span className={styles.error}>{error}</span>}
              {success && <span className={styles.success}>{success}</span>}
            </div>
          </form>
        </FormProvider>
      </div>
      <Footer country='' />
    </>
  );
}

export default forgot;
