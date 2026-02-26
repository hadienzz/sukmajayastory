"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const AboutHero = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-150 overflow-hidden bg-[#0a0a0a] select-none pointer-events-none">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/testing-3.jpg)" }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <motion.span
          className="category-label text-white/50! block mb-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        >
          Our Story
        </motion.span>
        <motion.h1
          className="editorial-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl max-w-4xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease, delay: 0.3 }}
        >
          Behind Every Frame,
          <br />a Feeling
        </motion.h1>
        <motion.p
          className="body-text text-white/50! max-w-xl text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
        >
          We are Sukma Jaya Story — a creative studio dedicated to preserving
          life&apos;s most meaningful moments through the art of visual
          storytelling.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">
          Discover
        </span>
        <div className="w-px h-8 bg-white/15 relative overflow-hidden">
          <motion.div
            className="w-full h-3 bg-white/50 absolute"
            animate={{ y: [0, 18, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
