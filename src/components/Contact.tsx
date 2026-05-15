"use client";

import { Mail, ArrowUpRight, Phone } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, SectionHeader } from "./ScrollAnimations";

export default function Contact() {
  const links = [
    {
      icon: Mail,
      label: "Email",
      value: "yahia.kerroum@ensia.edu.dz",
      href: "mailto:yahia.kerroum@ensia.edu.dz",
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M15 22v-4a4.8 4.8 0 0 0-4-5 4.8 4.8 0 0 0-4 5v4" />
          <circle cx="12" cy="8" r="5" />
          <path d="M1 21v-4a4.8 4.8 0 0 1 4-5 4.8 4.8 0 0 1 4 5v4" />
          <path d="M23 21v-4a4.8 4.8 0 0 0-4-5 4.8 4.8 0 0 0-4 5v4" />
        </svg>
      ),
      label: "GitHub",
      value: "YahiaKerroum",
      href: "https://github.com/YahiaKerroum",
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: "LinkedIn",
      value: "Yahia Kerroum",
      href: "https://www.linkedin.com/in/yahia-student-kerroum-a963632b4/",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+213 797 987 620",
      href: "tel:+213797987620",
    },
  ];

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeader label="Contact" title="Let's Connect" />
          <ScrollReveal delay={0.2}>
            <p className="text-muted max-w-lg mx-auto">
              I am always open to discussing new projects, opportunities, or
              ideas. Feel free to reach out through any of the channels below.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid sm:grid-cols-4 gap-4 max-w-3xl mx-auto" staggerDelay={0.12}>
          {links.map(({ icon: Icon, label, value, href }) => (
            <StaggerItem key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "noopener noreferrer"
                }
                className="glow-border group block p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-300 text-center"
              >
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform duration-200">
                  <Icon />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {label}
                </p>
                <p className="text-xs text-muted flex items-center justify-center gap-1">
                  {value}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </p>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
