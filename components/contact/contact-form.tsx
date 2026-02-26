"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const serviceOptions = [
  "She Said Yes — Engagement",
  "Tying the Knot — Wedding Photography",
  "Cinematic Wedding Film",
  "Portraiture & Family",
  "Other",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="category-label block mb-4">Thank You</span>
        <h3 className="editorial-title text-2xl md:text-3xl text-[#111111] mb-4">
          We&apos;ve Received Your Message
        </h3>
        <p className="body-text max-w-md mx-auto">
          We&apos;ll get back to you within 24 hours. In the meantime, feel free
          to explore our work.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.0, ease, delay: 0.1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="category-label block" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full bg-transparent border-b border-[#d4d4d4] pb-3 pt-1 text-[#111111] font-sans text-sm font-light tracking-wide placeholder:text-[#bbb] focus:border-[#111111] focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="category-label block" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-transparent border-b border-[#d4d4d4] pb-3 pt-1 text-[#111111] font-sans text-sm font-light tracking-wide placeholder:text-[#bbb] focus:border-[#111111] focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="category-label block" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+62 xxx xxxx xxxx"
            className="w-full bg-transparent border-b border-[#d4d4d4] pb-3 pt-1 text-[#111111] font-sans text-sm font-light tracking-wide placeholder:text-[#bbb] focus:border-[#111111] focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Service */}
        <div className="space-y-2">
          <label className="category-label block" htmlFor="service">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[#d4d4d4] pb-3 pt-1 text-[#111111] font-sans text-sm font-light tracking-wide focus:border-[#111111] focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Event Date */}
      <div className="space-y-2">
        <label className="category-label block" htmlFor="date">
          Event Date (if applicable)
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-[#d4d4d4] pb-3 pt-1 text-[#111111] font-sans text-sm font-light tracking-wide focus:border-[#111111] focus:outline-none transition-colors duration-300"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="category-label block" htmlFor="message">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your story, your vision, and what you're looking for..."
          className="w-full bg-transparent border-b border-[#d4d4d4] pb-3 pt-1 text-[#111111] font-sans text-sm font-light tracking-wide leading-relaxed placeholder:text-[#bbb] focus:border-[#111111] focus:outline-none transition-colors duration-300 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="border border-[#111111] px-12 py-4 nav-link text-[#111111] disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={
            !isSubmitting
              ? { backgroundColor: "#111111", color: "#ffffff" }
              : undefined
          }
          transition={{ duration: 0.4, ease }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
