"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const ContactHero = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-125 overflow-hidden bg-[#0a0a0a] select-none pointer-events-none">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/foto-1.jpg)" }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <motion.span
          className="category-label text-white/50! block mb-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        >
          Get in Touch
        </motion.span>
        <motion.h1
          className="editorial-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease, delay: 0.3 }}
        >
          Let&apos;s Start Your Story
        </motion.h1>
        <motion.p
          className="body-text text-white/45! max-w-md text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
        >
          We&apos;d love to hear about your vision. Reach out and let&apos;s
          create something beautiful together.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHero;
