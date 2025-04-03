/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return ""
  
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }
  
  /**
   * Truncate text to a specified length
   * @param text - Text to truncate
   * @param length - Maximum length
   * @returns Truncated text
   */
  export const truncateText = (text: string, length: number): string => {
    if (!text || text.length <= length) return text
  
    return text.slice(0, length).trim() + "..."
  }
  
  /**
   * Convert a string to slug format
   * @param text - Text to convert
   * @returns Slugified text
   */
  export const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "") // Trim - from end of text
  }
  
  /**
   * Get image dimensions from Strapi media
   * @param media - Strapi media object
   * @returns Object with width and height
   */
  export const getImageDimensions = (media: any) => {
    if (!media || !media.data || !media.data.attributes) {
      return { width: 1000, height: 1000 }
    }
  
    const { width, height } = media.data.attributes
    return { width, height }
  }
  
  