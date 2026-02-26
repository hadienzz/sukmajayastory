"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stats = [
  { value: 500, suffix: "+", label: "Moments Captured" },
  { value: 7, suffix: "+", label: "Years of Experience" },
  { value: 150, suffix: "+", label: "Happy Couples" },
  { value: 100, suffix: "%", label: "Passion & Heart" },
];

const StatCounter = ({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, value, {
            duration: 2,
            ease: [0.25, 0.1, 0.25, 1],
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="editorial-title text-4xl md:text-5xl lg:text-6xl text-[#111111] block mb-3"
      >
        0{suffix}
      </span>
      <span className="category-label">{label}</span>
    </div>
  );
};

const AboutStats = () => {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-b border-[#eaeaea]">
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease }}
        >
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;
