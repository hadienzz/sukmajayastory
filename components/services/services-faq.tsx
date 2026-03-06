"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const faqs = [
  {
    question: "Do you travel for shoots?",
    answer:
      "Yes — we love to travel. We are based in Bogor and regularly work throughout Java and across Indonesia. Travel packages are available for shoots outside our local area. Contact us to discuss your destination.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "We recommend booking as early as possible, especially for wedding dates. Peak season dates (May–September and December) fill up quickly — often 12–18 months in advance. For portraiture and personal sessions, 4–8 weeks is usually sufficient.",
  },
  {
    question: "How are our photos delivered?",
    answer:
      "All edited images are delivered via a private online gallery where you can view, download, and share your photos. The gallery remains active for a minimum of 12 months. USB drives and premium print products are available as add-ons.",
  },
  {
    question: "Can we customise a package?",
    answer:
      "Absolutely. Every package listed is a guide — a starting point. We believe every couple and family is unique, and we are happy to build a bespoke package around your specific wishes, timeline, and budget.",
  },
  {
    question: "What happens if the weather is bad on the day?",
    answer:
      "We work in all conditions and honestly, some of our most beautiful images have been captured in moody, overcast light. If severe weather poses a genuine safety issue, we will work together to reschedule at no additional cost.",
  },
  {
    question: "Do you offer videography alongside photography?",
    answer:
      "Yes. Our Signature package combines both photography and film. We also offer standalone videography packages. Having a single team handle both ensures a seamless, coordinated experience on the day.",
  },
  {
    question: "How long until we receive our images?",
    answer:
      "Engagement and portraiture sessions are typically delivered within 2–3 weeks. Wedding galleries arrive within 6 weeks. Wedding films take up to 8 weeks. We believe in taking the time needed to perfect every image and edit.",
  },
  {
    question: "What is your payment policy?",
    answer:
      "A 30% deposit is required to secure your date. The remaining balance is due two weeks before the shoot date. We accept bank transfer and all major payment methods.",
  },
];

const FaqItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border-b border-[#eaeaea]">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-8 text-left group"
      >
        <span className="editorial-title text-lg md:text-xl text-[#111111] group-hover:text-[#555555] transition-colors duration-300">
          {question}
        </span>
        <span className="shrink-0 mt-1 text-[#aaaaaa] group-hover:text-[#111111] transition-colors duration-300">
          {isOpen ? (
            <Minus className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <p className="body-text pb-8 max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServicesFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#fafaf8]">
      {/* Header */}
      <div className="max-w-300 mx-auto px-6 lg:px-10 mb-16 md:mb-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease }}
        >
          <span className="category-label block mb-4">Common Questions</span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111] mb-6">
            Frequently Asked
          </h2>
          <p className="body-text max-w-xl mx-auto">
            Everything you need to know before we begin. If you have a question
            that isn&apos;t answered here, we&apos;d love to hear from you.
          </p>
        </motion.div>
      </div>

      {/* FAQ list */}
      <motion.div
        className="max-w-250 mx-auto px-6 lg:px-10 border-t border-[#eaeaea]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0, ease }}
      >
        {faqs.map((faq, index) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesFaq;
