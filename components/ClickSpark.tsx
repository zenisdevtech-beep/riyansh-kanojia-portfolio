"use client";

import React, { useRef, useEffect } from "react";

interface ClickSparkProps {
  children?: React.ReactNode;
  sparkColor?: string;
  shape?: "line" | "circle";
  sparkCount?: number;
  sparkSize?: number;
  sparkRadius?: number;
  duration?: number;
  className?: string;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  speed: number;
  startTime: number;
}

export default function ClickSpark({
  children,
  sparkColor = "#3B82F6",
  shape = "line",
  sparkCount = 8,
  sparkSize = 14,
  sparkRadius = 30,
  duration = 500,
  className = "",
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentSparks = sparksRef.current;
      for (let i = currentSparks.length - 1; i >= 0; i--) {
        const spark = currentSparks[i];
        const elapsed = time - spark.startTime;
        const progress = Math.min(1, elapsed / duration);

        if (progress >= 1) {
          currentSparks.splice(i, 1);
          continue;
        }

        const currentDist = progress * sparkRadius;
        const alpha = 1 - progress;

        const startX = spark.x + Math.cos(spark.angle) * currentDist;
        const startY = spark.y + Math.sin(spark.angle) * currentDist;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = sparkColor;
        ctx.fillStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        if (shape === "line") {
          const endX = startX + Math.cos(spark.angle) * sparkSize * (1 - progress * 0.4);
          const endY = startY + Math.sin(spark.angle) * sparkSize * (1 - progress * 0.4);
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(startX, startY, (sparkSize / 3) * (1 - progress * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [duration, shape, sparkColor, sparkRadius, sparkSize]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const now = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.2;
      sparksRef.current.push({
        x: clickX,
        y: clickY,
        angle,
        speed: 1,
        startTime: now,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`click-spark-container ${className}`}
      style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          width: "100%",
          height: "100%",
        }}
      />
      {children}
    </div>
  );
}



