"use client";

import { motion } from "framer-motion";

/**
 * Footer — Minimal premium footer
 * Features branding, quick links, and a back-to-top button
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative py-16 px-6"
      style={{
        borderTop: "1px solid var(--color-border-glass)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                background:
                  "linear-gradient(135deg, var(--color-neon-blue), var(--color-neon-purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MV.
            </h3>
            <p
              className="text-xs"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Designed & Built by Mayank Vishwakarma
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6">
            {["GitHub", "LinkedIn", "Instagram"].map((link) => (
              <a
                key={link}
                href={
                  link === "GitHub"
                    ? "https://github.com/manii3m"
                    : link === "LinkedIn"
                      ? "https://www.linkedin.com/in/mayank-vishwakarma-3298a6209"
                      : "https://www.instagram.com/manii__3_/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center magnetic-element"
            style={{
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              color: "var(--color-neon-blue)",
            }}
            aria-label="Back to top"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-10 pt-6 text-center"
          style={{ borderTop: "1px solid var(--color-border-glass)" }}
        >
          <p
            className="text-xs"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-mono)",
              opacity: 0.6,
            }}
          >
            © {new Date().getFullYear()} Mayank Vishwakarma. All rights
            reserved.{" "}
            <span style={{ color: "var(--color-neon-blue)" }}>
              Made with ♥ and lots of ☕
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
