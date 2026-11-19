"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Code2,
  Layers,
  Sparkles,
  Terminal,
  Globe,
  Database,
  Cpu,
  Boxes,
  Copy,
  Check,
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  FileText,
  Server,
  Cloud,
  Wrench,
  Bot,
  Brain,
  Zap,
} from "lucide-react";

import BackgroundNebula from "@/components/BackgroundNebula";
import ClickSpark from "@/components/ClickSpark";
import AnimatedContent from "@/components/AnimatedContent";
import CursorFollower from "@/components/CursorFollower";
import SoundToggle, { playMicroSound } from "@/components/SoundToggle";

// Portfolio Sections & Interactive Components
import TechStackLoops from "@/components/TechStackLoops";
import ProjectSideCarousel from "@/components/ProjectSideCarousel";
import AboutMeSection from "@/components/AboutMeSection";
import FormattedResume from "@/components/FormattedResume";
import GetInTouchSection from "@/components/GetInTouchSection";
import PromptLabTerminal from "@/components/PromptLabTerminal";

const mobileNavItems = [
  { id: "about", label: "About Me", icon: Terminal },
  { id: "skills", label: "Tech Stack", icon: Layers },
  { id: "work", label: "Projects", icon: Code2 },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "contact", label: "Get in Touch", icon: MessageSquare },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const closeMenu = () => setMenuOpen(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile menu on Escape key and window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const handleResize = () => {
      if (window.innerWidth > 860) closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll Progress Bar calculation with spring damping
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section for scroll-driven navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "work", "resume", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ClickSpark
      sparkColor="#3B82F6"
      shape="line"
      sparkCount={8}
      sparkSize={14}
      sparkRadius={32}
      duration={500}
    >
      <main>
        {/* Precision Cursor & Cosmic Background Nebula */}
        <CursorFollower />
        <BackgroundNebula />
        <div className="noise-overlay" aria-hidden="true" />

        {/* Global Scroll Progress Bar at very top */}
        <motion.div className="scroll-progress-bar-indicator" style={{ scaleX }} />

        {/* Floating Modern Navigation */}
        <header className="nav-wrapper">
          <nav className="nav shell">
            <a
              href="#home"
              className="brand"
              aria-label="Riyansh Kanojia Portfolio"
              onMouseEnter={() => playMicroSound("hover")}
            >
              <div className="brand-mark-3d">RK</div>
              <span className="brand-text">
                riyansh<span className="brand-sub">.dev</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="nav-links">
              <a
                href="#about"
                className={activeSection === "about" ? "active-nav-link" : ""}
                onMouseEnter={() => playMicroSound("hover")}
              >
                About Me
              </a>
              <a
                href="#skills"
                className={activeSection === "skills" ? "active-nav-link" : ""}
                onMouseEnter={() => playMicroSound("hover")}
              >
                Tech Stack
              </a>
              <a
                href="#work"
                className={activeSection === "work" ? "active-nav-link" : ""}
                onMouseEnter={() => playMicroSound("hover")}
              >
                Projects
              </a>
              <a
                href="#resume"
                className={activeSection === "resume" ? "active-nav-link" : ""}
                onMouseEnter={() => playMicroSound("hover")}
              >
                Resume
              </a>
              <a
                href="#contact"
                className={activeSection === "contact" ? "active-nav-link" : ""}
                onMouseEnter={() => playMicroSound("hover")}
              >
                Get in Touch
              </a>
            </div>

            <div className="nav-right-actions">
              <SoundToggle />
              <a
                className="nav-cta"
                href="#contact"
                onClick={() => {
                  closeMenu();
                  playMicroSound("click");
                }}
                onMouseEnter={() => playMicroSound("hover")}
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight size={15} />
              </a>
              <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </header>

        {/* Fullscreen Modern Cyber Glass Mobile Menu */}
        <div
          className={`mobile-menu-drawer ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMenu();
          }}
        >
          <div className="mobile-menu-inner">
            {/* Navigation Items */}
            <div className="mobile-menu-links">
              {mobileNavItems.map((item, index) => {
                const IconComp = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      closeMenu();
                      playMicroSound("click");
                    }}
                    onMouseEnter={() => playMicroSound("hover")}
                    className={`mobile-nav-item ${isActive ? "active" : ""}`}
                  >
                    <div className="mobile-nav-item-left">
                      <span className="mobile-nav-num">0{index + 1}</span>
                      <span className="mobile-nav-icon">
                        <IconComp size={16} />
                      </span>
                      <span className="mobile-nav-label">{item.label}</span>
                    </div>
                    <div className="mobile-nav-item-right">
                      {isActive && (
                        <span className="mobile-nav-active-pill">ACTIVE</span>
                      )}
                      <ArrowRight size={15} className="mobile-nav-arrow" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Mobile Drawer Footer Info */}
            <div className="mobile-menu-footer">
              {/* Availability Status */}
              <div className="mobile-menu-status">
                <span className="mobile-status-dot" />
                <div className="mobile-status-text">
                  <span className="mobile-status-title">
                    Available for New Opportunities
                  </span>
                  <span className="mobile-status-sub">
                    Python • Prompt Engineering • AI
                  </span>
                </div>
              </div>

              {/* Primary CTA */}
              <a
                href="#contact"
                className="mobile-menu-cta"
                onClick={() => {
                  closeMenu();
                  playMicroSound("click");
                }}
                onMouseEnter={() => playMicroSound("hover")}
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight size={16} />
              </a>

              {/* Direct Social Links */}
              <div className="mobile-menu-socials">
                <a
                  href="https://github.com/riyansh-kanojia"
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-social-btn"
                  aria-label="GitHub"
                  onClick={() => playMicroSound("click")}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/riyansh-kanojia"
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-social-btn"
                  aria-label="LinkedIn"
                  onClick={() => playMicroSound("click")}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:riyanshkanojia@gmail.com"
                  className="mobile-social-btn"
                  aria-label="Email"
                  onClick={() => playMicroSound("click")}
                >
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero shell" id="home">
          {/* Left Column: Bio & Introduction */}
          <div className="hero-copy">
            <AnimatedContent
              distance={40}
              direction="vertical"
              duration={0.7}
              stagger={0.08}
              threshold={0.1}
            >
              <h1 className="hero-name">RIYANSH KANOJIA</h1>

              <div className="hero-role-title">
                Python &amp; Prompt Engineer | <span className="gradient-span">AI Specialist</span>
              </div>

              <p className="hero-bio">
                Computer Science graduate with experience in WordPress Content Writing and an active interest in Python, Prompt Engineering, and Generative AI. Developing knowledge of AI tools, prompt design, and large language model frameworks, including LangChain and LangGraph. Familiar with Python libraries for data analysis and visualization.
              </p>

              <div className="hero-pills-row">
                <span className="hero-pill">Python &amp; FastAPI</span>
                <span className="hero-pill">Prompt Engineering</span>
                <span className="hero-pill">LangChain &amp; LangGraph</span>
                <span className="hero-pill">Claude, Gemini &amp; DeepSeek</span>
                <span className="hero-pill">NumPy &amp; Pandas</span>
                <span className="hero-pill">WordPress &amp; Automation</span>
              </div>

              <div className="hero-actions">
                <a
                  className="btn-primary-glow"
                  href="#work"
                  onClick={() => playMicroSound("click")}
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  <span>Explore Projects</span>
                  <ArrowDownRight size={17} />
                </a>
                <a
                  className="btn-ghost-glow"
                  href="#resume"
                  onClick={() => playMicroSound("click")}
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  <span>View Full Resume</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="hero-quick-stats">
                <div className="quick-stat-box">
                  <strong>Parul Univ</strong>
                  <span>B.CS Graduate • 7.4 CGPA</span>
                </div>
                <div className="quick-stat-box">
                  <strong>Techmero</strong>
                  <span>WordPress Content Writer</span>
                </div>
                <div className="quick-stat-box">
                  <strong>AI &amp; Prompting</strong>
                  <span>LangChain • LLMs • Python</span>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Hero Right Column: Meaningful Interactive AI Prompt Engineering & Python Terminal */}
          <motion.div
            className="hero-right-stage"
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <PromptLabTerminal />
          </motion.div>
        </section>

        {/* SECTION 1: My Tech Stack with Loop Animation (Page 1) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechStackLoops />
        </motion.div>

        {/* SECTION 2: My Project with Side Animation (Page 2) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectSideCarousel />
        </motion.div>

        {/* SECTION 3: About Me (Page 3) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AboutMeSection />
        </motion.div>

        {/* SECTION 4: Long Resume Like this With Same Formating (Page 3 & Page 4) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <FormattedResume />
        </motion.div>

        {/* SECTION 5: Redesigned Contact Command Center (Page 1) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <GetInTouchSection />
        </motion.div>

        {/* Comprehensive Multi-Column Footer */}
        <footer className="footer-wrapper">
          <div className="shell">
            <div className="footer-top-grid">
              <div className="footer-brand-col">
                <a href="#home" className="brand">
                  <div className="brand-mark-3d" style={{ width: 28, height: 28, fontSize: 14 }}>
                    RK
                  </div>
                  <span>riyansh.dev</span>
                </a>
                <p>
                  Computer Science graduate specializing in Python, Prompt Engineering, Generative AI, LangChain, LangGraph, and data-driven workflow automation.
                </p>
              </div>

              <div>
                <h5 className="footer-col-title">NAVIGATION</h5>
                <ul className="footer-links-list">
                  <li><a href="#about">About Me</a></li>
                  <li><a href="#skills">Tech Stack</a></li>
                  <li><a href="#work">Projects</a></li>
                  <li><a href="#resume">Full Resume</a></li>
                  <li><a href="#contact">Get in Touch</a></li>
                </ul>
              </div>

              <div>
                <h5 className="footer-col-title">DIRECT CONTACT</h5>
                <ul className="footer-links-list">
                  <li><a href="mailto:riyanshkanojia@gmail.com">riyanshkanojia@gmail.com</a></li>
                  <li><a href="tel:+918758698300">+91 8758698300</a></li>
                  <li><a href="https://linkedin.com/in/riyansh-kanojia" target="_blank" rel="noreferrer">linkedin: riyansh-kanojia</a></li>
                  <li><a href="https://github.com/riyansh-kanojia" target="_blank" rel="noreferrer">github.com/riyansh-kanojia</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom-bar">
              <span>RIYANSH KANOJIA • PYTHON | PROMPT ENGINEERING | AI TOOLS © 2026. ALL RIGHTS RESERVED.</span>
              <a
                href="#home"
                className="back-top-btn"
                onClick={() => playMicroSound("click")}
                onMouseEnter={() => playMicroSound("hover")}
              >
                <span>BACK TO TOP ↑</span>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </ClickSpark>
  );
}
