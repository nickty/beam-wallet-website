// Common types used throughout the application

export interface PageMeta {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
  }
  
  export interface MenuItem {
    id: number;
    title: string;
    url: string;
    order: number;
    parent?: number | null;
    children?: MenuItem[];
  }
  
  export interface Navigation {
    id: number;
    name: string;
    items: MenuItem[];
  }
  
  export interface Image {
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
  }
  
  export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path?: string | null;
    url: string;
  }
  
  export interface PageSection {
    id: number;
    __component: string;
    title?: string;
    subtitle?: string;
    content?: string;
    image?: Image;
    buttons?: Button[];
    items?: any[];
    background?: string;
    variant?: string;
  }
  
  export interface Button {
    id: number;
    text: string;
    url: string;
    variant: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'small' | 'medium' | 'large';
  }
  
  export interface Page {
    id: number;
    title: string;
    slug: string;
    description?: string;
    content?: string;
    sections?: PageSection[];
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
      metaImage?: Image;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImage?: Image;
    author?: {
      id: number;
      name: string;
      picture?: Image;
    };
    categories?: {
      id: number;
      name: string;
      slug: string;
    }[];
    tags?: {
      id: number;
      name: string;
      slug: string;
    }[];
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
      metaImage?: Image;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    department: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    meta?: {
      pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
  
  export interface ApiError {
    status: number;
    name: string;
    message: string;
    details?: any;
  }