import { useMediaQuery } from 'react-responsive';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import Footer from '../components/footer';
import Header from '../components/header';
import Category from '../components/home/category';
import FlashDeals from '../components/home/flashdeals';
import Main from '../components/home/main';
import Layout from '../components/layout/Layout';
import ProductsSwiper from '../components/productsSwiper';
import {
  gamingSwiper,
  homeImprovSwiper,
  womenAccessories,
  womenDresses,
  womenShoes,
  womenSwiper,
} from '../data/offers';
import { CountryProps } from '../interfaces/Country.interface';
import fetchCountry from '../utils/fetchCountry';

import styles from '../styles/home.module.scss';

function Home({ country }: CountryProps) {
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: '(max-width:850px)' });
  const isMobile = useMediaQuery({ query: '(max-width:550px)' });

  return (
    <Layout>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category header='드레스' products={womenDresses} />

            {/* 850px 이상일때 신발 카테고리 노출 */}
            {!isMedium && <Category header='신발' products={womenShoes} />}
            {/* 550px 미만일때 신발 카테고리 노출 */}
            {isMobile && <Category header='신발' products={womenShoes} />}
            <Category header='악세사리' products={womenAccessories} />
          </div>
          <ProductsSwiper products={womenSwiper} />
          <ProductsSwiper header='개임' products={gamingSwiper} />
          <ProductsSwiper header='실내 인테리어' products={homeImprovSwiper} />
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
