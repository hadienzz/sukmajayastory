"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stories = [
  {
    id: 1,
    slug: "eternal-vows-in-ubud",
    image: "/foto-featured-1.JPG",
    date: "December 2025",
    category: "Tying the Knot",
    title: "Eternal Vows in Ubud",
    description:
      "An intimate ceremony surrounded by ancient temples and lush tropical greenery, where two souls became one under the Balinese sky.",
  },
  {
    id: 2,
    slug: "golden-hour-portraits",
    image: "/featured-2.jpeg",
    date: "November 2025",
    category: "Portraiture",
    title: "Golden Hour Portraits",
    description:
      "Capturing the raw beauty of golden light as it dances across familiar faces, creating timeless portraits that speak of warmth and presence.",
  },
  {
    id: 3,
    slug: "a-beginning-of-forever",
    image:
      "/featured-3.webp",
    date: "October 2025",
    category: "She Said Yes",
    title: "A Beginning of Forever",
    description:
      "The proposal that started it all — a quiet moment of surprise and joy on the shores of Jimbaran, preserved in perfect stillness.",
  },
];

const FeaturedStories = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white">
      {/* Section header */}
      <div className="max-w-300 mx-auto px-6 lg:px-10 mb-16 md:mb-24">
        <div className="text-center">
          <span className="category-label block mb-4">Journal</span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111]">
            Featured Stories
          </h2>
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="max-w-300 mx-auto px-6 lg:px-10 mt-20 md:mt-28 text-center">
        <motion.div
          whileHover={{ opacity: 0.65 }}
          transition={{ duration: 0.25 }}
        >
          <Link
            href="/journal"
            className="inline-flex items-center gap-3 nav-link text-[#111111]"
          >
            View All Stories
            <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface StoryCardProps {
  story: (typeof stories)[number];
  index: number;
}

const StoryCard = ({ story, index }: StoryCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Image */}
      <Link
        href={`/journal/${story.slug}`}
        className={`block relative aspect-4/5 md:aspect-3/4 overflow-hidden ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </Link>

      {/* Content */}
      <div
        className={`flex flex-col justify-center ${
          isEven
            ? "lg:order-2 lg:pl-8"
            : "lg:order-1 lg:pr-8 lg:text-right lg:items-end"
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="category-label">{story.category}</span>
          <span className="w-8 h-px bg-[#d4d4d4]" />
          <span className="text-[11px] tracking-[0.15em] text-[#999999] font-sans">
            {story.date}
          </span>
        </div>

        <motion.div
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.25 }}
        >
          <Link href={`/journal/${story.slug}`}>
            <h3 className="editorial-title text-2xl md:text-3xl lg:text-4xl text-[#111111] mb-5">
              {story.title}
            </h3>
          </Link>
        </motion.div>

        <p className="body-text max-w-md mb-8">{story.description}</p>

        <motion.div
          className="inline-flex"
          whileHover={{ opacity: 0.65 }}
          transition={{ duration: 0.25 }}
        >
          <Link
            href={`/journal/${story.slug}`}
            className="inline-flex items-center gap-3 nav-link text-[#111111]"
          >
            Read More
            <motion.span whileHover={{ x: 6 }} transition={{ duration: 0.25 }}>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedStories;
