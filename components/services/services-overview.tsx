"use client";

import { motion } from "framer-motion";
import { Camera, Film, Heart, Users } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const services = [
  {
    icon: Heart,
    slug: "she-said-yes",
    title: "She Said Yes",
    subtitle: "Engagement Sessions",
    description:
      "Intimate, joyful sessions capturing the magic of your proposal and engagement — the beginning of your forever story. We find the quiet moments between the excitement and preserve them in frames you will cherish for a lifetime.",
    details: ["Half-day sessions (4–5 hours)", "Outdoor or indoor locations", "Online gallery delivery within 3 weeks", "50–80 edited high-res images"],
  },
  {
    icon: Camera,
    slug: "tying-the-knot",
    title: "Tying the Knot",
    subtitle: "Wedding Photography",
    description:
      "From quiet preparations to the grand celebration, we document every emotion and detail of your wedding day with editorial precision. Two photographers work in harmony to ensure no moment is missed.",
    details: ["Full-day coverage (8–12 hours)", "Two professional photographers", "Online gallery delivery within 6 weeks", "300–500 edited high-res images"],
  },
  {
    icon: Film,
    slug: "cinematic-films",
    title: "Cinematic Films",
    subtitle: "Wedding Videography",
    description:
      "Beautifully crafted wedding films that capture the movement, sound, and feeling of your day — a cinematic keepsake to treasure. Our films are edited with care, blending ambient audio with a curated soundtrack.",
    details: ["Full-day filming (8–12 hours)", "Highlight film (3–5 minutes)", "Full ceremony & speeches edit", "Delivered within 8 weeks"],
  },
  {
    icon: Users,
    slug: "portraiture-family",
    title: "Portraiture & Family",
    subtitle: "Personal Sessions",
    description:
      "Timeless portraits and family sessions that celebrate the beauty of connection — from maternity shoots to milestone moments. Every session is tailored to your personality and the story you want to tell.",
    details: ["Sessions from 1–3 hours", "Indoor & outdoor locations", "Online gallery delivery within 2 weeks", "30–60 edited high-res images"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
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

const ServicesOverview = () => {
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
          <span className="category-label block mb-4">Our Craft</span>
          <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111] mb-6">
            Services We Offer
          </h2>
          <p className="body-text max-w-xl mx-auto">
            Every service we offer is rooted in a singular passion — to tell
            your story with beauty, authenticity, and lasting elegance.
          </p>
        </motion.div>
      </div>

      {/* Services */}
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <motion.div
          className="space-y-0 border-t border-[#eaeaea]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 py-16 md:py-20 border-b border-[#eaeaea]"
            >
              {/* Left: icon + title */}
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <service.icon
                    className="w-7 h-7 text-[#aaaaaa] mb-6 group-hover:text-[#111111] transition-colors duration-500"
                    strokeWidth={1}
                  />
                  <span className="category-label block mb-3">
                    {service.subtitle}
                  </span>
                  <h3 className="editorial-title text-3xl md:text-4xl text-[#111111] mb-0">
                    {service.title}
                  </h3>
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#aaaaaa] font-sans">
                  {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </div>

              {/* Right: description + details */}
              <div className="flex flex-col justify-center gap-8">
                <p className="body-text text-[#555555] leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="block w-px h-4 bg-[#d4c5a9] mt-1 shrink-0" />
                      <span className="text-[13px] text-[#666666] font-sans tracking-wide">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
