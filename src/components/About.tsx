"use client";

import { MapPin, Code2, Brain, Globe } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, SectionHeader } from "./ScrollAnimations";

export default function About() {
  const highlights = [
    { icon: MapPin, label: "Algiers, Algeria", color: "from-accent to-accent-cyan" },
    { icon: Code2, label: "Full-Stack Development", color: "from-accent-cyan to-green-400" },
    { icon: Brain, label: "AI & Machine Learning", color: "from-purple-400 to-accent" },
    { icon: Globe, label: "Arabic, French, English", color: "from-accent-light to-accent-cyan" },
  ];

  const stats = [
    { value: "8+", label: "Projects" },
    { value: "72", label: "API Routes" },
    { value: "92.8%", label: "ML Accuracy" },
    { value: "419", label: "Source Files" },
  ];

  return (
    <section id="about" className="py-28 px-6 bg-dots">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="About" title="Who I Am" />

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="text-muted leading-relaxed text-[15px]">
                I am an AI Engineering student at the National Higher School of
                Artificial Intelligence (ENSIA) in Algiers, with a focus on
                building production-grade software that bridges full-stack
                development and intelligent systems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-muted leading-relaxed text-[15px]">
                My work spans from architecting full-stack platforms with 72 API
                routes and 419 source files, to designing multi-layer security
                systems for face recognition, to engineering ML pipelines that
                classify student knowledge levels with 92.8% accuracy. I care
                about engineering decisions, not just features.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-muted leading-relaxed text-[15px]">
                I have contributed to and led projects across web platforms,
                mobile applications, browser extensions, and machine learning
                systems. Whether it is a dynamic permission system with 50+
                granular permissions or a privacy-preserving phishing detector
                that runs entirely in the browser, I build things that work and
                that I can defend in an interview.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-4 gap-4 pt-6" staggerDelay={0.15}>
              {stats.map(({ value, label }) => (
                <StaggerItem key={label} className="text-center">
                  <p className="text-2xl font-bold text-gradient">{value}</p>
                  <p className="text-xs text-muted mt-1">{label}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <StaggerContainer className="md:col-span-2 grid grid-cols-2 gap-4" staggerDelay={0.12}>
            {highlights.map(({ icon: Icon, label, color }) => (
              <StaggerItem key={label}>
                <div className="glow-border group p-5 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} p-px mb-3`}>
                    <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center">
                      <Icon size={18} className="text-accent" />
                    </div>
                  </div>
                  <p className="text-sm text-foreground font-medium">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
