"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const values = [
  {
    number: "01",
    title: "Authenticity",
    description:
      "We believe in capturing real moments — unscripted, unposed, and full of genuine emotion. Every frame tells the truth of your story.",
  },
  {
    number: "02",
    title: "Artistry",
    description:
      "Our editorial approach blends fine-art composition with cinematic lighting, creating images that belong in galleries and cherished albums alike.",
  },
  {
    number: "03",
    title: "Intention",
    description:
      "We are deliberate in every detail — from the way we observe a scene to the final edit. Nothing is accidental; everything is crafted with purpose.",
  },
  {
    number: "04",
    title: "Connection",
    description:
      "Great photography starts with trust. We invest time in knowing your story so we can capture it with the intimacy and care it deserves.",
  },
];

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

const AboutValues = () => {
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
            Our Philosophy
          </span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-white">
            What Guides Us
          </h2>
        </motion.div>
      </div>

      {/* Values */}
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className={`p-10 md:p-12 lg:p-14 border-b border-white/10 ${
                index % 2 === 0 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <span className="text-[11px] tracking-[0.2em] text-white/20 font-sans block mb-6">
                {value.number}
              </span>
              <h3 className="editorial-title text-2xl md:text-3xl text-white mb-5">
                {value.title}
              </h3>
              <p className="body-text text-white/45! max-w-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutValues;
