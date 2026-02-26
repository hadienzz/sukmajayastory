"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const AboutStory = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-300 mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-4/5 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease }}
          >
            <Image
              src="/foto-1.jpg"
              alt="Sukma Jaya Story Studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease, delay: 0.15 }}
          >
            <span className="category-label block mb-6">Who We Are</span>
            <h2 className="editorial-title text-3xl md:text-4xl lg:text-5xl text-[#111111] mb-8">
              Crafting Visual
              <br />
              Poetry Since 2018
            </h2>
            <div className="space-y-5">
              <p className="body-text">
                Sukma Jaya Story was born from a simple belief — that every
                moment, every emotion, and every connection deserves to be
                captured with intention and artistry. Based in Bogor, Indonesia,
                we have spent years perfecting the craft of visual storytelling.
              </p>
              <p className="body-text">
                From intimate engagements to grand celebrations, from candid
                family portraits to cinematic wedding films, we bring an
                editorial eye and a genuine heart to every project we take on.
              </p>
              <p className="body-text">
                Our approach is quiet, observant, and deeply personal. We
                don&apos;t just take photos or shoot videos — we create a visual
                narrative that you&apos;ll revisit for years to come.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
