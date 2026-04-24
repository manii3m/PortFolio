"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * ProjectsSection — Interactive project showcase
 * Fetches repos from GitHub API and displays them as premium 3D cards
 * Features hover effects, tech stack badges, and links
 */

// Language color mapping
const langColors = {
  HTML: "#e34c26",
  CSS: "#563d7c",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  TypeScript: "#2b7489",
};

// Curated featured projects with enhanced descriptions
const featuredProjects = [
  {
    name: "BGI-Project",
    displayName: "GrievanceAI",
    description:
      "AI-powered platform for lodging and managing municipal complaints. Uses NLP and sentiment analysis for efficient categorization and prioritization of grievances.",
    tech: ["JavaScript", "HTML", "CSS", "AI/NLP"],
    stars: 0,
    forks: 1,
    url: "https://github.com/manii3m/BGI-Project",
    featured: true,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "MP-16-by-MANI-E-commerce-Site-",
    displayName: "E-Commerce Store",
    description:
      "Clean and modern static web storefront with product listings, category sections, featured items, testimonials, and responsive design.",
    tech: ["HTML", "CSS"],
    stars: 5,
    forks: 0,
    url: "https://github.com/manii3m/MP-16-by-MANI-E-commerce-Site-",
    homepage: "https://manii3m.github.io/MP-16-by-MANI-E-commerce-Site-/",
    featured: true,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "PARYATAK",
    displayName: "PARYATAK — Tourism Platform",
    description:
      "Tourism-focused website promoting the natural beauty, culture, heritage, and travel destinations of Jharkhand with trip planning features.",
    tech: ["HTML", "CSS", "JavaScript"],
    stars: 4,
    forks: 0,
    url: "https://github.com/manii3m/PARYATAK",
    homepage: "https://paryatak-traveloom-mani.netlify.app/",
    featured: true,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "Python",
    displayName: "Python Learning Journey",
    description:
      "Comprehensive Python learning repository documenting the journey from basics to advanced concepts including data structures and algorithms.",
    tech: ["Python"],
    stars: 4,
    forks: 0,
    url: "https://github.com/manii3m/Python",
    featured: false,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    name: "Cpp-Journey",
    displayName: "C++ Learning Journey",
    description:
      "Continuous C++ learning journey covering basic syntax, OOP, STL, memory management, and algorithmic problem solving.",
    tech: ["C++"],
    stars: 4,
    forks: 0,
    url: "https://github.com/manii3m/Cpp-Journey",
    featured: false,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    name: "WEB-LINK",
    displayName: "WEB-LINK",
    description:
      "Web development project showcasing modern HTML and web technologies with deployed GitHub Pages site.",
    tech: ["HTML", "CSS"],
    stars: 0,
    forks: 0,
    url: "https://github.com/manii3m/WEB-LINK",
    featured: false,
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
];

function ProjectCard({ project, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl magnetic-element ${
        project.featured ? "md:col-span-1 md:row-span-1" : ""
      }`}
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border-glass)",
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg) translateY(-8px)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isHovered
          ? "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(0, 212, 255, 0.1)"
          : "none",
      }}
    >
      {/* Gradient Header */}
      <div
        className="h-2 w-full"
        style={{ background: project.gradient }}
      />

      {/* Hover Glow Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, rgba(0, 212, 255, 0.05) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
              }}
            >
              {project.featured ? "⭐" : "📁"}
            </div>
            <div>
              <h3
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.displayName}
              </h3>
              {project.featured && (
                <span
                  className="text-xs"
                  style={{
                    color: "var(--color-neon-blue)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.stars > 0 && (
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 3v6M18 3v6M6 21v-6M18 21v-6M6 9a3 3 0 1 0 6 0M12 9a3 3 0 1 0 6 0M6 15a3 3 0 1 1 6 0M12 15a3 3 0 1 1 6 0" />
                </svg>
                {project.forks}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: `${langColors[t] || "rgba(0,212,255,0.15)"}20`,
                color: langColors[t] || "var(--color-neon-blue)",
                border: `1px solid ${langColors[t] || "rgba(0,212,255,0.3)"}40`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-white/5"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-text-primary)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 47, 255, 0.15))",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                color: "var(--color-neon-blue)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-label">// Projects</span>
          <h2 className="section-heading">
            Featured <span className="neon-text">Works</span>
          </h2>
          <p
            className="max-w-xl text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A collection of projects that reflect my learning journey and
            passion for building practical solutions.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View All on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/manii3m?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-secondary magnetic-element"
          >
            View All Repositories →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
