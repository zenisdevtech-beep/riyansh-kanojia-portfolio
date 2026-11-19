"use client";

import React, { useState } from "react";

export interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title: string;
  href?: string;
  hoverColor?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // pixels per second or animation speed
  direction?: "left" | "right" | "up" | "down";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  layout?: "horizontal" | "orbit" | "vertical";
  className?: string;
}

export default function LogoLoop({
  logos,
  speed = 40,
  direction = "left",
  logoHeight = 44,
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = true,
  ariaLabel = "Technology partners",
  layout = "horizontal",
  className = "",
}: LogoLoopProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items for continuous seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  const animationDuration = (logos.length * (logoHeight + gap)) / (speed || 40);

  return (
    <div
      className={`logo-loop-container ${className}`}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "16px 0",
        maskImage:
          direction === "left" || direction === "right"
            ? "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)"
            : "linear-gradient(180deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          direction === "left" || direction === "right"
            ? "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)"
            : "linear-gradient(180deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div
        className="logo-loop-track"
        style={{
          display: "flex",
          gap: `${gap}px`,
          alignItems: "center",
          width: "max-content",
          padding: "8px 0",
          animation: `logoLoopScroll ${animationDuration}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isHovered && hoverSpeed === 0 ? "paused" : "running",
        }}
      >
        {duplicatedLogos.map((logo, idx) => {
          const content = (
            <div
              className={`logo-loop-item ${scaleOnHover ? "scale-hover" : ""}`}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "10px",
                background: "rgba(4, 17, 40, 0.75)",
                border: "1px solid rgba(0, 212, 255, 0.20)",
                color: "var(--porcelain, #EDE9FF)",
                fontSize: `${Math.max(13, logoHeight * 0.32)}px`,
                fontWeight: 600,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: logo.href ? "pointer" : "default",
              }}
            >
              {logo.node && (
                <span
                  className="logo-icon-wrap"
                  style={{
                    fontSize: `${logoHeight * 0.55}px`,
                    display: "grid",
                    placeItems: "center",
                    color: logo.hoverColor || "#3B82F6",
                  }}
                >
                  {logo.node}
                </span>
              )}
              {logo.src && (
                <img
                  src={logo.src}
                  alt={logo.alt || logo.title}
                  style={{ height: `${logoHeight * 0.6}px`, objectFit: "contain" }}
                />
              )}
              <span className="logo-title-text">{logo.title}</span>
            </div>
          );

          if (logo.href) {
            return (
              <a
                key={idx}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {content}
              </a>
            );
          }

          return <div key={idx}>{content}</div>;
        })}
      </div>

      <style jsx>{`
        @keyframes logoLoopScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scale-hover:hover {
          transform: translateY(-2px) scale(1.04);
          border-color: #38BDF8 !important;
          background: rgba(0, 212, 255, 0.15) !important;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.5), 0 8px 20px rgba(0, 0, 0, 0.5) !important;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}




