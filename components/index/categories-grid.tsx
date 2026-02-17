"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    title: "She Said Yes",
    slug: "she-said-yes",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    count: 24,
  },
  {
    title: "Tying the Knot",
    slug: "tying-the-knot",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    count: 38,
  },
  {
    title: "Family",
    slug: "family",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80",
    count: 15,
  },
  {
    title: "Portraiture",
    slug: "portraiture",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    count: 21,
  },
];

const CategoriesGrid = () => {
  const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease },
    },
  };

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#fafaf8]">
      {/* Section header */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-16 md:mb-24">
        <div className="text-center">
          <span className="category-label block mb-4">Explore</span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111]">
            Photography
          </h2>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map((category, index) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link
                href={`/photography/${category.slug}`}
                className="group relative block overflow-hidden"
              >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-4 text-center">
                  <h3 className="editorial-title text-white text-xl md:text-2xl mb-2">
                    {category.title}
                  </h3>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-sans">
                    {category.count} Stories
                  </span>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
