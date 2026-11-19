"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Bot,
  Brain,
  Cpu,
  RefreshCw,
  Layers,
  ArrowRight,
  Sliders,
} from "lucide-react";
import { SiPython } from "react-icons/si";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

interface CodeSnippet {
  filename: string;
  language: string;
  model: string;
  badge: string;
  description: string;
  code: string;
  mockOutput: {
    title: string;
    metrics: { label: string; value: string }[];
    details: string;
  };
}

const snippets: Record<string, CodeSnippet> = {
  "prompt_engine.py": {
    filename: "prompt_engine.py",
    language: "Python 3.12 • LangChain",
    model: "Claude 3.5 Sonnet",
    badge: "Prompt Engineering",
    description: "LangChain ChatPromptTemplate with structured JSON schema extraction",
    code: `from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

class AnalysisOutput(BaseModel):
    intent: str = Field(description="User primary intent")
    confidence: float = Field(ge=0.0, le=1.0)
    entities: list[str] = Field(default_factory=list)
    action_items: list[str]

# Context Setting & Instruction Structuring
prompt = ChatPromptTemplate.from_messages([
    ("system", "Expert AI Prompt Engineer. Enforce strict JSON output."),
    ("human", "Process text: {input_text}\\nContext: {domain_context}")
])

# Execution pipeline across Claude, Gemini & DeepSeek
chain = prompt | llm_model | JsonOutputParser(pydantic_object=AnalysisOutput)
result = chain.invoke({"input_text": query, "domain_context": "Content Engine"})`,
    mockOutput: {
      title: "LangChain Pipeline Executed Successfully",
      metrics: [
        { label: "Latency", value: "0.72s" },
        { label: "Tokens", value: "318" },
        { label: "Validation", value: "Pydantic 100%" },
      ],
      details: "{\n  \"intent\": \"automated_content_synthesis\",\n  \"confidence\": 0.985,\n  \"entities\": [\"Python\", \"LangChain\", \"FastAPI\"],\n  \"action_items\": [\"Format Markdown\", \"Publish to CMS\"]\n}",
    },
  },
  "langgraph_agent.py": {
    filename: "langgraph_agent.py",
    language: "Python 3.12 • LangGraph",
    model: "Multi-Agent System",
    badge: "Agentic AI",
    description: "StateGraph cyclic workflow orchestrating Supervisor, Research, and Validator agents",
    code: `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], "Conversation history"]
    active_agent: str
    confidence_score: float

# Initialize StateGraph workflow
workflow = StateGraph(AgentState)

def supervisor_router(state: AgentState):
    """Evaluates task context and routes to domain specialist."""
    last_msg = state["messages"][-1].content
    if "research" in last_msg.lower():
        return "researcher_agent"
    return "verifier_agent"

workflow.add_node("supervisor", supervisor_node)
workflow.add_node("researcher_agent", researcher_node)
workflow.add_node("verifier_agent", verifier_node)

workflow.add_conditional_edges("supervisor", supervisor_router)
workflow.add_edge("researcher_agent", "verifier_agent")
workflow.add_edge("verifier_agent", END)

app = workflow.compile()`,
    mockOutput: {
      title: "LangGraph StateGraph Compiled & Executed",
      metrics: [
        { label: "Graph Nodes", value: "3 Active" },
        { label: "Cycle Time", value: "1.18s" },
        { label: "State", value: "Thread #8942 Persisted" },
      ],
      details: "✓ Supervisor routing: researcher_agent -> verifier_agent\n✓ State checkpoint saved to MemorySaver (0 errors)\n✓ Multi-agent consensus achieved (Score: 0.992)",
    },
  },
  "wp_pipeline.py": {
    filename: "wp_pipeline.py",
    language: "Python • REST API",
    model: "Techmero CMS",
    badge: "WordPress Automation",
    description: "Automated WordPress content publication with prompt verification",
    code: `import requests
from typing import Dict, Any

def dispatch_to_wordpress(article: Dict[str, Any], endpoint: str, token: str):
    """Publishes prompt-refined content to WordPress CMS."""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "title": article["title"],
        "content": article["body_html"],
        "status": "publish",
        "categories": [article.get("category_id", 1)],
        "meta": {"ai_assisted": True, "prompt_engineer": "Riyansh Kanojia"}
    }
    
    response = requests.post(f"{endpoint}/wp/v2/posts", json=payload, headers=headers)
    return {"status_code": response.status_code, "post_id": response.json().get("id")}`,
    mockOutput: {
      title: "WordPress REST API 201 Created",
      metrics: [
        { label: "Status", value: "201 Created" },
        { label: "Post ID", value: "#4821" },
        { label: "CMS", value: "WordPress" },
      ],
      details: "✓ Content published to Techmero Web Services\n✓ Category: AI & Tech Insights\n✓ AI Metadata stamped: prompt_engineer=Riyansh Kanojia",
    },
  },
};

const availableModels = ["Claude 3.5 Sonnet", "Gemini 1.5 Pro", "DeepSeek V3", "GPT-4o"];

