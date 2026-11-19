"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const TAGS = [
  "React 19",
  "Next.js 15",
  "TypeScript",
  "Three.js",
  "WebGL",
  "Node.js",
  "Python",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Docker",
  "GraphQL",
  "Redis",
  "Git / GitHub",
  "Framer Motion",
  "REST APIs",
  "FastAPI",
  "OpenCV",
  "TensorFlow",
  "Vercel Edge",
  "Prisma",
  "Express.js"
];

export default function ThreeDTagSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Three.js Scene
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D tag sprites
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Helper to generate text canvas sprites
    const createTextSprite = (text: string, isHighlighted: boolean = false) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pill background
      ctx.fillStyle = isHighlighted
        ? "rgba(0, 212, 255, 0.55)"
        : "rgba(3, 18, 48, 0.7)";
      ctx.strokeStyle = isHighlighted
        ? "#3B82F6"
        : "rgba(0, 212, 255, 0.4)";
      ctx.lineWidth = 2;

      // Rounded rect
      const x = 8, y = 8, w = 240, h = 48, r = 24;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Text styling with #F8F3F0 porcelain
      ctx.font = "bold 20px 'DM Sans', sans-serif";
      ctx.fillStyle = isHighlighted ? "#F0EEFF" : "#F8F3F0";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(65, 16.25, 1);
      (sprite as any).tagText = text;
      return sprite;
    };

    // Distribute tags uniformly across a sphere surface (Fibonacci Lattice)
    const radius = 175;
    const count = TAGS.length;
    const sprites: THREE.Sprite[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + 5 ** 0.5) * i;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const sprite = createTextSprite(TAGS[i]);
      if (sprite) {
        sprite.position.set(x, y, z);
        sphereGroup.add(sprite);
        sprites.push(sprite);
      }
    }

    // Floating background particle dust
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 500;
      particlePositions[i + 1] = (Math.random() - 0.5) * 500;
      particlePositions[i + 2] = (Math.random() - 0.5) * 400;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x8b7cf6,
      size: 3,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interaction & Drag physics
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0.002;
    let rotSpeedY = 0.003;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        sphereGroup.rotation.y += deltaX * 0.008;
        sphereGroup.rotation.x += deltaY * 0.008;
        rotSpeedY = deltaX * 0.002;
        rotSpeedX = deltaY * 0.002;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Natural rotation + subtle mouse influence
        sphereGroup.rotation.y += rotSpeedY;
        sphereGroup.rotation.x += rotSpeedX;

        // Dampen back to default idle spin
        rotSpeedY += (0.003 - rotSpeedY) * 0.05;
        rotSpeedX += (0.001 - rotSpeedX) * 0.05;
      }

      particles.rotation.y += 0.001;

      // Adjust opacity of sprites based on Z depth so closer tags are crisp
      sprites.forEach((sprite) => {
        const vector = sprite.position.clone();
        vector.applyMatrix4(sphereGroup.matrixWorld);
        const z = vector.z;
        // z varies roughly between -radius and +radius (-175 to 175)
        const alpha = Math.max(0.2, (z + 200) / 375);
        sprite.material.opacity = alpha;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sprites.forEach((s) => {
        s.material.map?.dispose();
        s.material.dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="sphere-3d-wrapper">
      <div
        ref={containerRef}
        className="sphere-3d-canvas"
        style={{ cursor: "grab" }}
        title="Click and drag to spin the 3D Tech Sphere"
      />
      <div className="sphere-caption-hint">
        <span>INTERACTIVE 3D SKILL SPHERE â€¢ DRAG TO EXPLORE</span>
      </div>
    </div>
  );
}



