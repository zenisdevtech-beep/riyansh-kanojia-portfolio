"use client";

import React, { useState } from "react";
import { Download, FileText, Check, Briefcase, GraduationCap, Award, Phone, Mail, Linkedin, Sparkles } from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

export default function ResumeViewer() {
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
    <div className="resume-section-wrapper">
      <TiltCard maxTilt={4} scale={1.01} className="resume-tilt-card">
        <div className="resume-card-container">
          {/* Header */}
          <div className="resume-top-bar">
            <div>
              <span className="resume-badge">CURRICULUM VITAE</span>
              <h3 className="resume-name">Riyansh Kanojia • Professional Resume</h3>
              <p className="resume-meta">
                Python | Prompt Engineering | AI Tools • Parul University CS Graduate (2024)
              </p>
              <div className="resume-contact-inline" style={{ marginTop: "8px", display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "13px", color: "#94A3B8" }}>
                <span>📞 +91 8758698300</span>
                <span>✉️ riyanshkanojia@gmail.com</span>
                <span>🔗 linkedin.com/in/riyansh-kanojia</span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="resume-download-btn"
              title="Download or Print Resume PDF"
              onMouseEnter={() => playMicroSound("hover")}
            >
              {downloaded ? <Check size={16} /> : <Download size={16} />}
              <span>{downloaded ? "Opening PDF..." : "Download Resume"}</span>
            </button>
          </div>

          <div className="resume-content-layout">
            {/* Experience Column */}
            <div className="resume-column">
              <div className="resume-subheading">
                <Briefcase size={16} className="resume-icon" />
                <span>Professional Experience</span>
              </div>

              <div className="resume-entry">
                <div className="entry-header">
                  <strong>WordPress Content Writer</strong>
                  <span className="entry-date">April 2025 – Present</span>
                </div>
                <div className="entry-company">Techmero Web Services</div>
                <ul className="entry-bullets">
                  <li>
                    Create and manage website content using WordPress, supporting organized content publication and website content management.
                  </li>
                  <li>
                    Apply prompt engineering techniques by developing and refining instructions for AI tools to produce relevant and structured content.
                  </li>
                  <li>
                    Explore Generative AI tools for content-related workflows, refining prompts to improve content relevance and consistency.
                  </li>
                </ul>
              </div>

              <div className="resume-entry">
                <div className="entry-header">
                  <strong>Development Intern</strong>
                  <span className="entry-date">January 2024 – April 2024</span>
                </div>
                <div className="entry-company">Internzvalley</div>
                <ul className="entry-bullets">
                  <li>
                    Contributed to internship development work through exposure to application-related technologies and software development processes.
                  </li>
                  <li>
                    Applied technical problem-solving during assigned tasks and gained familiarity with development workflows.
                  </li>
                </ul>
              </div>

              {/* Projects highlight in resume */}
              <div className="resume-subheading" style={{ marginTop: "24px" }}>
                <Sparkles size={16} className="resume-icon" />
                <span>Key Technical Project</span>
              </div>

              <div className="resume-entry">
                <div className="entry-header">
                  <strong>LangGraph Multi-Agent Engine</strong>
                  <span className="entry-date">LangGraph, Python</span>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Architected an autonomous multi-agent workflow engine using LangGraph StateGraph, coordinating specialized supervisor and worker agents.
                  </li>
                  <li>
                    Implemented cyclic graph routing, state persistence across agent steps, dynamic tool execution, and automated fallback logic.
                  </li>
                  <li>
                    Reduced complex prompt execution latency by 45% through structured context routing and schema-enforced JSON outputs.
                  </li>
                </ul>
              </div>
            </div>

            {/* Education & Certifications Column */}
            <div className="resume-column">
              <div className="resume-subheading">
                <GraduationCap size={16} className="resume-icon" />
                <span>Education &amp; Background</span>
              </div>

              <div className="resume-entry">
                <div className="entry-header">
                  <strong>Bachelor of Computer Science</strong>
                  <span className="entry-date">2020 – 2024</span>
                </div>
                <div className="entry-company">Parul University</div>
                <p className="entry-desc" style={{ marginTop: "6px" }}>
                  Completed full 4-year Computer Science program. Graduated with <strong>CGPA: 7.4 / 10</strong>.
                  Coursework in Python Programming, Data Structures, Software Engineering, Database Systems, Web Development, and IoT.
                </p>
              </div>

              <div className="resume-subheading" style={{ marginTop: "24px" }}>
                <Award size={16} className="resume-icon" />
                <span>Technical Skills &amp; Competencies</span>
              </div>

              <div className="resume-tags-cloud">
                {[
                  "Python",
                  "FastAPI",
                  "Prompt Engineering",
                  "Prompt Design",
                  "Instruction Structuring",
                  "LangChain",
                  "LangGraph",
                  "NumPy & Pandas",
                  "Matplotlib",
                  "Scikit-learn",
                  "ChatGPT & Grok",
                  "Google Gemini",
                  "Claude & Claude Code",
                  "DeepSeek & Qwen AI",
                  "WordPress CMS",
                  "PyCharm",
                  "Google Antigravity IDE",
                  "Docker",
                  "Git & GitHub",
                ].map((tag) => (
                  <span key={tag} className="resume-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
