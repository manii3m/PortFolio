"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * AboutSection — Personal introduction with animated info cards
 * Reveals on scroll with staggered animations
 */

const infoCards = [
  {
    icon: "🎓",
    title: "Education",
    description:
      "B.Tech CSE, specializing in Data Science. Second-year student with a passion for continuous learning.",
    color: "rgba(0, 212, 255, 0.15)",
  },
  {
    icon: "🚀",
    title: "Goals",
    description:
      "Mastering Data Science & securing an internship by 3rd year. Building real-world applications daily.",
    color: "rgba(123, 47, 255, 0.15)",
  },
  {
    icon: "💡",
    title: "Philosophy",
    description:
      '"Improve 1% daily, learn by doing, and grow with consistency." — From beginner to professional.',
    color: "rgba(255, 45, 149, 0.15)",
  },
  {
    icon: "🎮",
    title: "Interests",
    description:
      "Coding challenges, open source, emerging tech, gaming, and exploring new frameworks and tools.",
    color: "rgba(0, 255, 136, 0.15)",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-label">// About Me</span>
          <h2 className="section-heading">
            Building the future,{" "}
            <span className="neon-text">one line at a time</span>
          </h2>
          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            I&apos;m Mayank Vishwakarma, a B.Tech CSE student with a strong
            passion for Data Science, Open Source, and Emerging Technologies. I
            believe in learning by building — from small scripts to real-world
            applications.
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="glass p-8 magnetic-element group"
              style={{ cursor: "default" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ background: card.color }}
              >
                {card.icon}
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p
            className="text-sm mb-4"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Currently Learning
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Data Structures & Algorithms",
              "Advanced Python",
              "Frontend Development",
              "Machine Learning",
            ].map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-full text-xs"
                style={{
                  background: "rgba(0, 212, 255, 0.08)",
                  border: "1px solid rgba(0, 212, 255, 0.15)",
                  color: "var(--color-neon-blue)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
