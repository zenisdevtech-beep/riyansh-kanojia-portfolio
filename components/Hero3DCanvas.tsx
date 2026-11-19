"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RefreshCw, Box, Orbit, Disc } from "lucide-react";

type GeometryMode = "torus" | "icosahedron" | "rings";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<GeometryMode>("torus");
  const [isHovered, setIsHovered] = useState(false);
  const modeRef = useRef<GeometryMode>("torus");
  modeRef.current = currentMode;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 440;
    const height = container.clientHeight || 440;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Primary Colors
    const COBALT_BLUE = 0x8b7cf6;
    const COBALT_LIGHT = 0x1e6bdb;
    const CREAM_WHITE = 0xf8f3f0;
    const COBALT_DEEP = 0x002d6b;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(COBALT_LIGHT, 3.2);
    mainLight.position.set(5, 5, 4);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(CREAM_WHITE, 2.5);
    backLight.position.set(-5, -3, -3);
    scene.add(backLight);

    const pointLight = new THREE.PointLight(0x8b7cf6, 4, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Main 3D Object Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Helper to generate geometries
    let currentMesh: THREE.Object3D | null = null;

    const buildGeometry = (mode: GeometryMode) => {
      if (currentMesh) {
        mainGroup.remove(currentMesh);
        // Clean up
        currentMesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material?.dispose();
            }
          }
        });
      }

      const group = new THREE.Group();

      if (mode === "torus") {
        // Sculptural Torus Knot
        const geom = new THREE.TorusKnotGeometry(0.95, 0.28, 140, 28, 2, 3);
        const mat = new THREE.MeshPhysicalMaterial({
          color: COBALT_BLUE,
          roughness: 0.18,
          metalness: 0.75,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          reflectivity: 0.9,
          sheen: 1.0,
          sheenColor: new THREE.Color(0x3d89ff),
        });
        const mesh = new THREE.Mesh(geom, mat);
        group.add(mesh);

        // Wireframe cage overlay
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0x93bdf8,
          wireframe: true,
          transparent: true,
          opacity: 0.18,
        });
        const wireMesh = new THREE.Mesh(geom, wireMat);
        wireMesh.scale.set(1.02, 1.02, 1.02);
        group.add(wireMesh);
      } else if (mode === "icosahedron") {
        // High-tech geometric gem
        const geom = new THREE.IcosahedronGeometry(1.25, 0);
        const mat = new THREE.MeshPhysicalMaterial({
          color: COBALT_BLUE,
          roughness: 0.1,
          metalness: 0.85,
          flatShading: true,
          clearcoat: 1.0,
        });
        const mesh = new THREE.Mesh(geom, mat);
        group.add(mesh);

        // Outer wireframe dodecahedron
        const outerGeom = new THREE.IcosahedronGeometry(1.5, 1);
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0x3d89ff,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
        const outerWire = new THREE.Mesh(outerGeom, wireMat);
        group.add(outerWire);
      } else {
        // Quantum Gyroscope Rings
        const ringMat1 = new THREE.MeshStandardMaterial({
          color: COBALT_BLUE,
          metalness: 0.9,
          roughness: 0.15,
        });
        const ringMat2 = new THREE.MeshStandardMaterial({
          color: COBALT_LIGHT,
          metalness: 0.85,
          roughness: 0.2,
        });
        const ringMat3 = new THREE.MeshStandardMaterial({
          color: 0x032454,
          metalness: 0.9,
          roughness: 0.25,
        });

        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.055, 24, 100), ringMat1);
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 24, 100), ringMat2);
        ring2.rotation.x = Math.PI / 2;
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.045, 24, 100), ringMat3);
        ring3.rotation.y = Math.PI / 2;

        const centerSphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.45, 32, 32),
          new THREE.MeshPhysicalMaterial({
            color: COBALT_BLUE,
            metalness: 0.7,
            roughness: 0.1,
            clearcoat: 1,
            emissive: new THREE.Color(0x012557),
            emissiveIntensity: 0.4,
          })
        );

        group.add(ring1);
        group.add(ring2);
        group.add(ring3);
        group.add(centerSphere);
      }

      currentMesh = group;
      mainGroup.add(group);
    };

    buildGeometry(modeRef.current);

    // Floating Particles Field
    const particlesCount = 240;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 8;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 6;
      particleScales[i] = Math.random();
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8b7cf6,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.2;
      targetY = y * 2.2;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        mainGroup.rotation.y += deltaX * 0.015;
        mainGroup.rotation.x += deltaY * 0.015;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / group rotation tracking
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      if (!isDragging) {
        mainGroup.rotation.y = elapsedTime * 0.45 + mouseX * 0.8;
        mainGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2 + mouseY * 0.6;
      }

      // Rotate sub components if rings
      if (modeRef.current === "rings" && currentMesh) {
        const rings = currentMesh.children;
        if (rings.length >= 4) {
          rings[0].rotation.z = elapsedTime * 0.7;
          rings[1].rotation.x = elapsedTime * 0.85;
          rings[2].rotation.y = elapsedTime * 0.6;
        }
      }

      // Gentle floating particles drift
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      // Pulse the point light
      pointLight.intensity = 3 + Math.sin(elapsedTime * 2) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    // Mode change listener stored on container
    (container as any).__switchMode = (newMode: GeometryMode) => {
      buildGeometry(newMode);
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  const handleSelectMode = (mode: GeometryMode) => {
    setCurrentMode(mode);
    const container = containerRef.current;
    if (container && (container as any).__switchMode) {
      (container as any).__switchMode(mode);
    }
  };

  return (
    <div
      className="hero-3d-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="hero-3d-canvas"
        style={{ cursor: "grab" }}
        title="Click and drag to spin in 3D"
      />

      {/* 3D Dynamic Controls */}
      <div className="hero-3d-controls">
        <button
          className={`mode-btn ${currentMode === "torus" ? "active" : ""}`}
          onClick={() => handleSelectMode("torus")}
          aria-label="Torus Knot 3D"
        >
          <Orbit size={13} />
          <span>Knot</span>
        </button>
        <button
          className={`mode-btn ${currentMode === "icosahedron" ? "active" : ""}`}
          onClick={() => handleSelectMode("icosahedron")}
          aria-label="Icosahedron Gem 3D"
        >
          <Box size={13} />
          <span>Gem</span>
        </button>
        <button
          className={`mode-btn ${currentMode === "rings" ? "active" : ""}`}
          onClick={() => handleSelectMode("rings")}
          aria-label="Quantum Gyroscope 3D"
        >
          <Disc size={13} />
          <span>Gyro</span>
        </button>
      </div>

      {/* Floating 3D Depth Badges */}
      <div className="badge-3d badge-3d-top">
        <span className="live-dot" />
        <span>THREE.JS 3D ENGINE</span>
      </div>

      <div className="badge-3d badge-3d-bottom">
        <Sparkles size={12} />
        <span>INTERACTIVE â€¢ DRAG TO ROTATE</span>
      </div>
    </div>
  );
}



