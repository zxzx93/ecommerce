import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { yupResolver } from '@hookform/resolvers/yup';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { InferType, object, ref, string } from 'yup';

import CircleIconBtn from '../components/button/CircleIconBtn';
import Footer from '../components/footer';
import Header from '../components/header';
import LoginInput from '../components/inputs/loginInput/LoginInput';
import Layout from '../components/layout/Layout';

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
    .required('로그인할 때나 비밀번호를 재설정해야 할 때 이 정보가 필요합니다.')
    .email('유효한 이메일 주소를 입력하세요.'),
  password: string()
    .required('영문, 숫자포함 8자리를 입력해주세요.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(15, '비밀번호는 15자를 초과할 수 없습니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
      '영문, 숫자포함 8자리를 입력해주세요.'
    ),
  conf_password: string()
    .required('비밀번호를 확인해주세요.')
    .oneOf([ref('password')], '비밀번호는 일치해야 합니다.'),
});

type LoginData = InferType<typeof loginSchema>;
type RegisterData = InferType<typeof registerSchema>;

const country = {
  name: 'Morocco',
  flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
};

const initialValues: LoginData & RegisterData = {
  loginEmail: '',
  loginPassword: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
};

interface ProviderProps {
  providers: Record<string, ClientSafeProvider> | null;
}

function signin({ providers }: ProviderProps) {
  const [user, setUser] = useState(initialValues);

  // const { loginEmail, loginPassword } = user;

  const LoginMethod = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });
  const {
    // setFocus,
    handleSubmit,
  } = LoginMethod;

  const RegisterMethod = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });
  const {
    // setFocus: setFocus2,
    handleSubmit: handleSubmit2,
  } = RegisterMethod;

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     const firstError: any = Object.keys(errors)[0] as keyof typeof errors;
  //     setFocus(firstError);
  //   }
  // }, [errors, setFocus]);

  const signInHandler: SubmitHandler<LoginData> = data =>
    console.log(data, '데이터');
  const signUpHandler: SubmitHandler<RegisterData> = data =>
    console.log(data, '데이터');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Layout>
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
              <form onSubmit={handleSubmit(signInHandler)}>
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
                <div className={styles.forgotPwd}>비밀번호를 잊으셨나요?</div>
              </form>
            </FormProvider>

            <div className={styles.login__socials}>
              <span className={styles.or}>간편 로그인</span>
              <div className={styles.login__socials_wrap}>
                {providers &&
                  Object.values(providers).map(provider => (
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
                  ))}
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
                  placeholder='이름을 입력해주세요.'
                  onChange={handleChange}
                />
                <LoginInput
                  type='text'
                  name='email'
                  icon='email'
                  placeholder='이메일을 입력해주세요.'
                  onChange={handleChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  icon='password'
                  placeholder='비밀번호를 입력해주세요.'
                  onChange={handleChange}
                />
                <LoginInput
                  type='password'
                  name='conf_password'
                  icon='password'
                  placeholder='비밀번호를 다시 입력해주세요.'
                  onChange={handleChange}
                />

                <CircleIconBtn buttonType='submit' text='회원가입' />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      <Footer country={country} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default signin;
