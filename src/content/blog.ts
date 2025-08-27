export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  excerpt: string;
  content: string; // simple markdown-ish text for now
  tags?: string[];
};

export const blogPosts: BlogPost[] = [];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getLatestBlogPosts(limit = 3) {
  return getAllBlogPosts().slice(0, limit);
}
