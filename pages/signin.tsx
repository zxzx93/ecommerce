import { ChangeEvent, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react';
import { InferType, object, ref, string } from 'yup';

import CircleIconBtn from '../components/button/CircleIconBtn';
import Footer from '../components/footer';
import Header from '../components/header';
import LoginInput from '../components/inputs/loginInput/LoginInput';
import Layout from '../components/layout/Layout';
import DotLoaderSpinner from '../components/loader/dotLoader';

import styles from '../styles/signin.module.scss';

const loginSchema = object({
  loginEmail: string()
    .email('유효한 이메일 주소를 입력하세요.')
    .required('이메일을 입력하세요.'),
  loginPassword: string().required('비밀번호를 입력하세요.'),
});
const registerSchema = object({
  name: string()
    .required('이름을 입력하세요.')
    .min(2, '이름은 2~10자 사이여야 합니다.')
    .max(10, '이름은 2~10자 사이여야 합니다.')
    .matches(/[가-힣]{2,10}$/, '숫자, 영어 및 특수 문자는 허용되지 않습니다.'),
  email: string()
    .required('이메일을 입력하세요.')
    .email('유효한 이메일 주소를 입력하세요.'),
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

type LoginData = InferType<typeof loginSchema>;
type RegisterData = InferType<typeof registerSchema>;

const country = {
  name: 'Morocco',
  flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
};

const initialValues = {
  loginEmail: '',
  loginPassword: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  error: '',
  loginError: '',
};

interface ProviderProps {
  providers: Record<string, ClientSafeProvider> | null;
  callbackUrl: string;
  csrfToken: string;
}

function signin({ providers, callbackUrl, csrfToken }: ProviderProps) {
  const [user, setUser] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const LoginMethod = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });
  const RegisterMethod = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit } = LoginMethod;
  const { handleSubmit: handleSubmit2 } = RegisterMethod;

  const signInHandler: SubmitHandler<LoginData> = async loginData => {
    const { loginEmail, loginPassword } = loginData;
    const options = {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
    };
    setLoading(true);
    const response = await signIn('credentials', options);
    setUser({ ...user, success: '', error: '' });
    setLoading(false);

    if (response?.error) {
      setLoading(false);
      setUser({ ...user, loginError: response.error });
    } else {
      Router.push(callbackUrl || '/');
    }
  };

  const signUpHandler: SubmitHandler<RegisterData> = async registerData => {
    const { name, email, password } = registerData;
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      setUser({ ...user, success: response.data.message });
      setLoading(false);

      setTimeout(async () => {
        const options = {
          email,
          password,
          redirect: false,
        };
        setLoading(true);
        await signIn('credentials', options);
        Router.push('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, error: error.response.data.message, success: '' });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Layout>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country={country} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              로그인 후 이용해 보세요! <Link href='/'>Go Store</Link>
            </span>
          </div>

          <div className={styles.login__form}>
            <h3>로그인</h3>
            <FormProvider {...LoginMethod}>
              <form
                onSubmit={handleSubmit(signInHandler)}
                method='post'
                action='/api/auth/signin/email'
              >
                <input
                  type='hidden'
                  name='csrfToken'
                  defaultValue={csrfToken}
                />
                <LoginInput
                  type='text'
                  name='loginEmail'
                  icon='email'
                  placeholder='이메일을 입력해주세요.'
                  onChange={handleChange}
                />
                <LoginInput
                  type='password'
                  name='loginPassword'
                  icon='password'
                  placeholder='비밀번호를 입력해주세요.'
                  onChange={handleChange}
                />
                <CircleIconBtn buttonType='submit' text='로그인' />

                {user.loginError && (
                  <span className={styles.error}>{user.loginError}</span>
                )}
                <div className={styles.forgotPwd}>
                  <Link href='/auth/forgot'>비밀번호를 잊으셨나요?</Link>
                </div>
              </form>
            </FormProvider>

            <div className={styles.login__socials}>
              <span className={styles.or}>간편 로그인</span>
              <div className={styles.login__socials_wrap}>
                {providers &&
                  Object.values(providers).map(provider => {
                    if (provider.name === 'Credentials') return null;
                    return (
                      <div key={provider.name}>
                        <button
                          className={styles.social_btn}
                          onClick={() => signIn(provider.id)}
                        >
                          <img
                            alt='간편 로그인 아이콘'
                            src={`../../icons/${provider.name}.png`}
                          />
                          {provider.name} 로그인
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h3>회원가입</h3>
            <FormProvider {...RegisterMethod}>
              <form onSubmit={handleSubmit2(signUpHandler)}>
                <LoginInput
                  type='text'
                  name='name'
                  icon='user'
                  placeholder='이름'
                  onChange={handleChange}
                />
                <LoginInput
                  type='text'
                  name='email'
                  icon='email'
                  placeholder='이메일'
                  onChange={handleChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  icon='password'
                  placeholder='비밀번호'
                  onChange={handleChange}
                />
                <LoginInput
                  type='password'
                  name='conf_password'
                  icon='password'
                  placeholder='비밀번호 재입력'
                  onChange={handleChange}
                />

                <CircleIconBtn buttonType='submit' text='회원가입' />
              </form>
            </FormProvider>

            <div>
              {user.success && (
                <span className={styles.success}>{user.success}</span>
              )}
            </div>
            <div>
              {user.error && <span className={styles.error}>{user.error}</span>}
            </div>
          </div>
        </div>
      </div>

      <Footer country={country} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, query } = ctx;
  const callbackUrl = query.callbackUrl as string;

  const providers = await getProviders();
  const session = await getSession({ req });
  const csrfToken = await getCsrfToken(ctx); // 로그인, 로그아웃을 하는데 필요한 CSRF 토큰을 반환

  // 세션 있을경우 이전 페이지로 다시 이동
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
        permanent: false,
      },
    };
  }

  return {
    props: { providers, callbackUrl, csrfToken },
  };
};

export default signin;
