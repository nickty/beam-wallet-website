import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/common/Layout';
import SectionRenderer from '@/components/sections/SectionRenderer';
import RichText from '@/components/common/RichText';
import { getPageData, getGlobalData } from '@/utils/api';

interface PageProps {
  pageData: any;
  globalData: any;
}

const Page = ({ pageData, globalData }: PageProps) => {
  if (!pageData) {
    return <div>Page not found</div>;
  }
  
  const { attributes } = pageData;
  const { title, content, sections, seo } = attributes;
  
  return (
    <Layout
      title={seo?.metaTitle || title}
      description={seo?.metaDescription || ''}
      globalData={globalData}
    >
      {sections && sections.length > 0 ? (
        <SectionRenderer sections={sections} />
      ) : (
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <RichText content={content} />
        </div>
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // This would normally fetch all page slugs from Strapi
  // For simplicity, we're returning an empty array
  // Next.js will generate pages on-demand
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    const [pageData, globalData] = await Promise.all([
      getPageData(slug),
      getGlobalData(),
    ]);
    
    if (!pageData) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        pageData,
        globalData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      notFound: true,
    };
  }
};

export default Page;