import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import Footer from '../components/footer';
import Header from '../components/header';
import type { CountryProps } from '../Interfaces/Country.interface';
import fetchCountry from '../utils/fetchCountry';

function Home({ country }: CountryProps) {
  const { data: session } = useSession();

  return (
    <div>
      <Header country={country} />
      <Footer country={country} />
    </div>
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
