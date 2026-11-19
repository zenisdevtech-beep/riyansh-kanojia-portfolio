"use client";

import React, { useState } from "react";
import { Terminal, Play, Copy, Check, Sparkles, Server, CheckCircle2 } from "lucide-react";
import { SiPython } from "react-icons/si";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

const pythonFiles = {
  "langgraph_agent.py": `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], "Conversation history"]
    active_agent: str

workflow = StateGraph(AgentState)

def supervisor_router(state: AgentState):
    """Evaluates task context and routes to specialist agent."""
    content = state["messages"][-1].content
    return "researcher" if "data" in content else "writer"

workflow.add_node("supervisor", supervisor_router)
workflow.add_node("researcher", researcher_node)
workflow.add_node("writer", writer_node)

workflow.add_conditional_edges("supervisor", supervisor_router)
workflow.add_edge("researcher", "writer")
workflow.add_edge("writer", END)

app = workflow.compile()
print("[LangGraph] Multi-agent StateGraph compiled successfully")`,

  "prompt_engineering.py": `from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

class ContentSpecification(BaseModel):
    title: str = Field(description="High CTR Title")
    target_persona: str = Field(description="Reader Profile")
    key_takeaways: list[str] = Field(description="Structured Bullet Points")

# Prompt Design: Context Setting & Instruction Structuring
prompt = ChatPromptTemplate.from_messages([
    ("system", "Expert AI Prompt Engineer producing structured outputs."),
    ("human", "Analyze {topic} with context {context}. Generate JSON schema.")
])

# LangChain execution chain across Claude, Gemini & ChatGPT
chain = prompt | llm_model | JsonOutputParser(pydantic_object=ContentSpecification)
response = chain.invoke({"topic": "AI Workflows", "context": "WordPress Content"})`,

  "ai_content_pipeline.py": `import requests
from typing import Dict, Any

def publish_to_wordpress(article: Dict[str, Any], wp_api_url: str, auth_token: str):
    """
    Techmero Web Services - Automated Content Pipeline.
    Publishes prompt-engineered AI articles to WordPress CMS.
    """
    headers = {"Authorization": f"Bearer {auth_token}"}
    payload = {
        "title": article["title"],
        "content": article["body_html"],
        "status": "publish",
        "categories": [article["category_id"]],
        "meta": {"ai_assisted": True, "prompt_model": "Claude-3.5"}
    }
    
    res = requests.post(f"{wp_api_url}/wp/v2/posts", json=payload, headers=headers)
    return res.status_code == 201`
};

export default function PythonTerminal() {
  const [activeFile, setActiveFile] = useState<keyof typeof pythonFiles>("langgraph_agent.py");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    playMicroSound("click");
    setIsExecuting(true);
    setExecutionOutput("python3 " + activeFile);

    setTimeout(() => {
      setIsExecuting(false);
      if (activeFile === "langgraph_agent.py") {
        setExecutionOutput("✓ LangGraph StateGraph compiled | 3 active nodes routed | 0 errors");
      } else if (activeFile === "prompt_engineering.py") {
        setExecutionOutput("✓ Prompt chain executed | LangChain JSON schema validated | Latency: 0.82s");
      } else {
        setExecutionOutput("✓ WordPress REST API 201 Created | Post published to Techmero CMS");
      }
      setTimeout(() => setExecutionOutput(null), 5000);
    }, 800);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pythonFiles[activeFile]);
      setCopied(true);
      playMicroSound("click");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <TiltCard maxTilt={5} scale={1.01} className="python-terminal-card">
      <div className="py-term-window">
        {/* Terminal Header */}
        <div className="py-term-header">
          <div className="py-term-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="py-term-tabs">
            {(Object.keys(pythonFiles) as (keyof typeof pythonFiles)[]).map((file) => (
              <button
                key={file}
                className={`py-tab ${activeFile === file ? "active" : ""}`}
                onClick={() => {
                  playMicroSound("hover");
                  setActiveFile(file);
                }}
              >
                <SiPython size={12} className="py-icon" />
                <span>{file}</span>
              </button>
            ))}
          </div>

          <div className="py-term-actions">
            <button
              onClick={handleRun}
              className="py-action-btn run-btn"
              title="Execute Python Script"
              disabled={isExecuting}
            >
              <Play size={12} />
              <span>{isExecuting ? "Executing..." : "Run"}</span>
            </button>

            <button
              onClick={handleCopy}
              className="py-action-btn"
              title="Copy snippet"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="py-term-code-body">
          <pre className="py-code-block">
            <code>
              {pythonFiles[activeFile].split("\n").map((line, idx) => (
                <div key={idx} className="py-code-line">
                  <span className="py-line-no">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="py-line-content">{renderPythonSyntax(line)}</span>
                </div>
              ))}
            </code>
          </pre>

          {executionOutput && (
            <div className="py-terminal-output-toast">
              <CheckCircle2 size={14} className="toast-icon-green" />
              <span>{executionOutput}</span>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="py-term-footer">
          <div className="py-status-item">
            <span className="py-live-dot" />
            <span>PYTHON 3.12 • LANGCHAIN • PILLOW • FASTAPI • WORDPRESS</span>
          </div>
          <span className="py-env-tag">VENV: ACTIVE (RIYANSH)</span>
        </div>
      </div>
    </TiltCard>
  );
}

function renderPythonSyntax(line: string) {
  if (line.trim().startsWith("#") || line.trim().startsWith('"""')) {
    return <span className="pysyn-comment">{line}</span>;
  }
  if (line.trim().startsWith("@")) {
    return <span className="pysyn-decorator">{line}</span>;
  }

  const parts = line.split(/(\b(?:def|async|await|return|if|else|class|import|from|class|pass|for|in|yield|with|as)\b|"[^"]*"|'[^']*'|[{}\[\](),:;=])/g);

  return parts.map((part, i) => {
    if (/^(def|async|await|return|if|else|class|import|from|class|pass|for|in|yield|with|as)$/.test(part)) {
      return <span key={i} className="pysyn-keyword">{part}</span>;
    }
    if (/^["'].*["']$/.test(part)) {
      return <span key={i} className="pysyn-string">{part}</span>;
    }
    if (/^[0-9]+(\.[0-9]+)?$/.test(part)) {
      return <span key={i} className="pysyn-number">{part}</span>;
    }
    return part;
  });
}
