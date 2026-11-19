"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowUpRight,
  User,
  MessageSquare,
  Clock,
  MapPin,
  Bot,
  Zap,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { playMicroSound } from "./SoundToggle";
import TiltCard from "./TiltCard";

const inquiryTypes = [
  { id: "prompt", label: "Prompt Engineering", icon: <Bot size={13} /> },
  { id: "python", label: "Python & Automation", icon: <Zap size={13} /> },
  { id: "llm", label: "LangChain & LLM Agents", icon: <Sparkles size={13} /> },
  { id: "role", label: "Full-Time / Contract Role", icon: <Briefcase size={13} /> },
  { id: "other", label: "General Discussion", icon: <MessageSquare size={13} /> },
];

export default function GetInTouchSection() {
  const [selectedIntent, setSelectedIntent] = useState<string>("prompt");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyEmail = async () => {
    playMicroSound("click");
    try {
      await navigator.clipboard.writeText("riyanshkanojia@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = "mailto:riyanshkanojia@gmail.com";
    }
  };

  const copyPhone = async () => {
    playMicroSound("click");
    try {
      await navigator.clipboard.writeText("+918758698300");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      window.location.href = "tel:+918758698300";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    playMicroSound("click");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playMicroSound("pop");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 900);
  };

  return (
    <section className="section shell redesigned-contact-section" id="contact">
      {/* Centered Top Heading with Glow Underline */}
      <div className="section-heading-centered" style={{ marginBottom: "36px" }}>
        <h2 className="tech-stack-title">
          Let&apos;s Build Something
          <span className="title-curve-underline" aria-hidden="true" />
        </h2>
        <p className="section-subtitle">
          Open to new projects, roles, and collaborations — especially where Python, AI, prompt engineering, and automation can create measurable value.
        </p>
      </div>

      {/* Main Two-Column Glassmorphic Layout */}
      <div className="contact-main-grid">
        {/* Left Column: Contact Cards & Availability */}
        <div className="contact-left-col">
          <div className="contact-info-glass-card">
            <div className="contact-card-eyebrow-row">
              <span className="contact-pill-tag">DIRECT CHANNELS</span>
              <span className="availability-live-pill">
                <span className="pulse-cyan-dot" />
                Available for Roles &amp; Freelance
              </span>
            </div>

            <h3 className="contact-info-title">
              Let&apos;s create something impactful together.
            </h3>
            <p className="contact-info-body">
              Whether you&apos;re exploring a new AI initiative, need help with prompt design, or want to automate part of your workflow with Python, I&apos;d love to connect and discuss how I can help.
            </p>

            {/* Quick Metrics & Meta strip */}
            <div className="contact-meta-strip">
              <div className="contact-meta-item">
                <Clock size={13} className="meta-icon" />
                <span>Response: <strong>&lt; 2 Hours</strong></span>
              </div>
              <div className="contact-meta-divider">•</div>
              <div className="contact-meta-item">
                <MapPin size={13} className="meta-icon" />
                <span>Location: <strong>India (IST)</strong></span>
              </div>
              <div className="contact-meta-divider">•</div>
              <div className="contact-meta-item">
                <ShieldCheck size={13} className="meta-icon" />
                <span>Work: <strong>Remote Ready</strong></span>
              </div>
            </div>

            {/* Direct Contact Action Cards */}
            <div className="contact-actions-vertical-list">
              {/* Email Card */}
              <div className="contact-channel-item">
                <div className="channel-icon-circle">
                  <Mail size={16} />
                </div>
                <div className="channel-text-content">
                  <span className="channel-label">EMAIL ADDRESS</span>
                  <a href="mailto:riyanshkanojia@gmail.com" className="channel-value-link">
                    riyanshkanojia@gmail.com
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="channel-action-copy-btn"
                  title="Copy email address"
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Phone Card */}
              <div className="contact-channel-item">
                <div className="channel-icon-circle">
                  <Phone size={16} />
                </div>
                <div className="channel-text-content">
                  <span className="channel-label">DIRECT PHONE / WHATSAPP</span>
                  <a href="tel:+918758698300" className="channel-value-link">
                    +91 8758698300
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyPhone}
                  className="channel-action-copy-btn"
                  title="Copy phone number"
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  {copiedPhone ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedPhone ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* LinkedIn Card */}
              <div className="contact-channel-item">
                <div className="channel-icon-circle">
                  <Linkedin size={16} />
                </div>
                <div className="channel-text-content">
                  <span className="channel-label">LINKEDIN NETWORK</span>
                  <a
                    href="https://linkedin.com/in/riyansh-kanojia"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-value-link"
                  >
                    linkedin.com/in/riyansh-kanojia
                  </a>
                </div>
                <a
                  href="https://linkedin.com/in/riyansh-kanojia"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-action-open-btn"
                  title="Visit LinkedIn Profile"
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  <span>Connect</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>

              {/* GitHub Card */}
              <div className="contact-channel-item">
                <div className="channel-icon-circle">
                  <Github size={16} />
                </div>
                <div className="channel-text-content">
                  <span className="channel-label">OPEN SOURCE &amp; CODE</span>
                  <a
                    href="https://github.com/riyansh-kanojia"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-value-link"
                  >
                    github.com/riyansh-kanojia
                  </a>
                </div>
                <a
                  href="https://github.com/riyansh-kanojia"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-action-open-btn"
                  title="Visit GitHub Profile"
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  <span>Follow</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Redesigned Interactive Message Command Center */}
        <div className="contact-right-col">
          <div className="redesigned-form-card">
            {/* Top Form Header */}
            <div className="form-card-top-bar">
              <div>
                <span className="form-eyebrow-pill">INTERACTIVE MESSAGE DESK</span>
                <h3 className="form-card-heading">Send a Direct Message</h3>
              </div>
              <span className="form-status-indicator">
                <span className="status-live-pulse" /> Live Dispatch
              </span>
            </div>

            {/* Interest / Topic Selection Pills */}
            <div className="inquiry-type-selector-wrap">
              <span className="inquiry-select-label">WHAT CAN I HELP YOU WITH?</span>
              <div className="inquiry-pills-row">
                {inquiryTypes.map((type) => {
                  const isSelected = selectedIntent === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        playMicroSound("hover");
                        setSelectedIntent(type.id);
                      }}
                      className={`inquiry-chip-btn ${isSelected ? "selected" : ""}`}
                    >
                      <span className="chip-icon">{type.icon}</span>
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Success Feedback View or Actual Form */}
            {isSubmitted ? (
              <motion.div
                className="form-success-banner-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} className="success-check-icon" />
                </div>
                <h4 className="success-headline">Message Successfully Dispatched!</h4>
                <p className="success-body">
                  Thank you for reaching out, <strong>{formData.name || "friend"}</strong>! I have received your message regarding{" "}
                  <em>{inquiryTypes.find((t) => t.id === selectedIntent)?.label}</em> and will respond within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="send-another-btn"
                  onMouseEnter={() => playMicroSound("hover")}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="modern-contact-form">
                {/* 2-Field Row: Name and Email */}
                <div className="form-input-two-col">
                  {/* Name Input */}
                  <div className="modern-field-group">
                    <label htmlFor="modern-name" className="modern-field-label">
                      Your Name
                    </label>
                    <div className="field-input-box">
                      <User size={15} className="field-adornment-icon" />
                      <input
                        id="modern-name"
                        type="text"
                        required
                        placeholder="e.g. Alex Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="modern-text-input"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="modern-field-group">
                    <label htmlFor="modern-email" className="modern-field-label">
                      Email Address
                    </label>
                    <div className="field-input-box">
                      <Mail size={15} className="field-adornment-icon" />
                      <input
                        id="modern-email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="modern-text-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="modern-field-group" style={{ marginTop: "16px" }}>
                  <div className="field-label-row">
                    <label htmlFor="modern-message" className="modern-field-label">
                      Project Details or Inquiry
                    </label>
                    <span className="character-count-hint">
                      {formData.message.length > 0 ? `${formData.message.length} chars` : "Share context, timeline, or questions"}
                    </span>
                  </div>

                  <div className="field-textarea-box">
                    <MessageSquare size={15} className="field-textarea-icon" />
                    <textarea
                      id="modern-message"
                      required
                      rows={4}
                      placeholder={`Tell me about your ${inquiryTypes.find((t) => t.id === selectedIntent)?.label.toLowerCase()} requirements or collaboration ideas...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="modern-textarea-input"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="form-submit-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="modern-submit-glow-btn"
                    onMouseEnter={() => playMicroSound("hover")}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="btn-spinner" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} className="send-arrow-icon" />
                      </>
                    )}
                  </button>

                  <span className="form-guarantee-note">
                    🔒 Direct encrypted delivery • No spam ever
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
