"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Eye,
  Grid,
  Maximize2,
} from "lucide-react";
import { playMicroSound } from "./SoundToggle";

export interface CarouselProject {
  id: string;
  title: string;
  category: "all" | "ai" | "python" | "data";
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
}

const projectsList: CarouselProject[] = [
  {
    id: "langgraph",
    title: "LangGraph Multi-Agent Studio",
    category: "ai",
    subtitle: "StateGraph Cyclic Routing & Autonomous Agent Engine",
    description:
      "Autonomous multi-agent orchestration architecture engineered with LangGraph and Python. Features supervisor routing, conditional edge state management, memory persistence, and dynamic tool execution across specialized sub-agents.",
    tags: ["LangGraph", "LangChain", "Python", "StateGraph", "Multi-Agent", "FastAPI"],
    image: "/langgraph_preview.jpg",
    githubUrl: "https://github.com/riyansh-kanojia",
    liveUrl: "https://github.com/riyansh-kanojia",
    metrics: [
      { label: "Orchestration", value: "StateGraph & Edges" },
      { label: "Architecture", value: "Supervisor + Workers" },
      { label: "Memory", value: "Thread Persistence" },
    ],
  },
  {
    id: "promptcraft",
    title: "PromptCraft Studio",
    category: "ai",
    subtitle: "Prompt Engineering & Multi-LLM Orchestration Workbench",
    description:
      "Developing structured prompt testing pipelines, context setting, instruction structuring, and structured output generation across Claude, Gemini, GPT-4, and DeepSeek using LangChain and LangGraph.",
    tags: ["Prompt Design", "LangChain", "LangGraph", "FastAPI", "Python", "Claude", "Gemini"],
    image: "/promptcraft_preview.jpg",
    githubUrl: "https://github.com/riyansh-kanojia",
    liveUrl: "https://github.com/riyansh-kanojia",
    metrics: [
      { label: "Evaluation", value: "Multi-Model" },
      { label: "Framework", value: "LangGraph" },
      { label: "Outputs", value: "Structured JSON" },
    ],
  },
  {
    id: "careai",
    title: "CareAI Assistant",
    category: "ai",
    subtitle: "AI Patient Diagnostic & Structured Prompt Engine",
    description:
      "Generative AI healthcare assistant engineered with prompt refinement, clinical triage instructions, and structured medical summary extraction via FastAPI and Python.",
    tags: ["Python", "FastAPI", "Prompt Engineering", "Generative AI", "Structured Outputs"],
    image: "/careai_preview.jpg",
    githubUrl: "https://github.com/riyansh-kanojia",
    liveUrl: "https://github.com/riyansh-kanojia",
    metrics: [
      { label: "Prompt Style", value: "Chain-of-Thought" },
      { label: "Validation", value: "Schema Guardrails" },
      { label: "Backend", value: "FastAPI + Python" },
    ],
  },
  {
    id: "dataviz",
    title: "DataViz Analytics Hub",
    category: "data",
    subtitle: "NumPy, Pandas & Matplotlib Statistical Modeling",
    description:
      "Comprehensive Python data exploration suite utilizing NumPy, Pandas, Matplotlib, and Scikit-learn for automated data preparation, statistical distribution plotting, and predictive analytics.",
    tags: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Python", "DataViz"],
    image: "/lumivizstack_preview.jpg",
    githubUrl: "https://github.com/riyansh-kanojia",
    liveUrl: "https://github.com/riyansh-kanojia",
    metrics: [
      { label: "Analysis Engine", value: "Pandas & NumPy" },
      { label: "Visualizations", value: "Matplotlib" },
      { label: "Predictive", value: "Scikit-learn" },
    ],
  },
];

