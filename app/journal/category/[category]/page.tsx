import JournalCategoryContent from "@/components/journal/journal-category-content";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return {
    title: `${decoded} — Journal — Sukma Jaya Story`,
    description: `Semua artikel dalam kategori ${decoded} dari Sukma Jaya Story.`,
  };
}

export default async function JournalCategoryPage({ params }: Props) {
  const { category } = await params;
  return <JournalCategoryContent category={category} />;
}
