import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import Footer from '../components/footer';
import Header from '../components/header';
import Main from '../components/home/main';
import Layout from '../components/layout/Layout';
import type { CountryProps } from '../Interfaces/Country.interface';
import fetchCountry from '../utils/fetchCountry';

import styles from '../styles/Home.module.scss';

function Home({ country }: CountryProps) {
  const { data: session } = useSession();

  return (
    <Layout>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer country={country} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const country = await fetchCountry();

  return {
    props:
      // { country: { name: country.name, flag: country.flag.emojitwo } },

      {
        country: {
          name: 'korea',
          flag: 'https://cdn.pixabay.com/photo/2016/05/30/15/33/julia-roberts-1424985_1280.png',
        },
      },
  };
};

export default Home;
