import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';

interface ILayoutProps {
  children: JSX.Element;
}

function Layout({ children }: ILayoutProps) {
  const router = useRouter();
  const slug =
    router.pathname.slice(1).toUpperCase().slice(0, 1) +
    router.pathname.slice(2);

  return (
    <>
      <Head>
        <title>Netflix | {slug ? slug : 'Home'}</title>
        <meta name='description' content='Netflix Clone' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {slug !== 'Login' && slug !== 'Signup' && <Header />}
      <main>{children}</main>
      {/* Footer Component */}
    </>
  );
}

export default Layout;
