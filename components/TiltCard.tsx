"use client";

import React, { useRef, useState, CSSProperties } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  style = {},
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-root ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale}, ${scale}, ${scale})`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.2s ease-out"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease-out",
      }}
    >
      <div className="tilt-card-inner">
        {children}

        {/* Dynamic Specular 3D Glare */}
        {glare && isHovered && (
          <div
            className="tilt-card-glare"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(0, 212, 255, 0.12) 0%, rgba(232, 237, 245, 0.12) 30%, transparent 65%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}



