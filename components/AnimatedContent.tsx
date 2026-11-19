"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string | number[];
  blur?: number;
  stagger?: number;
  threshold?: number;
  className?: string;
  delay?: number;
}

export default function AnimatedContent({
  children,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = [0.215, 0.61, 0.355, 1],
  blur = 0,
  stagger = 0.08,
  threshold = 0.1,
  className = "",
  delay = 0,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const axis = direction === "vertical" ? "y" : "x";
  const offset = reverse ? -distance : distance;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: direction === "horizontal" ? offset : 0,
      y: direction === "vertical" ? offset : 0,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: "easeOut",
      } as any,
    },
  };

  const childArray = React.Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ width: "100%", minWidth: 0 }}
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants} style={{ width: "100%", minWidth: 0 }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}


