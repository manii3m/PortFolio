"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Navbar — Glassmorphism navigation with scroll-aware behavior
 * Hides on scroll down, shows on scroll up, becomes solid after hero
 */
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github-stats" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setHidden(currentScrollY > lastScrollY && currentScrollY > 300);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong" : ""
        }`}
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-xl font-bold tracking-tight magnetic-element"
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "var(--font-display)",
              background:
                "linear-gradient(135deg, var(--color-neon-blue), var(--color-neon-purple))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MV.
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="nav-link magnetic-element"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center magnetic-element"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: menuOpen ? 45 : 0,
                    y: menuOpen ? 6 : 0,
                  }}
                  className="block w-5 h-0.5 bg-current"
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  className="block w-5 h-0.5 bg-current"
                />
                <motion.span
                  animate={{
                    rotate: menuOpen ? -45 : 0,
                    y: menuOpen ? -6 : 0,
                  }}
                  className="block w-5 h-0.5 bg-current"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(5, 5, 16, 0.95)" }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-full flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
