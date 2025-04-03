import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  globalData: any;
}

const Layout = ({ 
  children, 
  title = 'Beam Wallet', 
  description = 'Beam Wallet unites digital payments, consumer experience and retail marketing with a 360° solution.',
  globalData
}: LayoutProps) => {
  if (!globalData) {
    // Fallback if global data isn't available
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header navigation={null} />
        <main>{children}</main>
        <Footer settings={null} />
        <CookieBanner />
      </>
    );
  }
  
  const { navigation, settings } = globalData;
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header navigation={navigation} />
      <main>{children}</main>
      <Footer settings={settings} />
      <CookieBanner />
    </>
  );
};

export default Layout;