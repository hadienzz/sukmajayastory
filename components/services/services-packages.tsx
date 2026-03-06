"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const packages = [
  {
    name: "Essentials",
    category: "Photography",
    tagline: "For intimate celebrations",
    includes: [
      "6 hours of coverage",
      "One photographer",
      "150–200 edited images",
      "Online private gallery",
      "Print release included",
    ],
    highlight: false,
  },
  {
    name: "Signature",
    category: "Photography + Film",
    tagline: "Our most-loved package",
    includes: [
      "Full-day coverage (10 hours)",
      "Two photographers + videographer",
      "350–500 edited images",
      "Cinematic highlight film (4 min)",
      "Online private gallery",
      "Print release included",
      "Engagement session included",
    ],
    highlight: true,
  },
  {
    name: "Portraiture",
    category: "Personal Sessions",
    tagline: "Maternity, family & milestones",
    includes: [
      "2 hours of coverage",
      "One photographer",
      "40–60 edited images",
      "Online private gallery",
      "Print release included",
    ],
    highlight: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const ServicesPackages = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#111111] text-white">
      {/* Header */}
      <div className="max-w-300 mx-auto px-6 lg:px-10 mb-16 md:mb-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease }}
        >
          <span className="category-label text-white/40! block mb-4">
            Packages
          </span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Choose Your Story
          </h2>
          <p className="body-text text-white/50! max-w-xl mx-auto">
            Each package is a starting point. We believe every story is unique,
            so all packages can be tailored to fit your vision perfectly.
          </p>
        </motion.div>
      </div>

      {/* Packages */}
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={itemVariants}
              className={`relative flex flex-col p-10 md:p-12 ${
                pkg.highlight ? "bg-white text-[#111111]" : "bg-[#111111] text-white"
              }`}
            >
              {pkg.highlight && (
                <span className="category-label text-[#999999]! absolute top-10 right-10">
                  Most Popular
                </span>
              )}

              <span
                className={`category-label block mb-4 ${
                  pkg.highlight ? "text-[#999999]!" : "text-white/35!"
                }`}
              >
                {pkg.category}
              </span>
              <h3
                className={`editorial-title text-3xl md:text-4xl mb-3 ${
                  pkg.highlight ? "text-[#111111]" : "text-white"
                }`}
              >
                {pkg.name}
              </h3>
              <p
                className={`text-[13px] font-sans tracking-wide mb-10 ${
                  pkg.highlight ? "text-[#777777]" : "text-white/40"
                }`}
              >
                {pkg.tagline}
              </p>

              <ul className="space-y-4 mb-12 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        pkg.highlight ? "text-[#111111]" : "text-white/40"
                      }`}
                      strokeWidth={1.5}
                    />
                    <span
                      className={`text-[13px] font-sans tracking-wide ${
                        pkg.highlight ? "text-[#333333]" : "text-white/60"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.div
                whileHover={{ opacity: 0.75 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href="/contact"
                  className={`inline-block w-full text-center py-4 nav-link border transition-colors duration-300 ${
                    pkg.highlight
                      ? "border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white"
                      : "border-white/20 text-white/70 hover:border-white/50"
                  }`}
                >
                  Enquire Now
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-[12px] text-white/25 font-sans tracking-widest uppercase mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease, delay: 0.5 }}
        >
          Custom packages available — contact us to discuss your vision
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesPackages;
