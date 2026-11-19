"use client";

import React from "react";
import {
  Code2,
  Cpu,
  Layers,
  Database,
  Cloud,
  Network,
  Users,
  Maximize,
  Sparkles,
  MapPin,
  Briefcase,
  Terminal,
  Bot,
  Brain,
  FileCode,
  Compass,
} from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

const expertiseHighlights = [
  { icon: <Bot size={15} />, label: "Prompt Engineering" },
  { icon: <Terminal size={15} />, label: "Python & FastAPI" },
  { icon: <Brain size={15} />, label: "Generative AI Tools" },
  { icon: <Layers size={15} />, label: "LangChain & LangGraph" },
  { icon: <Database size={15} />, label: "NumPy & Pandas Analytics" },
  { icon: <Sparkles size={15} />, label: "Structured Output Gen" },
  { icon: <FileCode size={15} />, label: "WordPress Management" },
  { icon: <Cpu size={15} />, label: "Multi-Agent Systems" },
  { icon: <Compass size={15} />, label: "AI Workflows & Testing" },
];

export default function AboutMeSection() {
  return (
    <section className="section shell about-me-container" id="about">
      <div className="about-two-col-grid">
        {/* Left Column: Visual Profile Card matching Page 3 Layout */}
        <TiltCard maxTilt={5} scale={1.015} className="about-left-tilt">
          <div className="about-profile-card">
            {/* Photo Container */}
            <div className="about-photo-wrapper">
              <img
                src="/riyansh_portrait.jpg"
                alt="Riyansh Kanojia"
                className="about-photo-img"
              />
              <div className="about-photo-gradient" />

              {/* Top-Right Badge */}
              <div className="badge-years-coding">
                <strong>CS</strong>
                <span>GRAD<br />PARUL UNIV</span>
              </div>

              {/* Bottom Floating Badge: Open to work */}
              <div className="badge-open-work">
                <span className="pulse-green-dot" />
                <span>Open to work</span>
              </div>
            </div>

            {/* Profile Meta info below photo */}
            <div className="about-meta-box">
              <span className="about-role-eyebrow">PYTHON | PROMPT ENGINEERING | AI TOOLS</span>
              <h3 className="about-profile-name">Riyansh Kanojia</h3>

              <div className="about-location-pill">
                <MapPin size={13} />
                <span>BASED IN <strong>India</strong></span>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Right Column: Detailed narrative & expertise grid matching layout */}
        <div className="about-right-content">
          {/* Item 1: Introduction */}
          <div className="about-content-block">
            <span className="about-bullet-heading">• INTRODUCTION</span>
            <p className="about-block-text">
              Hi, I&apos;m <strong>Riyansh Kanojia</strong>, a Computer Science graduate with experience in WordPress Content Writing and a deep focus on Python, Prompt Engineering, and Generative AI.
            </p>
          </div>

          {/* Item 2: What I Build */}
          <div className="about-content-block">
            <span className="about-bullet-heading">WHAT I BUILD</span>
            <p className="about-block-text">
              Developing knowledge of AI tools, prompt design, and large language model frameworks, including <strong>LangChain</strong> and <strong>LangGraph</strong>. Experienced in building multi-agent AI systems, automated Python workflows, and data analysis pipelines.
            </p>
          </div>

          {/* Item 3: My Toolkit */}
          <div className="about-content-block">
            <span className="about-bullet-heading">MY TOOLKIT</span>
            <p className="about-block-text">
              Proficient in Python, FastAPI, NumPy, Pandas, Matplotlib, and Scikit-learn. Hands-on with leading Generative AI tools (ChatGPT, Google Gemini, Claude, Grok, DeepSeek, Kimi, Qwen AI) and modern developer tools like Docker, Git, and PyCharm.
            </p>
          </div>

          {/* Item 4: What's Next */}
          <div className="about-content-block">
            <span className="about-bullet-heading">WHAT&apos;S NEXT</span>
            <p className="about-block-text">
              Seeking opportunities in AI-assisted content creation, prompt engineering, and AI-related roles where I can leverage generative AI, prompt optimization, and Python to create measurable impact.
            </p>
          </div>

          {/* Item 5: Expertise Highlights 3x3 Grid */}
          <div className="about-content-block" style={{ marginTop: "28px" }}>
            <span className="about-bullet-heading">EXPERTISE HIGHLIGHTS</span>
            <div className="expertise-pills-grid">
              {expertiseHighlights.map((exp, i) => (
                <div
                  key={i}
                  className="expertise-pill-card"
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  <span className="exp-icon-wrap">{exp.icon}</span>
                  <span className="exp-label-text">{exp.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
