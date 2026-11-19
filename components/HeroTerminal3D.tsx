"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Play, Sparkles } from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

const snippets = {
  "RiyanshDev.py": `class DeveloperProfile:
    name = "Riyansh Kanojia"
    role = "Python | Prompt Engineering | AI Tools"
    education = "B.S. Computer Science (Parul University)"
    experience = "Techmero Web Services (WordPress Content Writer)"
    palette = ["#3B82F6", "#FFFFFF"]  # Dark Blue, Electric Blue, White
    skills = ["Python", "FastAPI", "LangChain", "Prompt Design", "WordPress"]

def execute_pipeline():
    multi_agent = LangGraphOrchestrator(supervisor="router")
    llm_studio = PromptEngine(models=["Claude", "Gemini", "ChatGPT"])
    return "High impact AI & Python workflows ready."`,
  "Capabilities.ts": `export const stack = [
  { domain: "3D & Graphics", tools: ["Three.js", "WebGL", "GLSL Shaders"] },
  { domain: "Frontend Architecture", tools: ["React 19", "Next.js 15", "TypeScript"] },
  { domain: "Distributed Systems", tools: ["Node.js", "Supabase", "PostgreSQL", "Redis"] },
  { domain: "Design Standards", tools: ["Figma", "Micro-Interactions", "Fluid UX"] }
];`,
  "Philosophy.json": `{
  "corePrinciples": [
    "Form follows function, elegance empowers both",
    "Sub-100ms response latency on all interactions",
    "Accessible, responsive, future-proof codebase",
    "Continuous curiosity and unyielding craft"
  ]
}`
};

export default function HeroTerminal3D() {
  const [activeTab, setActiveTab] = useState<keyof typeof snippets>("RiyanshDev.py");
  const [copied, setCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippets[activeTab]);
      setCopied(true);
      playMicroSound("click");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  const handleRun = () => {
    playMicroSound("click");
    setIsCompiling(true);
    setConsoleOutput("Compiling modern WebGL runtime...");
    setTimeout(() => {
      setIsCompiling(false);
      setConsoleOutput("âœ“ Ready in 14ms | 100/100 Core Web Vitals | 3D Engine Synchronized");
      setTimeout(() => setConsoleOutput(null), 4000);
    }, 900);
  };

  return (
    <TiltCard maxTilt={8} scale={1.02} className="hero-terminal-3d-root">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="window-controls">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="terminal-tabs">
            {(Object.keys(snippets) as (keyof typeof snippets)[]).map((tab) => (
              <button
                key={tab}
                className={`terminal-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  playMicroSound("hover");
                  setActiveTab(tab);
                }}
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>

          <div className="terminal-actions">
            <button
              className="action-icon-btn"
              onClick={handleRun}
              disabled={isCompiling}
              title="Run Code"
            >
              <Play size={13} className={isCompiling ? "spinning" : ""} />
            </button>
            <button
              className="action-icon-btn"
              onClick={handleCopy}
              title="Copy snippet"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="terminal-body">
          <pre className="code-block">
            <code>
              {snippets[activeTab].split("\n").map((line, idx) => (
                <div key={idx} className="code-line">
                  <span className="line-number">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="line-text">{highlightSyntax(line)}</span>
                </div>
              ))}
            </code>
          </pre>

          {consoleOutput && (
            <div className="terminal-console-toast">
              <Sparkles size={13} />
              <span>{consoleOutput}</span>
            </div>
          )}
        </div>

        {/* Terminal Footer Bar */}
        <div className="terminal-footer">
          <div className="status-indicator">
            <span className="status-ping" />
            <span>TYPESCRIPT 5.7 â€¢ NEXT.JS 15 â€¢ THREE.JS</span>
          </div>
          <span className="footer-meta">UTF-8</span>
        </div>
      </div>
    </TiltCard>
  );
}

// Lightweight syntax highlight styling helper
function highlightSyntax(line: string) {
  if (line.trim().startsWith("//")) {
    return <span className="syn-comment">{line}</span>;
  }

  // Keywords & tokens
  const parts = line.split(/(\b(?:const|export|async|function|return|await|interface|type)\b|"[^"]*"|'[^']*'|[{}\[\](),:;])/g);

  return parts.map((part, i) => {
    if (/^(const|export|async|function|return|await|interface|type)$/.test(part)) {
      return <span key={i} className="syn-keyword">{part}</span>;
    }
    if (/^["'].*["']$/.test(part)) {
      return <span key={i} className="syn-string">{part}</span>;
    }
    if (/^[0-9]+ms?$/.test(part)) {
      return <span key={i} className="syn-number">{part}</span>;
    }
    return part;
  });
}



