"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const photographyCategories = [
  { label: "She Said Yes", path: "/photography/she-said-yes" },
  { label: "Tying the Knot", path: "/photography/tying-the-knot" },
  { label: "Family", path: "/photography/family" },
  { label: "Baby & Maternity", path: "/photography/baby-maternity" },
  { label: "Portraiture", path: "/photography/portraiture" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const textColor = scrolled ? "#111111" : "#ffffff";

  const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: { duration: 0.25, ease },
    },
  };

  const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.45, ease },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.35, ease },
    },
  };

  const mobileMenuVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease },
    },
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: "80px" }}
        animate={
          scrolled
            ? {
                backgroundColor: "rgba(255,255,255,0.95)",
                boxShadow: "0 1px 0 0 #eaeaea",
                backdropFilter: "blur(12px)",
              }
            : {
                backgroundColor: "rgba(255,255,255,0)",
                boxShadow: "0 1px 0 0 rgba(234,234,234,0)",
                backdropFilter: "blur(0px)",
              }
        }
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            className="editorial-title text-xl tracking-[0.02em] whitespace-nowrap"
          >
            <motion.span
              animate={{ color: textColor }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Sukma Jaya Story
            </motion.span>
          </Link>

          {/* Center nav – desktop */}
          <div className="hidden lg:flex items-center gap-12">
            {/* Photography with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <motion.button
                className="nav-link flex items-center gap-1.5"
                style={{ color: textColor }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                Photography
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
              </motion.button>

              {/* Dropdown */}
              <AnimatePresence>
                {dropdownOpen ? (
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-5"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="bg-white border border-[#eaeaea] py-5 px-8 min-w-[220px] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                      {photographyCategories.map((cat) => (
                        <motion.div key={cat.path} whileHover={{ opacity: 0.65 }}>
                          <Link
                            href={cat.path}
                            className="block py-2.5 nav-link text-[#111111]"
                          >
                            {cat.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <Link
              href="/videography"
              className="nav-link"
            >
              <motion.span
                style={{ color: textColor }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                Videography
              </motion.span>
            </Link>
            <Link
              href="/about"
              className="nav-link"
            >
              <motion.span
                style={{ color: textColor }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                About
              </motion.span>
            </Link>
            <Link
              href="/contact"
              className="nav-link"
            >
              <motion.span
                style={{ color: textColor }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                Get in Touch
              </motion.span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <motion.button
              aria-label="Search"
              whileHover={{ opacity: 0.55 }}
              transition={{ duration: 0.25 }}
              style={{ color: textColor }}
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </motion.button>
            <motion.span
              className="hidden md:inline nav-link"
              animate={{ color: textColor }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Bali
            </motion.span>
            <motion.button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              whileHover={{ opacity: 0.55 }}
              transition={{ duration: 0.25 }}
              style={{ color: textColor }}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col"
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="flex flex-col items-center justify-center flex-1 gap-10"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={mobileItemVariants}>
                <Link
                  href="/"
                  className="nav-link text-[#111111] text-sm tracking-[0.2em]"
                  onClick={() => setMobileOpen(false)}
                >
                  Photography
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link
                  href="/videography"
                  className="nav-link text-[#111111] text-sm tracking-[0.2em]"
                  onClick={() => setMobileOpen(false)}
                >
                  Videography
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link
                  href="/about"
                  className="nav-link text-[#111111] text-sm tracking-[0.2em]"
                  onClick={() => setMobileOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link
                  href="/contact"
                  className="nav-link text-[#111111] text-sm tracking-[0.2em]"
                  onClick={() => setMobileOpen(false)}
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="pb-10 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <p className="category-label text-[#999999]">Studio Bali</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
