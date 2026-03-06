"use client";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { useJournalsByCategoryQuery } from "@/hooks/use-journal";

interface Props {
  category: string;
}

export default function JournalCategoryContent({ category }: Props) {
  const { journals, emptyMessage, isLoading, isError, error } =
    useJournalsByCategoryQuery(category);

  const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="relative">
      <Navbar />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-6"
        >
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 category-label text-[#aaa] hover:text-[#111] transition-colors duration-200"
          >
            <ArrowLeft size={13} />
            All Journals
          </Link>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="category-label block mb-5"
        >
          Category
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="editorial-title text-4xl md:text-5xl lg:text-6xl mb-6 capitalize"
        >
          {decodedCategory}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="body-text max-w-xl mx-auto"
        >
          Semua artikel dalam kategori &ldquo;{decodedCategory}&rdquo;.
        </motion.p>
      </div>

      {/* Content */}
      <div className="max-w-300 mx-auto px-6 pb-32">
        {isLoading && (
          <div className="text-center py-24">
            <p className="body-text text-sm">Memuat artikel...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-24">
            <p className="body-text text-sm">
              Gagal memuat artikel: {error?.message ?? "Unknown error"}
            </p>
          </div>
        )}

        {!isLoading && !isError && journals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-center py-24"
          >
            <p className="editorial-title text-2xl md:text-3xl mb-4 opacity-40">
              ✦
            </p>
            <p className="body-text text-sm max-w-md mx-auto opacity-60">
              {emptyMessage ||
                `Kategori "${decodedCategory}" belum memiliki artikel. Nantikan artikel kami selanjutnya!`}
            </p>
            <div className="mt-8">
              <Link
                href="/journal"
                className="category-label underline underline-offset-4 hover:opacity-60 transition-opacity"
              >
                Lihat semua artikel →
              </Link>
            </div>
          </motion.div>
        )}

        {!isLoading && !isError && journals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {journals.map((journal, i) => (
              <motion.div
                key={journal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 * i, ease }}
              >
                <Link href={`/journal/${journal.id}`} className="group block">
                  <div className="relative aspect-4/3 overflow-hidden mb-5">
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
                    <span className="category-label text-[#aaa]!">
                      {new Date(journal.publishedAt).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
