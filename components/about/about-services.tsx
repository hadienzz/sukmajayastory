"use client";

import { motion } from "framer-motion";
import { Camera, Film, Heart, Users } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const services = [
  {
    icon: Heart,
    title: "She Said Yes",
    subtitle: "Engagement Sessions",
    description:
      "Intimate, joyful sessions capturing the magic of your proposal and engagement — the beginning of your forever story.",
  },
  {
    icon: Camera,
    title: "Tying the Knot",
    subtitle: "Wedding Photography",
    description:
      "From quiet preparations to the grand celebration, we document every emotion and detail of your wedding day with editorial precision.",
  },
  {
    icon: Film,
    title: "Cinematic Films",
    subtitle: "Wedding Videography",
    description:
      "Beautifully crafted wedding films that capture the movement, sound, and feeling of your day — a cinematic keepsake to treasure.",
  },
  {
    icon: Users,
    title: "Portraiture & Family",
    subtitle: "Personal Sessions",
    description:
      "Timeless portraits and family sessions that celebrate the beauty of connection — from maternity shoots to milestone moments.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
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

const AboutServices = () => {
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
          <span className="category-label block mb-4">What We Do</span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111] mb-6">
            Our Services
          </h2>
          <p className="body-text max-w-xl mx-auto">
            Every service we offer is rooted in a singular passion — to tell
            your story with beauty, authenticity, and lasting elegance.
          </p>
        </motion.div>
      </div>

      {/* Services grid */}
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group border border-[#e8e8e8] bg-white p-10 md:p-12 transition-colors duration-500 hover:border-[#d4c5a9]"
            >
              <service.icon
                className="w-7 h-7 text-[#999999] mb-6 group-hover:text-[#111111] transition-colors duration-500"
                strokeWidth={1}
              />
              <span className="category-label block mb-3">
                {service.subtitle}
              </span>
              <h3 className="editorial-title text-2xl md:text-3xl text-[#111111] mb-5">
                {service.title}
              </h3>
              <p className="body-text">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutServices;
