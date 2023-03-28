import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '../store';

import '../styles/globals.scss';

const persistor = persistStore(store);

function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Layout> */}
          <Component {...pageProps} />
          {/* </Layout> */}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
