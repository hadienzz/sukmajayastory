import JournalDetailContent from "@/components/journal/journal-detail-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Journal } from "@/types/journal";

interface Props {
  params: Promise<{ id: string }>;
}

const getApiBaseUrl = () => {
  const raw =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000";

  return raw.replace(/\/$/, "");
};

const fetchJournal = async (id: string): Promise<Journal | null> => {
  const res = await fetch(
    `${getApiBaseUrl()}/api/journal/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch journal (${res.status})`);
  const payload = (await res.json()) as {
    data?: Journal;
  };
  return payload.data ?? null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const journal = await fetchJournal(id);
  if (!journal) return { title: "Journal Not Found" };
  return {
    title: `${journal.title} — Sukma Jaya Story`,
    description: journal.excerpt,
  };
}

export default async function JournalPage({ params }: Props) {
  const { id } = await params;
  const journal = await fetchJournal(id);
  if (!journal) notFound();
  return <JournalDetailContent journal={journal} />;
}
