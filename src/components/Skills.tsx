"use client";

import { StaggerContainer, StaggerItem, SectionHeader } from "./ScrollAnimations";

const skillGroups = [
  {
    title: "Programming Languages",
    items: ["Python", "TypeScript", "JavaScript", "Dart", "SQL", "C++"],
    gradient: "from-accent to-accent-cyan",
  },
  {
    title: "AI & Machine Learning",
    items: [
      "Neural Networks",
      "Computer Vision",
      "NLP",
      "Face Recognition",
      "Active Learning",
      "Heuristic Search",
      "Genetic Algorithms",
      "Clustering",
      "Regression Modeling",
      "Association Rule Mining",
      "TF-IDF",
      "Cross-Validation",
    ],
    gradient: "from-purple-400 to-accent",
  },
  {
    title: "Software Engineering",
    items: [
      "Clean Architecture",
      "Design Patterns",
      "Agile Methodology",
      "REST API Design",
      "Dynamic Permission Systems",
      "Role-Based Access Control",
      "Web Scraping",
      "Chrome Extension Development",
      "Authentication & OAuth",
    ],
    gradient: "from-accent-cyan to-green-400",
  },
  {
    title: "Databases & Infrastructure",
    items: [
      "PostgreSQL",
      "Redis",
      "Firebase",
      "Docker",
      "Nginx",
      "WebSockets",
      "Git & GitHub",
    ],
    gradient: "from-accent-light to-accent",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Skills" title="What I Work With" />

        <StaggerContainer className="grid sm:grid-cols-2 gap-6" staggerDelay={0.15}>
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="glow-border p-6 rounded-2xl bg-surface border border-border h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${group.gradient}`} />
                  <h4 className="text-lg font-semibold text-foreground">
                    {group.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm rounded-lg bg-background border border-border text-muted hover:text-accent hover:border-accent/30 hover:shadow-sm hover:shadow-accent/5 transition-all duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
