"use client";

import { GraduationCap, BookOpen } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, SectionHeader } from "./ScrollAnimations";

export default function Education() {
  const coursework = [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Data Structures & Algorithms",
    "Operating Systems",
    "Database Systems",
    "Software Engineering",
    "Probability & Statistics",
    "Linear Algebra",
    "Discrete Mathematics",
  ];

  return (
    <section id="education" className="py-28 px-6 bg-dots">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Education" title="Academic Background" />

        <ScrollReveal delay={0.1}>
          <div className="glow-border p-8 rounded-2xl bg-surface border border-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="rounded-xl bg-gradient-to-br from-accent to-accent-cyan p-px shrink-0">
                <div className="rounded-xl bg-surface p-3">
                  <GraduationCap size={24} className="text-accent" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground">
                  National Higher School of Artificial Intelligence (ENSIA)
                </h4>
                <p className="text-muted mt-1">
                  Engineer&apos;s Degree in Artificial Intelligence
                </p>
                <p className="text-sm text-muted mt-1">
                  Algiers, Algeria &middot; 2023 &ndash; Present
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-accent" />
                <h5 className="text-sm font-semibold text-foreground">
                  Relevant Coursework
                </h5>
              </div>
              <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.05}>
                {coursework.map((course) => (
                  <StaggerItem key={course}>
                    <span className="inline-block px-3 py-1.5 text-sm rounded-lg bg-background border border-border text-muted hover:text-accent hover:border-accent/30 transition-all duration-200">
                      {course}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
