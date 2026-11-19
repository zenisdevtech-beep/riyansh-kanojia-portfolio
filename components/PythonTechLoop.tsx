"use client";

import React from "react";
import LogoLoop, { LogoItem } from "./LogoLoop";
import {
  SiPython,
  SiFastapi,
  SiGooglegemini,
  SiClaude,
  SiClaudecode,
  SiWordpress,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiDocker,
  SiGit,
  SiGithub,
  SiPycharm,
} from "react-icons/si";

const pythonTechLogos: LogoItem[] = [
  {
    node: <SiPython />,
    title: "Python",
    href: "https://python.org",
    hoverColor: "#3B82F6",
  },
  {
    node: <SiFastapi />,
    title: "FastAPI",
    href: "https://fastapi.tiangolo.com",
    hoverColor: "#009688",
  },
  {
    node: <SiGooglegemini />,
    title: "Google Gemini",
    href: "https://gemini.google.com",
    hoverColor: "#60A5FA",
  },
  {
    node: <SiClaude />,
    title: "Claude AI",
    href: "https://claude.ai",
    hoverColor: "#D97706",
  },
  {
    node: <SiClaudecode />,
    title: "Claude Code",
    href: "https://anthropic.com",
    hoverColor: "#3B82F6",
  },
  {
    node: <SiWordpress />,
    title: "WordPress CMS",
    href: "https://wordpress.org",
    hoverColor: "#21759B",
  },
  {
    node: <SiPandas />,
    title: "Pandas",
    href: "https://pandas.pydata.org",
    hoverColor: "#60A5FA",
  },
  {
    node: <SiNumpy />,
    title: "NumPy",
    href: "https://numpy.org",
    hoverColor: "#013243",
  },
  {
    node: <SiScikitlearn />,
    title: "Scikit-Learn",
    href: "https://scikit-learn.org",
    hoverColor: "#F7931E",
  },
  {
    node: <SiDocker />,
    title: "Docker",
    href: "https://docker.com",
    hoverColor: "#2496ED",
  },
  {
    node: <SiGit />,
    title: "Git",
    href: "https://git-scm.com",
    hoverColor: "#F05032",
  },
  {
    node: <SiGithub />,
    title: "GitHub",
    href: "https://github.com",
    hoverColor: "#FFFFFF",
  },
  {
    node: <SiPycharm />,
    title: "PyCharm",
    href: "https://jetbrains.com/pycharm",
    hoverColor: "#21D789",
  },
];

export default function PythonTechLoop() {
  return (
    <div className="python-tech-loop-wrapper">
      <LogoLoop
        logos={pythonTechLogos}
        speed={55}
        direction="left"
        logoHeight={44}
        gap={36}
        hoverSpeed={0}
        scaleOnHover={true}
        ariaLabel="Riyansh Kanojia - Python, Prompt Engineering & AI Tech Stack"
      />
    </div>
  );
}
