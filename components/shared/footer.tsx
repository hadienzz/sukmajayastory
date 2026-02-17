"use client";

import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <span className="category-label !text-white/40 block mb-5">
            Let&apos;s Create Together
          </span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-8">
            Your Story Deserves
            <br />
            to Be Told Beautifully
          </h2>
          <motion.div
            whileHover={{ backgroundColor: "rgba(255,255,255,1)", color: "#111111" }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-block border border-white/30"
          >
            <Link
              href="/contact"
              className="inline-block px-10 py-4 nav-link text-white"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="editorial-title text-lg tracking-[0.02em] text-white inline-block mb-5"
            >
              Sukma Jaya Story
            </Link>
            <p className="body-text !text-white/40 max-w-xs text-sm leading-relaxed">
              Premium photography and videography studio based in Bogor.
              Capturing timeless moments with an editorial eye.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:text-center">
            <span className="category-label !text-white/30 block mb-5">
              Navigate
            </span>
            <nav className="flex flex-col gap-3">
              <motion.div whileHover={{ opacity: 0.9 }}>
                <Link href="/photography" className="nav-link text-white/60">
                  Photography
                </Link>
              </motion.div>
              <motion.div whileHover={{ opacity: 0.9 }}>
                <Link href="/videography" className="nav-link text-white/60">
                  Videography
                </Link>
              </motion.div>
              <motion.div whileHover={{ opacity: 0.9 }}>
                <Link href="/about" className="nav-link text-white/60">
                  About
                </Link>
              </motion.div>
              <motion.div whileHover={{ opacity: 0.9 }}>
                <Link href="/journal" className="nav-link text-white/60">
                  Journal
                </Link>
              </motion.div>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <span className="category-label !text-white/30 block mb-5">
              Connect
            </span>
            <div className="space-y-3">
              <motion.a
                href="mailto:hello@sukmajayastory.com"
                className="nav-link text-white/60 block"
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                hello@sukmajayastory.com
              </motion.a>
              <p className="nav-link text-white/40">Bogor, Indonesia</p>
              <div className="flex gap-4 md:justify-end pt-2">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40"
                  aria-label="Instagram"
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="mailto:hello@sukmajayastory.com"
                  className="text-white/40"
                  aria-label="Email"
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] tracking-[0.1em] text-white/25 font-sans">
            &copy; {new Date().getFullYear()} Sukma Jaya Story. All rights
            reserved.
          </p>
          <p className="text-[11px] tracking-[0.1em] text-white/25 font-sans">
            Crafted with intention
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
