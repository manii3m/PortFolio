"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/**
 * HeroSection — Cinematic full-screen hero
 * Features animated typography, floating geometric shapes,
 * parallax depth, and CTA buttons with magnetic hover
 */

// Animated text that reveals character by character
function AnimatedText({ text, className, delay = 0 }) {
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Floating geometric shape with parallax
function FloatingShape({ shape, size, x, y, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3],
        scale: 1,
        y: [0, -20, 0, 20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        opacity: { duration: 2, delay },
        scale: { duration: 1, delay },
        y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      }}
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
    >
      {shape === "circle" && (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `1px solid ${color}`,
            opacity: 0.3,
          }}
        />
      )}
      {shape === "diamond" && (
        <div
          style={{
            width: "100%",
            height: "100%",
            border: `1px solid ${color}`,
            transform: "rotate(45deg)",
            opacity: 0.2,
          }}
        />
      )}
      {shape === "triangle" && (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${parseInt(size) / 2}px solid transparent`,
            borderRight: `${parseInt(size) / 2}px solid transparent`,
            borderBottom: `${parseInt(size)}px solid ${color}`,
            opacity: 0.15,
          }}
        />
      )}
    </motion.div>
  );
}

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.width / 2) / rect.width,
          y: (e.clientY - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid Background */}
      <div className="grid-bg" />

      {/* Floating Geometric Shapes */}
      <FloatingShape
        shape="circle"
        size="120px"
        x="10%"
        y="20%"
        delay={0.5}
        color="rgba(0, 212, 255, 0.4)"
      />
      <FloatingShape
        shape="diamond"
        size="80px"
        x="80%"
        y="15%"
        delay={0.8}
        color="rgba(123, 47, 255, 0.4)"
      />
      <FloatingShape
        shape="triangle"
        size="60"
        x="75%"
        y="70%"
        delay={1.0}
        color="rgba(255, 45, 149, 0.3)"
      />
      <FloatingShape
        shape="circle"
        size="60px"
        x="15%"
        y="75%"
        delay={1.2}
        color="rgba(123, 47, 255, 0.3)"
      />
      <FloatingShape
        shape="diamond"
        size="40px"
        x="50%"
        y="85%"
        delay={1.5}
        color="rgba(0, 212, 255, 0.3)"
      />

      {/* Radial Glow (responds to mouse) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, rgba(123, 47, 255, 0.04) 40%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${mousePos.x * 30}px), calc(-50% + ${mousePos.y * 30}px))`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(0, 212, 255, 0.08)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#00ff88",
              boxShadow: "0 0 8px rgba(0, 255, 136, 0.5)",
              animation: "loadPulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            Open to Opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-title mb-4"
          style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <AnimatedText text="MAYANK" delay={0.5} />
          <br />
          <span className="neon-text">
            <AnimatedText text="VISHWAKARMA" delay={0.9} />
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="hero-tagline mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          Full Stack Developer{" "}
          <span style={{ color: "var(--color-neon-blue)" }}>|</span> Data
          Science Enthusiast{" "}
          <span style={{ color: "var(--color-neon-blue)" }}>|</span> Tech
          Innovator
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="cta-button cta-primary magnetic-element"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>View Projects</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="cta-button cta-secondary magnetic-element"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Get in Touch</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.2em",
              }}
            >
              SCROLL
            </span>
            <div
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 rounded-full"
                style={{ background: "var(--color-neon-blue)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
