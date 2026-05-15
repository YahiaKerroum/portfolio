"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { StaggerContainer, StaggerItem, SectionHeader } from "./ScrollAnimations";

interface Project {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  tags: string[];
  link?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "DzairAI",
    subtitle: "Algerian AI Ecosystem Platform",
    role: "Major Contributor",
    description:
      "A full-stack AI ecosystem platform that centralizes Algeria's fragmented AI landscape into a single discovery surface covering researchers, organizations, events, datasets, research papers, and open-source repositories. Automated ingestion of Algerian-based GitHub repositories and academic papers keeps content current without manual curation. Designed for self-hosted Algerian deployment with a modular API/domain architecture spanning 72 routes across 419 source files.",
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
    link: "https://dzair.ai/",
  },
  {
    title: "DCMS",
    subtitle: "Dental Clinic Management System",
    role: "Lead",
    description:
      "A production-ready clinic management platform replacing manual operations with structured digital workflows across five domains. The defining engineering feature is a dynamic permission system with 50+ granular permissions in resource.action format where managers modify staff access at runtime without redeployment. Includes an interactive dental orthogram with graphical tooth mapping, conflict-aware appointment scheduling, Google Drive document integration, and 18+ analytics report types with role-personalized dashboards.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Chart.js", "Docker"],
    link: "https://github.com/YahiaKerroum/Dentist-Management-System",
  },
  {
    title: "Adaptive Quiz Platform",
    subtitle: "ML-Powered Assessment System",
    role: "Lead",
    description:
      "An adaptive assessment platform that classifies a student's knowledge level as beginner, intermediate, or advanced using as few questions as possible. Engineered a full 9-stage ML pipeline: scraped and filtered 70,851 questions down to 1,080 balanced questions using TF-IDF near-duplicate detection and LLM-assisted difficulty labeling. Selected Logistic Regression at 92.8% CV accuracy. Benchmarked four active learning strategies proving adaptive selection reaches accurate classification significantly faster than random order. Validated against real ENSIA student quiz data.",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Scikit-learn", "Docker"],
    link: "https://github.com/YahiaKerroum/QuizPlatform",
  },
  {
    title: "FaceAttend",
    subtitle: "Secure Face Recognition Attendance",
    role: "Major Contributor",
    description:
      "A production-grade attendance system where two independent liveness layers must both be defeated simultaneously for a spoofing attack to succeed. Client-side MediaPipe Face Mesh running fully in-browser via WASM detects blink events and micro-movement. A separate server-side MobileNetV2 CNN independently analyzes face texture for print patterns, screen moire, and flat depth. Identity verification uses ArcFace 512-dimensional embeddings with FAISS cosine similarity search against pgvector. Every attempt is written to an immutable audit log.",
    tags: ["FastAPI", "React", "ArcFace", "FAISS", "PyTorch", "Docker"],
    link: "https://github.com/chouy15/Facial-Recognition-system",
  },
  {
    title: "AI Job Matching",
    subtitle: "Multi-Algorithm Recommendation Engine",
    role: "Major Contributor",
    description:
      "An AI-driven job-candidate matching system addressing inefficiencies in the Algerian labor market, processing over 8,500 job listings and 8,100 employee profiles. Implemented and benchmarked four algorithms for bidirectional matching where A* achieved 92% accuracy, Genetic Algorithm 85%, Greedy 78%, and CSP handled hard-constraint scenarios. Reduced search space by 60% through hierarchical feature-based clustering, achieving sub-5ms end-to-end latency across all strategies.",
    tags: ["Python", "Flask", "Scikit-learn", "A*", "Genetic Algorithms"],
    link: "https://github.com/HassaneAitAhmed/Job-Matching-AI-Platform",
  },
  {
    title: "Sentinel",
    subtitle: "Browser-Native Phishing Detection",
    role: "Contributor",
    description:
      "A privacy-preserving phishing detection extension where the core design constraint was that no email content should ever leave the user's browser. Body text analysis runs via an offline MiniLM ONNX model entirely on-device. Link analysis combines structural heuristics, Damerau-Levenshtein typosquatting detection, and RDAP domain-age lookups. A two-tier pipeline keeps the UI responsive while maintaining analytical depth.",
    tags: ["Chrome Extension", "JavaScript", "MiniLM ONNX", "RDAP API"],
  },
  {
    title: "Findar",
    subtitle: "Real Estate Mobile Application",
    role: "Major Contributor",
    description:
      "A full-stack Flutter mobile application for the Algerian real estate market enabling sellers, agencies, buyers, and renters to list and discover properties. Built Firebase-backed authentication with OAuth support, real-time push notifications for listing activity, listing boost functionality for visibility promotion, and saved favorites. Backed by a dedicated backend and a public landing page.",
    tags: ["Flutter", "Dart", "Firebase", "OAuth", "Android"],
    link: "https://github.com/khalilgh1/findar-app",
    demo: "https://fin-dar-website.vercel.app/",
  },
  {
    title: "Laptop Price Prediction",
    subtitle: "Market Analysis & ML Pipeline",
    role: "Major Contributor",
    description:
      "An ML pipeline for laptop price prediction and market segmentation from hardware specifications. Applied regression modeling for price estimation, clustering for hardware market segment discovery, and association rule mining to identify common configuration patterns. Covered the full pipeline from data cleaning and categorical encoding through model evaluation.",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    link: "https://dzlaptopprice.vercel.app/",
  },
];

const roleColors: Record<string, string> = {
  Lead: "bg-green-500/10 text-green-400 border-green-500/20",
  "Major Contributor": "bg-accent/10 text-accent border-accent/20",
  Contributor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Projects" title="What I Have Built" />

        <StaggerContainer className="space-y-4" staggerDelay={0.08}>
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <div
                className="group rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                {/* Collapsed header — always visible */}
                <div className="flex items-center justify-between p-5 sm:p-6">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h4>
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border whitespace-nowrap ${roleColors[project.role]}`}>
                          {project.role}
                        </span>
                      </div>
                      <p className="text-sm text-muted mt-1">{project.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    {/* Quick links — always visible */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200"
                        aria-label={project.demo ? "Source Code" : "View Project"}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg text-muted hover:text-green-400 hover:bg-green-400/10 transition-all duration-200"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <span className={`text-muted text-xs transition-transform duration-300 ${expanded === i ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border pt-4">
                    <p className="text-sm text-muted leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-md bg-accent/5 border border-accent/10 text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-5 mt-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
                        >
                          <ExternalLink size={12} />
                          {project.demo ? "Source Code" : "View Project"}
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                          <ExternalLink size={12} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
