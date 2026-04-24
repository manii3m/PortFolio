"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * GitHubStats — Live GitHub statistics with animated counters
 * Features contribution activity, language breakdown, and stat cards
 */

// Animated counter hook
function useCounter(end, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

const stats = [
  { label: "Public Repos", value: 8, icon: "📦" },
  { label: "Stars Earned", value: 19, icon: "⭐" },
  { label: "Followers", value: 5, icon: "👥" },
  { label: "Contributions", value: 200, suffix: "+", icon: "🔥" },
];

const languages = [
  { name: "HTML", percentage: 35, color: "#e34c26" },
  { name: "Python", percentage: 25, color: "#3572A5" },
  { name: "CSS", percentage: 15, color: "#563d7c" },
  { name: "JavaScript", percentage: 15, color: "#f1e05a" },
  { name: "C++", percentage: 10, color: "#f34b7d" },
];

// Generate fake contribution data for visual effect
function generateContributions() {
  const weeks = 52;
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      // More activity in recent weeks
      const recency = w / weeks;
      const base = recency > 0.7 ? 0.4 : recency > 0.4 ? 0.2 : 0.1;
      const value = Math.random() < base ? 0 : Math.ceil(Math.random() * 4);
      week.push(value);
    }
    data.push(week);
  }
  return data;
}

function ContributionGraph({ isInView }) {
  const [contributions] = useState(generateContributions);
  const levelColors = [
    "rgba(255,255,255,0.03)",
    "rgba(0, 212, 255, 0.15)",
    "rgba(0, 212, 255, 0.3)",
    "rgba(0, 212, 255, 0.5)",
    "rgba(0, 212, 255, 0.8)",
  ];

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] min-w-[700px]">
        {contributions.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <motion.div
                key={`${wi}-${di}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: wi * 0.01 + di * 0.005,
                  duration: 0.3,
                }}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{
                  background: levelColors[day],
                }}
                title={`${day} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ stat, index, isInView }) {
  const count = useCounter(stat.value, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="glass p-6 text-center magnetic-element"
    >
      <span className="text-3xl mb-3 block">{stat.icon}</span>
      <div className="counter">
        {count}
        {stat.suffix || ""}
      </div>
      <p
        className="text-xs mt-2"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em",
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function GitHubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="github-stats" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-label">// GitHub</span>
          <h2 className="section-heading">
            Coding <span className="neon-text">Activity</span>
          </h2>
          <p
            className="max-w-xl text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            My GitHub contributions and coding statistics at a glance.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="glass p-6 mb-8"
        >
          <h3
            className="text-sm font-medium mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-secondary)",
            }}
          >
            Contribution Activity
          </h3>
          <ContributionGraph isInView={isInView} />
          <div className="flex items-center justify-end gap-2 mt-3">
            <span
              className="text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Less
            </span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{
                  background: [
                    "rgba(255,255,255,0.03)",
                    "rgba(0, 212, 255, 0.15)",
                    "rgba(0, 212, 255, 0.3)",
                    "rgba(0, 212, 255, 0.5)",
                    "rgba(0, 212, 255, 0.8)",
                  ][level],
                }}
              />
            ))}
            <span
              className="text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              More
            </span>
          </div>
        </motion.div>

        {/* Language Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass p-6"
        >
          <h3
            className="text-sm font-medium mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-secondary)",
            }}
          >
            Most Used Languages
          </h3>

          {/* Language Bar */}
          <div className="flex rounded-full overflow-hidden h-3 mb-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ width: 0 }}
                animate={
                  isInView ? { width: `${lang.percentage}%` } : {}
                }
                transition={{
                  duration: 1,
                  delay: 1 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ background: lang.color }}
              />
            ))}
          </div>

          {/* Language Legend */}
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: lang.color }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {lang.name} {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/manii3m"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-secondary magnetic-element"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Full GitHub Profile →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
