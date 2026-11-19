"use client";

import React, { useEffect, useState } from "react";

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isHovering3D, setIsHovering3D] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      // Check target element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".interactive") ||
          target.closest(".tilt-card-root")
        );
        const is3DElement = Boolean(
          target.closest(".hero-3d-wrapper") ||
          target.closest(".project-visual") ||
          target.closest(".interactive-3d")
        );

        setIsHoveringInteractive(isClickable);
        setIsHovering3D(is3DElement);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    const lerpLoop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailing({ x: currentX, y: currentY });
      animId = requestAnimationFrame(lerpLoop);
    };
    animId = requestAnimationFrame(lerpLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        className={`custom-cursor-dot ${isHoveringInteractive ? "hovering" : ""}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Trailing Fluid Ring */}
      <div
        className={`custom-cursor-ring ${isHoveringInteractive ? "hovering" : ""} ${
          isHovering3D ? "mode-3d" : ""
        }`}
        style={{
          transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0)`,
        }}
      >
        {isHovering3D && <span className="cursor-label-3d">3D</span>}
      </div>
    </>
  );
}
