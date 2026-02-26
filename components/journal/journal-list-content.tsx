"use client";

import { dummyJournals } from "@/lib/dummy-journals";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function JournalListContent() {
  const featured = dummyJournals.find((j) => j.featured);
  const rest = dummyJournals.filter((j) => j.id !== featured?.id);

  const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <div className="relative">
      <Navbar />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="category-label block mb-5"
        >
          Our Journal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="editorial-title text-4xl md:text-5xl lg:text-6xl mb-6"
        >
          Stories & Reflections
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="body-text max-w-xl mx-auto"
        >
          A collection of stories, thoughts, and behind-the-scenes moments from
          our journey capturing love.
        </motion.p>
      </div>

      {/* Featured Post */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="max-w-[1200px] mx-auto px-6 mb-24"
        >
          <Link href={`/journal/${featured.id}`} className="group block">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="category-label !text-white/50 block mb-3">
                  {featured.category} — Featured
                </span>
                <h2 className="editorial-title text-2xl md:text-3xl lg:text-4xl text-white mb-3">
                  {featured.title}
                </h2>
                <p className="body-text !text-white/70 max-w-xl text-sm">
                  {featured.excerpt}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Journal Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {rest.map((journal, i) => (
            <motion.div
              key={journal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease }}
            >
              <Link href={`/journal/${journal.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-5">
                  <Image
                    src={journal.coverImage}
                    alt={journal.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <span className="category-label block mb-2">
                  {journal.category}
                </span>
                <h3 className="editorial-title text-xl md:text-2xl mb-2 group-hover:opacity-70 transition-opacity">
                  {journal.title}
                </h3>
                <p className="body-text text-sm line-clamp-2 mb-3">
                  {journal.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[#aaa]">
                  <Calendar size={12} />
                  <span className="category-label !text-[#aaa]">
                    {new Date(journal.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
