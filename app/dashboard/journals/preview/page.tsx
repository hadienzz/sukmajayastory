"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import type { Journal } from "@/types/journal";
import {
  JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY,
  JOURNAL_PREVIEW_STORAGE_KEY,
} from "@/forms/journal/journal-preview";

export default function JournalPreviewPage() {
  const [journal] = useState<Journal | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.sessionStorage.getItem(JOURNAL_PREVIEW_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Journal;
    } catch {
      return null;
    }
  });

  const [originHref] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY);
  });

  const formattedDate = useMemo(() => {
    if (!journal) return "";
    return new Date(journal.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [journal]);

  if (!journal) {
    return (
      <div className="relative">
        <Navbar />
        <div className="max-w-180 mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20 sm:pb-24">
          <h1 className="editorial-title text-2xl">Preview not available</h1>
          <p className="body-text text-sm mt-2">
            Go back to the editor and click Preview again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {originHref && (
              <Link
                href={originHref}
                className="inline-flex items-center gap-2 nav-link text-[#555] hover:text-[#111] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Editor
              </Link>
            )}
            <Link
              href="/dashboard/journals"
              className="inline-flex items-center gap-2 nav-link text-[#555] hover:text-[#111] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Journals
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />

      <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#111]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={journal.coverImage}
          alt={journal.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="relative -mt-40 z-10 max-w-200 mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="category-label text-white/60! block mb-4">
            {journal.category}
          </span>
          <h1 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            {journal.title}
          </h1>
          {journal.subtitle && (
            <p className="body-text text-white/70! text-base md:text-lg">
              {journal.subtitle}
            </p>
          )}
        </div>
      </div>

      <article className="max-w-180 mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2 text-[#888]">
            <User size={14} />
            <span className="category-label text-[#888]!">by {journal.author}</span>
          </div>
          <div className="flex items-center gap-2 text-[#888]">
            <Calendar size={14} />
            <span className="category-label text-[#888]!">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[#888]">
            <Clock size={14} />
            <span className="category-label text-[#888]!">{journal.readTime}</span>
          </div>
        </div>

        <div
          className="journal-content"
          dangerouslySetInnerHTML={{ __html: journal.content }}
        />

        <div className="flex items-center justify-between mt-16">
          <div className="flex flex-col sm:flex-row gap-3">
            {originHref && (
              <Link
                href={originHref}
                className="flex items-center gap-2 nav-link text-[#555] hover:text-[#111] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Editor
              </Link>
            )}
            <Link
              href="/dashboard/journals"
              className="flex items-center gap-2 nav-link text-[#555] hover:text-[#111] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Journals
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
