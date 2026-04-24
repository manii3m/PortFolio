"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * SkillsSection — Animated skill visualization
 * Features categorized skills with animated progress bars
 * and an interactive skill orbit display
 */

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "#00d4ff",
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 75 },
      { name: "React", level: 60 },
      { name: "Tailwind CSS", level: 70 },
    ],
  },
  {
    title: "Backend & Languages",
    icon: "⚙️",
    color: "#7b2fff",
    skills: [
      { name: "Python", level: 80 },
      { name: "C/C++", level: 75 },
      { name: "Node.js", level: 55 },
      { name: "SQL", level: 60 },
      { name: "Data Science", level: 50 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    color: "#ff2d95",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Netlify", level: 70 },
      { name: "Linux", level: 55 },
      { name: "Figma", level: 45 },
    ],
  },
];

// All skills for the orbit visualization
const orbitSkills = [
  "HTML5", "CSS3", "JavaScript", "Python", "C++",
  "React", "Git", "Node.js", "SQL", "Tailwind",
  "VS Code", "GitHub", "Netlify", "Linux", "Figma",
];

function SkillBar({ name, level, color, delay, isInView }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: level / 100 } : {}}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
        />
      </div>
    </div>
  );
}

function SkillOrbit({ isInView }) {
  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto">
      {/* Center Core */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 47, 255, 0.15))",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          boxShadow: "0 0 40px rgba(0, 212, 255, 0.2)",
        }}
      >
        <span className="text-2xl">💻</span>
      </motion.div>

      {/* Orbit Rings */}
      {[120, 170].map((radius, ri) => (
        <div
          key={ri}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: radius * 2,
            height: radius * 2,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />
      ))}

      {/* Orbiting Skills */}
      {orbitSkills.map((skill, i) => {
        const angle = (i / orbitSkills.length) * Math.PI * 2;
        const radius = i % 2 === 0 ? 120 : 170;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.3, zIndex: 10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-medium cursor-default"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              background: "rgba(15, 15, 35, 0.8)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              whiteSpace: "nowrap",
            }}
          >
            {skill}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="skills"
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
          <span className="section-label">// Skills</span>
          <h2 className="section-heading">
            Tech <span className="neon-text">Arsenal</span>
          </h2>
          <p
            className="max-w-xl text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Technologies and tools I work with, constantly expanding my skill
            set.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Skill Bars */}
          <div className="space-y-8">
            {skillCategories.map((category, ci) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: ci * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{category.icon}</span>
                  <h3
                    className="text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: category.color,
                    }}
                  >
                    {category.title}
                  </h3>
                </div>
                {category.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    delay={ci * 0.2 + si * 0.1}
                    isInView={isInView}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Skill Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <SkillOrbit isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
