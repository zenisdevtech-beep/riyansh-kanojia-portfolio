"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { playMicroSound } from "./SoundToggle";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Prompt Engineering & AI Workflows",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playMicroSound("click");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playMicroSound("pop");
      setFormData({
        name: "",
        email: "",
        subject: "Prompt Engineering & AI Workflows",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="contact-form-wrapper">
      <form onSubmit={handleSubmit} className="contact-form-card">
        <div className="form-header">
          <span className="form-eyebrow">DIRECT INQUIRY</span>
          <h3 className="form-title">Send a Message</h3>
          <p className="form-subtitle">
            Direct response typically within 4–12 hours.
          </p>
        </div>

        {isSubmitted ? (
          <div className="form-success-toast">
            <CheckCircle2 size={28} className="success-icon" />
            <div>
              <strong>Message Sent Successfully!</strong>
              <p>Thank you for reaching out to Riyansh. I will get back to you shortly.</p>
            </div>
          </div>
        ) : (
          <div className="form-fields-grid">
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="contact-subject">Project Scope / Topic</label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              >
                <option value="Prompt Engineering & AI Workflows">
                  Prompt Engineering &amp; AI Workflows
                </option>
                <option value="Python Development & Automation">
                  Python Development &amp; Multi-Agent Systems (LangGraph, FastAPI)
                </option>
                <option value="WordPress Content Writing & Publication">
                  WordPress Content Writing &amp; Publication
                </option>
                <option value="Generative AI & LLM Integration (LangChain)">
                  Generative AI &amp; LLM Integration (LangChain, LangGraph)
                </option>
                <option value="General Inquiry / Career Opportunity">
                  General Inquiry / Career Opportunity
                </option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="contact-message">How can we work together?</label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Tell me about your product vision, timeline, and goals..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="form-submit-btn"
              onMouseEnter={() => playMicroSound("hover")}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spinning" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
