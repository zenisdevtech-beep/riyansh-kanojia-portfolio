"use client";

import React, { useState } from "react";
import { Award, ExternalLink, CheckCircle2, ShieldCheck } from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerIcon: string;
  date: string;
  credentialId: string;
  skills: string[];
  link: string;
}

const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Web Development",
    issuer: "Internzvalley",
    issuerIcon: "💻",
    date: "2024",
    credentialId: "IV-WEBDEV-2024",
    skills: ["Web Development", "HTML & CSS", "JavaScript", "Frontend Development"],
    link: "#contact",
  },
  {
    id: "cert-2",
    title: "Introduction to Internet of Things",
    issuer: "NPTEL / Swayam (IIT)",
    issuerIcon: "🌐",
    date: "2023",
    credentialId: "NPTEL-IOT-8841",
    skills: ["Internet of Things (IoT)", "Sensors & Actuators", "Python IoT", "Hardware Protocols"],
    link: "#contact",
  },
  {
    id: "cert-3",
    title: "HTML and CSS: Certification Course for Beginners",
    issuer: "Udemy",
    issuerIcon: "🎓",
    date: "2023",
    credentialId: "UDEMY-HTMLCSS-552",
    skills: ["HTML5", "CSS3", "Responsive Layouts", "Modern Web Styling"],
    link: "#contact",
  },
  {
    id: "cert-4",
    title: "Design Thinking",
    issuer: "Infosys Springboard",
    issuerIcon: "💡",
    date: "2023",
    credentialId: "INFOSYS-DT-1094",
    skills: ["Design Thinking", "Problem Formulation", "User Empathy", "Prototyping & Ideation"],
    link: "#contact",
  },
];

export default function CertificatesGrid() {
  return (
    <div className="certificates-grid-container">
      {certificates.map((cert) => (
        <TiltCard key={cert.id} maxTilt={6} scale={1.02} className="cert-tilt-card">
          <div className="cert-card-body">
            <div className="cert-top-row">
              <span className="cert-issuer-badge">
                <span className="issuer-icon">{cert.issuerIcon}</span>
                <span>{cert.issuer}</span>
              </span>
              <span className="cert-date">{cert.date}</span>
            </div>

            <h3 className="cert-title">{cert.title}</h3>

            <div className="cert-credential-id">
              <ShieldCheck size={14} className="shield-icon" />
              <span>ID: {cert.credentialId}</span>
            </div>

            <div className="cert-skills-pills">
              {cert.skills.map((s) => (
                <span key={s} className="cert-pill">
                  {s}
                </span>
              ))}
            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="cert-verify-link"
              onClick={() => playMicroSound("click")}
              onMouseEnter={() => playMicroSound("hover")}
            >
              <span>Verify Credential</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}
