"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  icon: string;
  color: string;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    id: "data-analytics",
    label: "Data & Analytics",
    icon: "📊",
    gradient: "from-purple-500 to-violet-600",
    skills: [
      { name: "Python",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#3776AB" },
      { name: "SQL",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",                                                                          color: "#F29111" },
      { name: "Pandas",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",                                                                        color: "#150458" },
      { name: "NumPy",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",                                                                          color: "#013243" },
      { name: "Power BI",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg",                                                       color: "#F2C811" },
      { name: "Plotly",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#3F4F75" },
      { name: "Matplotlib",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#11557C" },
      { name: "Seaborn",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#4C8CBF" },
      { name: "EDA",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg",                                                             color: "#F37626" },
      { name: "Statistics",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",                                                                                  color: "#276DC3" },
    ],
  },
  {
    id: "ml-ai",
    label: "Machine Learning & AI",
    icon: "🧠",
    gradient: "from-cyan-500 to-blue-600",
    skills: [
      { name: "Scikit-learn",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",                                                              color: "#F7931E" },
      { name: "TensorFlow",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",                                                                color: "#FF6F00" },
      { name: "PyTorch",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",                                                                      color: "#EE4C2C" },
      { name: "LangChain",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#1C3C3C" },
      { name: "FAISS",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#0066CC" },
      { name: "MLflow",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#0194E2" },
      { name: "RAG",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#6C3483" },
      { name: "Deep Learning",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",                                                                color: "#FF6F00" },
      { name: "NLP",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#2471A3" },
      { name: "Time Series",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#1ABC9C" },
    ],
  },
  {
    id: "cloud-mlops",
    label: "Cloud & MLOps",
    icon: "☁️",
    gradient: "from-teal-500 to-emerald-600",
    skills: [
      { name: "AWS",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",                                          color: "#FF9900" },
      { name: "Oracle Cloud",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",                                                                        color: "#F80000" },
      { name: "Docker",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",                                                                        color: "#2496ED" },
      { name: "FastAPI",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",                                                                      color: "#009688" },
      { name: "Streamlit",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#FF4B4B" },
      { name: "Jupyter",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg",                                                             color: "#F37626" },
      { name: "MLflow",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#0194E2" },
      { name: "Model Deployment", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#27AE60" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Development",
    icon: "⚙️",
    gradient: "from-violet-500 to-purple-600",
    skills: [
      { name: "Git",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                                                                              color: "#F1502F" },
      { name: "GitHub",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",                                                                        color: "#24292E" },
      { name: "Linux",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",                                                                          color: "#FCC624" },
      { name: "SQLite",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",                                                                        color: "#003B57" },
      { name: "SQLAlchemy",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                                                        color: "#D71F00" },
      { name: "Vercel",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",                                                                        color: "#000000" },
      { name: "Overleaf",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg",                                                                          color: "#47A141" },
      { name: "VS Code",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",                                                                        color: "#007ACC" },
    ],
  },
];

// ── Skill pill with hover-up animation ────────────────────────────────────────
function SkillPill({ skill, index }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative"
    >
      {/* Glow backdrop on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-xl blur-md -z-10"
            style={{ background: skill.color, opacity: 0.25 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 rounded-xl cursor-default select-none",
          "border transition-colors duration-200",
          hovered
            ? "border-white/20 bg-white/10"
            : "border-white/10 bg-white/5"
        )}
        style={{
          boxShadow: hovered
            ? `0 8px 24px ${skill.color}40, 0 0 0 1px ${skill.color}30`
            : "none",
        }}
      >
        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-5 h-5 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <span
          className="text-sm font-medium transition-colors duration-200 whitespace-nowrap"
          style={{ color: hovered ? skill.color : "rgba(255,255,255,0.85)" }}
        >
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────
function CategoryCard({ category, cardIndex }: { category: Category; cardIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: cardIndex * 0.1, ease: "easeOut" }}
      className={cn(
        "relative rounded-2xl p-6",
        "border border-white/10",
        "bg-white/5 backdrop-blur-sm",
        "hover:border-white/20 transition-colors duration-300"
      )}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        {/* Gradient icon box */}
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0",
            `bg-gradient-to-br ${category.gradient}`
          )}
        >
          {category.icon}
        </div>
        <h3 className="text-base font-semibold text-white/90">
          {category.label}
        </h3>
      </div>

      {/* Skills pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <SkillPill key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="w-full min-h-screen flex flex-col justify-center py-24 pointer-events-auto"
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeader
          id="skills"
          title={
            <span>
              Tech{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Stack
              </span>
            </span>
          }
          desc="Hover over any skill to see it come alive"
          className="mb-16"
        />

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} cardIndex={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;