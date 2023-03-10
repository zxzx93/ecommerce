import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '../store';

import '../styles/globals.scss';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
