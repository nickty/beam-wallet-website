import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/common/Layout';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { getHomePage, getGlobalData } from '@/utils/api';

interface HomePageProps {
  homeData: any;
  globalData: any;
}

const HomePage = ({ homeData, globalData }: HomePageProps) => {
  if (!homeData) {
    return <div>Loading...</div>;
  }
  
  const { attributes } = homeData;
  const { sections, seo } = attributes;
  
  return (
    <Layout
      title={seo?.metaTitle || 'Beam Wallet - Mobile Payment Solution'}
      description={seo?.metaDescription || 'Beam Wallet unites digital payments, consumer experience and retail marketing with a 360° solution.'}
      globalData={globalData}
    >
      <SectionRenderer sections={sections} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [homeData, globalData] = await Promise.all([
      getHomePage(),
      getGlobalData(),
    ]);
    
    return {
      props: {
        homeData,
        globalData,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      props: {
        homeData: null,
        globalData: null,
      },
      revalidate: 60,
    };
  }
};

export default HomePage;