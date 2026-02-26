import JournalListContent from "@/components/journal/journal-list-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — Sukma Jaya Story",
  description: "Stories, thoughts, and behind-the-scenes from our photography and videography sessions.",
};

export default function JournalListPage() {
  return <JournalListContent />;
}
