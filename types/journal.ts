export interface Journal {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  author: string;
  category: string;
  coverImage: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}
