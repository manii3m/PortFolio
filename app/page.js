"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for code splitting & lazy loading
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import GitHubStats from "@/components/GitHubStats";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Lazy load the heavy particle field component
const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

/**
 * Main Portfolio Page
 * Orchestrates all sections with loading screen, theme toggle,
 * custom cursor, particle background, and Easter egg (Konami code)
 */
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");

  // ---- Theme Toggle ----
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.body.classList.toggle("light-theme", next === "light");
      return next;
    });
  }, []);

  // ---- Easter Egg: Konami Code ----
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Trigger Easter egg!
          document.body.classList.add("easter-egg-active");
          setTimeout(
            () => document.body.classList.remove("easter-egg-active"),
            3000
          );
          konamiIndex = 0;

          // Create celebration particles
          for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div");
            particle.style.cssText = `
              position: fixed;
              width: ${Math.random() * 10 + 5}px;
              height: ${Math.random() * 10 + 5}px;
              background: hsl(${Math.random() * 360}, 100%, 60%);
              border-radius: 50%;
              pointer-events: none;
              z-index: 99999;
              left: ${Math.random() * 100}vw;
              top: -20px;
              animation: floatParticle ${Math.random() * 3 + 2}s ease-out forwards;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 5000);
          }
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ---- Magnetic Element Effect ----
  useEffect(() => {
    if (!isLoaded) return;

    const magneticElements = document.querySelectorAll(".magnetic-element");

    const handleMouseMove = (e) => {
      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 150) {
          const strength = (150 - distance) / 150;
          el.style.transform = `translate(${distX * strength * 0.15}px, ${distY * strength * 0.15}px)`;
        } else {
          el.style.transform = "";
        }
      });
    };

    const handleMouseLeave = () => {
      magneticElements.forEach((el) => {
        el.style.transform = "";
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isLoaded]);

  return (
    <>
      {/* Premium Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Particle Background */}
      {isLoaded && <ParticleField />}

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <GitHubStats />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
