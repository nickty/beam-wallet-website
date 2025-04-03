/**
 * Format date to a readable string
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  /**
   * Truncate text to a specific length and add ellipsis
   */
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  /**
   * Convert a string to slug format
   */
  export const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  };
  
  /**
   * Get image dimensions from URL
   */
  export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = reject;
      img.src = url;
    });
  };
  
  /**
   * Check if the current environment is a browser
   */
  export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
  };
  
  /**
   * Get viewport dimensions
   */
  export const getViewportDimensions = (): { width: number; height: number } => {
    if (!isBrowser()) {
      return { width: 0, height: 0 };
    }
    
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    };
  };
  
  /**
   * Check if an element is in viewport
   */
  export const isElementInViewport = (element: HTMLElement): boolean => {
    if (!isBrowser()) return false;
    
    const rect = element.getBoundingClientRect();
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  /**
   * Generate a random ID
   */
  export const generateId = (length = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  };
  
  /**
   * Format currency
   */
  export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };
  
  /**
   * Debounce function
   */
  export const debounce = <F extends (...args: any[]) => any>(
    func: F,
    waitFor: number
  ): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    
    return (...args: Parameters<F>): void => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(() => func(...args), waitFor);
    };
  };