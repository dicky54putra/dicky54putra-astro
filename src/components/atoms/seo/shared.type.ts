export interface SEOProps {
  description?: string;
  title: string;
  keywords?: string[];
  publishedTime?: string;
  editedTime?: string;
  type?: "article" | "profile" | "book";
  canonical?: string;
  isbn?: string;
  shareImage?: string;
  noindex?: boolean;
}
