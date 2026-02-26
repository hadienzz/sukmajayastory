"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const AboutCTA = () => {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/foto-2.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-225 mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease }}
        >
          <span className="category-label text-white/40! block mb-6">
            Ready to Begin?
          </span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6">
            Let&apos;s Create Something
            <br />
            Beautiful Together
          </h2>
          <p className="body-text text-white/50! max-w-lg mx-auto mb-10">
            Whether it&apos;s your engagement, wedding day, or a personal
            portrait session — we&apos;d love to hear your story and bring it to
            life through our lens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{
                backgroundColor: "rgba(255,255,255,1)",
                color: "#111111",
              }}
              transition={{ duration: 0.45, ease }}
              className="inline-block border border-white/30"
            >
              <Link
                href="/contact"
                className="inline-block px-10 py-4 nav-link text-white hover:text-black transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="/photography"
                className="inline-block px-10 py-4 nav-link text-white/50"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
