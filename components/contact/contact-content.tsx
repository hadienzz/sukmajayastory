"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Clock,
  MessageCircle,
  ArrowRight,
  Heart,
  Camera,
  Film,
  Users,
} from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const WHATSAPP_NUMBER = "6283811948805";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@sukmajayastory.com",
    href: "mailto:hello@sukmajayastory.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 838 1194 8805",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Bogor, Indonesia",
    href: null,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@sukmajayastory",
    href: "https://www.instagram.com/sukmajayastory/",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

const quickMessages = [
  {
    icon: Heart,
    label: "Engagement Session",
    message:
      "Halo Sukma Jaya Story! Saya tertarik untuk booking sesi engagement (She Said Yes). Boleh info lebih lanjut mengenai paket dan ketersediaan jadwal? Terima kasih 🙏",
  },
  {
    icon: Camera,
    label: "Wedding Photography",
    message:
      "Halo Sukma Jaya Story! Saya ingin bertanya tentang paket wedding photography (Tying the Knot). Bisa tolong share detail paket dan harganya? Terima kasih 🙏",
  },
  {
    icon: Film,
    label: "Wedding Film",
    message:
      "Halo Sukma Jaya Story! Saya tertarik dengan jasa cinematic wedding film. Boleh info detail paket dan portofolionya? Terima kasih 🙏",
  },
  {
    icon: Users,
    label: "Portrait & Family",
    message:
      "Halo Sukma Jaya Story! Saya ingin booking sesi portrait/family photography. Bisa info paket dan jadwal yang tersedia? Terima kasih 🙏",
  },
];

const buildWhatsAppURL = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const ContactContent = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease }}
          >
            <span className="category-label block mb-4">Contact Details</span>
            <h2 className="editorial-title text-3xl md:text-4xl text-[#111111] mb-8">
              Reach Out
              <br />
              Anytime
            </h2>
            <p className="body-text mb-12 max-w-sm">
              Have a question or ready to book? We&apos;re always happy to hear
              from you. Choose your preferred way to connect.
            </p>

            <div className="space-y-8">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <item.icon
                    className="w-5 h-5 text-[#999] mt-0.5 shrink-0"
                    strokeWidth={1.2}
                  />
                  <div>
                    <span className="category-label block mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <motion.a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-sm font-sans font-light text-[#111111] tracking-wide hover:opacity-60 transition-opacity duration-300"
                        whileHover={{ opacity: 0.6 }}
                      >
                        {item.value}
                      </motion.a>
                    ) : (
                      <span className="text-sm font-sans font-light text-[#555] tracking-wide">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, ease, delay: 0.1 }}
          >
            {/* Main WhatsApp CTA */}
            <div className="bg-[#fafaf8] border border-[#eaeaea] p-8 md:p-10 lg:p-12 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle
                    className="w-5 h-5 text-[#25D366]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <span className="category-label block">Fastest Way</span>
                  <span className="text-sm font-sans font-light text-[#111] tracking-wide">
                    Chat us on WhatsApp
                  </span>
                </div>
              </div>

              <p className="body-text mb-8">
                Skip the wait — send us a message directly on WhatsApp and
                we&apos;ll respond within minutes during working hours. Tap the
                button below or choose a quick message to get started.
              </p>

              <motion.a
                href={buildWhatsAppURL(
                  "Halo Sukma Jaya Story! Saya ingin bertanya mengenai jasa photography/videography. Terima kasih 🙏"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 nav-link hover:bg-[#1fba59] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                Start a Conversation
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </motion.a>
            </div>

            {/* Quick Message Cards */}
            <div>
              <span className="category-label block mb-5">
                Or choose a service to ask about
              </span>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {quickMessages.map((item) => (
                  <motion.a
                    key={item.label}
                    href={buildWhatsAppURL(item.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="group flex items-start gap-4 border border-[#eaeaea] p-5 md:p-6 hover:border-[#25D366]/40 hover:bg-[#25D366]/3 transition-all duration-400 cursor-pointer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon
                      className="w-5 h-5 text-[#bbb] group-hover:text-[#25D366] transition-colors duration-400 mt-0.5 shrink-0"
                      strokeWidth={1.2}
                    />
                    <div>
                      <span className="block text-sm font-sans font-normal text-[#111] tracking-wide mb-1">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-sans font-light text-[#999] tracking-wide flex items-center gap-1.5">
                        Tap to chat
                        <ArrowRight
                          className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
