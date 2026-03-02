import type { Journal } from "@/types/journal";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ");

const makeExcerpt = (content: string) => {
  const plain = stripHtml(content).replace(/\s+/g, " ").trim();
  return plain.length <= 160 ? plain : `${plain.slice(0, 157)}...`;
};

const estimateReadTime = (content: string) => {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

export const JOURNAL_PREVIEW_STORAGE_KEY = "journalPreview";
export const JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY = "journalPreviewOrigin";

export const buildJournalPreview = (input: {
  title: string;
  subtitle?: string;
  author: string;
  category: string;
  coverImage: string;
  content: string;
  featured: boolean;
}): Journal => {
  const publishedAt = new Date().toISOString().slice(0, 10);
  const slug =
    input.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "preview";

  return {
    id: "preview",
    title: input.title,
    subtitle: input.subtitle,
    author: input.author,
    category: input.category,
    coverImage: input.coverImage,
    content: input.content,
    featured: Boolean(input.featured),
    slug,
    excerpt: makeExcerpt(input.content),
    publishedAt,
    readTime: estimateReadTime(input.content),
  };
};
