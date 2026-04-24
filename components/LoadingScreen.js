"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LoadingScreen — Premium intro animation
 * Shows a pulsing logo and progress bar before revealing the main content
 */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHidden(true);
            onComplete?.();
          }, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      <div className="loading-logo">MV</div>
      <p
        style={{
          color: "rgba(136, 136, 160, 0.6)",
          fontSize: "0.8rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginTop: "0.5rem",
          fontFamily: "var(--font-mono)",
        }}
      >
        Loading Experience
      </p>
      <div className="loading-bar">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-purple))",
            borderRadius: "1px",
            width: `${Math.min(progress, 100)}%`,
            transition: "width 0.2s ease",
          }}
        />
      </div>
      <p
        style={{
          color: "rgba(136, 136, 160, 0.4)",
          fontSize: "0.7rem",
          fontFamily: "var(--font-mono)",
          marginTop: "0.75rem",
        }}
      >
        {Math.min(Math.floor(progress), 100)}%
      </p>
    </div>
  );
}
