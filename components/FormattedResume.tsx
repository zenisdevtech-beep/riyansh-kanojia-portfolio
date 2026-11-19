"use client";

import React, { useState } from "react";
import {
  Download,
  Check,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Globe,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Layers,
  ArrowUpRight,
  Award,
} from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

export default function FormattedResume() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    playMicroSound("click");
    setDownloaded(true);
    setTimeout(() => {
      window.print();
      setDownloaded(false);
    }, 400);
  };

  return (
    <section className="section shell long-resume-section" id="resume">
      {/* Container styled exactly like the specification format */}
      <div className="long-resume-container">
        {/* Main Document Frame */}
        <div className="resume-sheet-card">
          {/* Top Document Header */}
          <div className="resume-sheet-header">
            {/* Left Header info */}
            <div className="resume-sheet-brand">
              <span className="resume-top-pill">Resume</span>
              <h1 className="resume-full-name">RIYANSH KANOJIA</h1>
              <span className="resume-headline-role">
                Python | Prompt Engineering | AI Tools
              </span>
            </div>

            {/* Right Contact details matching PDF */}
            <div className="resume-header-contact-col">
              <div className="contact-row-item">
                <Phone size={13} className="contact-icon" />
                <a href="tel:+918758698300">+91 8758698300</a>
              </div>
              <div className="contact-row-item">
                <Mail size={13} className="contact-icon" />
                <a href="mailto:riyanshkanojia@gmail.com">riyanshkanojia@gmail.com</a>
              </div>
              <div className="contact-row-item">
                <Linkedin size={13} className="contact-icon" />
                <a
                  href="https://linkedin.com/in/riyansh-kanojia"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin: riyansh-kanojia
                </a>
              </div>
              <div className="contact-row-item">
                <MapPin size={13} className="contact-icon" />
                <span>India • Parul University</span>
              </div>

              <button
                onClick={handleDownload}
                className="resume-sheet-dl-btn"
                title="Download or Print Resume PDF"
                onMouseEnter={() => playMicroSound("hover")}
              >
                {downloaded ? <Check size={14} /> : <Download size={14} />}
                <span>{downloaded ? "Opening PDF..." : "Download Resume"}</span>
              </button>
            </div>
          </div>

          <div className="resume-divider-line" />

          {/* Section 1: Professional Summary */}
          <div className="resume-doc-section">
            <h3 className="resume-section-heading">Professional Summary</h3>
            <p className="resume-summary-paragraph">
              Computer Science graduate with experience in WordPress Content Writing and an interest in Python, Prompt Engineering, and Generative AI. Developing knowledge of AI tools, prompt design, and large language model frameworks, including LangChain and LangGraph. Familiar with Python libraries for data analysis and visualization. Seeking opportunities in AI-assisted content creation, prompt engineering, and AI-related roles.
            </p>
          </div>

          <div className="resume-divider-line" />

          {/* Section 2: Technical Skills */}
          <div className="resume-doc-section">
            <h3 className="resume-section-heading">Technical Skills</h3>

            <div className="resume-skills-category-list">
              <div className="skill-cat-row">
                <span className="cat-label">Programming:</span>
                <span className="cat-values">Python, FastAPI</span>
              </div>
              <div className="skill-cat-row">
                <span className="cat-label">Python Libraries:</span>
                <span className="cat-values">NumPy, Pandas, Matplotlib, Scikit-learn</span>
              </div>
              <div className="skill-cat-row">
                <span className="cat-label">Prompt Engineering:</span>
                <span className="cat-values">Prompt Design, Instruction Structuring, Context Setting, Prompt Refinement, Structured Output Generation</span>
              </div>
              <div className="skill-cat-row">
                <span className="cat-label">Generative AI Tools:</span>
                <span className="cat-values">ChatGPT, Google Gemini, Claude, Grok, DeepSeek, Kimi, Qwen AI</span>
              </div>
              <div className="skill-cat-row">
                <span className="cat-label">LLM Frameworks:</span>
                <span className="cat-values">LangChain, LangGraph</span>
              </div>
              <div className="skill-cat-row">
                <span className="cat-label">Content Management:</span>
                <span className="cat-values">WordPress, Content Writing, Website Content Management</span>
              </div>
              <div className="skill-cat-row">
                <span className="cat-label">Development Tools &amp; AI IDEs:</span>
                <span className="cat-values">PyCharm, Google Antigravity IDE, VS Code, Git, GitHub, Docker, Claude Code</span>
              </div>
            </div>
          </div>

          <div className="resume-divider-line" />

          {/* Section 3: Professional Experience */}
          <div className="resume-doc-section">
            <h3 className="resume-section-heading">Professional Experience</h3>

            {/* Role 1 */}
            <div className="resume-exp-entry">
              <div className="exp-entry-title-bar">
                <div className="title-left">
                  <span className="bullet-dot">•</span>
                  <strong className="job-title">WordPress Content Writer</strong>
                </div>
                <span className="job-duration">April 2025 – Present</span>
              </div>
              <div className="job-company-name">Techmero Web Services</div>
              <ul className="resume-bullet-list">
                <li>Create and manage website content using WordPress, supporting organized content publication and website content management.</li>
                <li>Apply prompt engineering techniques by developing and refining instructions for AI tools to produce relevant and structured content.</li>
                <li>Explore Generative AI tools for content-related workflows, refining prompts to improve content relevance and consistency.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="resume-exp-entry" style={{ marginTop: "18px" }}>
              <div className="exp-entry-title-bar">
                <div className="title-left">
                  <span className="bullet-dot">•</span>
                  <strong className="job-title">Intern</strong>
                </div>
                <span className="job-duration">January 2024 – April 2024</span>
              </div>
              <div className="job-company-name">Internzvalley</div>
              <ul className="resume-bullet-list">
                <li>Contributed to internship development work through exposure to application-related technologies and software development processes.</li>
                <li>Applied technical problem-solving during assigned tasks and gained familiarity with development workflows.</li>
              </ul>
            </div>
          </div>

          <div className="resume-divider-line" />

          {/* Section 4: Projects */}
          <div className="resume-doc-section">
            <h3 className="resume-section-heading">Projects</h3>

            {/* Project 1: LangGraph Multi-Agent Workflow Engine */}
            <div className="resume-project-item">
              <div className="project-header-bar">
                <div className="project-title-left">
                  <strong className="project-title-text">LangGraph Multi-Agent Workflow Engine</strong>
                  <span className="project-type-tag">Agentic AI &amp; StateGraph Orchestration</span>
                </div>
                <a
                  href="https://github.com/riyansh-kanojia"
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-link"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
              <div className="project-tech-stack-line">
                Python, LangGraph, LangChain, FastAPI, Multi-Agent Systems, Pydantic
              </div>
              <ul className="resume-bullet-list" style={{ marginTop: "6px" }}>
                <li>Architected an autonomous multi-agent workflow engine using LangGraph StateGraph, coordinating specialized supervisor and worker agents.</li>
                <li>Implemented cyclic graph routing, state persistence across agent steps, dynamic tool execution, and automated fallback logic.</li>
                <li>Reduced complex prompt execution latency by 45% through structured context routing and schema-enforced JSON outputs.</li>
              </ul>
            </div>

            {/* Project 2: PromptCraft Studio */}
            <div className="resume-project-item" style={{ marginTop: "18px" }}>
              <div className="project-header-bar">
                <div className="project-title-left">
                  <strong className="project-title-text">PromptCraft Studio</strong>
                  <span className="project-type-tag">Prompt Engineering &amp; LLM Orchestration Workbench</span>
                </div>
                <a
                  href="https://github.com/riyansh-kanojia"
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-link"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
              <div className="project-tech-stack-line">
                LangChain, LangGraph, Python, FastAPI, Anthropic Claude, Gemini API, DeepSeek
              </div>
              <ul className="resume-bullet-list" style={{ marginTop: "6px" }}>
                <li>Built interactive prompt design and evaluation pipelines for structured output generation and context setting across multi-LLM endpoints.</li>
                <li>Implemented multi-agent orchestration flows with LangGraph for automated content refinement and structured data extraction.</li>
              </ul>
            </div>
          </div>

          <div className="resume-divider-line" />

          {/* Section 5: Education */}
          <div className="resume-doc-section">
            <h3 className="resume-section-heading">Education</h3>

            <div className="resume-edu-entry">
              <div className="exp-entry-title-bar">
                <div className="title-left">
                  <span className="bullet-dot">•</span>
                  <strong className="job-title">Bachelor of Computer Science</strong>
                </div>
                <span className="job-duration">2020 – 2024 • CGPA: 7.4/10</span>
              </div>
              <div className="edu-institute-row">
                <span>Parul University</span>
                <span className="edu-city">Vadodara, Gujarat, India</span>
              </div>
            </div>
          </div>

          <div className="resume-divider-line" />

          {/* Section 6: Certifications (From Page 2 of Resume) */}
          <div className="resume-doc-section">
            <h3 className="resume-section-heading">Certifications</h3>

            <div className="resume-certifications-grid">
              <div className="cert-card-pill" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.06)", border: "1px solid rgba(59, 130, 246, 0.16)" }}>
                <Award size={16} style={{ color: "#38BDF8", flexShrink: 0 }} />
                <div>
                  <strong style={{ color: "#F8FAFC", fontSize: "0.85rem", display: "block" }}>Internzvalley</strong>
                  <span style={{ color: "#94A3B8", fontSize: "0.78rem" }}>Web Development</span>
                </div>
              </div>

              <div className="cert-card-pill" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.06)", border: "1px solid rgba(59, 130, 246, 0.16)" }}>
                <Award size={16} style={{ color: "#38BDF8", flexShrink: 0 }} />
                <div>
                  <strong style={{ color: "#F8FAFC", fontSize: "0.85rem", display: "block" }}>NPTL</strong>
                  <span style={{ color: "#94A3B8", fontSize: "0.78rem" }}>Introduction to Internet of Things</span>
                </div>
              </div>

              <div className="cert-card-pill" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.06)", border: "1px solid rgba(59, 130, 246, 0.16)" }}>
                <Award size={16} style={{ color: "#38BDF8", flexShrink: 0 }} />
                <div>
                  <strong style={{ color: "#F8FAFC", fontSize: "0.85rem", display: "block" }}>Udemy</strong>
                  <span style={{ color: "#94A3B8", fontSize: "0.78rem" }}>HTML and CSS: Certification Course for Beginners</span>
                </div>
              </div>

              <div className="cert-card-pill" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.06)", border: "1px solid rgba(59, 130, 246, 0.16)" }}>
                <Award size={16} style={{ color: "#38BDF8", flexShrink: 0 }} />
                <div>
                  <strong style={{ color: "#F8FAFC", fontSize: "0.85rem", display: "block" }}>Infosys</strong>
                  <span style={{ color: "#94A3B8", fontSize: "0.78rem" }}>Design Thinking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
