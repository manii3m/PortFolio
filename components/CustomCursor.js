"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — Animated cursor with glow trail
 * Follows the mouse with physics-based smoothing
 * Expands on hovering interactive elements
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const trailsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ("ontouchstart" in window) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("magnetic-element")
      ) {
        setIsExpanded(true);
      }
    };

    const handleMouseOut = () => {
      setIsExpanded(false);
    };

    // Smooth cursor animation loop
    const animate = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      cursorPos.current.x += dx * 0.15;
      cursorPos.current.y += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${mousePos.current.x}px`;
        dotRef.current.style.top = `${mousePos.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isExpanded ? "expanded" : ""}`}
      />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
