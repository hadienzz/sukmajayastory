"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const ContactMap = () => {
  return (
    <section className="bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0, ease }}
      >
        <div className="max-w-300 mx-auto px-6 lg:px-10 pb-24 md:pb-32">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="category-label block mb-4">Find Us</span>
            <h2 className="editorial-title text-2xl md:text-3xl text-[#111111]">
              Our Location
            </h2>
          </div>

          {/* Map embed */}
          <div className="relative w-full aspect-16/7 min-h-80 bg-[#f0f0f0] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.29700057024!2d106.7291328!3d-6.5970907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5a92e26837d%3A0x301576d14feb9e0!2sBogor%2C%20Kota%20Bogor%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sukma Jaya Story Studio Location"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactMap;
