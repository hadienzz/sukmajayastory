"use client";

import { Journal } from "@/types/journal";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  journal: Journal;
}

export default function JournalDetailContent({ journal }: Props) {
  const formattedDate = new Date(journal.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="relative">
      <Navbar />

      {/* Hero Cover */}
      <div className="relative w-full h-[60vh] md:h-[75vh]">
        <Image
          src={journal.coverImage}
          alt={journal.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative -mt-40 z-10 max-w-[800px] mx-auto px-6"
      >
        <div className="text-center mb-12">
          <span className="category-label !text-white/60 block mb-4">
            {journal.category}
          </span>
          <h1 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            {journal.title}
          </h1>
          {journal.subtitle && (
            <p className="body-text !text-white/70 text-base md:text-lg">
              {journal.subtitle}
            </p>
          )}
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-[720px] mx-auto px-6 pt-16 pb-24"
      >
        {/* Meta Info */}
        <div className="flex items-center justify-center gap-6 mb-12 pb-10 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2 text-[#888]">
            <User size={14} />
            <span className="category-label !text-[#888]">
              by {journal.author}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#888]">
            <Calendar size={14} />
            <span className="category-label !text-[#888]">
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#888]">
            <Clock size={14} />
            <span className="category-label !text-[#888]">
              {journal.readTime}
            </span>
          </div>
        </div>

        {/* Journal Body with Drop Cap */}
        <div
          className="journal-content"
          dangerouslySetInnerHTML={{ __html: journal.content }}
        />

        {/* Sign Off */}
        <div className="mt-16 pt-10 border-t border-[#e5e5e5]">
          <p className="body-text italic">Love,</p>
          <p className="editorial-title text-lg mt-1">{journal.author}</p>
        </div>

        {/* Share & Back */}
        <div className="flex items-center justify-between mt-16">
          <Link
            href="/journal"
            className="flex items-center gap-2 nav-link text-[#555] hover:text-[#111] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Journal
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 nav-link text-[#555] hover:text-[#111] transition-colors">
              <Share2 size={14} />
              Share
            </button>
          </div>
        </div>
      </motion.article>

      <Footer />
    </div>
  );
}
