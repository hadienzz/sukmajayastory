"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/testing-3.jpg",
    category: "Portraiture",
    title: "The Essence of Being",
    credit: "by Sukma Jaya Story",
  },
  {
    image: "/foto-1.jpg",
    category: "She Said Yes",
    title: "A Celebration of Love",
    credit: "by Sukma Jaya Story",
  },
  {
    image: "foto-2.jpg",
    category: "Tying the Knot",
    title: "Where Forever Begins",
    credit: "by Sukma Jaya Story",
  },

  // {
  //   image: "foto-bunga.jpg",
  //   category: "Portraiture",
  //   title: "When the Loves Collide",
  //   credit: "by Sukma Jaya Story",
  // },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent(index);
    },
    [isAnimating, current],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      onDragStart={(e) => e.preventDefault()}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] select-none **:select-none **:[-webkit-user-drag:none] [-webkit-tap-highlight-color:transparent]"
    >
      {/* Slides */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${slides[current].image})` }}
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/50" />
        </motion.div>
      </AnimatePresence>
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6 select-none pointer-events-none">
        <motion.span
          key={`cat-${current}`}
          className="category-label text-white/70! mb-6 pointer-events-none "
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {slides[current].category}
        </motion.span>
        <motion.h1
          key={`title-${current}`}
          className="editorial-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl mb-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.08,
          }}
        >
          {slides[current].title}
        </motion.h1>
        <motion.p
          key={`credit-${current}`}
          className="text-[11px] tracking-[0.25em] uppercase text-white/50 font-sans"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.16,
          }}
        >
          {slides[current].credit}
        </motion.p>
      </div>
      {/* Navigation arrows */}
      <motion.button
        onClick={prev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10"
        aria-label="Previous slide"
        disabled={isAnimating}
        initial={false}
        whileHover={{ opacity: 0.85, x: -4 }}
        style={{ color: "rgba(255,255,255,0.45)" }}
        transition={{ duration: 0.25 }}
      >
        <ChevronLeft className="w-10 h-10" strokeWidth={1} />
      </motion.button>
      <motion.button
        onClick={next}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10"
        aria-label="Next slide"
        disabled={isAnimating}
        initial={false}
        whileHover={{ opacity: 0.85, x: 4 }}
        style={{ color: "rgba(255,255,255,0.45)" }}
        transition={{ duration: 0.25 }}
      >
        <ChevronRight className="w-10 h-10" strokeWidth={1} />
      </motion.button>
      {/* Pagination dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full"
            aria-label={`Go to slide ${i + 1}`}
            animate={
              i === current
                ? {
                    width: 32,
                    height: 3,
                    backgroundColor: "rgba(255,255,255,1)",
                  }
                : {
                    width: 6,
                    height: 6,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }
            }
            whileHover={
              i === current
                ? undefined
                : { backgroundColor: "rgba(255,255,255,0.5)" }
            }
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ))}
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-8 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <motion.div
            className="w-full h-3 bg-white/60 absolute"
            animate={{ y: [0, 18, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
