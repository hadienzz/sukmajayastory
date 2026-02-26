"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We start with a conversation — learning about your vision, your story, and the moments that matter most to you.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Together we craft a timeline and mood that reflects your personal style, ensuring every detail is thoughtfully considered.",
  },
  {
    number: "03",
    title: "The Session",
    description:
      "On the day, we work quietly and attentively — blending into the moment so you can be fully present while we capture each frame.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Your curated gallery or film is delivered with care — each image and scene edited to perfection, ready to be treasured forever.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const AboutProcess = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white">
      {/* Header */}
      <div className="max-w-300 mx-auto px-6 lg:px-10 mb-16 md:mb-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease }}
        >
          <span className="category-label block mb-4">How It Works</span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111] mb-6">
            Our Process
          </h2>
          <p className="body-text max-w-xl mx-auto">
            A seamless experience from beginning to end, designed to make your
            journey as beautiful as the final result.
          </p>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="max-w-250 mx-auto px-6 lg:px-10">
        <motion.div
          className="space-y-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="group grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-10 py-10 md:py-14 border-b border-[#eaeaea] first:border-t"
            >
              {/* Number */}
              <div className="flex items-start justify-center pt-1">
                <span className="editorial-title text-3xl md:text-4xl text-[#d4d4d4] group-hover:text-[#111111] transition-colors duration-500">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="editorial-title text-2xl md:text-3xl text-[#111111] mb-4">
                  {step.title}
                </h3>
                <p className="body-text max-w-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutProcess;
