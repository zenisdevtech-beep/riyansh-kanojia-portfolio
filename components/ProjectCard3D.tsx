"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Cpu, Eye, ExternalLink, Sparkles, Layers } from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

export interface ProjectData {
  number: string;
  name: string;
  type: string;
  description: string;
  tags: string[];
  visual: string;
  link: string;
  github?: string;
  metrics: { label: string; value: string }[];
  architecture: string[];
  accentColor?: string;
}

interface ProjectCard3DProps {
  project: ProjectData;
  featured?: boolean;
}

export default function ProjectCard3D({ project, featured = false }: ProjectCard3DProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "arch" | "results">("visual");

  return (
    <TiltCard
      className={`project-3d-card ${featured ? "project-featured" : ""}`}
      maxTilt={6}
      scale={1.015}
    >
      <div className="project-card-container">
        {/* Visual Preview Header with Interactive Tabs */}
        <div className="project-card-header">
          <div className="project-meta-strip">
            <span className="project-num-badge">{project.number}</span>
            <span className="project-type-tag">{project.type}</span>
          </div>

          <div className="project-inner-tabs">
            <button
              className={`inner-tab ${activeTab === "visual" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                playMicroSound("click");
                setActiveTab("visual");
              }}
              onMouseEnter={() => playMicroSound("hover")}
            >
              <Eye size={12} />
              <span>Preview</span>
            </button>
            <button
              className={`inner-tab ${activeTab === "arch" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                playMicroSound("click");
                setActiveTab("arch");
              }}
              onMouseEnter={() => playMicroSound("hover")}
            >
              <Layers size={12} />
              <span>Stack</span>
            </button>
            <button
              className={`inner-tab ${activeTab === "results" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                playMicroSound("click");
                setActiveTab("results");
              }}
              onMouseEnter={() => playMicroSound("hover")}
            >
              <Sparkles size={12} />
              <span>Metrics</span>
            </button>
          </div>
        </div>

        {/* Visual Canvas Display */}
        <div className="project-canvas-area">
          {activeTab === "visual" && (
            <div className={`project-visual-viewport visual-${project.visual}`}>
              <div className="visual-grid-bg" />

              {project.visual === "rewards" && (
                <div className="interactive-mockup rewards-mockup">
                  <div className="mockup-glass-bar">
                    <span className="badge-pill">● WORDPRESS CMS</span>
                    <span className="status-metric">+300% Cadence</span>
                  </div>
                  <div className="mockup-hero-text">
                    Techmero AI<br />
                    <span className="highlight-blue">Content Engine</span>
                  </div>
                  <div className="mockup-float-card">
                    <div className="float-row">
                      <span>AUTOMATED PUBLICATION</span>
                      <strong className="balance-val">SEO Verified</strong>
                    </div>
                    <div className="float-progress">
                      <div className="float-bar" style={{ width: "92%" }} />
                    </div>
                    <div className="float-sub">Prompt Refinement &amp; CMS Publishing</div>
                  </div>
                </div>
              )}

              {project.visual === "ai" && (
                <div className="interactive-mockup ai-mockup">
                  <div className="ai-core-orb">
                    <div className="ai-core-pulse" />
                    <Cpu size={28} className="ai-icon" />
                  </div>
                  <div className="ai-heading">
                    Prompt Engineering<br />
                    <span className="highlight-blue">&amp; LLM Studio</span>
                  </div>
                  <div className="ai-tags-row">
                    <span className="ai-chip">LangChain</span>
                    <span className="ai-chip">LangGraph</span>
                    <span className="ai-chip">Structured JSON</span>
                  </div>
                </div>
              )}

              {(project.visual === "photo" || project.visual === "agent") && (
                <div className="interactive-mockup photo-mockup">
                  <div className="photo-tilt-gallery">
                    <div className="photo-card-item photo-1" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                      <span className="tag-ai" style={{ background: "rgba(56, 189, 248, 0.2)", color: "#38BDF8", border: "1px solid rgba(56, 189, 248, 0.4)" }}>STATEGRAPH ROUTER</span>
                      <span style={{ fontSize: "11px", color: "#93C5FD", fontFamily: "monospace" }}>supervisor -&gt; worker</span>
                    </div>
                  </div>
                  <div className="photo-caption">LangGraph Multi-Agent Orchestration (Python)</div>
                </div>
              )}

              {project.visual === "apex" && (
                <div className="interactive-mockup apex-mockup">
                  <div className="apex-bars">
                    <div className="apex-bar" style={{ height: "45%" }} />
                    <div className="apex-bar" style={{ height: "75%" }} />
                    <div className="apex-bar" style={{ height: "60%" }} />
                    <div className="apex-bar active" style={{ height: "92%" }} />
                    <div className="apex-bar" style={{ height: "70%" }} />
                  </div>
                  <div className="apex-stat-badge">
                    <span>PANDAS &amp; NUMPY</span>
                    <strong>500K+ Data Points</strong>
                  </div>
                </div>
              )}

              <a
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="project-launch-btn"
                aria-label={`Open ${project.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  playMicroSound("click");
                }}
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          )}

          {activeTab === "arch" && (
            <div className="project-arch-viewport">
              <h4 className="viewport-title">Architectural Highlights</h4>
              <ul className="arch-list">
                {project.architecture.map((item, i) => (
                  <li key={i} className="arch-item">
                    <CheckCircle2 size={15} className="arch-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="arch-footer-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="arch-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="project-results-viewport">
              <h4 className="viewport-title">Measured Outcomes & Impact</h4>
              <div className="metrics-grid">
                {project.metrics.map((m, i) => (
                  <div key={i} className="metric-box">
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
              <div className="results-badge">
                <Sparkles size={14} /> Production Ready & Monitored
              </div>
            </div>
          )}
        </div>

        {/* Project Details Footer */}
        <div className="project-card-footer">
          <div className="project-title-row">
            <h3 className="project-name">{project.name}</h3>
            <a
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="view-project-link"
              onClick={() => playMicroSound("click")}
            >
              <span>Explore Live</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <p className="project-desc">{project.description}</p>

          <div className="project-tags-list">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
