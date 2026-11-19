"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function playMicroSound(type: "hover" | "click" | "pop" = "hover") {
  if (typeof window === "undefined") return;
  const isEnabled = window.sessionStorage.getItem("sound_effects_enabled") === "true";
  if (!isEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "hover") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "click") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {
    // Audio context may require explicit user gesture or be restricted
  }
}

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("sound_effects_enabled");
    if (stored === "true") {
      setEnabled(true);
    }
  }, []);

  const toggleSound = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    window.sessionStorage.setItem("sound_effects_enabled", String(nextState));
    if (nextState) {
      setTimeout(() => playMicroSound("click"), 50);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`sound-toggle-btn ${enabled ? "sound-active" : ""}`}
      title={enabled ? "Mute interactive audio" : "Enable tactile sound effects"}
      aria-label="Toggle interactive audio feedback"
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span className="sound-toggle-label">{enabled ? "SOUND ON" : "AUDIO FX"}</span>
    </button>
  );
}