export default function ProjectSideCarousel() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "python" | "data">("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projectsList
      : projectsList.filter(
          (p) =>
            p.category === activeFilter ||
            (activeFilter === "python" && p.tags.includes("Python"))
        );

  // Keep index in bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  const handlePrev = () => {
    playMicroSound("click");
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playMicroSound("click");
    setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];

  return (
    <section className="section shell projects-carousel-section" id="work">
      {/* Section Header */}
      <div className="section-heading-centered">
        <h2 className="tech-stack-title">
          My Projects
          <span className="title-curve-underline" aria-hidden="true" />
        </h2>
        <p className="section-subtitle">
          Python automation tools, prompt engineering workbenches, generative AI systems, and data analytics pipelines.
        </p>
      </div>

      {/* Filter Pills Bar matching the specification */}
      <div className="carousel-filter-bar">
        <div className="carousel-filter-pills">
          {(
            [
              { id: "all", label: "All Projects" },
              { id: "ai", label: "AI & Prompting" },
              { id: "python", label: "Python Automation" },
              { id: "data", label: "Data & ML" },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              className={`filter-pill-btn ${activeFilter === filter.id ? "active" : ""}`}
              onClick={() => {
                playMicroSound("click");
                setActiveFilter(filter.id);
              }}
              onMouseEnter={() => playMicroSound("hover")}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="carousel-view-indicator" title="Side Animation View">
          <Grid size={16} />
        </div>
      </div>

      {/* Side-Animation 3D Carousel Stage */}
      <div className="side-carousel-stage">
        {/* Previous Button */}
        <button
          className="carousel-nav-btn prev-btn"
          onClick={handlePrev}
          aria-label="Previous project"
          onMouseEnter={() => playMicroSound("hover")}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Cards Presentation with Side Peek */}
        <div
          className="side-carousel-track"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {filteredProjects.map((project, idx) => {
            const isCurrent = idx === currentIndex;
            const isPrev =
              idx === (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
            const isNext = idx === (currentIndex + 1) % filteredProjects.length;

            if (!isCurrent && !isPrev && !isNext && filteredProjects.length > 3) {
              return null;
            }

            let cardStateClass = "side-card-hidden";
            if (isCurrent) cardStateClass = "side-card-active";
            else if (isPrev) cardStateClass = "side-card-prev";
            else if (isNext) cardStateClass = "side-card-next";

            return (
              <div
                key={project.id}
                className={`side-project-card ${cardStateClass}`}
                onClick={() => {
                  if (!isCurrent) {
                    playMicroSound("click");
                    setCurrentIndex(idx);
                  }
                }}
              >
                {/* Project Mockup Screen */}
                <div className="project-mockup-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-mockup-img"
                  />
                  <div className="mockup-overlay-sheen" />
                  <span className="mockup-category-badge">
                    {project.category === "ai"
                      ? "AI & Prompting"
                      : project.category === "python"
                      ? "Python Script"
                      : "Data Analytics"}
                  </span>
                </div>

                {/* Card Information Body */}
                <div className="project-card-body-content">
                  {/* Top Row: Title + Subtitle + Action buttons */}
                  <div className="project-card-top-row">
                    <div>
                      <h3 className="project-card-name">{project.title}</h3>
                      <span style={{ fontSize: "12px", color: "#38BDF8", fontFamily: "var(--font-mono)", display: "block", marginTop: "3px" }}>
                        {project.subtitle}
                      </span>
                    </div>

                    <div className="project-card-actions">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="card-action-icon-btn"
                        title="View GitHub Repository"
                        onClick={(e) => {
                          e.stopPropagation();
                          playMicroSound("click");
                        }}
                        onMouseEnter={() => playMicroSound("hover")}
                      >
                        <Github size={15} />
                      </a>
                      <a
                        href={project.liveUrl || project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="card-action-icon-btn primary-action"
                        title="Explore Project"
                        onClick={(e) => {
                          e.stopPropagation();
                          playMicroSound("click");
                        }}
                        onMouseEnter={() => playMicroSound("hover")}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Tech Tag Pills Row */}
                  <div className="project-card-tags-row">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tech-badge-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Excerpt Description */}
                  <p className="project-card-excerpt">{project.description}</p>

                  {/* Metrics Row */}
                  <div className="project-card-metrics-strip">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="metric-col">
                        <span className="metric-val">{m.value}</span>
                        <span className="metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className="carousel-nav-btn next-btn"
          onClick={handleNext}
          aria-label="Next project"
          onMouseEnter={() => playMicroSound("hover")}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="carousel-dots-pagination">
        {filteredProjects.map((_, dotIdx) => (
          <button
            key={dotIdx}
            className={`carousel-dot ${dotIdx === currentIndex ? "active-dot" : ""}`}
            onClick={() => {
              playMicroSound("click");
              setCurrentIndex(dotIdx);
            }}
            aria-label={`Go to slide ${dotIdx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
