"use client";

import React from "react";
import LogoLoop, { LogoItem } from "./LogoLoop";
import {
  SiPython,
  SiFastapi,
  SiAnthropic,
  SiGooglegemini,
  SiDeepseek,
  SiDocker,
  SiGit,
  SiGithub,
  SiPycharm,
  SiWordpress,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiLinux,
  SiPostman,
  SiVercel,
  SiHtml5,
  SiCss,
  SiJavascript,
} from "react-icons/si";
import { FaRobot, FaBrain, FaTerminal } from "react-icons/fa6";
import { Sparkles, Code2, Layers, Cpu } from "lucide-react";

const rowOneTech: LogoItem[] = [
  { node: <SiPython />, title: "Python", hoverColor: "#3776AB", href: "https://python.org" },
  { node: <SiFastapi />, title: "FastAPI", hoverColor: "#009688", href: "https://fastapi.tiangolo.com" },
  { node: <FaRobot />, title: "Prompt Engineering", hoverColor: "#38BDF8" },
  { node: <SiAnthropic />, title: "Claude AI", hoverColor: "#D97706", href: "https://anthropic.com" },
  { node: <SiGooglegemini />, title: "Google Gemini", hoverColor: "#4285F4", href: "https://gemini.google.com" },
  { node: <SiDeepseek />, title: "DeepSeek", hoverColor: "#3B82F6", href: "https://deepseek.com" },
  { node: <FaBrain />, title: "LangChain & LangGraph", hoverColor: "#10B981" },
  { node: <SiWordpress />, title: "WordPress", hoverColor: "#21759B", href: "https://wordpress.org" },
  { node: <SiDocker />, title: "Docker", hoverColor: "#2496ED", href: "https://docker.com" },
  { node: <SiGit />, title: "Git", hoverColor: "#F05032", href: "https://git-scm.com" },
  { node: <SiGithub />, title: "GitHub", hoverColor: "#FFFFFF", href: "https://github.com" },
  { node: <SiPycharm />, title: "PyCharm", hoverColor: "#21D789", href: "https://jetbrains.com/pycharm" },
];

const rowTwoTech: LogoItem[] = [
  { node: <SiNumpy />, title: "NumPy", hoverColor: "#013243", href: "https://numpy.org" },
  { node: <SiPandas />, title: "Pandas", hoverColor: "#150458", href: "https://pandas.pydata.org" },
  { node: <SiScikitlearn />, title: "Scikit-learn", hoverColor: "#F7931E", href: "https://scikit-learn.org" },
  { node: <FaTerminal />, title: "AI IDEs & Claude Code", hoverColor: "#38BDF8" },
  { node: <SiLinux />, title: "Linux", hoverColor: "#FCC624" },
  { node: <SiPostman />, title: "Postman", hoverColor: "#FF6C37", href: "https://postman.com" },
  { node: <SiHtml5 />, title: "HTML5", hoverColor: "#E34F26" },
  { node: <SiCss />, title: "CSS3", hoverColor: "#1572B6" },
  { node: <SiJavascript />, title: "JavaScript", hoverColor: "#F7DF1E" },
  { node: <SiVercel />, title: "Vercel", hoverColor: "#FFFFFF", href: "https://vercel.com" },
  { node: <FaBrain />, title: "LangGraph Multi-Agent", hoverColor: "#38BDF8" },
  { node: <SiWordpress />, title: "Content Publishing", hoverColor: "#21759B" },
];

export default function TechStackLoops() {
  return (
    <section className="section shell tech-stack-section" id="skills">
      {/* Section Header with stylized accent curve */}
      <div className="section-heading-centered">
        <h2 className="tech-stack-title">
          My Tech Stack
          <span className="title-curve-underline" aria-hidden="true" />
        </h2>
        <p className="section-subtitle">
          Python, Generative AI frameworks, prompt engineering tooling, data analysis, and content workflows.
        </p>
      </div>

      {/* Two Opposing Loop Animation Rows */}
      <div className="tech-loops-container">
        {/* Top Row: Moves to the RIGHT */}
        <div className="loop-row-wrap">
          <div className="loop-direction-indicator right-ind" title="Scrolling right">
            <span>→</span>
          </div>
          <LogoLoop
            logos={rowOneTech}
            speed={20}
            direction="right"
            logoHeight={44}
            gap={20}
            hoverSpeed={0}
            scaleOnHover={true}
            ariaLabel="Python, Generative AI & Prompt Engineering"
          />
        </div>

        {/* Bottom Row: Moves to the LEFT */}
        <div className="loop-row-wrap" style={{ marginTop: "18px" }}>
          <div className="loop-direction-indicator left-ind" title="Scrolling left">
            <span>←</span>
          </div>
          <LogoLoop
            logos={rowTwoTech}
            speed={20}
            direction="left"
            logoHeight={44}
            gap={20}
            hoverSpeed={0}
            scaleOnHover={true}
            ariaLabel="Libraries, Data Analysis & Development Tools"
          />
        </div>

        {/* Bottom Stats Row matching the format */}
        <div className="tech-loop-stats-bar">
          <div className="loop-stat-item">
            <span className="stat-glow-val">Parul CS</span>
            <span className="stat-desc-label">Graduate • 7.4 CGPA</span>
          </div>
          <div className="stat-divider-dot">•</div>
          <div className="loop-stat-item">
            <span className="stat-glow-val">∞</span>
            <span className="stat-desc-label">Prompt Design &amp; LLMs</span>
          </div>
          <div className="stat-divider-dot">•</div>
          <div className="loop-stat-item">
            <span className="stat-glow-val">24/7</span>
            <span className="stat-desc-label">Python Automation &amp; Research</span>
          </div>
        </div>
      </div>
    </section>
  );
}
