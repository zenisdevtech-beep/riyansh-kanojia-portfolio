"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundNebula() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      speed: number;
    }[] = [];

    const starCount = Math.floor((width * height) / 10000);
    const colors = ["#FFFFFF", "#F8FAFC", "#60A5FA", "#3B82F6", "#93C5FD", "#38BDF8"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach((star, idx) => {
        const twinkle = Math.sin(time * 2 + idx) * 0.3 + 0.7;
        ctx.save();
        ctx.globalAlpha = star.alpha * twinkle;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Subtle upward drift
        star.y -= star.speed * 8;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="nebula-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="nebula-stars-canvas" />
      <div className="nebula-glow-layer nebula-glow-top" />
      <div className="nebula-glow-layer nebula-glow-mid" />
      <div className="nebula-glow-layer nebula-glow-bottom" />
    </div>
  );
}



