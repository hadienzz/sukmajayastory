"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aliquid, possimus dolores deleniti itaque repellat numquam! Pariatur perspiciatis perferendis repellendus illum facilis dolor, earum eveniet beatae modi aut dicta explicabo.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aliquid, possimus dolores deleniti itaque repellat numquam! Pariatur perspiciatis perferendis repellendus illum facilis dolor, earum eveniet beatae modi aut dicta explicabo.",
  },
  {
    question: "How long until we receive our photos or film?",
    answer:
      "Photo galleries are typically delivered within ... weeks. Wedding films take approximately ... weeks. We believe in taking the time to craft something truly special.",
  },
  {
    question: "Do you offer packages?",
    answer:
      "Yes, we have curated packages for engagements, weddings, and portrait sessions. We also offer custom packages tailored to your needs. Reach out for a detailed price list.",
  },
  {
    question: "Can we meet before booking?",
    answer:
      "Absolutely. We love getting to know our clients before the big day. We offer complimentary consultations — either in person at our studio or via video call.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const ContactFAQ = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#fafaf8]">
      {/* Header */}
      <div className="max-w-300 mx-auto px-6 lg:px-10 mb-16 md:mb-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease }}
        >
          <span className="category-label block mb-4">Common Questions</span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111]">
            Frequently Asked
          </h2>
        </motion.div>
      </div>

      {/* FAQ List */}
      <div className="max-w-200 mx-auto px-6 lg:px-10">
        <motion.div
          className="divide-y divide-[#e0e0e0]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.question}
              variants={itemVariants}
              className="py-8 md:py-10"
            >
              <div className="flex items-start gap-4">
                <MessageCircle
                  className="w-4 h-4 text-[#c4c4c4] mt-1 shrink-0"
                  strokeWidth={1.2}
                />
                <div>
                  <h3 className="editorial-title text-lg md:text-xl text-[#111111] mb-3">
                    {faq.question}
                  </h3>
                  <p className="body-text max-w-xl">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFAQ;
