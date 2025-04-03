import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/common/Layout';
import StrapiMedia from '@/components/common/StrapiMedia';
import RichText from '@/components/common/RichText';
import { formatDate } from '@/utils/helpers';
import { getBlogPost, getGlobalData } from '@/utils/api';

interface BlogPostProps {
  post: any;
  globalData: any;
}

const BlogPostPage = ({ post, globalData }: BlogPostProps) => {
  if (!post) {
    return <div>Post not found</div>;
  }
  
  const { attributes } = post;
  const { title, content, publishedAt, author, categories, featuredImage, seo } = attributes;
  
  return (
    <Layout
      title={seo?.metaTitle || title}
      description={seo?.metaDescription || ''}
      globalData={globalData}
    >
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        
        <div className="flex items-center mb-6">
          {author?.data && (
            <div className="flex items-center mr-6">
              {author.data.attributes.photo?.data && (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <StrapiMedia media={author.data.attributes.photo} />
                </div>
              )}
              <span>{author.data.attributes.name}</span>
            </div>
          )}
          
          <div className="text-gray-500">
            {formatDate(publishedAt)}
          </div>
        </div>
        
        {categories?.data && categories.data.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.data.map((category: any) => (
              <span 
                key={category.id} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {category.attributes.name}
              </span>
            ))}
          </div>
        )}
        
        {featuredImage?.data && (
          <div className="mb-8">
            <StrapiMedia 
              media={featuredImage} 
              className="rounded-lg w-full h-auto"
              priority
            />
          </div>
        )}
        
        <RichText content={content} />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    const [post, globalData] = await Promise.all([
      getBlogPost(slug),
      getGlobalData(),
    ]);
    
    if (!post) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        post,
        globalData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      notFound: true,
    };
  }
};

export default BlogPostPage;