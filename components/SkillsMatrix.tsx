"use client";

import React, { useState } from "react";
import { Code2, Server, Layout, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

interface SkillItem {
  name: string;
  level: string;
  highlight: string;
}

interface Category {
  id: string;
  label: string;
  icon: any;
  skills: SkillItem[];
}

const categories: Category[] = [
  {
    id: "frontend",
    label: "Frontend & 3D Web",
    icon: Layout,
    skills: [
      { name: "React 19 / Next.js 15", level: "Expert", highlight: "App Router, SSR, Turbopack" },
      { name: "Three.js / WebGL", level: "Advanced", highlight: "Interactive 3D Scenes, Shaders" },
      { name: "TypeScript", level: "Expert", highlight: "Strict Type Systems, Generics" },
      { name: "Framer Motion", level: "Advanced", highlight: "Physics-based gestures, Micro-UX" },
      { name: "CSS Architecture", level: "Master", highlight: "Variables, Glassmorphism, 3D Transforms" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Systems",
    icon: Server,
    skills: [
      { name: "Node.js & Express", level: "Advanced", highlight: "REST & GraphQL API Engineering" },
      { name: "Supabase & PostgreSQL", level: "Advanced", highlight: "Row-Level Security, Realtime CDC" },
      { name: "Python", level: "Proficient", highlight: "Automation, Fast-API, AI Pipelines" },
      { name: "Redis & Caching", level: "Advanced", highlight: "Session stores, Rate limiting" },
      { name: "Authentication / OAuth", level: "Expert", highlight: "NextAuth, JWT, Secure Sessions" },
    ],
  },
  {
    id: "creative",
    label: "Creative Tech & UX",
    icon: Cpu,
    skills: [
      { name: "Design Systems", level: "Expert", highlight: "Design Tokens, Component Libraries" },
      { name: "3D Motion Design", level: "Advanced", highlight: "Interactive Parallax, Perspective Physics" },
      { name: "Web Performance & SEO", level: "Master", highlight: "100/100 Lighthouse, Core Web Vitals" },
      { name: "Responsive Layouts", level: "Master", highlight: "Fluid typography, Cross-browser" },
    ],
  },
];

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div className="skills-matrix-wrapper">
      {/* Category Pills */}
      <div className="skills-category-tabs">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              className={`skills-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => {
                playMicroSound("click");
                setActiveCategory(cat.id);
              }}
              onMouseEnter={() => playMicroSound("hover")}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
              {isActive && <span className="tab-active-indicator" />}
            </button>
          );
        })}
      </div>

      {/* 3D Skills Display Grid */}
      <div className="skills-cards-grid">
        {currentCategory.skills.map((skill, index) => (
          <TiltCard
            key={skill.name}
            maxTilt={8}
            scale={1.03}
            className="skill-tilt-card"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div
              className="skill-card-body"
              onMouseEnter={() => {
                setHoveredSkill(skill.name);
                playMicroSound("hover");
              }}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="skill-card-top">
                <span className="skill-badge-level">{skill.level}</span>
                <Sparkles size={14} className="skill-card-sparkle" />
              </div>
              <h3 className="skill-card-name">{skill.name}</h3>
              <p className="skill-card-highlight">{skill.highlight}</p>

              <div className="skill-card-meter">
                <div
                  className="skill-meter-fill"
                  style={{
                    width:
                      skill.level === "Master"
                        ? "98%"
                        : skill.level === "Expert"
                        ? "90%"
                        : "82%",
                  }}
                />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Floating 3D Tech Banner */}
      <div className="tech-cloud-strip">
        <span className="strip-title">FAST INTEGRATIONS:</span>
        <div className="strip-tags">
          {[
            "Docker",
            "Git / GitHub Actions",
            "Vercel Edge",
            "Tailwind CSS",
            "WebGL",
            "REST APIs",
            "GraphQL",
            "Supabase",
            "Figma to Code",
            "Three.js",
          ].map((item) => (
            <span
              key={item}
              className="cloud-tag"
              onMouseEnter={() => playMicroSound("hover")}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
