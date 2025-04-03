/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: ['your-s3-bucket.s3.amazonaws.com'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
        },
      ];
    },
  };
  
  module.exports = nextConfig;