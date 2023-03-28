import Head from 'next/head';

interface ChildrenProps {
  children: React.ReactNode;
}

function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {children}
    </>
  );
}

export default Layout;
