import axios from 'axios';

// Create an axios instance with default config
const strapiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for protected routes
strapiApi.interceptors.request.use(
  (config) => {
    // Add token for protected routes if needed
    if (config.url?.startsWith('/api/protected')) {
      config.headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper functions for common queries
export const fetchAPI = async (path: string, urlParams = {}) => {
  try {
    const mergedParams = {
      populate: '*',
      ...urlParams,
    };
    
    const queryString = new URLSearchParams(mergedParams as any).toString();
    const requestUrl = `${path}${queryString ? `?${queryString}` : ''}`;
    
    const response = await strapiApi.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
};

// Specific API functions
export const getGlobalData = async () => {
  const [navigationData, settingsData] = await Promise.all([
    fetchAPI('/api/navigation'),
    fetchAPI('/api/global-setting'),
  ]);
  
  return {
    navigation: navigationData.data,
    settings: settingsData.data,
  };
};

export const getPageData = async (slug: string) => {
  const data = await fetchAPI(`/api/pages`, {
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });
  
  return data.data[0];
};

export const getHomePage = async () => {
  const data = await fetchAPI('/api/home-page');
  return data.data;
};

export const getBlogPosts = async (page = 1, pageSize = 10) => {
  const data = await fetchAPI('/api/blog-posts', {
    pagination: {
      page,
      pageSize,
    },
    sort: ['publishedAt:desc'],
  });
  
  return data;
};

export const getBlogPost = async (slug: string) => {
  const data = await fetchAPI('/api/blog-posts', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      author: {
        populate: ['photo'],
      },
      categories: true,
      tags: true,
      featuredImage: true,
    },
  });
  
  return data.data[0];
};

export const getTeamMembers = async () => {
  const data = await fetchAPI('/api/team-members', {
    sort: ['order:asc'],
  });
  
  return data.data;
};

export const getTestimonials = async () => {
  const data = await fetchAPI('/api/testimonials');
  return data.data;
};

export const getFaqs = async (category?: string) => {
  let filters = {};
  
  if (category) {
    filters = {
      category: {
        $eq: category,
      },
    };
  }
  
  const data = await fetchAPI('/api/faqs', {
    filters,
    sort: ['order:asc'],
  });
  
  return data.data;
};

export default strapiApi;