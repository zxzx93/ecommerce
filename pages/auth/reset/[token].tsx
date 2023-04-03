import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { InferType, object, ref, string } from 'yup';

import CircleIconBtn from '../../../components/button/CircleIconBtn';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import LoginInput from '../../../components/inputs/loginInput/LoginInput';
import DotLoaderSpinner from '../../../components/loader/dotLoader';

import styles from '../../../styles/forgot.module.scss';

const resetSchema = object({
  password: string()
    .required('영문, 숫자포함 8자리를 입력하세요.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(15, '비밀번호는 15자를 초과할 수 없습니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
      '영문, 숫자포함 8자리를 입력하세요.'
    ),
  conf_password: string()
    .required('비밀번호를 확인하세요.')
    .oneOf([ref('password')], '비밀번호는 일치해야 합니다.'),
});
type ResetData = InferType<typeof resetSchema>;

interface JwtPayload {
  id: string;
}
interface ResetUserIdProps {
  userId: string;
}

function Reset({ userId }: ResetUserIdProps) {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const ResetMethod = useForm<ResetData>({
    resolver: yupResolver(resetSchema),
  });
  const { handleSubmit } = ResetMethod;

  const resetPwdHandler = async (data: ResetData) => {
    const { password: pwd } = data;

    try {
      setLoading(true);
      const res = await axios.put('/api/auth/reset', {
        userId,
        password: pwd,
      });
      setSuccess(res.data.message);
      setLoading(false);
      setError('');
      router.push('/');
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
            비밀번호를 재설정하시겠습니까?<Link href='/'>Login instead</Link>
          </span>
        </div>

        <FormProvider {...ResetMethod}>
          <form onSubmit={handleSubmit(resetPwdHandler)}>
            <LoginInput
              type='password'
              name='password'
              icon='password'
              placeholder='비밀번호'
              onChange={e => setPassword(e.target.value)}
            />
            <LoginInput
              type='password'
              name='conf_password'
              icon='password'
              placeholder='비밀번호 재입력'
              onChange={e => setConfPassword(e.target.value)}
            />
            <CircleIconBtn buttonType='submit' text='비밀번호 변경' />

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, query } = ctx;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const token = query.token as string;
  const { id } = jwt.verify(
    token,
    `${process.env.RESET_TOKEN_SECRET}`
  ) as JwtPayload;

  return {
    props: { userId: id },
  };
};

export default Reset;
