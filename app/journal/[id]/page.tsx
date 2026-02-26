import { dummyJournals, getJournalById } from "@/lib/dummy-journals";
import JournalDetailContent from "@/components/journal/journal-detail-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return dummyJournals.map((journal) => ({
    id: journal.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const journal = getJournalById(id);
  if (!journal) return { title: "Journal Not Found" };
  return {
    title: `${journal.title} — Sukma Jaya Story`,
    description: journal.excerpt,
  };
}

export default async function JournalPage({ params }: Props) {
  const { id } = await params;
  const journal = getJournalById(id);
  if (!journal) notFound();
  return <JournalDetailContent journal={journal!} />;
}