export default function PromptLabTerminal() {
  const [activeTab, setActiveTab] = useState<string>("prompt_engine.py");
  const [selectedModel, setSelectedModel] = useState<string>("Claude 3.5 Sonnet");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = snippets[activeTab];

  const handleRun = () => {
    playMicroSound("click");
    setIsExecuting(true);
    setShowOutput(false);

    setTimeout(() => {
      setIsExecuting(false);
      setShowOutput(true);
      playMicroSound("pop");
    }, 850);
  };

  const handleCopy = async () => {
    playMicroSound("click");
    try {
      await navigator.clipboard.writeText(currentSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <TiltCard maxTilt={6} scale={1.015} className="promptlab-card-tilt">
      <div className="promptlab-terminal-card">
        {/* Top Header Bar */}
        <div className="promptlab-header">
          {/* Window dots */}
          <div className="window-dots-wrap">
            <span className="window-dot dot-red" />
            <span className="window-dot dot-yellow" />
            <span className="window-dot dot-green" />
          </div>

          {/* Model Selector Pill */}
          <div className="promptlab-model-selector">
            <Bot size={13} className="model-icon" />
            <select
              value={selectedModel}
              onChange={(e) => {
                playMicroSound("click");
                setSelectedModel(e.target.value);
              }}
              className="model-select-dropdown"
              aria-label="Select AI Model"
            >
              {availableModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="promptlab-header-actions">
            <button
              onClick={handleCopy}
              className="promptlab-icon-btn"
              title="Copy code to clipboard"
              onMouseEnter={() => playMicroSound("hover")}
            >
              {copied ? <Check size={13} className="check-text" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={handleRun}
              disabled={isExecuting}
              className={`promptlab-run-btn ${isExecuting ? "executing" : ""}`}
              title="Execute pipeline"
              onMouseEnter={() => playMicroSound("hover")}
            >
              {isExecuting ? (
                <>
                  <RefreshCw size={12} className="spin-icon" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" />
                  <span>Run Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Row */}
        <div className="promptlab-tabs-row">
          {Object.keys(snippets).map((key) => {
            const snip = snippets[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  playMicroSound("hover");
                  setActiveTab(key);
                  setShowOutput(false);
                }}
                className={`promptlab-tab-btn ${isActive ? "active" : ""}`}
              >
                <SiPython size={12} className="py-icon" />
                <span>{snip.filename}</span>
                {isActive && <span className="tab-pill-badge">{snip.badge}</span>}
              </button>
            );
          })}
        </div>

        {/* Code Content Area */}
        <div className="promptlab-code-viewport">
          <div className="code-linenumber-col" aria-hidden="true">
            {currentSnippet.code.split("\n").map((_, i) => (
              <span key={i} className="line-num">
                {i + 1}
              </span>
            ))}
          </div>

          <pre className="code-pre-block">
            <code>
              {currentSnippet.code.split("\n").map((line, lIdx) => {
                // Lightweight syntax coloration
                let coloredLine: React.ReactNode = line;

                if (line.trim().startsWith("#")) {
                  coloredLine = <span className="token-comment">{line}</span>;
                } else if (line.trim().startsWith('"""') || line.trim().endsWith('"""')) {
                  coloredLine = <span className="token-docstring">{line}</span>;
                } else {
                  // highlight keywords
                  coloredLine = (
                    <span>
                      {line.split(/(\b(?:from|import|def|class|return|with|as|for|in|float|str|list|dict|int)\b)/g).map(
                        (part, pIdx) => {
                          if (
                            /^(?:from|import|def|class|return|with|as|for|in|float|str|list|dict|int)$/.test(
                              part
                            )
                          ) {
                            return (
                              <span key={pIdx} className="token-keyword">
                                {part}
                              </span>
                            );
                          }
                          if (/^"[^"]*"$/.test(part) || /^'[^']*'$/.test(part)) {
                            return (
                              <span key={pIdx} className="token-string">
                                {part}
                              </span>
                            );
                          }
                          return part;
                        }
                      )}
                    </span>
                  );
                }

                return (
                  <div key={lIdx} className="code-line-row">
                    {coloredLine}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Live Output Drawer */}
        <AnimatePresence>
          {showOutput && (
            <motion.div
              className="promptlab-output-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="drawer-header-strip">
                <div className="drawer-title">
                  <span className="pulse-green-dot" />
                  <strong>{currentSnippet.mockOutput.title}</strong>
                </div>

                <div className="drawer-metrics-strip">
                  {currentSnippet.mockOutput.metrics.map((m, mIdx) => (
                    <span key={mIdx} className="metric-chip">
                      <strong>{m.label}:</strong> {m.value}
                    </span>
                  ))}
                </div>
              </div>

              <pre className="drawer-json-output">
                <code>{currentSnippet.mockOutput.details}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Status Footer */}
        <div className="promptlab-footer-bar">
          <div className="footer-left-status">
            <span className="status-indicator-dot" />
            <span>Python 3.12 Engine • LangChain 0.3</span>
          </div>

          <div className="footer-right-tags">
            <span className="footer-mini-tag">Structured Output</span>
            <span className="footer-mini-tag">Context Tuning</span>
            <span className="footer-mini-tag">Multi-Agent</span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
