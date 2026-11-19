"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Terminal, ShieldCheck, ArrowUpRight, Github, Linkedin, Cpu } from "lucide-react";
import TiltCard from "./TiltCard";
import { playMicroSound } from "./SoundToggle";

export default function HeroCyberCard() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Primary Colors
    const COBALT = 0x8b7cf6;
    const CYAN_BLUE = 0x8b7cf6;

    // Holographic Cyber Sphere Mesh
    const group = new THREE.Group();
    scene.add(group);

    // Inner glowing core
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: COBALT,
      emissive: new THREE.Color(0x012557),
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Outer orbiting ring 1
    const ringGeo1 = new THREE.TorusGeometry(1.35, 0.025, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: CYAN_BLUE,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // Outer orbiting ring 2
    const ringGeo2 = new THREE.TorusGeometry(1.6, 0.02, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x89b4fa,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // Particle Cloud
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8b7cf6,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse tracking
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 1.2;
      targetRotX = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop (using performance.now() to avoid THREE.Clock deprecation)
    let animId: number;
    let startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      group.rotation.y += (elapsed * 0.6 + targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (Math.sin(elapsed * 0.5) * 0.2 + targetRotX - group.rotation.x) * 0.05;

      ring1.rotation.z = elapsed * 0.7;
      ring2.rotation.z = -elapsed * 0.5;

      particles.rotation.y = elapsed * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <TiltCard
      maxTilt={6}
      scale={1.015}
      className="hero-cyber-card-root"
    >
      <div
        className="cyber-card-inner"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Header */}
        <div className="cyber-card-header">
          <div className="cyber-avatar-group">
            <div className="cyber-avatar-icon">
              <span>Z</span>
              <span className="avatar-pulse" />
            </div>
            <div>
              <span className="cyber-label-tag">CREATIVE TECHNOLOGIST</span>
              <h3 className="cyber-name">Zenis Dev</h3>
            </div>
          </div>

          <div className="cyber-status-badge">
            <span className="live-status-dot" />
            <span>AVAILABLE</span>
          </div>
        </div>

        {/* Seamless 3D Holographic Core Viewport */}
        <div className="cyber-3d-stage">
          <div ref={canvasRef} className="cyber-canvas" />
          <div className="stage-overlay-meta">
            <span className="meta-chip">
              <Cpu size={11} />
              <span>3D WEBGL CORE</span>
            </span>
            <span className="meta-chip">
              <Sparkles size={11} />
              <span>INTERACTIVE</span>
            </span>
          </div>
        </div>

        {/* Telemetry & Technical Specs Grid */}
        <div className="cyber-specs-grid">
          <div className="spec-item">
            <span className="spec-label">CORE STACK</span>
            <span className="spec-val">Next.js 15 â€¢ Three.js</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">BACKEND &amp; DB</span>
            <span className="spec-val">Supabase â€¢ PostgreSQL</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">PERFORMANCE</span>
            <span className="spec-val">100/100 Core Web Vitals</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">AVAILABILITY</span>
            <span className="spec-val">Global â€¢ Remote-First</span>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="cyber-card-footer">
          <div className="verified-badge">
            <ShieldCheck size={14} className="shield-green" />
            <span>PRODUCTION READY ARCHITECTURE</span>
          </div>

          <div className="cyber-quick-socials">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="quick-social-link"
              title="GitHub"
              onMouseEnter={() => playMicroSound("hover")}
            >
              <Github size={14} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="quick-social-link"
              title="LinkedIn"
              onMouseEnter={() => playMicroSound("hover")}
            >
              <Linkedin size={14} />
            </a>
            <a
              href="#contact"
              className="quick-social-link highlight"
              title="Get In Touch"
              onClick={() => playMicroSound("click")}
              onMouseEnter={() => playMicroSound("hover")}
            >
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}



