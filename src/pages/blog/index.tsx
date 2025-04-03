import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/common/Layout';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/common/Pagination';
import { getBlogPosts, getGlobalData } from '@/utils/api';

interface BlogPageProps {
  posts: any[];
  pagination: any;
  globalData: any;
}

const BlogPage = ({ posts, pagination, globalData }: BlogPageProps) => {
  return (
    <Layout
      title="Blog | Beam Wallet"
      description="Latest news, updates and insights from Beam Wallet"
      globalData={globalData}
    >
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Beam Wallet Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pageCount}
          basePath="/blog"
        />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const page = params?.page ? Number(params.page) : 1;
    
    const [blogData, globalData] = await Promise.all([
      getBlogPosts(page, 9),
      getGlobalData(),
    ]);
    
    return {
      props: {
        posts: blogData.data,
        pagination: blogData.meta.pagination,
        globalData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      props: {
        posts: [],
        pagination: {
          page: 1,
          pageSize: 9,
          pageCount: 1,
          total: 0,
        },
        globalData: null,
      },
      revalidate: 60,
    };
  }
};

export default BlogPage;