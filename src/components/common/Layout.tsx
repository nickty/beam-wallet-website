import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Main = styled.main`
  min-height: calc(100vh - 200px);
`;

const Layout = ({ 
  children, 
  title = 'Beam Wallet - Shaping the future of Retail', 
  description = 'Beam Wallet unites digital payments, consumer experience and retail marketing with a 360° solution adapted to all retail and commerce agents.' 
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default Layout;